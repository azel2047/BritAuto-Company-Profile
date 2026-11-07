import React from 'react';
import { ArrowDownRight, ShieldCheck, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FloatingCardsGroup: React.FC = () => {
  const { content } = useLanguage();
  const { left, center, right } = content.hero.floatingCards;

  return (
    <div className="relative mt-12 md:mt-16">
      {/* Ambient secondary blue glow underneath the cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 -bottom-4 h-36 rounded-full mx-auto max-w-3xl"
        style={{
          boxShadow: '0 0 60px 20px rgba(47, 91, 234, 0.35)',
          background: 'radial-gradient(circle, rgba(47,91,234,0.35) 0%, rgba(47,91,234,0) 70%)',
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-end">
        {/* Card B (Center on Desktop, First on Mobile): Tall White Specialist Card */}
        <article
          className="order-1 lg:order-2 lg:col-span-5 bg-[#FFFFFF] text-[#0B1B3F] rounded-[24px] p-6 border border-[#DDE2F0] animate-float-center"
          style={{ boxShadow: '0 0 40px rgba(47, 91, 234, 0.35)' }}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-[0.04em] text-[#D32F3F]">
              {center.label}
            </span>
          </div>

          <p className="text-sm font-medium text-[#4A5578] mb-4">
            {center.brandsLine}
          </p>

          {/* Neutral Workshop / Engine Bay Placeholder with Reeded-Glass Stripe Overlay */}
          <div className="relative h-44 sm:h-48 w-full rounded-[8px] overflow-hidden bg-gradient-to-br from-[#0B1B3F] via-[#132A5E] to-[#060E24] border border-[#DDE2F0]">
            {center.imageSlot.imageUrl ? (
              <img
                src={center.imageSlot.imageUrl}
                alt={center.imageSlot.alt}
                loading="lazy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                role="img"
                aria-label={center.imageSlot.alt}
                className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none"
              >
                <div className="w-12 h-12 rounded-full bg-[#2F5BEA]/25 border border-[#FFFFFF]/20 flex items-center justify-center text-[#B8C2DD] mb-2">
                  <Wrench className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
                </div>
                <span className="text-xs font-medium tracking-[0.04em] uppercase text-[#FFFFFF]">
                  {center.imageSlot.caption}
                </span>
                <span className="text-xs text-[#B8C2DD] mt-1">
                  {center.imageSlot.subcaption}
                </span>
              </div>
            )}
            {/* Vertical Reeded-Glass Overlay */}
            <div
              aria-hidden="true"
              className="reeded-glass-overlay pointer-events-none absolute inset-0"
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E6ECFD] text-[#2F5BEA] px-3 py-1 text-xs font-medium uppercase tracking-[0.04em]">
              <ShieldCheck className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
              {center.chip}
            </span>
          </div>
        </article>

        {/* Card A (Left on Desktop, Second on Mobile): White Experience Card */}
        <article
          className="order-2 lg:order-1 lg:col-span-3 bg-[#FFFFFF] text-[#0B1B3F] rounded-[24px] p-6 border border-[#DDE2F0] animate-float-slow"
          style={{ boxShadow: '0 0 40px rgba(47, 91, 234, 0.25)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center rounded-full bg-[#E6ECFD] text-[#2F5BEA] px-3 py-1 text-xs font-medium uppercase tracking-[0.04em]">
              {left.chip}
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1B3F] tabular-nums">
            {left.number}
          </div>
          <p className="mt-2 text-sm leading-5 text-[#4A5578]">
            {left.label}
          </p>
        </article>

        {/* Card C (Right on Desktop, Third on Mobile): Glassmorphic Transparency Card */}
        <article
          className="order-3 lg:col-span-4 rounded-[24px] p-6 text-[#FFFFFF] animate-float-right"
          style={{
            backgroundColor: 'rgba(47, 91, 234, 0.35)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 0 40px rgba(47, 91, 234, 0.35)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center rounded-full bg-[#FFFFFF]/15 text-[#FFFFFF] px-3 py-1 text-xs font-medium uppercase tracking-[0.04em]">
              {right.chip}
            </span>
          </div>

          <h2 className="text-xl font-semibold leading-7 text-[#FFFFFF]">
            {right.title}
          </h2>
          <p className="mt-2 text-sm leading-5 text-[#B8C2DD]">
            {right.detail}
          </p>

          <div className="mt-5 flex justify-end">
            <a
              href={right.targetHref}
              aria-label={right.arrowAriaLabel}
              className="inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#FFFFFF]/15 hover:bg-[#FFFFFF]/25 border border-[#FFFFFF]/30 text-[#FFFFFF] transition-colors"
            >
              <ArrowDownRight className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};
