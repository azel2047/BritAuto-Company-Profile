/**
 * Smoothly scrolls the window to a target element ID or hash selector
 * using GSAP (ScrollToPlugin) with a 0.6s (600ms) duration and power3.out
 * (cubic bezier ease-out) timing function.
 * Respects the user's `prefers-reduced-motion: reduce` setting.
 */

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const SCROLL_DURATION_SECONDS = 0.6;
const NAVBAR_OFFSET_PX = 80;

export function smoothScrollToHash(hash: string): boolean {
  if (!hash || !hash.startsWith('#') || hash === '#') {
    return false;
  }

  const targetId = hash.slice(1);
  const targetElement = document.getElementById(targetId);
  if (!targetElement) {
    return false;
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const startY = window.scrollY || window.pageYOffset;
  const elementRect = targetElement.getBoundingClientRect();
  const rawTargetY =
    elementRect.top + startY - (targetId === 'beranda' ? 0 : NAVBAR_OFFSET_PX);
  const maxScrollY = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const targetY = Math.min(Math.max(0, rawTargetY), maxScrollY);

  if (prefersReducedMotion || Math.abs(targetY - startY) < 1) {
    gsap.killTweensOf(window);
    window.scrollTo(0, targetY);
    window.history.pushState(null, '', hash);
    return true;
  }

  gsap.to(window, {
    duration: SCROLL_DURATION_SECONDS,
    scrollTo: {
      y: targetY,
      autoKill: true,
    },
    ease: 'power3.out',
    overwrite: 'auto',
    onComplete: () => {
      window.history.pushState(null, '', hash);
    },
  });

  return true;
}
