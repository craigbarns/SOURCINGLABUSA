import { ArrowUpRight } from 'lucide-react';

import { Logo } from './Logo';

interface FooterProps {
  appHref: string;
}

export const Footer: React.FC<FooterProps> = ({ appHref }) => (
  <footer className="border-t border-white/[0.07] bg-[#070a09] pb-10 pt-14 text-[#77847c]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 pb-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo size="md" />
          <p className="mt-5 max-w-sm text-sm leading-6">
            A focused workspace for comparing supplier quotes, modeling landed
            cost, and preparing the next sourcing conversation.
          </p>
          <a
            href={appHref}
            className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#dfffab]"
          >
            Open the beta workspace
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <nav aria-label="Product links" className="md:col-span-2 md:col-start-7">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a7b2ab]">
            Product
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="#product" className="hover:text-white">Quote analysis</a></li>
            <li><a href="#workflow" className="hover:text-white">How it works</a></li>
            <li><a href="#pricing" className="hover:text-white">Beta pricing</a></li>
            <li><a href="#waitlist" className="hover:text-white">Product updates</a></li>
          </ul>
        </nav>

        <nav aria-label="Trust links" className="md:col-span-2">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a7b2ab]">
            Trust
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="#security" className="hover:text-white">Security & privacy</a></li>
            <li><a href="#faq" className="hover:text-white">Data handling</a></li>
            <li><a href="#faq" className="hover:text-white">AI boundaries</a></li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a7b2ab]">
            Built for
          </p>
          <p className="mt-4 text-sm leading-6">
            Importers, private-label brands, and lean procurement teams buying from
            global suppliers.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 SourcingLab USA. All rights reserved.</p>
        <p className="font-medium text-[#657169]">
          AI suggestions support review—they do not replace professional advice.
        </p>
      </div>
    </div>
  </footer>
);
