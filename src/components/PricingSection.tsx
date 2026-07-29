import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Clock3,
  Sparkles,
} from 'lucide-react';

interface PricingSectionProps {
  appHref?: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  appHref = '/app',
}) => (
  <section id="pricing" className="scroll-mt-20 border-t border-white/[0.07] bg-[#0a0e0c] py-24 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">Open beta pricing</span>
        <h2 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
          Use the full workspace free during beta.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#94a198]">
          No pretend checkout and no surprise subscription. Test the workflow,
          share what your team needs, and help shape the paid plans that come next.
        </p>
      </div>

      <div className="surface-panel mx-auto mt-14 grid max-w-5xl overflow-hidden rounded-[26px] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative p-7 sm:p-10">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-[radial-gradient(circle,rgba(199,255,107,0.09),transparent_66%)]" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#c7ff6b]/20 bg-[#c7ff6b]/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#dfffab]">
                Available now
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7f8d85]">
                <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                Limited beta period
              </span>
            </div>

            <h3 className="mt-7 text-2xl font-black tracking-[-0.035em] text-white">
              SourcingLab Beta
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#8e9a92]">
              For founders, importers, and lean sourcing teams validating supplier offers.
            </p>

            <div className="mt-7 flex items-end gap-2">
              <span className="text-6xl font-black tracking-[-0.06em] text-white">$0</span>
              <span className="pb-2 text-sm font-semibold text-[#78857d]">during beta</span>
            </div>

            <a
              href={appHref}
              className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-[#c7ff6b] px-6 py-3.5 text-sm font-extrabold text-[#0a0d0b] transition hover:bg-[#d7ff94] sm:w-auto"
            >
              Start analyzing
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <p className="mt-3 text-[11px] text-[#69766e]">No credit card required.</p>
          </div>
        </div>

        <div className="border-t border-white/[0.08] bg-white/[0.025] p-7 sm:p-10 lg:border-l lg:border-t-0">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#aeb9b2]">
            Included in the beta
          </p>
          <ul className="mt-6 space-y-4">
            {[
              'Supplier quote comparison and math checks',
              'Product specification starting points',
              'Landed-cost modeling',
              'HS-code research briefs',
              'RFQ and negotiation email drafts',
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-[#d3dbd6]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#70e1b2]/10 text-[#70e1b2]">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-white/[0.08] pt-6">
            <div className="flex items-start gap-3">
              <CircleDollarSign className="mt-0.5 h-4 w-4 shrink-0 text-[#7e9cff]" aria-hidden="true" />
              <p className="text-xs leading-5 text-[#7e8a82]">
                Paid individual and team plans are being designed. Want to influence
                limits, collaboration, or reporting?
              </p>
            </div>
            <a
              href="#waitlist"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#b4c4ff] hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Join product updates
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
