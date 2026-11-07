import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { buildWhatsAppLink } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './SectionHeading';

export const Brands: React.FC = () => {
  const { language, content } = useLanguage();

  return (
    <section
      id="merek"
      aria-labelledby="merek-heading"
      className="py-16 md:py-24 bg-[#F4F6FB] dark:bg-[#060E24] transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading
          id="merek-heading"
          pill={content.brands.pill}
          title={content.brands.heading}
          subtitle={content.brands.subtitle}
          align="center"
        />

        {/* 4 Cards in a Row on Desktop, 2x2 on Mobile/Tablet */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {content.brands.items.map((brand, index) => {
            const waLink = buildWhatsAppLink(
              language === 'en'
                ? `Hello Brit Auto, I would like to consult regarding maintenance or repair for my ${brand.name}.`
                : `Halo Brit Auto, saya ingin konsultasi perawatan atau perbaikan untuk mobil ${brand.name} saya.`,
              language
            );

            return (
              <article
                key={brand.id}
                className="stagger-item group bg-[#FFFFFF] dark:bg-[#0B1B3F] rounded-[24px] p-6 border border-[#DDE2F0] dark:border-[#DDE2F0]/15 shadow-[0_1px_2px_rgba(11,27,63,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(11,27,63,0.08)] hover:border-[#2F5BEA]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.04em] text-[#4A5578] dark:text-[#B8C2DD] tabular-nums">
                    0{index + 1}
                  </span>

                  {/* Text-only Brand Name (Strictly no official brand logos) */}
                  <h3 className="mt-2 heading-h3 text-[#0B1B3F] dark:text-[#FFFFFF]">
                    {brand.name}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-[#0B1B3F] dark:text-[#FFFFFF]">
                    {brand.tagline}
                  </p>

                  <p className="mt-2 text-sm leading-5 text-[#4A5578] dark:text-[#B8C2DD]">
                    {brand.specialtyNote}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DDE2F0] dark:border-[#DDE2F0]/15 flex items-center justify-between gap-2">
                  <span className="text-xs text-[#4A5578] dark:text-[#B8C2DD] truncate">
                    {brand.models}
                  </span>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      language === 'en'
                        ? `Consult ${brand.name} service via WhatsApp`
                        : `Konsultasi servis ${brand.name} via WhatsApp`
                    }
                    className="inline-flex items-center justify-center w-9 h-9 min-w-[44px] min-h-[44px] rounded-full text-[#2F5BEA] dark:text-[#FFFFFF] hover:bg-[#E6ECFD] dark:hover:bg-[#2F5BEA]/30 transition-colors shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
