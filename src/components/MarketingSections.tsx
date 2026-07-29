import {
  ArrowRight,
  Binary,
  Calculator,
  CheckCircle2,
  FileCheck2,
  FileSearch,
  GitCompareArrows,
  Globe2,
  LockKeyhole,
  Mail,
  ScanSearch,
  Server,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from 'lucide-react';

const workflow = [
  {
    number: '01',
    icon: UploadCloud,
    title: 'Upload supplier quotes',
    body: 'Add up to three PDF or image quotes. Each file is validated before the analysis starts.',
  },
  {
    number: '02',
    icon: ScanSearch,
    title: 'Normalize the details',
    body: 'Extract prices, quantities, terms, lead times, and line items into one reviewable structure.',
  },
  {
    number: '03',
    icon: GitCompareArrows,
    title: 'Decide what happens next',
    body: 'Compare compatible offers, inspect risk flags, model landed cost, and draft your supplier response.',
  },
];

const supportingTools = [
  {
    icon: FileCheck2,
    eyebrow: 'Product brief',
    title: 'Turn a product idea into a factory-ready starting point.',
    body: 'Draft materials, dimensions, quality checkpoints, and requirements that still need expert verification.',
    accent: 'text-[#7e9cff]',
    iconSurface: 'bg-[#7e9cff]/10',
  },
  {
    icon: Calculator,
    eyebrow: 'Landed cost',
    title: 'Model the cost that actually reaches your warehouse.',
    body: 'Combine unit price, freight, duty rate, insurance, and local charges using inputs you control.',
    accent: 'text-[#c7ff6b]',
    iconSurface: 'bg-[#c7ff6b]/10',
  },
  {
    icon: Globe2,
    eyebrow: 'Customs research',
    title: 'Build a better HS-code verification brief.',
    body: 'Generate a classification starting point and surface the rates and regulatory assumptions to confirm.',
    accent: 'text-[#70e1b2]',
    iconSurface: 'bg-[#70e1b2]/10',
  },
  {
    icon: Mail,
    eyebrow: 'Supplier response',
    title: 'Move the conversation forward without starting from zero.',
    body: 'Draft RFQs, sample requests, quality questions, and counteroffers in three languages for your review.',
    accent: 'text-[#f1b47d]',
    iconSurface: 'bg-[#f1b47d]/10',
  },
];

const faqs = [
  {
    question: 'What file formats can I analyze?',
    answer:
      'The quote analyzer accepts PDF, JPEG, PNG, and WebP files. You can compare up to three supplier documents in one run.',
  },
  {
    question: 'Are my supplier quotes stored?',
    answer:
      'SourcingLab processes quote files through the analysis request and does not persist the uploaded documents or their OCR text in the application database.',
  },
  {
    question: 'Can I rely on a suggested HS code or duty rate?',
    answer:
      'Treat classifications and rates as a research starting point, not customs or legal advice. Verify them with an official tariff source or a qualified customs professional before importing.',
  },
  {
    question: 'What happens when AI services are not configured?',
    answer:
      'The product switches to an explicit demo mode. It returns a labeled sample report and never presents the contents of your uploaded file as if they were analyzed.',
  },
  {
    question: 'Does SourcingLab contact suppliers for me?',
    answer:
      'No. It prepares RFQs, sample requests, and counteroffers for you to review, copy, and send through your own communication channel.',
  },
  {
    question: 'How are quote totals checked?',
    answer:
      'Arithmetic checks and comparable-price ranking are calculated deterministically in code. Narrative AI suggestions cannot overwrite those numbers or ranks.',
  },
];

export function MarketingSections() {
  return (
    <>
      <section id="workflow" className="scroll-mt-20 border-t border-white/[0.07] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow">A clearer path from quote to PO</span>
            <h2 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              Three steps. One decision-ready workspace.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#94a198]">
              Keep the original documents, the extracted facts, and the assumptions
              that need verification in one visible workflow.
            </p>
          </div>

          <ol className="mt-14 grid gap-4 lg:grid-cols-3">
            {workflow.map(({ number, icon: Icon, title, body }, index) => (
              <li
                key={number}
                className="bento-card group relative overflow-hidden rounded-[22px] p-6 sm:p-7"
              >
                <div className="absolute right-5 top-3 font-mono text-5xl font-black tracking-[-0.08em] text-white/[0.035]">
                  {number}
                </div>
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-[14px] border border-[#70e1b2]/15 bg-[#70e1b2]/8 text-[#70e1b2]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  {index < workflow.length - 1 && (
                    <ArrowRight
                      className="hidden h-4 w-4 text-white/15 lg:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <h3 className="mt-8 text-lg font-bold tracking-[-0.02em] text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#89968e]">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="product" className="scroll-mt-20 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <span className="eyebrow">The sourcing decision layer</span>
              <h2 className="text-balance mt-6 max-w-3xl text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                Start with the quote. Keep every supporting tool close.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#94a198] lg:pb-1">
              SourcingLab brings the repetitive analysis around a supplier decision
              into one focused workspace—without hiding the assumptions.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            <div className="surface-panel relative overflow-hidden rounded-[26px] p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <div className="dot-grid pointer-events-none absolute -right-16 -top-20 h-72 w-72 opacity-25 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-[15px] bg-[#c7ff6b] text-[#0a0d0b]">
                  <FileSearch className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-[#c7ff6b]">
                  Core workflow
                </p>
                <h3 className="mt-3 max-w-xl text-2xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                  Compare what suppliers actually quoted—not what you hoped they meant.
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[#97a39b] sm:text-base">
                  Normalize currencies, Incoterms, quantities, payment terms, and
                  lead times. Flag missing information and arithmetic mismatches
                  before choosing an offer.
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    'Structured line-item extraction',
                    'Comparable-offer ranking',
                    'Missing-term review',
                    'Deterministic total checks',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm font-semibold text-[#d7dfda]"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-[#70e1b2]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="/app"
                  className="group mt-9 inline-flex items-center gap-2 text-sm font-extrabold text-[#dfffab]"
                >
                  Open the quote analyzer
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {supportingTools.slice(0, 2).map((tool) => (
                <article key={tool.title} className="bento-card rounded-[22px] p-6 sm:p-7">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl ${tool.iconSurface} ${tool.accent}`}>
                    <tool.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </div>
                  <p className={`mt-6 text-[10px] font-bold uppercase tracking-[0.16em] ${tool.accent}`}>
                    {tool.eyebrow}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-6 tracking-[-0.02em] text-white">
                    {tool.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#849188]">{tool.body}</p>
                </article>
              ))}
            </div>

            {supportingTools.slice(2).map((tool) => (
              <article
                key={tool.title}
                className="bento-card rounded-[22px] p-6 sm:p-7 lg:col-span-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tool.iconSurface} ${tool.accent}`}>
                    <tool.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.16em] ${tool.accent}`}>
                      {tool.eyebrow}
                    </p>
                    <h3 className="mt-2 text-lg font-bold leading-6 tracking-[-0.02em] text-white">
                      {tool.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#849188]">{tool.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="scroll-mt-20 border-y border-white/[0.07] bg-[#0a0e0c] py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <span className="eyebrow">Trust is a product feature</span>
            <h2 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              Clear boundaries between your files, the math, and the AI.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#94a198]">
              The architecture keeps secrets on the server, does not persist quote
              files in the application database, and labels the source of every
              analysis mode.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Server,
                  title: 'Server-side processing',
                  body: 'Provider keys never ship to the client.',
                },
                {
                  icon: LockKeyhole,
                  title: 'No quote persistence',
                  body: 'Files and OCR text are not saved by SourcingLab.',
                },
                {
                  icon: Binary,
                  title: 'Code-controlled math',
                  body: 'AI cannot rewrite totals, ranks, or price gaps.',
                },
                {
                  icon: Sparkles,
                  title: 'Explicit AI modes',
                  body: 'Live, partial, and demo results stay labeled.',
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="soft-panel rounded-2xl p-4">
                  <Icon className="h-4 w-4 text-[#70e1b2]" aria-hidden="true" />
                  <p className="mt-4 text-sm font-bold text-white">{title}</p>
                  <p className="mt-1.5 text-xs leading-5 text-[#78867d]">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel relative overflow-hidden rounded-[26px] p-6 sm:p-9">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(112,225,178,0.11),transparent_42%)]" />
            <div className="relative">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#70e1b2]/10 text-[#70e1b2]">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Analysis pipeline</p>
                    <p className="mt-0.5 text-[11px] text-[#75827a]">Visible by design</p>
                  </div>
                </div>
                <span className="rounded-full border border-[#70e1b2]/20 bg-[#70e1b2]/8 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#a1f1d1]">
                  No store
                </span>
              </div>

              <div className="mt-7 space-y-3">
                {[
                  ['01', 'File validation', 'Type, signature, count, and size checks'],
                  ['02', 'OCR extraction', 'Supplier document converted into structured text'],
                  ['03', 'Schema validation', 'Output checked before it reaches the interface'],
                  ['04', 'Deterministic controls', 'Totals and comparable prices calculated in code'],
                  ['05', 'Narrative review', 'AI suggestions added without changing the math'],
                ].map(([number, title, body]) => (
                  <div
                    key={number}
                    className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl border border-white/[0.07] bg-black/10 p-3.5 sm:grid-cols-[2rem_0.75fr_1.25fr] sm:items-center"
                  >
                    <span className="font-mono text-[10px] font-bold text-[#c7ff6b]">{number}</span>
                    <span className="text-xs font-bold text-[#e5ece7]">{title}</span>
                    <span className="col-start-2 text-[11px] leading-5 text-[#738078] sm:col-start-auto">
                      {body}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.65fr_1fr] lg:px-8">
          <div>
            <span className="eyebrow">Before you upload</span>
            <h2 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              Practical answers, no fine-print fog.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[#94a198]">
              Sourcing decisions carry real risk. The product should be clear about
              what it does—and what still needs human verification.
            </p>
          </div>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-xl py-5 text-left text-sm font-bold text-[#e8eee9] marker:hidden sm:text-base">
                  {question}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 text-lg font-light text-[#8d9a92] transition group-open:rotate-45 group-open:text-[#c7ff6b]">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-[#87948b]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
