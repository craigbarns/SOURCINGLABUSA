import Link from 'next/link';

import { Logo } from './Logo';

export const Footer: React.FC = () => (
  <footer className="border-t border-white/[0.07] bg-[#070a09] pb-10 pt-14 text-[#77847c]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 pb-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo size="md" />
          <p className="mt-5 max-w-sm text-sm leading-6">
            Custom packaging and textile products developed through an established
            China sourcing partnership for the planned U.S. market launch.
          </p>
          <a
            href="mailto:contact@sourcinglabusa.com?subject=Custom%20packaging%20or%20textile%20project"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#dfffab]"
          >
            contact@sourcinglabusa.com
          </a>
        </div>

        <nav aria-label="Service links" className="md:col-span-2 md:col-start-7">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a7b2ab]">
            Services
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/custom-packaging" className="hover:text-white">Custom packaging</Link></li>
            <li><Link href="/custom-textile" className="hover:text-white">Custom textile</Link></li>
            <li><Link href="/private-label-packaging" className="hover:text-white">Private label packaging</Link></li>
            <li><Link href="/china-to-us-procurement" className="hover:text-white">China-to-U.S. procurement</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-white">How it works</Link></li>
            <li><Link href="/#contact" className="hover:text-white">Send your brief</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company links" className="md:col-span-2">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a7b2ab]">
            Company
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/#experience" className="hover:text-white">Experience</Link></li>
            <li><Link href="/#compliance" className="hover:text-white">Quality & compliance</Link></li>
            <li><Link href="/#faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a7b2ab]">
            Built for
          </p>
          <p className="mt-4 text-sm leading-6">
            Brands, e-commerce businesses, and companies needing custom packaging
            or textile products.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Sourcing Lab USA. All rights reserved.</p>
        <p className="font-medium text-[#657169]">
          U.S. market launch planned for Miami in 2027.
        </p>
      </div>
    </div>
  </footer>
);
