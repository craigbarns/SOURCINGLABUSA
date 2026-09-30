import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { CtaLink } from './CtaLink';
import { SourcingOverview } from './SourcingOverview';

export function Hero({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const es = locale === 'es';
  return (
    <section className="editorial-hero" aria-labelledby="hero-heading">
      <div className="editorial-container hero-layout sourcing-hero">
        <div className="hero-copy animate-rise">
          <p className="editorial-kicker">
            <span className="launch-dot" aria-hidden="true" />
            {es ? 'SOURCING GLOBAL & ENTRADA AL MERCADO DE EE. UU.' : 'GLOBAL SOURCING & U.S. MARKET ENTRY'}
          </p>
          <h1 id="hero-heading">
            {es ? 'Sourcing global' : 'Global Sourcing'}<br />
            <em>{es ? '& entrada al mercado de EE. UU.' : '& Market Entry for the U.S.'}</em>
          </h1>
          <p className="hero-description">
            {es
              ? 'Ayudamos a empresas estadounidenses a buscar, verificar y fabricar en el extranjero, y ayudamos a fabricantes internacionales a entrar, distribuir y crecer en el mercado de Estados Unidos.'
              : 'We help U.S. companies source and manufacture overseas — and help international manufacturers enter, distribute, and grow in the United States.'}
          </p>
          <div className="hero-actions">
            <CtaLink href="#contact" location="hero" label="Book a Sourcing Call" className="editorial-button">
              {es ? 'Reservar una consulta' : 'Book a Sourcing Call'}<ArrowUpRight size={18} aria-hidden="true" />
            </CtaLink>
            <CtaLink href="#contact" location="hero" label="Tell Us What You're Looking For" className="editorial-text-link">
              {es ? 'Cuéntanos qué buscas' : "Tell Us What You're Looking For"}<ArrowDown size={16} aria-hidden="true" />
            </CtaLink>
          </div>
          <p className="sourcing-launch-note">
            {es
              ? 'Ejecución transparente de compras internacionales y apoyo comercial para empresas en el mercado de EE. UU.'
              : 'Transparent procurement execution and commercial coordination for companies operating in the U.S. market.'}
          </p>
        </div>
        <SourcingOverview locale={locale} />
      </div>
      <div className="editorial-container specialty-strip flex-wrap gap-y-3">
        <span className="specialty-label">{es ? 'ÁREAS DE APOYO' : 'AREAS OF SUPPORT'}</span>
        <span>{es ? 'Búsqueda de proveedores' : 'Supplier sourcing'}</span><span aria-hidden="true">✳</span>
        <span>{es ? 'Verificación de fábricas' : 'Factory verification'}</span><span aria-hidden="true">✳</span>
        <span>{es ? 'Negociación de precios' : 'Contract negotiation'}</span><span aria-hidden="true">✳</span>
        <span>{es ? 'Desarrollo de producto' : 'Product development'}</span><span aria-hidden="true">✳</span>
        <span>{es ? 'Control de calidad' : 'Quality inspection'}</span><span aria-hidden="true">✳</span>
        <span>{es ? 'Logística y aranceles' : 'Logistics & tariffs'}</span><span aria-hidden="true">✳</span>
        <span>{es ? 'Entrada al mercado de EE. UU.' : 'U.S. market entry'}</span>
      </div>
    </section>
  );
}
