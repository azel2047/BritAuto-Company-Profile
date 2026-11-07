import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './SectionHeading';

export const FAQ: React.FC = () => {
  const { language, content } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(
    content.faq.items[0]?.id ?? null
  );

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const whatsappHref = buildWhatsAppLink(undefined, language);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 md:py-24 bg-[#F4F6FB] dark:bg-[#060E24] transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading
          id="faq-heading"
          pill={content.faq.pill}
          title={content.faq.heading}
          subtitle={content.faq.subtitle}
          align="center"
        />

        <div className="mt-8 max-w-3xl mx-auto space-y-4">
          {content.faq.items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <article
                key={item.id}
                className="stagger-item bg-[#FFFFFF] dark:bg-[#0B1B3F] rounded-[24px] border border-[#DDE2F0] dark:border-[#DDE2F0]/15 shadow-[0_1px_2px_rgba(11,27,63,0.06)] transition-all duration-300"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 min-h-[44px] cursor-pointer rounded-[24px] focus-visible:outline-2 focus-visible:outline-[#2F5BEA] focus-visible:outline-offset-2"
                  >
                    <div>
                      <span className="text-xs font-medium uppercase tracking-[0.04em] text-[#2F5BEA] dark:text-[#93B4FF]">
                        {item.category}
                      </span>
                      <div className="mt-1 text-base sm:text-lg font-semibold text-[#0B1B3F] dark:text-[#FFFFFF]">
                        {item.question}
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-[#2F5BEA] text-[#FFFFFF] rotate-180'
                          : 'bg-[#E6ECFD] dark:bg-[#2F5BEA]/25 text-[#2F5BEA] dark:text-[#FFFFFF]'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5 stroke-[1.75]" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-6 pt-1 border-t border-[#DDE2F0]/60 dark:border-[#DDE2F0]/15"
                  >
                    <p className="text-sm sm:text-base leading-6 text-[#4A5578] dark:text-[#B8C2DD]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Helpful Direct WhatsApp Prompt Below FAQs */}
        <div className="stagger-item mt-8 max-w-3xl mx-auto bg-[#FFFFFF] dark:bg-[#0B1B3F] rounded-[24px] p-6 border border-[#DDE2F0] dark:border-[#DDE2F0]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-[#0B1B3F] dark:text-[#FFFFFF] text-center sm:text-left">
            {content.faq.ctaPrompt}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#2F5BEA] dark:border-[#93B4FF] text-[#2F5BEA] dark:text-[#FFFFFF] hover:bg-[#E6ECFD] dark:hover:bg-[#2F5BEA]/30 px-5 py-2.5 min-h-[44px] text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
          >
            <MessageCircle className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
            <span>{content.faq.ctaButtonLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
