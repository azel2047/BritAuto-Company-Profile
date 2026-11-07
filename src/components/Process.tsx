import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './SectionHeading';

export const Process: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section
      id="cara-kerja"
      aria-labelledby="cara-kerja-heading"
      className="py-16 md:py-24 bg-[#F4F6FB] dark:bg-[#060E24] transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading
          id="cara-kerja-heading"
          pill={content.process.pill}
          title={content.process.heading}
          subtitle={content.process.subtitle}
          align="center"
        />

        {/* 4-Step Horizontal Timeline on Desktop, Vertical Stack on Mobile */}
        <div className="relative mt-10">
          {/* Horizontal connecting line on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-12 left-12 right-12 h-[1px] bg-[#DDE2F0] dark:bg-[#DDE2F0]/15"
          />

          <ol className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.process.steps.map((step, index) => {
              const isApprovalStep = index === 2;

              return (
                <li
                  key={step.stepNumber}
                  className="stagger-item bg-[#FFFFFF] dark:bg-[#0B1B3F] rounded-[24px] p-6 border border-[#DDE2F0] dark:border-[#DDE2F0]/15 shadow-[0_1px_2px_rgba(11,27,63,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-base font-bold tabular-nums ${
                          isApprovalStep
                            ? 'bg-[#D32F3F] text-[#FFFFFF]'
                            : 'bg-[#0B1B3F] dark:bg-[#2F5BEA] text-[#FFFFFF]'
                        }`}
                      >
                        {step.stepNumber}
                      </span>

                      <span className="text-xs font-medium uppercase tracking-[0.04em] text-[#4A5578] dark:text-[#B8C2DD] tabular-nums">
                        {content.process.stepPrefix} 0{step.stepNumber}
                      </span>
                    </div>

                    <h3 className="heading-h3 text-[#0B1B3F] dark:text-[#FFFFFF]">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-5 text-[#4A5578] dark:text-[#B8C2DD]">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
