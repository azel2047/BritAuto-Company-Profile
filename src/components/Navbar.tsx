import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { buildWhatsAppLink } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { language, setLanguage, content } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const desktopNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateScrollState = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      setIsScrolled(currentScrollY > 48);

      const totalScrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollableHeight > 0) {
        const progress = Math.min(
          1,
          Math.max(0, currentScrollY / totalScrollableHeight)
        );
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  useEffect(() => {
    const navEl = desktopNavRef.current;
    if (!navEl || typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const links = Array.from(
      navEl.querySelectorAll<HTMLAnchorElement>('a.nav-magnetic-link')
    );

    if (links.length === 0) return;

    const cleanups: Array<() => void> = [];

    const setupMagneticLinks = () => {
      // Clear any previous listeners/transforms first
      while (cleanups.length > 0) {
        const fn = cleanups.pop();
        fn?.();
      }

      if (motionQuery.matches) {
        gsap.set(links, { clearProps: 'transform' });
        return;
      }

      links.forEach((link) => {
        const xTo = gsap.quickTo(link, 'x', {
          duration: 0.3,
          ease: 'power3.out',
        });
        const yTo = gsap.quickTo(link, 'y', {
          duration: 0.3,
          ease: 'power3.out',
        });

        const handleMouseMove = (event: MouseEvent) => {
          if (motionQuery.matches) return;
          const rect = link.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // Subtle magnetic pull clamped so links never collide
          const deltaX = gsap.utils.clamp(-6, 6, (event.clientX - centerX) * 0.24);
          const deltaY = gsap.utils.clamp(-4, 4, (event.clientY - centerY) * 0.28);

          xTo(deltaX);
          yTo(deltaY);
        };

        const handleMouseLeave = () => {
          if (motionQuery.matches) {
            gsap.set(link, { clearProps: 'transform' });
            return;
          }
          xTo(0);
          yTo(0);
        };

        link.addEventListener('mousemove', handleMouseMove);
        link.addEventListener('mouseleave', handleMouseLeave);
        link.addEventListener('blur', handleMouseLeave);

        cleanups.push(() => {
          link.removeEventListener('mousemove', handleMouseMove);
          link.removeEventListener('mouseleave', handleMouseLeave);
          link.removeEventListener('blur', handleMouseLeave);
          gsap.killTweensOf(link);
          gsap.set(link, { clearProps: 'transform' });
        });
      });
    };

    setupMagneticLinks();

    const handleMotionPreferenceChange = () => {
      setupMagneticLinks();
    };

    motionQuery.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionPreferenceChange);
      while (cleanups.length > 0) {
        const fn = cleanups.pop();
        fn?.();
      }
    };
  }, [language, content.navbar.links]);

  const whatsappHref = buildWhatsAppLink(undefined, language);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#0B1B3F]/95 backdrop-blur-md border-b border-[#FFFFFF]/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      {/* Slim Top Scroll Progress Bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent overflow-hidden"
      >
        <div
          className="h-full w-full bg-[#D32F3F] origin-left transition-transform duration-75 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (with clearly marked slot for real logo image) */}
        <a
          href="#beranda"
          className="inline-flex items-center min-h-[44px] text-xl font-bold tracking-tight text-[#FFFFFF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#2F5BEA] rounded-lg"
          aria-label="Brit Auto - Beranda"
        >
          {/* LOGO SLOT: Set `siteContent.business.logoImageUrl` in `src/data/content.ts` to replace this wordmark with an image */}
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

        {/* Zone 2: Center Navigation Links (Desktop) */}
        <nav
          ref={desktopNavRef}
          aria-label="Navigasi Utama"
          className="hidden lg:flex items-center gap-5"
        >
          {content.navbar.links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-magnetic-link inline-flex items-center min-h-[44px] px-1 text-sm font-medium text-[#B8C2DD] hover:text-[#FFFFFF] transition-colors whitespace-nowrap shrink-0 relative after:content-[''] after:absolute after:bottom-2 after:left-1 after:right-1 after:w-0 after:h-[2px] after:bg-[#2F5BEA] hover:after:w-[calc(100%-0.5rem)] after:transition-all will-change-transform"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language Toggle, Dark Mode Toggle, Primary Action (Desktop), & Mobile Hamburger Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Toggle Pill (ID / EN) */}
          <div
            role="group"
            aria-label={content.navbar.languageToggleAria}
            className="inline-flex items-center rounded-full bg-[#FFFFFF]/10 border border-[#FFFFFF]/20 p-1 min-h-[44px]"
          >
            <button
              type="button"
              onClick={() => setLanguage('id')}
              aria-pressed={language === 'id'}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer min-h-[34px] ${
                language === 'id'
                  ? 'bg-[#2F5BEA] text-[#FFFFFF]'
                  : 'text-[#B8C2DD] hover:text-[#FFFFFF]'
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer min-h-[34px] ${
                language === 'en'
                  ? 'bg-[#2F5BEA] text-[#FFFFFF]'
                  : 'text-[#B8C2DD] hover:text-[#FFFFFF]'
              }`}
            >
              EN
            </button>
          </div>

          {/* Dark / Light Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label={
              theme === 'dark'
                ? content.navbar.themeToggleLightAria
                : content.navbar.themeToggleDarkAria
            }
            title={
              theme === 'dark'
                ? content.navbar.themeToggleLightAria
                : content.navbar.themeToggleDarkAria
            }
            className="inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 border border-[#FFFFFF]/20 text-[#FFFFFF] transition-colors cursor-pointer shrink-0"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
            )}
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#D32F3F] hover:bg-[#B82635] hover:scale-[1.02] transition-all duration-150 ease-out text-[#FFFFFF] text-sm font-semibold px-5 py-2.5 min-h-[44px] whitespace-nowrap shrink-0"
          >
            {content.navbar.ctaLabel}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={
              mobileMenuOpen
                ? content.navbar.closeMenuAria
                : content.navbar.openMenuAria
            }
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full text-[#FFFFFF] hover:bg-[#FFFFFF]/10 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Navigasi Seluler"
          className="lg:hidden bg-[#0B1B3F] border-t border-[#FFFFFF]/10 px-4 pt-3 pb-6 shadow-2xl"
        >
          <ul className="flex flex-col space-y-1">
            {content.navbar.links.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center min-h-[44px] px-4 py-2.5 rounded-lg text-base font-medium text-[#FFFFFF] hover:bg-[#FFFFFF]/10 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-[#FFFFFF]/10">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full rounded-full bg-[#D32F3F] hover:bg-[#B82635] text-[#FFFFFF] text-sm font-semibold px-6 py-3 min-h-[44px]"
            >
              {content.navbar.ctaLabel}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
