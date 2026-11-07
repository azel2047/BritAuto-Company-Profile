import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { content } = useLanguage();

  return (
    <footer className="bg-[#0B1B3F] text-[#FFFFFF] border-t border-[#FFFFFF]/10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#FFFFFF]/10">
          {/* Column 1: Wordmark & Tagline */}
          <div className="lg:col-span-5">
            <a
              href="#beranda"
              className="inline-flex items-center min-h-[44px] text-2xl font-bold tracking-tight text-[#FFFFFF]"
            >
              {content.business.logoImageUrl ? (
                <img
                  src={content.business.logoImageUrl}
                  alt={content.business.name}
                  loading="lazy"
                  className="h-9 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{content.business.name}</span>
              )}
            </a>
            <p className="mt-3 text-sm leading-6 text-[#B8C2DD] max-w-sm">
              {content.business.tagline}
            </p>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.04em] text-[#FFFFFF] mb-4">
              {content.footer.quickLinksHeading}
            </h3>
            <ul className="space-y-1">
              {content.navbar.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] text-sm text-[#B8C2DD] hover:text-[#FFFFFF] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Address, Phone & Email */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.04em] text-[#FFFFFF] mb-4">
              {content.footer.contactHeading}
            </h3>
            <address className="not-italic space-y-2 text-sm text-[#B8C2DD]">
              <p className="leading-6">{content.contact.address}</p>
              <p>
                <a
                  href={content.contact.phoneTelHref}
                  className="inline-flex items-center min-h-[44px] hover:text-[#FFFFFF] transition-colors tabular-nums"
                >
                  {content.footer.phonePrefix} {content.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={content.contact.emailHref}
                  className="inline-flex items-center min-h-[44px] hover:text-[#FFFFFF] transition-colors"
                >
                  {content.footer.emailPrefix} {content.contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8C2DD]">
          <p>{content.footer.copyright}</p>
          <p>Jaguar · Land Rover · Bentley · Rolls-Royce</p>
        </div>
      </div>
    </footer>
  );
};
