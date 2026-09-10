import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { CtaLink } from './CtaLink';
import { SourcingOverview } from './SourcingOverview';

export function Hero({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const es = locale === 'es';
  return (
    <section className="editorial-hero" aria-labelledby="hero-heading">
      <div className="editorial-container hero-layout sourcing-hero">
        <div className="hero-copy animate-rise">
          <p className="editorial-kicker">{es ? 'SOURCING EN CHINA · PROYECTOS DESDE AHORA' : 'CHINA SOURCING · ACCEPTING PROJECTS NOW'}</p>
          <h1 id="hero-heading">{es ? 'Tu producto.' : 'Your product.'}<br /><em>{es ? 'Desde China.' : 'Sourced in China.'}</em></h1>
          <p className="hero-description">{es
            ? 'Prendas, ropa deportiva y técnica. Cajas, empaques y etiquetas. Comparte lo que necesitas fabricar: revisamos las especificaciones, cantidades y posibilidades de suministro.'
            : 'Clothing, sportswear and technical apparel. Boxes, packaging and labels. Tell us what you need made: we review your specifications, quantities and sourcing options.'}</p>
          <div className="hero-actions">
            <CtaLink href="#contact" location="hero" label="Request a sourcing quote" className="editorial-button">
              {es ? 'Solicitar un presupuesto' : 'Request a sourcing quote'}<ArrowUpRight size={18} aria-hidden="true" />
            </CtaLink>
            <CtaLink href="#offerings" location="hero" label="Explore sourcing specialties" className="editorial-text-link">
              {es ? 'Ver especialidades' : 'Explore our specialties'}<ArrowDown size={16} aria-hidden="true" />
            </CtaLink>
          </div>
          <p className="sourcing-launch-note">{es
            ? 'Proyectos disponibles desde ahora. Facturación desde Francia o China, según la empresa indicada en tu presupuesto.'
            : 'Projects open now. Invoicing from France or China, with the company identified in your quotation.'}</p>
        </div>
        <SourcingOverview locale={locale} />
      </div>
      <div className="editorial-container specialty-strip">
        <span className="specialty-label">{es ? 'DEFINIDO SEGÚN TU BRIEF' : 'BUILT AROUND YOUR BRIEF'}</span>
        <span>{es ? 'Especificaciones' : 'Specifications'}</span><span aria-hidden="true">✳</span>
        <span>{es ? 'Muestras y cantidades' : 'Samples & quantities'}</span><span aria-hidden="true">✳</span>
        <span>{es ? 'Otros productos bajo pedido' : 'Other products on request'}</span>
      </div>
    </section>
  );
}
