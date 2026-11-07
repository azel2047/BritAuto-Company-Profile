import React from 'react';
import { Quote, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './SectionHeading';

export const Testimonials: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section
      id="testimoni"
      aria-labelledby="testimoni-heading"
      className="py-16 md:py-24 bg-[#F4F6FB] dark:bg-[#060E24] transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading
          id="testimoni-heading"
          pill={content.testimonials.pill}
          title={content.testimonials.heading}
          subtitle={content.testimonials.subtitle}
          align="center"
        />

        {/* Responsive 3-column grid on desktop, 2-column on tablet, 1-column on mobile */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.testimonials.items.map((item) => (
            <article
              key={item.id}
              className="stagger-item bg-[#FFFFFF] dark:bg-[#0B1B3F] rounded-[24px] p-6 border border-[#DDE2F0] dark:border-[#DDE2F0]/15 shadow-[0_1px_2px_rgba(11,27,63,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(11,27,63,0.08)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  {/* 48px Circle Icon */}
                  <div className="w-12 h-12 rounded-full bg-[#E6ECFD] dark:bg-[#2F5BEA]/25 text-[#2F5BEA] dark:text-[#FFFFFF] flex items-center justify-center shrink-0">
                    <Quote className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
                  </div>

                  {/* Clean unboxed metadata for vehicle marque and service category */}
                  <div className="text-right text-xs font-medium text-[#4A5578] dark:text-[#B8C2DD]">
                    <span className="font-semibold text-[#0B1B3F] dark:text-[#FFFFFF]">
                      {item.marque}
                    </span>
                    <span aria-hidden="true" className="mx-1.5">
                      ·
                    </span>
                    <span>{item.serviceCategory}</span>
                  </div>
                </div>

                <blockquote className="text-sm sm:text-base leading-6 text-[#0B1B3F] dark:text-[#FFFFFF] font-normal">
                  “{item.quote}”
                </blockquote>
              </div>

              {/* Privacy-Safe Attribution Footer (No personal names, faces, or license plates) */}
              <div className="mt-6 pt-4 border-t border-[#DDE2F0] dark:border-[#DDE2F0]/15 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-[#0B1B3F] dark:text-[#FFFFFF]">
                    {item.ownerTitle}
                  </div>
                  <div className="text-xs text-[#4A5578] dark:text-[#B8C2DD] mt-0.5">
                    {item.location}
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F4F6FB] dark:bg-[#060E24] text-[#2F5BEA] dark:text-[#93B4FF] shrink-0"
                >
                  <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[#4A5578] dark:text-[#B8C2DD]">
          {content.testimonials.privacyNote}
        </p>
      </div>
    </section>
  );
};
