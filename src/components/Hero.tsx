import React from 'react';
import { ClipboardList } from 'lucide-react';
import { buildWhatsAppLink } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './Button';
import { FloatingCardsGroup } from './FloatingCard';

interface HeroProps {
  onOpenDiagnostic: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDiagnostic }) => {
  const { language, content } = useLanguage();
  const whatsappHref = buildWhatsAppLink(undefined, language);

  return (
    <section
      id="beranda"
      aria-labelledby="hero-heading"
      className="relative hero-fluted-bg text-[#FFFFFF] pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        {/* Centered Hero Proposition */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="inline-flex items-center rounded-full bg-[#2F5BEA]/25 border border-[#2F5BEA]/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.04em] text-[#FFFFFF] mb-6">
            {content.hero.badge}
          </span>

          <h1 id="hero-heading" className="heading-h1 text-[#FFFFFF]">
            {content.hero.headline}
          </h1>

          <p className="mt-5 text-base sm:text-lg leading-7 text-[#B8C2DD] max-w-2xl">
            {content.hero.subheadline}
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href={whatsappHref}
              external
              variant="primary"
              withArrowCircle
            >
              {content.hero.primaryCta}
            </Button>

            <Button
              href={content.hero.secondaryHref}
              variant="ghost-dark"
            >
              {content.hero.secondaryCta}
            </Button>
          </div>

          {/* Interactive Trouble-Case Consultation Trigger */}
          <div className="mt-4">
            <button
              type="button"
              onClick={onOpenDiagnostic}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full text-xs font-medium text-[#B8C2DD] hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              <ClipboardList className="w-4 h-4 stroke-[1.5] text-[#2F5BEA]" aria-hidden="true" />
              <span className="underline underline-offset-4">
                {content.diagnosticAssistant.triggerLabel}
              </span>
            </button>
          </div>
        </div>

        {/* Three Floating Cards */}
        <FloatingCardsGroup />
      </div>

      {/* Angled (diagonal) transition cut from dark hero into the section below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 md:h-16 bg-[#F4F6FB] dark:bg-[#060E24] transition-colors duration-200"
        style={{
          clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
        }}
      />
    </section>
  );
};
