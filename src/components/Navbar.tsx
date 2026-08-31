'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

import { Logo } from './Logo';

interface NavbarProps {
  area?: 'app' | 'marketing';
}

const navigation = [
  { label: 'Offerings', href: '/#offerings' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Compliance', href: '/#compliance' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Blog', href: '/blog' },
];

export const Navbar: React.FC<NavbarProps> = ({ area = 'marketing' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAppArea = area === 'app';
  const marketingHref = isAppArea ? '/marketing' : '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#070a09]/86 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={marketingHref}
          aria-label="SourcingLab USA home"
          className="min-w-0 rounded-xl"
        >
          <Logo compactOnMobile />
        </Link>

        {!isAppArea && (
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-[#96a29b] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
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
              href="#contact"
              aria-label="Start a project"
              className="group inline-flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#c7ff6b] text-sm font-extrabold text-[#0a0d0b] shadow-[0_8px_30px_rgba(199,255,107,0.13)] transition hover:bg-[#d6ff91] sm:h-auto sm:w-auto sm:px-4 sm:py-2.5"
            >
              <span className="hidden sm:inline">Start a project</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}

          {!isAppArea && (
            <button
              type="button"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 text-[#dce5df] md:hidden"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
          aria-label="Mobile navigation"
          className="border-t border-white/[0.07] bg-[#0a0e0c] px-4 py-4 md:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-[#c8d1cb] transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
