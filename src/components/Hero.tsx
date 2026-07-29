'use client';

import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  FileSearch,
  LockKeyhole,
  Play,
  ShieldCheck,
} from 'lucide-react';

interface HeroProps {
  onOpenDemo?: () => void;
  appHref?: string;
}

const suppliers = [
  {
    name: 'Apex Manufacturing',
    price: '$4.82',
    incoterm: 'FOB',
    leadTime: '28 days',
    status: 'Best comparable',
    highlighted: true,
  },
  {
    name: 'Nova Industrial',
    price: '$5.11',
    incoterm: 'FOB',
    leadTime: '24 days',
    status: '1 term missing',
    highlighted: false,
  },
  {
    name: 'Harbor Goods',
    price: '$5.37',
    incoterm: 'EXW',
    leadTime: '32 days',
    status: 'Not comparable',
    highlighted: false,
  },
];

export const Hero: React.FC<HeroProps> = ({
  onOpenDemo,
  appHref = '/app',
}) => (
  <section className="relative isolate overflow-hidden pb-24 pt-16 sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28">
    <div className="hero-grid pointer-events-none absolute inset-0 -z-20" />
    <div className="pointer-events-none absolute left-[7%] top-24 -z-10 h-72 w-72 rounded-full bg-[#7e9cff]/10 blur-[110px]" />
    <div className="pointer-events-none absolute right-[8%] top-40 -z-10 h-80 w-80 rounded-full bg-[#70e1b2]/10 blur-[120px]" />

    <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
      <div className="animate-rise min-w-0">
        <div className="eyebrow max-w-full text-[0.64rem] min-[430px]:text-[0.72rem]">
          <span className="status-dot" aria-hidden="true" />
          Built for importers and private-label brands
        </div>

        <h1 className="text-balance mt-7 text-[2.8rem] font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.65rem]">
          Compare factory quotes.{' '}
          <span className="brand-gradient">Buy with clarity.</span>
        </h1>

        <p className="mt-7 max-w-xl text-balance text-base leading-7 text-[#aeb9b2] sm:text-lg sm:leading-8">
          Turn supplier PDFs into comparable costs, risk flags, landed-cost
          estimates, and a clear next move—before you send the purchase order.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={appHref}
            className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[14px] bg-[#c7ff6b] px-6 py-3.5 text-sm font-extrabold text-[#0a0d0b] shadow-[0_12px_40px_rgba(199,255,107,0.14)] transition hover:bg-[#d7ff94]"
          >
            Analyze a quote free
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[14px] border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.08]"
          >
            <Play className="h-4 w-4 fill-current text-[#70e1b2]" aria-hidden="true" />
            See a sample report
          </button>
        </div>

        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#7f8d85]">
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-[#70e1b2]" aria-hidden="true" />
            No credit card
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-[#70e1b2]" aria-hidden="true" />
            Demo mode available
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-[#70e1b2]" aria-hidden="true" />
            Up to 3 quotes
          </span>
        </p>
      </div>

      <div className="animate-rise-delay relative mx-auto min-w-0 w-full max-w-2xl lg:mx-0">
        <div className="pointer-events-none absolute -inset-16 -z-10 bg-[radial-gradient(circle,rgba(112,225,178,0.11),transparent_60%)]" />

        <div className="surface-panel overflow-hidden rounded-[24px]">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl border border-[#c7ff6b]/15 bg-[#c7ff6b]/8 text-[#c7ff6b]">
                <FileSearch className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Quote comparison</p>
                <p className="text-[11px] text-[#718078]">3 supplier files • Sample report</p>
              </div>
            </div>
            <span className="hidden rounded-full border border-[#70e1b2]/20 bg-[#70e1b2]/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ff0cf] sm:inline-flex">
              Ready to review
            </span>
          </div>

          <div className="p-3 sm:p-5">
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0e0c]">
              <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,0.65fr)_minmax(0,0.55fr)] border-b border-white/[0.07] px-3 py-2.5 text-[9px] font-bold uppercase tracking-[0.13em] text-[#66736c] sm:grid-cols-[minmax(0,1.5fr)_minmax(0,0.65fr)_minmax(0,0.55fr)_minmax(0,0.85fr)] sm:px-4">
                <span>Supplier</span>
                <span>Unit</span>
                <span>Terms</span>
                <span className="hidden sm:block">Review</span>
              </div>
              {suppliers.map((supplier) => (
                <div
                  key={supplier.name}
                  className={`grid grid-cols-[minmax(0,1.5fr)_minmax(0,0.65fr)_minmax(0,0.55fr)] items-center border-b border-white/[0.06] px-3 py-3.5 last:border-b-0 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,0.65fr)_minmax(0,0.55fr)_minmax(0,0.85fr)] sm:px-4 ${
                    supplier.highlighted ? 'bg-[#c7ff6b]/[0.045]' : ''
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <p className="truncate text-xs font-semibold text-[#e8eee9] sm:text-[13px]">
                      {supplier.name}
                    </p>
                    <p className="mt-0.5 text-[9px] text-[#647169] sm:text-[10px]">
                      {supplier.leadTime}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-white sm:text-sm">
                    {supplier.price}
                  </span>
                  <span className="text-[10px] font-semibold text-[#9aa69f]">
                    {supplier.incoterm}
                  </span>
                  <span
                    className={`hidden items-center gap-1.5 text-[10px] font-semibold sm:flex ${
                      supplier.highlighted
                        ? 'text-[#c7ff6b]'
                        : supplier.status === 'Not comparable'
                          ? 'text-[#f1b47d]'
                          : 'text-[#aeb9b2]'
                    }`}
                  >
                    {supplier.highlighted ? (
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                    )}
                    {supplier.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#748179]">
                    Math check
                  </p>
                  <CheckCircle2 className="h-4 w-4 text-[#70e1b2]" aria-hidden="true" />
                </div>
                <p className="mt-2 text-sm font-bold text-white">Line totals verified</p>
                <p className="mt-1 text-[10px] leading-4 text-[#76847b]">
                  Deterministic checks stay separate from AI suggestions.
                </p>
              </div>
              <div className="rounded-2xl border border-[#f0a45d]/15 bg-[#f0a45d]/[0.045] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#a98564]">
                    Terms to verify
                  </p>
                  <AlertTriangle className="h-4 w-4 text-[#f1b47d]" aria-hidden="true" />
                </div>
                <p className="mt-2 text-sm font-bold text-white">AQL level not stated</p>
                <p className="mt-1 text-[10px] leading-4 text-[#8d7c6d]">
                  Ask the supplier before approving production.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-float absolute -bottom-6 -left-3 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#151d19]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:flex lg:-left-8">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#70e1b2]/10 text-[#70e1b2]">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Private by design</p>
            <p className="text-[10px] text-[#7c8981]">Files are processed, not stored</p>
          </div>
        </div>
      </div>
    </div>

    <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:mt-28 lg:px-8">
      <div className="grid gap-3 border-y border-white/[0.07] py-5 sm:grid-cols-3 sm:gap-0">
        {[
          {
            icon: ShieldCheck,
            title: 'Processed server-side',
            body: 'API keys stay out of the browser.',
          },
          {
            icon: CheckCircle2,
            title: 'Deterministic math checks',
            body: 'Totals and ranking are code-controlled.',
          },
          {
            icon: FileSearch,
            title: 'AI output labeled',
            body: 'Demo and partial modes stay explicit.',
          },
        ].map(({ icon: Icon, title, body }, index) => (
          <div
            key={title}
            className={`flex items-center gap-3 px-2 py-2 sm:px-6 ${
              index > 0 ? 'sm:border-l sm:border-white/[0.07]' : ''
            }`}
          >
            <Icon className="h-4 w-4 shrink-0 text-[#70e1b2]" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold text-[#e8eee9]">{title}</p>
              <p className="mt-0.5 text-[11px] text-[#738078]">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
