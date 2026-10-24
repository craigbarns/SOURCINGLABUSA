/**
 * The one promise the site makes, in every language.
 *
 * Set by the owner on 24 October 2026: the promise to keep is the contract's,
 * not the homepage's. Every page that states what Sourcing Lab USA does takes
 * its wording from here, so the hero, the footer, About, Contact and the
 * service pages cannot drift apart again. See AGENTS.md.
 */

export type PositioningLocale = 'en' | 'es' | 'zh';

/** Hero line, footer, About and Contact. */
export const PROMISE: Record<PositioningLocale, string> = {
  en: 'Custom packaging and textiles, sourced and supplied under a written contract. Invoiced from France or China — the company is named in your quotation.',
  es: 'Packaging y textiles a medida, fabricados y suministrados bajo contrato escrito. Facturación desde Francia o China: la empresa figura en su cotización.',
  zh: '定制包装与纺织品，工厂生产，按书面合同供货。由法国或中国公司开票——开票公司在报价单中写明。',
};

/** The same promise with its subject, for metadata and structured data. */
export const PROMISE_STATEMENT: Record<PositioningLocale, string> = {
  en: 'Sourcing Lab USA has custom packaging and textiles made at the factory and supplies them. The contract and the invoice come from a company in France or China, named in your quotation.',
  es: 'Sourcing Lab USA hace fabricar packaging y textiles a medida y los suministra. El contrato y la factura proceden de una empresa en Francia o China, indicada en su cotización.',
  zh: 'Sourcing Lab USA 委托工厂生产定制包装与纺织品并负责供货。合同与发票由报价单中写明的法国或中国公司出具。',
};

/** Shown under the hero buttons and under every scope table. */
export const NOT_AN_IMPORTER: Record<PositioningLocale, string> = {
  en: 'We are not a freight forwarder, a customs broker or an importer. Transport, insurance and U.S. entry are named in your quotation, or stay on your side.',
  es: 'No somos transitario, ni agente de aduanas, ni importador. El transporte, el seguro y la entrada en EE. UU. se indican en su cotización o quedan de su lado.',
  zh: '我们不是货运代理、报关行或进口商。运输、保险及美国入境事宜在报价单中写明责任方，或由您自行负责。',
};

/** The limit stated wherever the U.S. market path appears. */
export const MARKET_ENTRY_LIMIT: Record<PositioningLocale, string> = {
  en: 'No U.S. company is formed for you, and nothing is imported in your name.',
  es: 'No constituimos una empresa en EE. UU. por usted ni importamos a su nombre.',
  zh: '我们不为您在美国设立公司，也不以您的名义进口。',
};

/** The U.S. market path in one paragraph, limit first where the reader is a manufacturer. */
export const MARKET_ENTRY_SUMMARY: Record<PositioningLocale, string> = {
  en: 'For manufacturers already in production: a reading of the U.S. requirements that apply, a wholesale price and targeted introductions to U.S. buyers. No U.S. company is formed for you, and nothing is imported in your name.',
  es: 'Para fabricantes que ya están en producción: una lectura de los requisitos de EE. UU. aplicables, un precio mayorista y presentaciones selectivas a compradores de EE. UU. No constituimos una empresa en EE. UU. por usted ni importamos a su nombre.',
  zh: '我们不为您在美国设立公司，也不以您的名义进口。在此前提下，我们为已投产的制造企业提供适用的美国合规要求解读、批发价格体系，以及精准的美国买家引荐。',
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

/**
 * The same three columns for the second path (manufacturers selling in the
 * United States). Used where that path leads, such as the Chinese homepage,
 * which opens on the same limit as the rest of the site.
 */
export const MARKET_ENTRY_SCOPE: Record<PositioningLocale, ScopeCopy> = {
  en: {
    kicker: 'SCOPE OF THE U.S. PATH',
    title: 'What the U.S. path includes.',
    included: {
      heading: 'Included',
      items: ['A reading of the U.S. requirements that apply', 'A wholesale price for the chosen channel', 'Targeted introductions to U.S. buyers'],
    },
    onRequest: {
      heading: 'Only if written into the quotation',
      items: ['HS code classification', 'Landed-cost model', 'Lab testing by a named laboratory'],
    },
    excluded: {
      heading: 'Outside the scope',
      items: ['A U.S. company formed for you', 'Importing in your name', 'Customs clearance', 'Freight forwarding', 'U.S. storage', 'Legal representation'],
    },
  },
  es: {
    kicker: 'ALCANCE DEL RECORRIDO PARA EE. UU.',
    title: 'Qué incluye el recorrido para EE. UU.',
    included: {
      heading: 'Incluido',
      items: ['Lectura de los requisitos de EE. UU. aplicables', 'Un precio mayorista para el canal elegido', 'Presentaciones selectivas a compradores de EE. UU.'],
    },
    onRequest: {
      heading: 'Solo si figura en la cotización',
      items: ['Clasificación arancelaria HS', 'Modelo de coste puesto en destino', 'Ensayos por un laboratorio designado'],
    },
    excluded: {
      heading: 'Fuera de nuestro alcance',
      items: ['Una empresa en EE. UU. a su nombre', 'Importar a su nombre', 'Despacho de aduanas', 'Transitario (freight forwarding)', 'Almacenamiento en EE. UU.', 'Representación legal'],
    },
  },
  zh: {
    kicker: '服务边界',
    title: '美国市场路径包含什么。',
    included: {
      heading: '服务包含',
      items: ['适用的美国合规要求解读', '面向所选渠道的批发价格体系', '精准的美国买家引荐'],
    },
    onRequest: {
      heading: '仅在报价单写明时提供',
      items: ['HS税号归类研究', '到岸成本模型', '由指定实验室进行的检测'],
    },
    excluded: {
      heading: '不在服务范围内',
      items: ['为您设立美国公司', '以您的名义进口', '清关', '货运代理', '美国仓储', '法定代表'],
    },
  },
};

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

export interface DoorCopy {
  /** Short label for the hero button that opens this path. */
  button: string;
  label: string;
  scope: string;
  deliverable: string;
  /** Shown on the U.S. market path only. */
  limit?: string;
  cta: string;
  href: string;
}

export const DOORS: Record<PositioningLocale, { buy: DoorCopy; sell: DoorCopy }> = {
  en: {
    buy: {
      button: 'I’m buying a product',
      label: 'You are buying a product',
      scope: 'Packaging, textiles, sportswear.',
      deliverable: 'You get factory options, prices, a sample, then the order.',
      cta: 'Send a product brief',
      href: '#contact',
    },
    sell: {
      button: 'I want to sell in the U.S.',
      label: 'You want to sell in the United States',
      scope: 'For manufacturers already in production.',
      deliverable: 'You get a reading of the U.S. requirements that apply, a wholesale price, and targeted introductions to U.S. buyers.',
      limit: MARKET_ENTRY_LIMIT.en,
      cta: 'See the U.S. market path',
      href: '/us-market-entry',
    },
  },
  es: {
    buy: {
      button: 'Compro un producto',
      label: 'Usted compra un producto',
      scope: 'Packaging, textiles, ropa deportiva.',
      deliverable: 'Recibe opciones de fábrica, precios, una muestra y luego el pedido.',
      cta: 'Enviar un brief de producto',
      href: '#contact',
    },
    sell: {
      button: 'Quiero vender en EE. UU.',
      label: 'Usted quiere vender en Estados Unidos',
      scope: 'Para fabricantes que ya están en producción.',
      deliverable: 'Recibe una lectura de los requisitos de EE. UU. aplicables, un precio mayorista y presentaciones selectivas a compradores de EE. UU.',
      limit: MARKET_ENTRY_LIMIT.es,
      cta: 'Ver el recorrido para EE. UU.',
      href: '/us-market-entry',
    },
  },
  zh: {
    buy: {
      button: '我要采购产品',
      label: '您要采购产品',
      scope: '包装、纺织品、运动服。',
      deliverable: '您将获得：工厂方案、报价、样品，然后下单。',
      cta: '提交产品需求',
      href: '#contact',
    },
    sell: {
      button: '我想在美国销售',
      label: '您想在美国销售',
      scope: '面向已投产的制造企业。',
      deliverable: '您将获得：适用的美国合规要求解读、批发价格体系，以及精准的美国买家引荐。',
      limit: MARKET_ENTRY_LIMIT.zh,
      cta: '了解美国市场路径',
      href: '#contact',
    },
  },
};
