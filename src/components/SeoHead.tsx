import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  RouteKey,
  routeSeoTranslations,
  resolveRouteKeyFromLocation,
} from '../data/seoRoutes';

function setOrCreateMetaTag(
  attributeName: 'name' | 'property',
  attributeValue: string,
  contentValue: string
) {
  let element = document.head.querySelector(
    `meta[${attributeName}="${attributeValue}"]`
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', contentValue);
}

function setOrCreateCanonicalLink(hrefValue: string) {
  let linkEl = document.head.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement | null;

  if (!linkEl) {
    linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'canonical');
    document.head.appendChild(linkEl);
  }
  linkEl.setAttribute('href', hrefValue);
}

export const SeoHead: React.FC = () => {
  const { language } = useLanguage();
  const [activeRoute, setActiveRoute] = useState<RouteKey>(() =>
    resolveRouteKeyFromLocation(window.location.pathname, window.location.hash)
  );

  useEffect(() => {
    const syncFromLocation = () => {
      const resolved = resolveRouteKeyFromLocation(
        window.location.pathname,
        window.location.hash
      );
      setActiveRoute(resolved);
    };

    window.addEventListener('hashchange', syncFromLocation);
    window.addEventListener('popstate', syncFromLocation);

    // Also observe section visibility so scrolling or navigating to a section updates route meta tags
    const sectionIds: RouteKey[] = [
      'beranda',
      'merek',
      'layanan',
      'tentang',
      'galeri',
      'cara-kerja',
      'faq',
      'kontak',
    ];

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target.id) {
                  const id = entry.target.id as RouteKey;
                  if (sectionIds.includes(id)) {
                    setActiveRoute(id);
                  }
                }
              });
            },
            { threshold: 0.45 }
          )
        : null;

    if (observer) {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }

    return () => {
      window.removeEventListener('hashchange', syncFromLocation);
      window.removeEventListener('popstate', syncFromLocation);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const seoData =
      routeSeoTranslations[language][activeRoute] ||
      routeSeoTranslations[language].beranda;

    const origin = window.location.origin;
    const canonicalUrl =
      seoData.routeKey === 'beranda'
        ? `${origin}/`
        : `${origin}/${seoData.routeKey}`;

    document.title = seoData.title;

    // Standard Meta Description & Canonical
    setOrCreateMetaTag('name', 'description', seoData.description);
    setOrCreateCanonicalLink(canonicalUrl);

    // Open Graph Meta Tags
    setOrCreateMetaTag('property', 'og:type', seoData.ogType);
    setOrCreateMetaTag('property', 'og:site_name', 'Brit Auto');
    setOrCreateMetaTag(
      'property',
      'og:locale',
      language === 'en' ? 'en_US' : 'id_ID'
    );
    setOrCreateMetaTag(
      'property',
      'og:locale:alternate',
      language === 'en' ? 'id_ID' : 'en_US'
    );
    setOrCreateMetaTag('property', 'og:url', canonicalUrl);
    setOrCreateMetaTag('property', 'og:title', seoData.ogTitle);
    setOrCreateMetaTag('property', 'og:description', seoData.ogDescription);

    // Twitter Card Meta Tags
    setOrCreateMetaTag('name', 'twitter:card', seoData.twitterCard);
    setOrCreateMetaTag('name', 'twitter:site', '@britauto_id');
    setOrCreateMetaTag('name', 'twitter:url', canonicalUrl);
    setOrCreateMetaTag('name', 'twitter:title', seoData.twitterTitle);
    setOrCreateMetaTag(
      'name',
      'twitter:description',
      seoData.twitterDescription
    );
  }, [language, activeRoute]);

  return null;
};
