import React from 'react';
import {
  Cpu,
  CalendarCheck,
  Wrench,
  Snowflake,
  Zap,
  Gauge,
  Cog,
  PackageCheck,
  ArrowRight,
} from 'lucide-react';
import { buildWhatsAppLink, ServiceItem } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './SectionHeading';

const iconMap: Record<
  ServiceItem['iconName'],
  React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
> = {
  Cpu,
  CalendarCheck,
  Wrench,
  Snowflake,
  Zap,
  Gauge,
  Cog,
  PackageCheck,
};

interface ServicesProps {
  onSelectServiceForDiagnostic?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({
  onSelectServiceForDiagnostic,
}) => {
  const { language, content } = useLanguage();

  return (
    <section
      id="layanan"
      aria-labelledby="layanan-heading"
      className="py-16 md:py-24 bg-[#F4F6FB] dark:bg-[#060E24] transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading
          id="layanan-heading"
          pill={content.services.pill}
          title={content.services.heading}
          subtitle={content.services.subtitle}
          align="left"
        />

        {/* Bento Grid: 4 columns x 2 rows on desktop, 2 columns tablet, 1 column mobile */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.services.items.map((service) => {
            const IconComponent = iconMap[service.iconName] || Wrench;
            const isHighlighted = Boolean(service.highlighted);
            const whatsappHref = buildWhatsAppLink(
              service.whatsappMessage,
              language
            );

            return (
              <article
                key={service.id}
                className={`stagger-item rounded-[24px] p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                  isHighlighted
                    ? 'bg-[#2F5BEA] text-[#FFFFFF] border border-[#2F5BEA] shadow-[0_8px_24px_rgba(47,91,234,0.28)]'
                    : 'bg-[#FFFFFF] dark:bg-[#0B1B3F] text-[#0B1B3F] dark:text-[#FFFFFF] border border-[#DDE2F0] dark:border-[#DDE2F0]/15 shadow-[0_1px_2px_rgba(11,27,63,0.06)] hover:shadow-[0_12px_24px_rgba(11,27,63,0.08)]'
                }`}
              >
                <div>
                  {/* 48px Icon Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${
                      isHighlighted
                        ? 'bg-[#FFFFFF]/20 text-[#FFFFFF]'
                        : 'bg-[#E6ECFD] dark:bg-[#2F5BEA]/25 text-[#2F5BEA] dark:text-[#FFFFFF]'
                    }`}
                  >
                    <IconComponent
                      className="w-6 h-6 stroke-[1.5]"
                      aria-hidden={true}
                    />
                  </div>

                  <h3
                    className={`heading-h3 ${
                      isHighlighted
                        ? 'text-[#FFFFFF]'
                        : 'text-[#0B1B3F] dark:text-[#FFFFFF]'
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm leading-5 ${
                      isHighlighted
                        ? 'text-[#E6ECFD]'
                        : 'text-[#4A5578] dark:text-[#B8C2DD]'
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between gap-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 min-h-[44px] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      isHighlighted
                        ? 'text-[#FFFFFF] hover:text-[#E6ECFD]'
                        : 'text-[#2F5BEA] dark:text-[#FFFFFF] hover:text-[#0B1B3F] dark:hover:text-[#B8C2DD]'
                    }`}
                  >
                    <span>{content.services.linkLabel}</span>
                    <ArrowRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                  </a>

                  {onSelectServiceForDiagnostic && (
                    <button
                      type="button"
                      onClick={() => onSelectServiceForDiagnostic(service.title)}
                      aria-label={`${content.services.symptomTriggerLabel} ${service.title}`}
                      className={`inline-flex items-center justify-center min-h-[44px] px-3 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isHighlighted
                          ? 'bg-[#FFFFFF]/15 hover:bg-[#FFFFFF]/25 text-[#FFFFFF]'
                          : 'bg-[#F4F6FB] dark:bg-[#060E24] hover:bg-[#E6ECFD] dark:hover:bg-[#2F5BEA] text-[#4A5578] dark:text-[#B8C2DD] hover:text-[#2F5BEA] dark:hover:text-[#FFFFFF]'
                      }`}
                    >
                      {content.services.symptomTriggerLabel}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
