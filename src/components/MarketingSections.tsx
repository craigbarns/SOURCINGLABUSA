import {
  Box,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  PackageCheck,
  ShieldAlert,
  Shirt,
  Sparkles,
} from 'lucide-react';

import { ContactForm } from './ContactForm';
import { CopyEmailButton } from './CopyEmailButton';

const offers = [
  {
    icon: Box,
    eyebrow: 'Custom packaging',
    title: 'Packaging that carries your brand properly.',
    body: 'Custom boxes, paper bags, labels, tissue paper, inserts, and retail packaging developed to your brief.',
    details: ['Materials and finishes', 'Samples before production', 'Branding and print specifications'],
    accent: 'text-[#c7ff6b]',
    iconSurface: 'bg-[#c7ff6b]/10',
  },
  {
    icon: Shirt,
    eyebrow: 'Custom textile',
    title: 'Textile products made to specification.',
    body: 'Apparel, towels, tote bags, uniforms, and branded accessories sourced for the quantity and finish your project needs.',
    details: ['Fabric and construction options', 'Branding and labels', 'Sampling and production follow-up'],
    accent: 'text-[#70e1b2]',
    iconSurface: 'bg-[#70e1b2]/10',
  },
];

const workflow = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'Share your brief',
    body: 'Tell us the product, quantity, design requirements, target price, and destination.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Review the proposal',
    body: 'We coordinate supplier options, pricing, sample requirements, and production timing for your review.',
  },
  {
    number: '03',
    icon: PackageCheck,
    title: 'Approve production',
    body: 'After the specification and sample are approved, production is followed through agreed quality checkpoints.',
  },
  {
    number: '04',
    icon: Globe2,
    title: 'Deliver to your destination',
    body: 'Orders are prepared for direct delivery from China to the agreed U.S. destination under the agreed shipping terms.',
  },
];

const faqs = [
  {
    question: 'Do you only source packaging?',
    answer:
      'No. Our initial focus is custom packaging and textile products for brands, e-commerce businesses, and companies.',
  },
  {
    question: 'Where are you based?',
    answer:
      'Sourcing Lab USA is preparing its U.S. market launch from Miami for 2027, supported by an established China sourcing partnership.',
  },
  {
    question: 'Can you work from an existing design or sample?',
    answer:
      'Yes. Send your brief, reference images, dimensions, quantity, and target timing. We will confirm what can be quoted and sampled.',
  },
  {
    question: 'Who handles compliance and import requirements?',
    answer:
      'Requirements depend on the exact product and destination. Product specifications, certificates, shipping terms, and importer responsibilities are confirmed for each order before production and shipment.',
  },
];

export function MarketingSections() {
  return (
    <>
      <section id="offerings" className="scroll-mt-20 border-t border-white/[0.07] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <span className="eyebrow">Made to your brief</span>
              <h2 className="text-balance mt-6 max-w-3xl text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                Two focused offers. One controlled supply chain.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#94a198] lg:pb-1">
              We focus on the products where design, material choice, finish, quantity,
              and production follow-up make the biggest difference to your brand.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {offers.map(({ icon: Icon, eyebrow, title, body, details, accent, iconSurface }) => (
              <article key={eyebrow} className="surface-panel rounded-[26px] p-7 sm:p-10">
                <div className={`grid h-12 w-12 place-items-center rounded-[15px] ${iconSurface} ${accent}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className={`mt-8 text-xs font-bold uppercase tracking-[0.16em] ${accent}`}>{eyebrow}</p>
                <h3 className="mt-3 max-w-xl text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">
                  {title}
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[#97a39b] sm:text-base">{body}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                  {details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm font-semibold text-[#d7dfda]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#70e1b2]" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 border-y border-white/[0.07] bg-[#0a0e0c] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow">A practical process</span>
            <h2 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              From a product idea to a shipment you can track.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#94a198]">
              Every custom order starts with a clear brief and stays documented through quotation, sampling, production, and delivery.
            </p>
          </div>

          <ol className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map(({ number, icon: Icon, title, body }) => (
              <li key={number} className="bento-card relative overflow-hidden rounded-[22px] p-6 sm:p-7">
                <span className="absolute right-5 top-3 font-mono text-5xl font-black tracking-[-0.08em] text-white/[0.035]">
                  {number}
                </span>
                <div className="grid h-11 w-11 place-items-center rounded-[14px] border border-[#70e1b2]/15 bg-[#70e1b2]/8 text-[#70e1b2]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-lg font-bold tracking-[-0.02em] text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#89968e]">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="experience" className="scroll-mt-20 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <span className="eyebrow">Built on field experience</span>
            <h2 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              Sourcing is more than a supplier list.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#94a198]">
              It is the ability to turn a brief into a manufacturable product, make decisions early, and keep the production process visible.
            </p>
          </div>

          <div className="surface-panel rounded-[26px] p-6 sm:p-9">
            {[
              ['20 years of product and sourcing experience', 'Built through apparel retail, product development, custom textile, packaging, and China sourcing.'],
              ['10-year China sourcing partnership', 'An established operational relationship for supplier selection, follow-up, and quality-control coordination.'],
              ['A U.S. operating base planned for Miami in 2027', 'A focused launch for U.S. brands, e-commerce businesses, and companies.'],
            ].map(([title, body], index) => (
              <div key={title} className={index > 0 ? 'border-t border-white/[0.08] pt-6' : ''}>
                <div className="flex items-start gap-4 py-1">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#c7ff6b]/10 text-[#c7ff6b]">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#849188]">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="compliance" className="scroll-mt-20 border-y border-white/[0.07] bg-[#0a0e0c] py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <span className="eyebrow">No hidden assumptions</span>
            <h2 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              Product requirements are confirmed order by order.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#94a198]">
              Materials, certificates, labeling, shipping terms, and import responsibilities vary by product and destination. We identify the requirements that need confirmation before production begins.
            </p>
          </div>
          <div className="soft-panel rounded-[26px] p-7 sm:p-9">
            <ShieldAlert className="h-7 w-7 text-[#f1b47d]" aria-hidden="true" />
            <h3 className="mt-6 text-xl font-black tracking-[-0.03em] text-white">Clear before you commit.</h3>
            <ul className="mt-6 space-y-4">
              {[
                'Specifications, quantities, and samples are agreed before production.',
                'Quality-control checkpoints are set for the specific order.',
                'Import and delivery responsibilities are confirmed in the commercial terms.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#c9d3cd]">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#70e1b2]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.65fr_1fr] lg:px-8">
          <div>
            <span className="eyebrow">Questions, answered</span>
            <h2 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              A straightforward sourcing partner.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[#94a198]">
              The first conversation is about your product, not a generic catalog.
            </p>
          </div>
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faqs.map(({ question, answer }) => (
              <article key={question} className="py-6 sm:py-7">
                <h3 className="text-base font-bold text-white">{question}</h3>
                <p className="mt-3 text-sm leading-7 text-[#89968e]">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 border-t border-white/[0.07] pb-24 pt-4 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="surface-panel relative overflow-hidden rounded-[26px] px-7 py-12 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 bg-[radial-gradient(circle,rgba(199,255,107,0.12),transparent_65%)]" />
            <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
              <div className="max-w-2xl">
                <span className="eyebrow">Start with your brief</span>
                <h2 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                  Ready to develop your next product?
                </h2>
                <p className="mt-5 text-base leading-7 text-[#94a198]">
                  Send us the product, quantity, design references, destination, and timing. We will review the project and come back with the right next step.
                </p>
                <div className="mt-8 border-t border-white/5 pt-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#70e1b2]">Or contact us directly</p>
                  <CopyEmailButton />
                </div>
              </div>
              <div className="relative w-full rounded-2xl bg-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
