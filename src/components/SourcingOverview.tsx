import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { PILLARS, type PositioningLocale } from '@/lib/positioning';

/**
 * The three pillars beside the hero, also shown on About: product supply,
 * factory checks and the cost before ordering. Wording: src/lib/positioning.ts.
 */
export function SourcingOverview({ locale = 'en' }: { locale?: PositioningLocale }) {
  const es = locale === 'es';
  const zh = locale === 'zh';
  // The pillar pages are written in English; the Chinese pillars stay unlinked.
  const linked = !zh;

  return (
    <aside
      className="sourcing-overview"
      aria-label={zh ? '我们做什么' : es ? 'Lo que hacemos' : 'What we do'}
    >
      <p className="editorial-kicker">
        SOURCING LAB USA / {zh ? '我们做什么' : es ? 'LO QUE HACEMOS' : 'WHAT WE DO'}
      </p>
      <h2>{zh ? '包装与纺织品，按书面订单供货。' : es ? 'Packaging y textil, con pedido por escrito.' : 'Packaging and textiles, on a written order.'}</h2>

      {PILLARS[locale].map((pillar, index) => (
        <div className="path-door" key={pillar.href}>
          <span className="sourcing-category-number">0{index + 1}</span>
          <div>
            <h3>
              {linked ? (
                <Link href={pillar.href}>
                  {pillar.title}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              ) : (
                pillar.title
              )}
            </h3>
            <p>{pillar.body}</p>
          </div>
        </div>
      ))}

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
