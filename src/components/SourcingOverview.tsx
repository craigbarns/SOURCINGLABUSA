import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { DOORS, type PositioningLocale } from '@/lib/positioning';

/**
 * The two ways in, beside the hero: buying a product (the business) and
 * selling in the United States (a second path, shown with its limit).
 * Two doors rather than a catalogue of services; see AGENTS.md.
 */
export function SourcingOverview({ locale = 'en' }: { locale?: PositioningLocale }) {
  const es = locale === 'es';
  const zh = locale === 'zh';
  const { buy, sell } = DOORS[locale];
  // Written as they read in the sentence: "Packaging, textiles and sportswear."
  const productLinks = zh
    ? []
    : [
        ['/custom-packaging', 'Packaging'],
        ['/custom-textile', 'textiles'],
        ['/sportswear-sourcing', es ? 'ropa deportiva' : 'sportswear'],
      ];

  return (
    <aside
      className="sourcing-overview"
      aria-label={zh ? '两种合作方式' : es ? 'Dos formas de trabajar con nosotros' : 'Two ways to work with us'}
    >
      <p className="editorial-kicker">
        SOURCING LAB USA / {zh ? '两条路径' : es ? 'DOS RECORRIDOS' : 'TWO PATHS'}
      </p>
      <h2>{zh ? '您从哪里开始？' : es ? '¿Por dónde empieza?' : 'Where do you start?'}</h2>

      <div className="path-door">
        <span className="sourcing-category-number">01</span>
        <div>
          <h3>{buy.label}</h3>
          <p>
            {productLinks.length > 0 ? (
              <>
                {productLinks.map(([href, label], index) => (
                  <span key={href}>
                    {index > 0 && (index === productLinks.length - 1 ? (es ? ' y ' : ' and ') : ', ')}
                    <Link href={href}>{label}</Link>
                  </span>
                ))}
                .
              </>
            ) : (
              buy.scope
            )}
          </p>
          <p>{buy.deliverable}</p>
        </div>
      </div>

      <div className="path-door">
        <span className="sourcing-category-number">02</span>
        <div>
          <h3>
            <Link href={sell.href}>
              {sell.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </h3>
          <p>{sell.scope}</p>
          <p>{sell.deliverable}</p>
          {sell.limit && <p className="path-door-limit">{sell.limit}</p>}
        </div>
      </div>

      <p className="sourcing-overview-note">
        {zh
          ? '其他产品：按需进行可行性评估。'
          : es
            ? 'Otros productos: estudio de viabilidad bajo petición.'
            : 'Other products: reviewed for feasibility on request.'}
      </p>
    </aside>
  );
}
