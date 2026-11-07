import React from 'react';
import { CarFront } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './SectionHeading';

export const About: React.FC = () => {
  const { content } = useLanguage();
  const { workshopImageSlot } = content.about;

  return (
    <section
      id="tentang"
      aria-labelledby="tentang-heading"
      className="py-16 md:py-24 bg-[#F4F6FB] dark:bg-[#060E24] transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Story & Three Highlight Stats */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <SectionHeading
                id="tentang-heading"
                pill={content.about.pill}
                title={content.about.heading}
                align="left"
              />

              <p className="mt-4 text-base leading-6 text-[#0B1B3F] dark:text-[#FFFFFF] font-normal">
                {content.about.description}
              </p>

              <p className="mt-4 text-sm leading-6 text-[#4A5578] dark:text-[#B8C2DD]">
                {content.about.secondaryNote}
              </p>
            </div>

            {/* Three Highlight Stats in Cards (1999, 2022, 4) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {content.about.stats.map((stat) => (
                <div
                  key={stat.value}
                  className="stagger-item bg-[#FFFFFF] dark:bg-[#0B1B3F] rounded-[24px] p-6 border border-[#DDE2F0] dark:border-[#DDE2F0]/15 shadow-[0_1px_2px_rgba(11,27,63,0.06)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-[#0B1B3F] dark:text-[#FFFFFF] tabular-nums">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm leading-5 text-[#4A5578] dark:text-[#B8C2DD]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clearly Marked Workshop / Team Photo Placeholder Slot */}
          <div className="lg:col-span-5 flex">
            <div className="stagger-item w-full min-h-[320px] lg:min-h-full rounded-[24px] overflow-hidden border border-[#DDE2F0] dark:border-[#DDE2F0]/20 shadow-[0_1px_2px_rgba(11,27,63,0.06)] bg-gradient-to-br from-[#0B1B3F] via-[#0F2452] to-[#060E24] relative flex flex-col justify-between p-8">
              {/* WORKSHOP PHOTO SLOT: Set `siteContent.about.workshopImageSlot.imageUrl` in `src/data/content.ts` to replace this placeholder with a real workshop photo */}
              {workshopImageSlot.imageUrl ? (
                <img
                  src={workshopImageSlot.imageUrl}
                  alt={workshopImageSlot.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-[#2F5BEA]/30 border border-[#FFFFFF]/20 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.04em] text-[#FFFFFF]">
                      {workshopImageSlot.caption}
                    </span>
                    <span className="text-xs text-[#B8C2DD]">
                      Cilandak, Jakarta Selatan
                    </span>
                  </div>

                  <div
                    role="img"
                    aria-label={workshopImageSlot.alt}
                    className="my-auto py-8 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#2F5BEA]/25 border border-[#FFFFFF]/20 flex items-center justify-center text-[#FFFFFF] mb-4">
                      <CarFront className="w-8 h-8 stroke-[1.5]" aria-hidden="true" />
                    </div>
                    <p className="text-base font-semibold text-[#FFFFFF]">
                      {workshopImageSlot.caption}
                    </p>
                    <p className="mt-1 text-xs text-[#B8C2DD] max-w-xs">
                      {workshopImageSlot.subcaption}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#FFFFFF]/15 flex items-center justify-between text-xs text-[#B8C2DD]">
                    <span>
                      {content.about.ledByLabel} {content.business.ownerName}
                    </span>
                    <span className="tabular-nums">
                      {content.about.sinceLabel} {content.business.ownerExperienceSince}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
