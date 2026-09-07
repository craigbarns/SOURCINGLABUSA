import { ContactForm } from '@/components/ContactForm';
import { CopyEmailButton } from '@/components/CopyEmailButton';
import { BRIEF_SECTION_COPY, type BriefLocale } from '@/lib/brief-copy';

interface BriefSectionProps {
  locale?: BriefLocale;
  /** Reported with every conversion event fired from this section. */
  formLocation?: string;
  /** Page-specific headline, so a service page does not repeat the homepage. */
  title?: string;
  intro?: string;
}

/**
 * The single conversion block of the marketing site. It is rendered on the
 * homepage and on every service landing page so search traffic can convert on
 * the page it lands on instead of being sent back to the homepage.
 */
export function BriefSection({
  locale = 'en',
  formLocation = 'contact_section',
  title,
  intro,
}: BriefSectionProps) {
  const copy = BRIEF_SECTION_COPY[locale];

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-white/[0.07] pb-24 pt-4 sm:pb-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel relative overflow-hidden rounded-[26px] px-6 py-12 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 bg-[radial-gradient(circle,rgba(199,255,107,0.12),transparent_65%)]" />

          <div className="relative grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-2xl">
              <span className="eyebrow">{copy.eyebrow}</span>
              <h2 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                {title ?? copy.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-[#94a198]">
                {intro ?? copy.intro}
              </p>

              <div className="mt-9 border-t border-white/[0.08] pt-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#70e1b2]">
                  {copy.stepsTitle}
                </p>
                <ol className="mt-6 space-y-5">
                  {copy.steps.map((step, index) => (
                    <li key={step.title} className="flex items-start gap-4">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/[0.09] bg-white/[0.04] text-[11px] font-black text-[#dfffab]">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-white">{step.title}</p>
                        <p className="mt-1 text-sm leading-6 text-[#89968e]">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-9 border-t border-white/[0.08] pt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#70e1b2]">
                  {copy.directLabel}
                </p>
                <CopyEmailButton formLocation={formLocation} />
              </div>
            </div>

            <div className="relative w-full rounded-2xl bg-white/[0.02] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8">
              <ContactForm locale={locale} formLocation={formLocation} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
