import { Fragment } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

import { CtaLink } from './CtaLink';
import { SourcingOverview } from './SourcingOverview';
import { HERO_NOTE, PROMISE } from '@/lib/positioning';

/**
 * Every language opens on the promise: custom packaging and textiles from the
 * factory, under a contract and invoice from France or China. The line under
 * the buttons says what we are not. Wording: src/lib/positioning.ts.
 */
export function Hero({ locale = 'en' }: { locale?: 'en' | 'es' | 'zh' }) {
  const es = locale === 'es';
  const zh = locale === 'zh';
  const contactHref = es ? '/es#contact' : '#contact';
  const primary = zh ? '提交产品需求' : es ? 'Enviar un brief de producto' : 'Send a product brief';
  const secondary = zh ? '查看供货范围' : es ? 'Ver qué incluye un suministro' : 'See what a supply includes';

  return (
    <section className="editorial-hero" aria-labelledby="hero-heading">
      <div className="editorial-container hero-layout sourcing-hero">
        <div className="hero-copy animate-rise">
          <p className="editorial-kicker">
            <span className="launch-dot" aria-hidden="true" />
            {zh
              ? '定制包装与纺织品 · 现已接受项目'
              : es
                ? 'PACKAGING Y TEXTILES A MEDIDA · PROYECTOS ABIERTOS'
                : 'CUSTOM PACKAGING & TEXTILES · PROJECTS OPEN NOW'}
          </p>
          <h1 id="hero-heading">
            {zh ? (
              <>
                产品供货，<br />
                <em>直接来自工厂。</em>
              </>
            ) : es ? (
              <>
                Suministro de producto,<br />
                <em>desde la fábrica.</em>
              </>
            ) : (
              <>
                Product supply,<br />
                <em>from the factory.</em>
              </>
            )}
          </h1>
          <p className="hero-description">
            {PROMISE[locale]}
          </p>
          <div className="hero-actions">
            <CtaLink
              href={zh ? '#contact' : contactHref}
              location="hero"
              label={primary}
              className="editorial-button"
            >
              {primary}
              <ArrowUpRight size={18} aria-hidden="true" />
            </CtaLink>
            <CtaLink
              href="#scope"
              location="hero"
              label={secondary}
              className="editorial-text-link"
            >
              {secondary}
              <ArrowDown size={16} aria-hidden="true" />
            </CtaLink>
          </div>
          <p className="sourcing-launch-note">{HERO_NOTE[locale]}</p>
        </div>
        <SourcingOverview locale={locale} />
      </div>
      <div className="editorial-container specialty-strip flex-wrap gap-y-3">
        <span className="specialty-label">
          {zh ? '服务范围' : es ? 'ÁREAS DE APOYO' : 'AREAS OF SUPPORT'}
        </span>
        {(zh
          ? ['包装', '纺织品', '工厂方案', '样品', '书面报价', '由法国或中国开票']
          : es
            ? ['Packaging', 'Textil', 'Opciones de fábrica', 'Muestras', 'Presupuesto por escrito', 'Facturado desde Francia o China']
            : ['Packaging', 'Textiles', 'Factory options', 'Samples', 'Written quotation', 'Invoiced from France or China']
        ).map((item, index, all) => (
          <Fragment key={item}>
            <span>{item}</span>
            {index < all.length - 1 && <span aria-hidden="true">✳</span>}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
