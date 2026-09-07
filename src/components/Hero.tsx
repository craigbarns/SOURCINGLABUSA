import Image from 'next/image';
import { CtaLink } from './CtaLink';
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';

export function Hero({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const es = locale === 'es';
  return (
    <section className="editorial-hero" aria-labelledby="hero-heading">
      <div className="editorial-container hero-layout">
        <div className="hero-copy animate-rise">
          <p className="editorial-kicker">
            <span className="launch-dot" />
            {es
              ? 'MIAMI, 2027 · LANZAMIENTO PREVISTO'
              : 'MIAMI, 2027 · PLANNED U.S. LAUNCH'}
          </p>
          <h1 id="hero-heading">
            {es ? 'Tu marca.' : 'Your brand.'}
            <br />
            {es ? 'Hecha' : 'Made'}
            <br />
            <em>tangible.</em>
            <span className="hero-asterisk" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="hero-description">
            {es
              ? 'Empaques y textiles personalizados, del primer concepto al último detalle. Pensados para tu marca. Desarrollados con claridad.'
              : 'Custom packaging & textiles, from the first idea to the final detail. Thoughtfully sourced. Unmistakably yours.'}
          </p>
          <div className="hero-actions">
            <CtaLink
              href="#contact"
              location="hero"
              label="Start a project"
              className="editorial-button"
            >
              {es ? 'Cuéntanos tu proyecto' : 'Let’s build your next product'}
              <ArrowUpRight size={18} aria-hidden="true" />
            </CtaLink>
            <CtaLink
              href="#offerings"
              location="hero"
              label="Explore the possibilities"
              className="editorial-text-link"
            >
              {es ? 'Explora las posibilidades' : 'Explore the possibilities'}
              <ArrowDown size={16} aria-hidden="true" />
            </CtaLink>
          </div>
          <div className="hero-footnote">
            <span aria-hidden="true">01 / 03</span>
            <p>
              {es
                ? 'EL BUEN DISEÑO MERECE UNA GRAN EJECUCIÓN.'
                : 'GOOD DESIGN DESERVES GREAT EXECUTION.'}
            </p>
          </div>
        </div>
        <figure className="hero-visual animate-rise-delay">
          <Image
            src="/images/brand-still-life.webp"
            alt={
              es
                ? 'Concepto de cajas verde bosque, bolsas kraft y textiles de algodón sobre piedra cálida'
                : 'Concept arrangement of forest green boxes, kraft bags and natural cotton on warm stone'
            }
            fill
            sizes="(max-width: 767px) 150vw, (max-width: 1200px) 85vw, 1100px"
            priority
            className="hero-photo"
          />
          <div className="hero-image-top">
            <span>SOURCING LAB / MATERIAL STUDY</span>
            <MoveUpRight size={22} aria-hidden="true" />
          </div>
          <div className="hero-image-label">
            <span>
              {es
                ? 'Una idea. Infinitas posibilidades.'
                : 'One idea. Endless possibilities.'}
            </span>
            <span>{es ? 'Imagen conceptual' : 'Concept imagery'}</span>
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <span>{es ? 'DE LA IDEA' : 'FROM IDEA'}</span>
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="m8 12 12-7 12 7v15l-12 7-12-7V12Zm0 0 12 7 12-7M20 19v15"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
            <span>{es ? 'AL PRODUCTO' : 'TO PRODUCT'}</span>
          </div>
        </figure>
      </div>
      <div className="editorial-container">
        <div
          className="specialty-strip"
          aria-label={es ? 'Especialidades' : 'Our focus'}
        >
          <span className="specialty-label">
            {es ? 'LOS DETALLES IMPORTAN' : 'IT’S ALL IN THE DETAILS'}
          </span>
          <span>{es ? 'Empaques personalizados' : 'Custom packaging'}</span>
          <span className="strip-star" aria-hidden="true">
            ✳
          </span>
          <span>{es ? 'Textiles con tu marca' : 'Branded textiles'}</span>
          <span className="strip-star" aria-hidden="true">
            ✳
          </span>
          <span>{es ? 'Desarrollo de producto' : 'Product development'}</span>
        </div>
      </div>
    </section>
  );
}
