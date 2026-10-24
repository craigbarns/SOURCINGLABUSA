import { Fragment } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

import { CtaLink } from './CtaLink';
import { SourcingOverview } from './SourcingOverview';
import {
  DOORS,
  MARKET_ENTRY_SUMMARY,
  NOT_AN_IMPORTER,
  PROMISE,
} from '@/lib/positioning';

/**
 * English and Spanish open on the promise: product supply from the factory,
 * under a written contract. The Chinese hub is aimed at manufacturers selling
 * into the United States, so it opens on that path's limit instead.
 * All three end on the same fixed line. Wording: src/lib/positioning.ts.
 */
export function Hero({ locale = 'en' }: { locale?: 'en' | 'es' | 'zh' }) {
  const es = locale === 'es';
  const zh = locale === 'zh';
  const { buy, sell } = DOORS[locale];
  const contactHref = es ? '/es#contact' : '#contact';

  return (
    <section className="editorial-hero" aria-labelledby="hero-heading">
      <div className="editorial-container hero-layout sourcing-hero">
        <div className="hero-copy animate-rise">
          <p className="editorial-kicker">
            <span className="launch-dot" aria-hidden="true" />
            {zh
              ? '美国市场准入 · 边界先写清楚'
              : es
                ? 'PACKAGING Y TEXTILES A MEDIDA · PROYECTOS ABIERTOS'
                : 'CUSTOM PACKAGING & TEXTILES · PROJECTS OPEN NOW'}
          </p>
          <h1 id="hero-heading">
            {zh ? (
              <>
                进入美国市场<br />
                <em>先把边界写清楚。</em>
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
            {zh
              ? MARKET_ENTRY_SUMMARY.zh
              : PROMISE[locale]}
          </p>
          <div className="hero-actions">
            <CtaLink
              href={zh ? '#contact' : contactHref}
              location="hero"
              label={zh ? sell.button : buy.button}
              className="editorial-button"
            >
              {zh ? sell.button : buy.button}
              <ArrowUpRight size={18} aria-hidden="true" />
            </CtaLink>
            <CtaLink
              href={zh ? '#scope' : sell.href}
              location="hero"
              label={zh ? '查看服务边界' : sell.button}
              className="editorial-text-link"
            >
              {zh ? '查看服务边界' : sell.button}
              {zh ? (
                <ArrowDown size={16} aria-hidden="true" />
              ) : (
                <ArrowUpRight size={16} aria-hidden="true" />
              )}
            </CtaLink>
          </div>
          <p className="sourcing-launch-note">{NOT_AN_IMPORTER[locale]}</p>
        </div>
        <SourcingOverview locale={locale} />
      </div>
      <div className="editorial-container specialty-strip flex-wrap gap-y-3">
        <span className="specialty-label">
          {zh ? '服务重点' : es ? 'LO QUE SUMINISTRAMOS' : 'WHAT WE SUPPLY'}
        </span>
        {(zh
          ? ['合规要求解读', '批发价格体系', '美国买家引荐', '包装与纺织品供货']
          : es
            ? ['Packaging a medida', 'Cajas y etiquetas', 'Ropa', 'Ropa deportiva', 'Marca privada']
            : ['Custom packaging', 'Boxes & labels', 'Clothing', 'Sportswear', 'Private label']
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
