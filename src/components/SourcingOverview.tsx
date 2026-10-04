import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/** Product scope in plain text, without illustrative products or stock imagery. */
export function SourcingOverview({ locale = 'en' }: { locale?: 'en' | 'es' | 'zh' }) {
  const es = locale === 'es';
  const zh = locale === 'zh';
  const categories = zh ? [
    ['#representation', '01', '全美商业代表与买家对接', '美东美西工作时间沟通，推介全美批发商与采购经理。'],
    ['#compliance', '02', '法规合规与准入标准映射', 'FDA注册、儿童产品CPC认证、FCC及加州65号提案。'],
    ['#landed-cost', '03', '海关税号与到岸成本测算', '10位数HTS税号归类研究、Section 301额外关税与到岸利润分析。'],
    ['#fulfillment', '04', '美国本土3PL海外仓履约', '主流港口仓储对接、小批量分拨打托与退换货协同。'],
  ] : es ? [
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
    <aside className="sourcing-overview" aria-label={zh ? '核心落地能力' : es ? 'Pilares de servicio' : 'Service pillars'}>
      <p className="editorial-kicker">SOURCING LAB USA / {zh ? '核心落地能力' : es ? 'SERVICIOS PRINCIPALES' : 'CORE PILLARS'}</p>
      <h2>{zh ? '您的出海核心目标是什么？' : es ? '¿Qué proyecto deseas gestionar?' : 'What do you need accomplished?'}</h2>
      <div>{categories.map(([href, number, title, body]) => (
        <Link href={href} key={number} className="sourcing-category">
          <span className="sourcing-category-number">{number}</span>
          <div><h3>{title}</h3><p>{body}</p></div>
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      ))}</div>
      <p className="sourcing-overview-note">{zh ? '全美商业代表 · 法规准入映射 · 3PL海外仓履约' : es ? 'Sourcing directo · Verificación en fábrica · Entrada en EE. UU.' : 'Direct Sourcing · Factory Verification · U.S. Market Entry'}</p>
    </aside>
  );
}
