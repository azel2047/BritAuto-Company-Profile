import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { buildWhatsAppLink } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';

export const Contact: React.FC = () => {
  const { language, content } = useLanguage();
  const [mapInView, setMapInView] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerEl = mapContainerRef.current;
    if (!containerEl) return;

    if (typeof IntersectionObserver === 'undefined') {
      setMapInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '150px 0px', threshold: 0.05 }
    );

    observer.observe(containerEl);
    return () => observer.disconnect();
  }, []);

  const whatsappHref = buildWhatsAppLink(
    content.contact.defaultWhatsappMessage,
    language
  );

  return (
    <section
      id="kontak"
      aria-labelledby="kontak-heading"
      className="py-16 md:py-24 bg-[#F4F6FB] dark:bg-[#060E24] transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading
          id="kontak-heading"
          pill={content.contactSection.pill}
          title={content.contactSection.heading}
          subtitle={content.contactSection.subtitle}
          align="left"
        />

        {/* Split Layout: Contact Details Left, Embedded Google Maps Right */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Address, Phone, Email, Opening Hours Placeholder, and CTAs */}
          <div className="stagger-item lg:col-span-6 bg-[#FFFFFF] dark:bg-[#0B1B3F] rounded-[24px] p-6 md:p-8 border border-[#DDE2F0] dark:border-[#DDE2F0]/15 shadow-[0_1px_2px_rgba(11,27,63,0.06)] flex flex-col justify-between transition-colors duration-300">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E6ECFD] dark:bg-[#2F5BEA]/25 text-[#2F5BEA] dark:text-[#FFFFFF] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.04em] text-[#4A5578] dark:text-[#B8C2DD]">
                    {content.contact.labels.address}
                  </span>
                  <p className="mt-1 text-base font-semibold text-[#0B1B3F] dark:text-[#FFFFFF]">
                    {content.contact.address}
                  </p>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E6ECFD] dark:bg-[#2F5BEA]/25 text-[#2F5BEA] dark:text-[#FFFFFF] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.04em] text-[#4A5578] dark:text-[#B8C2DD]">
                    {content.contact.labels.phone}
                  </span>
                  <div className="mt-1">
                    <a
                      href={content.contact.phoneTelHref}
                      className="inline-flex items-center min-h-[44px] text-base font-semibold text-[#0B1B3F] dark:text-[#FFFFFF] hover:text-[#2F5BEA] dark:hover:text-[#93B4FF] transition-colors tabular-nums"
                    >
                      {content.contact.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E6ECFD] dark:bg-[#2F5BEA]/25 text-[#2F5BEA] dark:text-[#FFFFFF] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.04em] text-[#4A5578] dark:text-[#B8C2DD]">
                    {content.contact.labels.email}
                  </span>
                  <div className="mt-1">
                    <a
                      href={content.contact.emailHref}
                      className="inline-flex items-center min-h-[44px] text-base font-semibold text-[#0B1B3F] dark:text-[#FFFFFF] hover:text-[#2F5BEA] dark:hover:text-[#93B4FF] transition-colors"
                    >
                      {content.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours Placeholder */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E6ECFD] dark:bg-[#2F5BEA]/25 text-[#2F5BEA] dark:text-[#FFFFFF] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.04em] text-[#4A5578] dark:text-[#B8C2DD]">
                    {content.contact.labels.hours}
                  </span>
                  <p className="mt-1 text-sm font-medium text-[#4A5578] dark:text-[#B8C2DD]">
                    {content.contact.openingHoursPlaceholder}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#DDE2F0] dark:border-[#DDE2F0]/15 flex flex-wrap items-center gap-4">
              <Button
                href={whatsappHref}
                external
                variant="primary"
                withArrowCircle
              >
                {content.contactSection.primaryCtaLabel}
              </Button>

              <a
                href={content.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#2F5BEA] dark:border-[#93B4FF] text-[#2F5BEA] dark:text-[#FFFFFF] hover:bg-[#E6ECFD] dark:hover:bg-[#2F5BEA]/30 hover:scale-[1.02] transition-all duration-150 ease-out px-6 py-3.5 min-h-[44px] text-sm font-semibold whitespace-nowrap shrink-0"
              >
                <Navigation className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                <span>{content.contactSection.secondaryCtaLabel}</span>
              </a>
            </div>
          </div>

          {/* Right Card: Embedded Google Maps Iframe loaded via IntersectionObserver */}
          <div
            ref={mapContainerRef}
            className="stagger-item lg:col-span-6 min-h-[340px] lg:min-h-full rounded-[24px] overflow-hidden border border-[#DDE2F0] dark:border-[#DDE2F0]/15 shadow-[0_1px_2px_rgba(11,27,63,0.06)] bg-[#FFFFFF] dark:bg-[#0B1B3F] flex items-center justify-center"
          >
            {mapInView ? (
              <iframe
                title={content.contact.labels.mapIframeTitle}
                src={content.contact.googleMapsEmbedUrl}
                className="w-full h-full min-h-[340px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center text-[#4A5578] dark:text-[#B8C2DD]">
                <MapPin className="w-8 h-8 stroke-[1.5] text-[#2F5BEA] dark:text-[#93B4FF] mb-2" aria-hidden="true" />
                <span className="text-sm font-medium text-[#0B1B3F] dark:text-[#FFFFFF]">
                  {content.contact.labels.loadingMap}
                </span>
                <span className="text-xs mt-1">{content.contact.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
