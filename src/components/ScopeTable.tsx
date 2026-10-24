import { Check, FileText, X } from 'lucide-react';

import {
  MARKET_ENTRY_SCOPE,
  NOT_AN_IMPORTER,
  SCOPE,
  type PositioningLocale,
  type ScopeColumn,
} from '@/lib/positioning';

/**
 * The scope of a supply in three columns, identical on the homepage, About,
 * Contact and every service page. The wording comes from
 * src/lib/positioning.ts; nothing here should be edited per page.
 */
export function ScopeTable({
  locale = 'en',
  id = 'scope',
  path = 'supply',
}: {
  locale?: PositioningLocale;
  id?: string;
  /** "market-entry" shows the same columns for the U.S. path. */
  path?: 'supply' | 'market-entry';
}) {
  const copy = (path === 'market-entry' ? MARKET_ENTRY_SCOPE : SCOPE)[locale];
  const columns: Array<[ScopeColumn, 'included' | 'on-request' | 'excluded']> = [
    [copy.included, 'included'],
    [copy.onRequest, 'on-request'],
    [copy.excluded, 'excluded'],
  ];
  const Icon = { included: Check, 'on-request': FileText, excluded: X };

  return (
    <section
      id={id}
      className="editorial-section section-ruled scroll-mt-24"
      aria-labelledby={`${id}-heading`}
    >
      <div className="editorial-container">
        <p className="editorial-kicker">{copy.kicker}</p>
        <h2 id={`${id}-heading`} className="editorial-title">
          {copy.title}
        </h2>
        <div className="scope-grid">
          {columns.map(([column, kind]) => {
            const ColumnIcon = Icon[kind];
            return (
              <div key={kind} className={`scope-column scope-column--${kind}`}>
                <h3>
                  <ColumnIcon size={16} aria-hidden="true" />
                  {column.heading}
                </h3>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="scope-note">{NOT_AN_IMPORTER[locale]}</p>
      </div>
    </section>
  );
}
