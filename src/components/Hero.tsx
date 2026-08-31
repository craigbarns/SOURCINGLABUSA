import {
  ArrowRight,
  Check,
  ClipboardCheck,
  PackageCheck,
  ShieldCheck,
  Shirt,
} from 'lucide-react';

const orderSteps = [
  {
    icon: ClipboardCheck,
    label: '01 · Your brief',
    detail: 'Product, quantity, finish, target price',
  },
  {
    icon: PackageCheck,
    label: '02 · Supplier coordination',
    detail: 'Supplier options, quote and sample',
  },
  {
    icon: ShieldCheck,
    label: '03 · Quality follow-up',
    detail: 'Agreed checkpoints before shipment',
  },
  {
    icon: Shirt,
    label: '04 · Direct delivery',
    detail: 'From China to your U.S. destination',
  },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-16 sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28">
      <div className="hero-grid pointer-events-none absolute inset-0 -z-20" />
      <div className="pointer-events-none absolute left-[7%] top-24 -z-10 h-72 w-72 rounded-full bg-[#7e9cff]/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-[8%] top-40 -z-10 h-80 w-80 rounded-full bg-[#70e1b2]/10 blur-[120px]" />

      <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div className="animate-rise min-w-0">
          <div className="eyebrow max-w-full text-[0.64rem] min-[430px]:text-[0.72rem]">
            <span className="status-dot" aria-hidden="true" />
            <span className="sm:hidden">Miami launch · 2027</span>
            <span className="hidden sm:inline">U.S. market launch planned for Miami · 2027</span>
          </div>

          <h1 className="text-balance mt-7 max-w-[11ch] text-[2.45rem] font-black leading-[0.98] tracking-[-0.055em] text-white sm:max-w-none sm:text-6xl lg:text-[4.65rem]">
            Custom packaging and textile.{' '}
            <span className="brand-gradient">Sourced with clarity.</span>
          </h1>

          <p className="mt-7 max-w-xl text-balance text-base leading-7 text-[#aeb9b2] sm:text-lg sm:leading-8">
            Launching for the U.S. market in 2027, Sourcing Lab USA will support
            brands, e-commerce businesses, and companies developing custom
            packaging and textile products through an established independent China
            sourcing partnership.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[14px] bg-[#c7ff6b] px-6 py-3.5 text-sm font-extrabold text-[#0a0d0b] shadow-[0_12px_40px_rgba(199,255,107,0.14)] transition hover:bg-[#d7ff94]"
            >
              Send your project brief
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[14px] border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.08]"
            >
              See how it works
            </a>
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#7f8d85]">
            {[
              'Packaging and textile specialists',
              'China-to-U.S. delivery under agreed terms',
              'Project-specific quality follow-up',
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#70e1b2]" aria-hidden="true" />
                {item}
              </span>
            ))}
          </p>
        </div>

        <div className="animate-rise-delay relative mx-auto min-w-0 w-full max-w-2xl lg:mx-0">
          <div className="pointer-events-none absolute -inset-16 -z-10 bg-[radial-gradient(circle,rgba(112,225,178,0.11),transparent_60%)]" />

          <div className="surface-panel overflow-hidden rounded-[24px]">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-[#c7ff6b]/15 bg-[#c7ff6b]/8 text-[#c7ff6b]">
                  <PackageCheck className="h-[18px] w-[18px]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Your project, end to end</p>
                  <p className="text-[11px] text-[#718078]">From specification to delivery</p>
                </div>
              </div>
              <span className="hidden rounded-full border border-[#70e1b2]/20 bg-[#70e1b2]/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ff0cf] sm:inline-flex">
                Built to order
              </span>
            </div>

            <div className="space-y-3 p-3 sm:p-5">
              {orderSteps.map(({ icon: Icon, label, detail }, index) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#0a0e0c] p-4 sm:p-5"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-[#70e1b2]">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-[#829087]">{detail}</p>
                  </div>
                  {index < orderSteps.length - 1 && (
                    <ArrowRight className="ml-auto hidden h-4 w-4 text-[#526057] sm:block" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="animate-float absolute -bottom-6 -left-3 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#151d19]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:flex lg:-left-8">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#70e1b2]/10 text-[#70e1b2]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Quality follow-up stays visible</p>
              <p className="text-[10px] text-[#7c8981]">Agreed checkpoints before shipment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:mt-28 lg:px-8">
        <div className="grid gap-3 border-y border-white/[0.07] py-5 sm:grid-cols-3 sm:gap-0">
          {[
            ['20 years', 'Product, textile, and sourcing experience'],
            ['10 years', 'Established partnership with China sourcing specialists'],
            ['Miami 2027', 'Planned U.S. operating base'],
          ].map(([title, body], index) => (
            <div
              key={title}
              className={`flex items-center gap-3 px-2 py-2 sm:px-6 ${
                index > 0 ? 'sm:border-l sm:border-white/[0.07]' : ''
              }`}
            >
              <Check className="h-4 w-4 shrink-0 text-[#70e1b2]" aria-hidden="true" />
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
}
