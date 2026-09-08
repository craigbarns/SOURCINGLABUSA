import { ContactForm } from '@/components/ContactForm';
import { CopyEmailButton } from '@/components/CopyEmailButton';
import { BRIEF_SECTION_COPY, type BriefLocale } from '@/lib/brief-copy';

interface BriefSectionProps {
  locale?: BriefLocale;
  formLocation?: string;
  title?: string;
  intro?: string;
}

export function BriefSection({
  locale = 'en',
  formLocation = 'contact_section',
  title,
  intro,
}: BriefSectionProps) {
  const copy = BRIEF_SECTION_COPY[locale];
  return (
    <section id="contact" className="editorial-section contact-section">
      <div className="editorial-container">
        <div className="contact-panel">
          <div>
            <p className="editorial-kicker">{copy.eyebrow}</p>
            <h2 className="editorial-title">{title ?? copy.title}</h2>
            <p className="editorial-body">{intro ?? copy.intro}</p>
            <ol className="brief-steps">
              {copy.steps.map((step, index) => (
                <li key={step.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="editorial-kicker mt-8">{copy.directLabel}</p>
            <CopyEmailButton formLocation={formLocation} />
          </div>
          <ContactForm
            locale={locale}
            formLocation={formLocation}
            appearance="editorial"
          />
        </div>
      </div>
    </section>
  );
}
