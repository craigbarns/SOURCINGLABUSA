'use client';

import { ArrowRight, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

import { trackCtaClick } from '@/lib/analytics';
import { BRIEF_CONTACT_EMAIL, type BriefLocale } from '@/lib/brief-copy';

const COPY: Record<BriefLocale, { cta: string; email: string; subject: string }> = {
  en: {
    cta: 'Send your project brief',
    email: 'Email us',
    subject: 'Custom packaging or textile project',
  },
  es: {
    cta: 'Enviar su proyecto',
    email: 'Escríbanos',
    subject: 'Proyecto de packaging o textil personalizado',
  },
};

const REVEAL_OFFSET_PX = 640;

interface StickyMobileCtaProps {
  locale?: BriefLocale;
}

/**
 * Persistent mobile call to action. On a long single-column page the only
 * conversion point sits far below the fold, so the action follows the reader
 * and steps aside once the brief form is actually on screen.
 */
export function StickyMobileCta({ locale = 'en' }: StickyMobileCtaProps) {
  const copy = COPY[locale];
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPastHero(window.scrollY > REVEAL_OFFSET_PX);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById('contact');

    if (!target || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsFormVisible(entry?.isIntersecting ?? false),
      { rootMargin: '-10% 0px -25% 0px' },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  const isVisible = isScrolledPastHero && !isFormVisible;

  return (
    <>
      {/* Keeps the end of the footer reachable above the floating bar. */}
      <div aria-hidden="true" className="h-20 md:hidden" />

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.09] bg-[#070a09]/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-300 md:hidden ${
          isVisible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            onClick={() => trackCtaClick('sticky_mobile', copy.cta)}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#c7ff6b] px-4 text-sm font-extrabold text-[#0a0d0b] shadow-[0_10px_30px_rgba(199,255,107,0.18)]"
            tabIndex={isVisible ? undefined : -1}
          >
            {copy.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${BRIEF_CONTACT_EMAIL}?subject=${encodeURIComponent(copy.subject)}`}
            onClick={() => trackCtaClick('sticky_mobile', copy.email)}
            aria-label={copy.email}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/[0.05] text-white"
            tabIndex={isVisible ? undefined : -1}
          >
            <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  );
}
