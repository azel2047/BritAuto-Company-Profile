import React, { useState, useEffect, useCallback } from 'react';
import {
  Cpu,
  Wrench,
  Gauge,
  Cog,
  Zap,
  CarFront,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { GalleryItem } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './SectionHeading';

const galleryIconMap: Record<
  GalleryItem['iconName'],
  React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
> = {
  Cpu,
  Wrench,
  Gauge,
  Cog,
  Zap,
  CarFront,
};

export const Gallery: React.FC = () => {
  const { content } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const items = content.gallery.items;
  const activeItem = selectedIndex !== null ? items[selectedIndex] : null;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + items.length) % items.length
    );
  }, [items.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % items.length
    );
  }, [items.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  return (
    <section
      id="galeri"
      aria-labelledby="galeri-heading"
      className="py-16 md:py-24 bg-[#F4F6FB] dark:bg-[#060E24] transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading
          id="galeri-heading"
          pill={content.gallery.pill}
          title={content.gallery.heading}
          subtitle={content.gallery.subtitle}
          align="center"
        />

        {/* Responsive 3-column desktop, 2-column tablet, 1-column mobile gallery grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, idx) => {
            const IconComponent = galleryIconMap[item.iconName] || Wrench;

            return (
              <article
                key={item.id}
                className="stagger-item group bg-[#FFFFFF] dark:bg-[#0B1B3F] rounded-[24px] p-5 border border-[#DDE2F0] dark:border-[#DDE2F0]/15 shadow-[0_1px_2px_rgba(11,27,63,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(11,27,63,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Neutral Luxury Workshop Placeholder Slot or Real Image */}
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    aria-label={`${content.gallery.viewDetailLabel}: ${item.title}`}
                    className="relative w-full h-48 rounded-[12px] overflow-hidden bg-gradient-to-br from-[#0B1B3F] via-[#102659] to-[#060E24] border border-[#DDE2F0]/30 dark:border-[#FFFFFF]/15 flex flex-col items-center justify-center p-4 text-center cursor-pointer group/img focus-visible:outline-2 focus-visible:outline-[#2F5BEA]"
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover/img:scale-[1.03] transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div
                        role="img"
                        aria-label={item.alt}
                        className="w-full h-full flex flex-col items-center justify-center select-none relative z-10"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#2F5BEA]/25 border border-[#FFFFFF]/20 flex items-center justify-center text-[#FFFFFF] mb-2.5 group-hover/img:scale-105 transition-transform">
                          <IconComponent
                            className="w-6 h-6 stroke-[1.5]"
                            aria-hidden={true}
                          />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.04em] text-[#FFFFFF]">
                          {content.gallery.placeholderBadge}
                        </span>
                        <span className="text-[11px] text-[#B8C2DD] mt-1 max-w-[240px] line-clamp-1">
                          {item.technicalNote}
                        </span>
                      </div>
                    )}

                    {/* Reeded Glass Subtle Overlay */}
                    <div
                      aria-hidden="true"
                      className="reeded-glass-overlay pointer-events-none absolute inset-0 opacity-60"
                    />

                    {/* Expand Affordance */}
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#060E24]/70 border border-[#FFFFFF]/20 text-[#FFFFFF] group-hover/img:bg-[#2F5BEA] transition-colors z-20"
                    >
                      <Maximize2 className="w-4 h-4 stroke-[1.5]" />
                    </span>
                  </button>

                  {/* Unboxed Metadata Line */}
                  <div className="mt-4 flex items-center justify-between text-xs text-[#4A5578] dark:text-[#B8C2DD]">
                    <span className="font-semibold text-[#2F5BEA] dark:text-[#B8C2DD]">
                      {item.marque}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.category}</span>
                  </div>

                  <h3 className="mt-1.5 text-lg font-semibold leading-6 text-[#0B1B3F] dark:text-[#FFFFFF]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-[#4A5578] dark:text-[#B8C2DD]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DDE2F0] dark:border-[#DDE2F0]/15 flex items-center justify-between">
                  <span className="text-xs text-[#4A5578] dark:text-[#B8C2DD] tabular-nums">
                    0{idx + 1} / 0{items.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-xs font-semibold text-[#2F5BEA] dark:text-[#FFFFFF] hover:underline cursor-pointer"
                  >
                    <span>{content.gallery.viewDetailLabel}</span>
                    <Maximize2 className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Preview Modal */}
      {activeItem && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060E24]/85 backdrop-blur-md"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-2xl bg-[#FFFFFF] dark:bg-[#0B1B3F] text-[#0B1B3F] dark:text-[#FFFFFF] rounded-[24px] border border-[#DDE2F0] dark:border-[#FFFFFF]/20 shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Controls */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#DDE2F0] dark:border-[#DDE2F0]/15">
              <div className="flex items-center gap-2 text-xs font-medium text-[#4A5578] dark:text-[#B8C2DD]">
                <span className="font-semibold text-[#2F5BEA] dark:text-[#FFFFFF]">
                  {activeItem.marque}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeItem.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  0{selectedIndex + 1} / 0{items.length}
                </span>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label={content.gallery.closeModalAria}
                className="inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full text-[#4A5578] dark:text-[#B8C2DD] hover:bg-[#F4F6FB] dark:hover:bg-[#060E24] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
              </button>
            </div>

            {/* Large Visual Preview Area */}
            <div className="relative mt-5 h-64 sm:h-80 w-full rounded-[12px] overflow-hidden bg-gradient-to-br from-[#0B1B3F] via-[#132A5E] to-[#060E24] border border-[#DDE2F0] dark:border-[#FFFFFF]/15 flex flex-col items-center justify-center p-6 text-center">
              {activeItem.imageUrl ? (
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  role="img"
                  aria-label={activeItem.alt}
                  className="flex flex-col items-center justify-center z-10"
                >
                  {(() => {
                    const ActiveIcon =
                      galleryIconMap[activeItem.iconName] || Wrench;
                    return (
                      <div className="w-16 h-16 rounded-full bg-[#2F5BEA]/30 border border-[#FFFFFF]/25 flex items-center justify-center text-[#FFFFFF] mb-3">
                        <ActiveIcon
                          className="w-8 h-8 stroke-[1.5]"
                          aria-hidden={true}
                        />
                      </div>
                    );
                  })()}
                  <span className="text-sm font-semibold uppercase tracking-[0.04em] text-[#FFFFFF]">
                    {content.gallery.placeholderBadge}
                  </span>
                  <span className="text-xs text-[#B8C2DD] mt-1.5 max-w-md">
                    {activeItem.technicalNote}
                  </span>
                </div>
              )}
              <div
                aria-hidden="true"
                className="reeded-glass-overlay pointer-events-none absolute inset-0 opacity-50"
              />
            </div>

            {/* Caption & Description */}
            <div className="mt-5">
              <h3
                id="gallery-lightbox-title"
                className="heading-h3 text-[#0B1B3F] dark:text-[#FFFFFF]"
              >
                {activeItem.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-6 text-[#4A5578] dark:text-[#B8C2DD]">
                {activeItem.description}
              </p>
            </div>

            {/* Prev / Next Navigation Footer */}
            <div className="mt-6 pt-4 border-t border-[#DDE2F0] dark:border-[#DDE2F0]/15 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label={content.gallery.prevImageAria}
                className="inline-flex items-center gap-2 rounded-full bg-[#F4F6FB] dark:bg-[#060E24] hover:bg-[#E6ECFD] dark:hover:bg-[#2F5BEA] text-[#0B1B3F] dark:text-[#FFFFFF] px-4 py-2.5 min-h-[44px] text-xs font-semibold transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                <span>{content.gallery.prevImageAria}</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label={content.gallery.nextImageAria}
                className="inline-flex items-center gap-2 rounded-full bg-[#F4F6FB] dark:bg-[#060E24] hover:bg-[#E6ECFD] dark:hover:bg-[#2F5BEA] text-[#0B1B3F] dark:text-[#FFFFFF] px-4 py-2.5 min-h-[44px] text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>{content.gallery.nextImageAria}</span>
                <ChevronRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
