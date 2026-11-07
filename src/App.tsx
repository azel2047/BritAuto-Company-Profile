/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Brands } from './components/Brands';
import { Services } from './components/Services';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { DiagnosticModal } from './components/DiagnosticModal';
import { SeoHead } from './components/SeoHead';
import { smoothScrollToHash } from './utils/smoothScroll';
import { resolveRouteKeyFromLocation } from './data/seoRoutes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [diagnosticModalOpen, setDiagnosticModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const initialRoute = resolveRouteKeyFromLocation(
      window.location.pathname,
      window.location.hash
    );
    if (initialRoute !== 'beranda') {
      window.requestAnimationFrame(() => {
        smoothScrollToHash(`#${initialRoute}`);
      });
    }
  }, []);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const handled = smoothScrollToHash(href);
        if (handled) {
          event.preventDefault();
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const sections = gsap.utils.toArray<HTMLElement>('.reveal-section');
    if (prefersReducedMotion) {
      sections.forEach((section) => {
        section.classList.add('is-visible');
        gsap.set(section, { clearProps: 'all' });
        const items = section.querySelectorAll<HTMLElement>('.stagger-item');
        if (items.length > 0) {
          gsap.set(items, { clearProps: 'all' });
        }
      });
      return;
    }

    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const staggerItems = section.querySelectorAll<HTMLElement>('.stagger-item');

      gsap.set(section, { opacity: 0, y: 24 });
      if (staggerItems.length > 0) {
        gsap.set(staggerItems, { opacity: 0, y: 20 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 86%',
          toggleActions: 'play none none none',
          onEnter: () => section.classList.add('is-visible'),
        },
      });

      tl.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });

      if (staggerItems.length > 0) {
        tl.to(
          staggerItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.38'
        );
      }

      if (tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleOpenDiagnosticWithService = (serviceTitle?: string) => {
    setSelectedService(serviceTitle);
    setDiagnosticModalOpen(true);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <SeoHead />
        <div className="min-h-screen flex flex-col bg-[#F4F6FB] dark:bg-[#060E24] text-[#0B1B3F] dark:text-[#FFFFFF] transition-colors duration-200 overflow-x-hidden">
          <Navbar />

          <main className="flex-grow">
            <Hero onOpenDiagnostic={() => handleOpenDiagnosticWithService()} />

            <div className="reveal-section">
              <Brands />
            </div>

            <div className="reveal-section">
              <Services
                onSelectServiceForDiagnostic={(serviceTitle) =>
                  handleOpenDiagnosticWithService(serviceTitle)
                }
              />
            </div>

            <div className="reveal-section">
              <About />
            </div>

            <div className="reveal-section">
              <Gallery />
            </div>

            <div className="reveal-section">
              <Process />
            </div>

            <div className="reveal-section">
              <Testimonials />
            </div>

            <div className="reveal-section">
              <FAQ />
            </div>

            <div className="reveal-section">
              <Contact />
            </div>
          </main>

          <Footer />

          <WhatsAppFloat />

          <DiagnosticModal
            isOpen={diagnosticModalOpen}
            onClose={() => setDiagnosticModalOpen(false)}
            initialService={selectedService}
          />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
