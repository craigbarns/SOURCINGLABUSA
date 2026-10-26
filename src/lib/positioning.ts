/**
 * The one promise the site makes, in every language.
 *
 * Set by the owner on 24 October 2026: the promise to keep is the contract's,
 * not the homepage's, and the site stays on sourcing (the U.S. market-entry
 * path was dropped the same day). Every page that states what Sourcing Lab USA
 * does takes its wording from here, so the hero, the footer, About, Contact
 * and the service pages cannot drift apart again. See AGENTS.md.
 */

export type PositioningLocale = 'en' | 'es' | 'zh';

/** Hero paragraph, About and the opening of the homepage answers. */
export const PROMISE: Record<PositioningLocale, string> = {
  en: 'We supply custom packaging and textiles, sourced from factories — garments also through our partner in Bangladesh. The contract and the invoice come from a company in France or China, named in your quotation.',
  es: 'Suministramos packaging y textil a medida, producidos en fábrica, y prendas de vestir también con nuestro socio en Bangladés. El contrato y la factura salen de una sociedad en Francia o en China, indicada en el presupuesto.',
  zh: '我们供应定制包装和纺织品，由工厂生产，服装也可通过我们在孟加拉国的合作伙伴生产。合同和发票由法国或中国的公司开具，公司名称写在报价单上。',
};

/** The same promise with its subject, for structured data. */
export const PROMISE_STATEMENT: Record<PositioningLocale, string> = {
  en: 'Sourcing Lab USA supplies custom packaging and textiles, sourced from factories, and garment production through its partner in Bangladesh. The contract and the invoice come from a company in France or China, named in your quotation.',
  es: 'Sourcing Lab USA suministra packaging y textil a medida, producidos en fábrica, y prendas de vestir a través de su socio en Bangladés. El contrato y la factura salen de una sociedad en Francia o en China, indicada en el presupuesto.',
  zh: 'Sourcing Lab USA 供应定制包装和纺织品，由工厂生产，并通过其在孟加拉国的合作伙伴生产服装。合同和发票由法国或中国的公司开具，公司名称写在报价单上。',
};

/** Homepage meta description. */
export const HOME_DESCRIPTION: Record<PositioningLocale, string> = {
  en: 'Custom packaging and textiles sourced from factories in China. Quotations, samples and supply, contracted and invoiced by the company named in your quotation.',
  es: 'Packaging y textil a medida, producidos en fábrica en China. Presupuesto, muestras y suministro, con contrato y factura de la sociedad del presupuesto.',
  zh: '我们供应定制包装和纺织品，由工厂直接生产。报价、打样和供货，合同与发票由报价单上写明的法国或中国的公司开具。我们不是货代，也不是进口商。',
};

/** The line under the hero buttons. */
export const HERO_NOTE: Record<PositioningLocale, string> = {
  en: 'We are not a freight forwarder, a customs broker, or the importer.',
  es: 'No somos transitario, ni agente de aduanas, ni el importador.',
  zh: '我们不是货代、报关行，也不是进口商。',
};

/** The sentence under the logo in the footer, on every page. */
export const FOOTER_LINE: Record<PositioningLocale, string> = {
  en: 'Custom packaging and textiles, sourced from factories. Contract and invoice from France or China, with the company named in your quotation. We are not the freight forwarder or the importer.',
  es: 'Suministramos packaging y textil a medida, producidos en fábrica. El contrato y la factura salen de una sociedad en Francia o en China, indicada en el presupuesto. No somos transitario ni importador.',
  zh: '我们供应定制包装和纺织品，由工厂生产。合同和发票由法国或中国的公司开具，公司名称写在报价单上。我们不是货代，也不是进口商。',
};

/** Under every scope table and in answers about freight and import. */
export const NOT_AN_IMPORTER: Record<PositioningLocale, string> = {
  en: 'We are not a freight forwarder, a customs broker or an importer. Transport, insurance and U.S. entry are named in your quotation, or stay on your side.',
  es: 'No somos transitario, ni agente de aduanas, ni importador. El transporte, el seguro y la entrada en EE. UU. se indican en su cotización o quedan de su lado.',
  zh: '我们不是货运代理、报关行或进口商。运输、保险及美国入境事宜在报价单中写明责任方，或由您自行负责。',
};

export interface ScopeColumn {
  heading: string;
  items: string[];
}

export interface ScopeCopy {
  kicker: string;
  title: string;
  included: ScopeColumn;
  onRequest: ScopeColumn;
  excluded: ScopeColumn;
}

export const SCOPE: Record<PositioningLocale, ScopeCopy> = {
  en: {
    kicker: 'SCOPE OF A SUPPLY',
    title: 'What a supply includes.',
    included: {
      heading: 'Included in a supply',
      items: ['Product brief', 'Factory search', 'Pricing', 'Samples', 'Order and production follow-up'],
    },
    onRequest: {
      heading: 'Only if written into the quotation',
      items: ['Third-party inspection', 'Lab testing', 'HS code classification', 'Landed-cost model'],
    },
    excluded: {
      heading: 'Outside our scope',
      items: ['Customs clearance', 'Freight forwarding', 'U.S. storage', 'A U.S. company formed for you'],
    },
  },
  es: {
    kicker: 'ALCANCE DE UN SUMINISTRO',
    title: 'Qué incluye un suministro.',
    included: {
      heading: 'Incluido en un suministro',
      items: ['Brief del producto', 'Búsqueda de fábrica', 'Precio', 'Muestras', 'Pedido y seguimiento de producción'],
    },
    onRequest: {
      heading: 'Solo si figura en la cotización',
      items: ['Inspección por terceros', 'Ensayos de laboratorio', 'Clasificación arancelaria HS', 'Modelo de coste puesto en destino'],
    },
    excluded: {
      heading: 'Fuera de nuestro alcance',
      items: ['Despacho de aduanas', 'Transitario (freight forwarding)', 'Almacenamiento en EE. UU.', 'Una empresa en EE. UU. a su nombre'],
    },
  },
  zh: {
    kicker: '供货范围',
    title: '一次供货包含什么。',
    included: {
      heading: '供货包含',
      items: ['产品需求说明', '工厂寻源', '报价', '样品', '下单与生产跟进'],
    },
    onRequest: {
      heading: '仅在报价单写明时提供',
      items: ['第三方验货', '实验室检测', 'HS税号归类', '到岸成本模型'],
    },
    excluded: {
      heading: '不在服务范围内',
      items: ['清关', '货运代理', '美国仓储', '为您设立美国公司'],
    },
  },
};

export interface PillarCopy {
  title: string;
  body: string;
  href: string;
}

/** The three pillars beside the hero, also shown on About. */
export const PILLARS: Record<PositioningLocale, PillarCopy[]> = {
  en: [
    {
      title: 'Product supply',
      body: 'Factory options, pricing, samples, and a written order for packaging and textiles.',
      href: '/china-to-us-procurement',
    },
    {
      title: 'Factory checks',
      body: 'Company records reviewed on every project. An on-site audit only if the quotation includes it.',
      href: '/factory-verification',
    },
    {
      title: 'Cost before you order',
      body: 'HTS research and a landed-cost model. We do not book freight or clear customs.',
      href: '/landed-cost-analysis',
    },
  ],
  es: [
    {
      title: 'Suministro de producto',
      body: 'Opciones de fábrica, precios, muestras y un pedido por escrito de packaging y textil.',
      href: '/china-to-us-procurement',
    },
    {
      title: 'Comprobación de fábricas',
      body: 'Registros de la empresa revisados en cada proyecto. Una auditoría in situ solo si el presupuesto la incluye.',
      href: '/factory-verification',
    },
    {
      title: 'El coste antes de pedir',
      body: 'Investigación HTS y un modelo de coste puesto en destino. No reservamos flete ni despachamos aduanas.',
      href: '/landed-cost-analysis',
    },
  ],
  zh: [
    {
      title: '产品供货',
      body: '为包装和纺织品提供工厂方案、报价、样品和书面订单。',
      href: '/china-to-us-procurement',
    },
    {
      title: '工厂核查',
      body: '每个项目都核查企业登记信息。仅在报价单包含时才进行现场审核。',
      href: '/factory-verification',
    },
    {
      title: '下单前的成本',
      body: 'HTS税号研究和到岸成本模型。我们不订舱，也不办理清关。',
      href: '/landed-cost-analysis',
    },
  ],
};
