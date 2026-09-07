'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Logo } from './Logo';
import { trackCtaClick } from '@/lib/analytics';

interface NavbarProps {
  area?: 'app' | 'marketing';
  appearance?: 'dark' | 'light';
  contactHref?: string;
}

const navigation = [
  { label: 'Packaging', href: '/custom-packaging' },
  { label: 'Clothing', href: '/custom-textile' },
  { label: 'Private label', href: '/private-label-packaging' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Blog', href: '/blog' },
];

export const Navbar: React.FC<NavbarProps> = ({
  area = 'marketing',
  appearance = 'dark',
  contactHref = '#contact',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAppArea = area === 'app';
  const isSpanish = pathname?.startsWith('/es') ?? false;
  const marketingHref = isAppArea ? '/marketing' : isSpanish ? '/es' : '/';

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);
  const items = navigation.map((item) => ({
    ...item,
    label: isSpanish
      ? ({
          Packaging: 'Empaques',
          Clothing: 'Prendas',
          'Private label': 'Marca privada',
          'How it works': 'Cómo funciona',
          Blog: 'Blog',
        }[item.label] ?? item.label)
      : item.label,
    href:
      isSpanish && item.href === '/#how-it-works'
        ? '/es#how-it-works'
        : item.href,
  }));

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#070a09]/86 backdrop-blur-xl ${appearance === 'light' ? 'site-header-light' : ''}`}
    >
      <div className="mx-auto flex h-[80px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={marketingHref}
          aria-label="SourcingLab USA home"
          className="min-w-0 rounded-xl"
        >
          <Logo compactOnMobile appearance={appearance} />
        </Link>

        {!isAppArea && (
          <nav
            aria-label={
              isSpanish ? 'Navegación principal' : 'Primary navigation'
            }
            className="hidden items-center gap-6 xl:flex"
          >
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link text-[12px] font-medium text-[#96a29b] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="nav-language hidden sm:flex items-center gap-1 bg-white/[0.04] rounded-lg p-1 border border-white/10 mr-2">
            <Link
              href="/"
              aria-current={isSpanish ? undefined : 'page'}
              className={`rounded-md px-2 py-1 text-xs font-bold hover:bg-white/[0.08] ${isSpanish ? 'text-[#96a29b]' : 'text-white'}`}
            >
              EN
            </Link>
            <Link
              href="/es"
              aria-current={isSpanish ? 'page' : undefined}
              className={`rounded-md px-2 py-1 text-xs font-bold hover:bg-white/[0.08] ${isSpanish ? 'text-white' : 'text-[#96a29b]'}`}
            >
              ES
            </Link>
          </div>

          {isAppArea ? (
            <Link
              href={marketingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-[#dce5df] transition-colors hover:bg-white/[0.08]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Back to website</span>
              <span className="sm:hidden">Website</span>
            </Link>
          ) : (
            <a
              href={contactHref}
              onClick={() => {
                setIsMenuOpen(false);
                trackCtaClick('navbar', 'Send a project brief');
              }}
              aria-label={
                isSpanish ? 'Enviar un proyecto' : 'Send a project brief'
              }
              className="nav-cta group inline-flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#c7ff6b] text-sm font-extrabold text-[#0a0d0b] shadow-[0_8px_30px_rgba(199,255,107,0.13)] transition hover:bg-[#d6ff91] sm:h-auto sm:w-auto sm:px-4 sm:py-2.5"
            >
              <span className="hidden sm:inline">
                {isSpanish ? 'Cuéntanos tu proyecto' : 'Start a project'}
              </span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}

          {!isAppArea && (
            <button
              type="button"
              ref={menuButtonRef}
              className="nav-toggle grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 text-[#dce5df] xl:hidden"
              aria-label={
                isMenuOpen
                  ? isSpanish
                    ? 'Cerrar menú'
                    : 'Close navigation menu'
                  : isSpanish
                    ? 'Abrir menú'
                    : 'Open navigation menu'
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      {!isAppArea && isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label={isSpanish ? 'Navegación móvil' : 'Mobile navigation'}
          className="nav-mobile border-t border-white/[0.07] bg-[#0a0e0c] px-4 py-4 xl:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-[#c8d1cb] transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <div className="mt-3 border-t border-white/[0.08] pt-4">
              <p className="px-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#7d8b83]">
                Language
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/"
                  aria-current={isSpanish ? undefined : 'page'}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-xl border px-3 py-3 text-center text-sm font-bold transition-colors ${
                    isSpanish
                      ? 'border-white/[0.08] text-[#96a29b] hover:bg-white/[0.05] hover:text-white'
                      : 'border-[#c7ff6b]/30 bg-[#c7ff6b]/10 text-[#dfffab]'
                  }`}
                >
                  English
                </Link>
                <Link
                  href="/es"
                  aria-current={isSpanish ? 'page' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-xl border px-3 py-3 text-center text-sm font-bold transition-colors ${
                    isSpanish
                      ? 'border-[#c7ff6b]/30 bg-[#c7ff6b]/10 text-[#dfffab]'
                      : 'border-white/[0.08] text-[#96a29b] hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  Español
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
