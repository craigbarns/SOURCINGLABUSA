import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/** Product scope in plain text, without illustrative products or stock imagery. */
export function SourcingOverview({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const es = locale === 'es';
  const categories = es ? [
    ['/product-sourcing', '01', 'Sourcing y fabricación global', 'Búsqueda de fábricas directas, negociación y utillaje.'],
    ['/factory-verification', '02', 'Verificación de fábricas y QC', 'Auditorías in situ, verificación por capas y control de calidad.'],
    ['/landed-cost-analysis', '03', 'Aduanas, aranceles y costes', 'Clasificación HTSUS, Sección 301 y modelado logístico.'],
    ['/us-market-entry', '04', 'Entrada al mercado de EE. UU.', 'Apoyo estratégico y representación comercial para fabricantes.'],
  ] : [
    ['/product-sourcing', '01', 'Global Product Sourcing', 'Direct factory identification, vetting, and negotiation.'],
    ['/factory-verification', '02', 'Factory Verification & QC', 'On-site audits, multi-layer vetting, and tailored quality checks.'],
    ['/landed-cost-analysis', '03', 'Tariffs, Customs & Landed Cost', '10-digit HTS codes, Section 301 duties, and logistics modeling.'],
    ['/us-market-entry', '04', 'U.S. Market Entry & Sales', 'Helping foreign manufacturers prepare entry and access local representation.'],
  ];
  return (
    <aside className="sourcing-overview" aria-label={es ? 'Pilares de servicio' : 'Service pillars'}>
      <p className="editorial-kicker">SOURCING LAB USA / {es ? 'SERVICIOS PRINCIPALES' : 'CORE PILLARS'}</p>
      <h2>{es ? '¿Qué proyecto deseas gestionar?' : 'What do you need accomplished?'}</h2>
      <div>{categories.map(([href, number, title, body]) => (
        <Link href={href} key={number} className="sourcing-category">
          <span className="sourcing-category-number">{number}</span>
          <div><h3>{title}</h3><p>{body}</p></div>
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      ))}</div>
      <p className="sourcing-overview-note">{es ? 'Sourcing directo · Verificación en fábrica · Entrada en EE. UU.' : 'Direct Sourcing · Factory Verification · U.S. Market Entry'}</p>
    </aside>
  );
}
