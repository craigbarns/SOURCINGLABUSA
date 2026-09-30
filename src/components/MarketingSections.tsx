import Image from 'next/image';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  FileCheck,
  Globe2,
  HelpCircle,
  Layers,
  Lock,
  Plus,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { ContactForm } from './ContactForm';
import { homeFaqs, homeFaqsES } from '@/lib/home-faqs';

export function MarketingSections({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const es = locale === 'es';

  const riskFactors = es
    ? [
        {
          title: 'Empresas de trading encubiertas',
          body: 'Intermediarios que se presentan como fábricas directas en directorios B2B, cobrando sobreprecios del 20% al 40% y subcontratando a talleres no auditados.',
        },
        {
          title: 'Bajada de calidad (Quality Fade)',
          body: 'Muestras iniciales de alta calidad ("muestras doradas") que sufren degradación de materiales y mano de obra una vez pagado el anticipo.',
        },
        {
          title: 'Fallos de comunicación técnica',
          body: 'Dibujos técnicos y especificaciones malinterpretados debido a barreras lingüísticas, provocando errores dimensionales y ensamblajes incompatibles.',
        },
        {
          title: 'Incumplimiento normativo y riesgos FDA/CPSC',
          body: 'Falta de certificaciones válidas para el mercado estadounidense, riesgos de retención aduanera (CBP) y demandas por normativas como Prop 65.',
        },
        {
          title: 'Sorpresas arancelarias y Sección 301',
          body: 'Códigos HTS mal clasificados y aranceles punitivos de la Sección 301 no previstos que destruyen el margen bruto de la importación.',
        },
        {
          title: 'Costes en destino mal calculados',
          body: 'Presupuestos EXW o FOB que omiten fletes marítimos, demoras portuarias, tasas de procesamiento aduanero (MPF) y transporte interior.',
        },
      ]
    : [
        {
          title: 'Hidden Trading Intermediaries',
          body: 'Middlemen posing as direct manufacturers on online B2B portals, adding 20% to 40% markups while subcontracting to unvetted workshops.',
        },
        {
          title: 'Quality Fade & Material Substitution',
          body: 'Golden samples that look flawless, followed by mass production runs suffering from degraded resins, diluted dyes, and rushed assembly.',
        },
        {
          title: 'Cross-Cultural & Technical Misalignment',
          body: 'Complex CAD drawings and critical tolerances lost in translation, leading to dimensional mismatches and unworkable product fits.',
        },
        {
          title: 'Regulatory & U.S. Compliance Violations',
          body: 'Missing mandatory test certificates (CPSC, FDA, FCC, California Prop 65) resulting in customs holds, port seizures, or catastrophic recalls.',
        },
        {
          title: 'Section 301 Tariffs & Classification Traps',
          body: 'Misclassified HS codes and unexpected 25% Section 301 tariffs that wipe out operating margins upon U.S. port arrival.',
        },
        {
          title: 'Landed-Cost Calculation Blindspots',
          body: 'Factory EXW quotes that fail to account for origin drayage, ocean freight volatility, port demurrage, customs brokerage, and MPF fees.',
        },
      ];

  const workflowSteps = es
    ? [
        {
          step: '01',
          name: 'Definir',
          title: 'Especificaciones y economía objetivo',
          body: 'Analizamos tu producto, planos técnicos, lista de materiales (BOM), volúmenes proyectados y precio objetivo puesto en destino.',
        },
        {
          step: '02',
          name: 'Localizar',
          title: 'Búsqueda directa de fábricas de primer nivel',
          body: 'Identificamos y preseleccionamos fabricantes directos dentro de los clusters industriales especializados, descartando intermediarios.',
        },
        {
          step: '03',
          name: 'Verificar',
          title: 'Verificación por capas y auditorías',
          body: 'Evaluamos registros oficiales, capacidad productiva, maquinaria y alcance comercial, organizando auditorías en fábrica cuando corresponde.',
        },
        {
          step: '04',
          name: 'Negociar',
          title: 'Precios, MOQ y propiedad de utillaje',
          body: 'Negociamos precios de fábrica, mínimos de pedido (MOQ) y propiedad de moldes, coordinando acuerdos de confidencialidad con asesoramiento legal especializado cuando sea necesario.',
        },
        {
          step: '05',
          name: 'Validar',
          title: 'Muestras doradas y control de calidad adaptado',
          body: 'Supervisamos prototipos físicos y coordinamos inspecciones de calidad independientes con criterios de aceptación adaptados a tu producto antes del pago final.',
        },
        {
          step: '06',
          name: 'Entregar',
          title: 'Logística, aduanas y entrega en destino',
          body: 'Coordinamos fletes marítimos o aéreos, facilitamos el despacho con agentes de aduanas cualificados y organizamos la entrega en destino.',
        },
      ]
    : [
        {
          step: '01',
          name: 'Define',
          title: 'Technical Specs & Target Economics',
          body: 'We analyze your product specifications, CAD drawings, bills of materials (BOM), volume projections, and target delivered unit economics.',
        },
        {
          step: '02',
          name: 'Source',
          title: 'Direct Manufacturer Screening',
          body: 'We identify and evaluate direct manufacturing partners across specialized industrial clusters in China, Asia, and other key markets.',
        },
        {
          step: '03',
          name: 'Verify',
          title: 'Layered Due Diligence & Audits',
          body: 'We review corporate registrations, verify operational scope and machinery, and arrange on-site factory audits when appropriate.',
        },
        {
          step: '04',
          name: 'Negotiate',
          title: 'Commercial Terms & Tooling Ownership',
          body: 'We help negotiate factory pricing, minimum order quantities, and tooling ownership covenants, coordinating legal agreements with specialized counsel when required.',
        },
        {
          step: '05',
          name: 'Validate',
          title: 'Golden Samples & Tailored Quality Control',
          body: 'We oversee prototype sample iterations and coordinate independent on-site quality inspections with acceptance criteria tailored to your product category.',
        },
        {
          step: '06',
          name: 'Deliver',
          title: 'Logistics Coordination & Customs Entry',
          body: 'We coordinate ocean and air freight bookings, align with qualified customs brokers for CBP entry filings, and arrange transport to your receiving facility.',
        },
      ];

  const primaryServices = [
    {
      title: es ? 'Sourcing y compras de producto' : 'Product Sourcing',
      href: '/product-sourcing',
      desc: es
        ? 'Búsqueda integral de fabricantes, licitación de precios directos y gestión integral del suministro internacional.'
        : 'End-to-end direct factory procurement, supplier screening, price negotiation, and delivered international supply.',
      tag: es ? 'Sourcing directo' : 'Direct Factory',
    },
    {
      title: es ? 'Sourcing y fabricación en China' : 'China Sourcing Services',
      href: '/china-sourcing',
      desc: es
        ? 'Acceso directo a los clusters industriales de China con supervisión bilingüe sobre el terreno y gestión de producción.'
        : 'On-the-ground manufacturing coordination, supplier screening, and bilingual negotiation across China’s industrial hubs.',
      tag: es ? 'Fabricación China' : 'China Execution',
    },
    {
      title: es ? 'Verificación de fábricas' : 'Factory Verification',
      href: '/factory-verification',
      desc: es
        ? 'Auditorías de antecedentes, comprobación de registros oficiales (AIC) e inspección física de maquinaria antes de transferir capital.'
        : 'Physical on-site audits, government corporate registry checks, machine verification, and anti-fraud screening.',
      tag: es ? 'Due Diligence' : 'Due Diligence',
    },
    {
      title: es ? 'Auditoría técnica de proveedores' : 'Supplier Audits in China',
      href: '/supplier-audit-china',
      desc: es
        ? 'Evaluación técnica profunda de sistemas de calidad (ISO 9001), capacidad productiva y cumplimiento social en fábrica.'
        : 'In-depth on-site audits evaluating quality management systems (QMS), machine maintenance, and workforce compliance.',
      tag: es ? 'Auditoría ISO' : 'Technical QMS',
    },
    {
      title: es ? 'Desarrollo de producto y OEM/ODM' : 'Product Development & OEM/ODM',
      href: '/product-development',
      desc: es
        ? 'Conversión de archivos CAD y prototipos en productos de producción masiva con análisis DFM y utillaje propio.'
        : 'Convert CAD models into mass-produced goods with Design for Manufacturing (DFM) analysis and custom tooling management.',
      tag: es ? 'Ingeniería y moldes' : 'Tooling & DFM',
    },
    {
      title: es ? 'Fabricación de marca privada' : 'Private Label Manufacturing',
      href: '/private-label-manufacturing',
      desc: es
        ? 'Personalización llave en mano de plataformas de producto existentes con branding exclusivo, acabados y packaging a medida.'
        : 'Turnkey private label sourcing, custom product customization, bespoke packaging, and retail-ready compliance.',
      tag: es ? 'Marca propia' : 'Private Label',
    },
    {
      title: es ? 'Control de calidad e inspecciones' : 'Quality Control & Inspections',
      href: '/quality-control-china',
      desc: es
        ? 'Inspecciones independientes previas al envío (PSI) y durante la producción (DUPRO) con niveles de muestreo y criterios adaptados a tu producto.'
        : 'Independent pre-shipment inspections (PSI) and during-production audits with sampling levels and defect criteria tailored to your product category.',
      tag: es ? 'Control de calidad' : 'Quality Control',
    },
    {
      title: es ? 'Sourcing de packaging personalizado' : 'Packaging Sourcing',
      href: '/packaging-sourcing',
      desc: es
        ? 'Cajas rígidas, estuches plegables, cajas de envío corrugadas e insertos protectores directamente con fabricantes especializados.'
        : 'Direct factory procurement of luxury rigid boxes, folding cartons, corrugated mailers, and protective inserts.',
      tag: es ? 'Packaging a medida' : 'Custom Packaging',
    },
    {
      title: es ? 'Consultoría arancelaria y códigos HS' : 'HS Code & Tariff Consulting',
      href: '/hs-code-consulting',
      desc: es
        ? 'Clasificación precisa HTSUS a 10 dígitos, análisis de aranceles Sección 301 e identificación de requisitos aduaneros.'
        : 'Definitive 10-digit HTSUS tariff classification, Section 301 duty analysis, and tariff research in support of trade compliance.',
      tag: es ? 'Aduanas y HTS' : 'Tariff Advisory',
    },
    {
      title: es ? 'Análisis de coste puesto en destino' : 'Landed Cost Analysis',
      href: '/landed-cost-analysis',
      desc: es
        ? 'Modelado financiero exhaustivo: precio de fábrica, flete marítimo, aranceles, tasas MPF/HMF y transporte interior.'
        : 'Deterministic unit economics modeling factory gate pricing, freight, tariffs, customs fees, and domestic drayage.',
      tag: es ? 'Modelo financiero' : 'Unit Economics',
    },
    {
      title: es ? 'Entrada al mercado de EE. UU.' : 'U.S. Market Entry Consulting',
      href: '/us-market-entry',
      desc: es
        ? 'Evaluación y preparación operativa para fabricantes internacionales: identificación de normativas aplicables, coordinación 3PL y canales B2B.'
        : 'Strategic and operational preparation for international manufacturers: identifying applicable requirements, 3PL coordination, and commercial channels.',
      tag: es ? 'Expansión EE. UU.' : 'Market Entry',
    },
    {
      title: es ? 'Representación comercial en EE. UU.' : 'U.S. Sales Representation',
      href: '/us-sales-representation',
      desc: es
        ? 'Apoyo comercial y prospección B2B en EE. UU. para fabricantes internacionales que buscan conectar con distribuidores y compradores comerciales.'
        : 'Dedicated commercial sales representation supporting international manufacturers seeking to connect with American trade buyers and distributors.',
      tag: es ? 'Ventas B2B EE. UU.' : 'Sales Agent',
    },
  ];

  const geoAnswers = es
    ? [
        {
          q: '¿Qué hace una empresa de sourcing?',
          a: 'Una empresa de sourcing ayuda a las empresas a gestionar su aprovisionamiento internacional: evalúa fabricantes directos, analiza costes y mínimos de pedido (MOQ), supervisa el desarrollo de muestras, coordina inspecciones independientes de calidad y apoya la logística y el paso aduanero hasta el almacén del cliente.',
        },
        {
          q: '¿Qué es un agente de sourcing en China?',
          a: 'Un agente de sourcing en China actúa como intermediario local para buscar proveedores y coordinar pedidos a cambio de una comisión. A diferencia de un proveedor o una empresa de suministro directo como Sourcing Lab USA, el agente suele presentar fábricas mientras el comprador asume la relación contractual y el riesgo principal.',
        },
        {
          q: '¿Cómo se verifica un fabricante en el extranjero?',
          a: 'La verificación requiere un enfoque por capas: comprobación de registros oficiales y licencias de actividad, revisión de titularidad y ámbito comercial, evaluación de maquinaria e instalaciones, revisión documental y de certificaciones, auditorías en fábrica cuando corresponde y validación de muestras previas a la producción.',
        },
        {
          q: '¿Cómo puede entrar una empresa internacional al mercado de EE. UU.?',
          a: 'Una empresa internacional entra al mercado de EE. UU. identificando los requisitos normativos aplicables (CPSC, FDA, FCC, Prop 65) con especialistas cualificados, evaluando las opciones de importación y fianza aduanera, coordinando almacenes 3PL locales para reducir tiempos de entrega y desarrollando contactos comerciales con distribuidores y compradores B2B.',
        },
      ]
    : [
        {
          q: 'What does a sourcing company do?',
          a: 'A sourcing company helps domestic businesses manage overseas procurement: identifying qualified direct manufacturers, evaluating production capabilities, negotiating pricing and MOQs, managing sample development, coordinating independent quality inspections, and supporting international freight and customs clearance.',
        },
        {
          q: 'What is a China sourcing agent?',
          a: 'A China sourcing agent is an on-the-ground intermediary who finds suppliers, requests quotations, and coordinates production on behalf of a buyer, typically earning a commission. Unlike a full-service procurement partner like Sourcing Lab USA, a pure agent introduces factories while the buyer contracts directly and carries the primary order risk.',
        },
        {
          q: 'How do you verify an overseas manufacturer?',
          a: 'Verifying an overseas manufacturer requires a layered framework: reviewing government corporate registrations, verifying registered business scope and ownership, assessing manufacturing capabilities and operational machinery, reviewing certifications, conducting on-site factory audits when appropriate, and validating pre-production samples and production runs.',
        },
        {
          q: 'How can an international manufacturer enter the U.S. market?',
          a: 'An international manufacturer enters the U.S. market by identifying applicable federal and state requirements (such as CPSC, FDA, or FCC) with qualified specialists, evaluating U.S. import and customs bonding options, coordinating domestic 3PL warehousing to shorten delivery times, and pursuing structured commercial relationships with American distributors and trade buyers.',
        },
      ];

  const industryVerticals = [
    {
      title: es ? 'Packaging e imprenta' : 'Packaging & Paperboard',
      href: '/industries/packaging',
      body: es
        ? 'Cajas rígidas de lujo, estuches de cartón, cajas de envío corrugadas y soluciones de unboxing sostenibles.'
        : 'Luxury rigid presentation boxes, folding retail cartons, corrugated mailers, and sustainable pulp inserts.',
    },
    {
      title: es ? 'Prendas y textiles técnicos' : 'Apparel & Technical Textiles',
      href: '/industries/textiles',
      body: es
        ? 'Ropa de moda, prendas deportivas de alto rendimiento, uniformes corporativos y tejidos técnicos a medida.'
        : 'Performance activewear, fashion collections, commercial uniforms, and certified custom-knitted fabrics.',
    },
    {
      title: es ? 'Bienes de consumo y hardgoods' : 'Consumer Goods & Hardgoods',
      href: '/industries/consumer-products',
      body: es
        ? 'Menaje del hogar, accesorios deportivos, herramientas de cuidado personal y productos de consumo moldeados.'
        : 'Housewares, kitchenware, fitness accessories, molded plastics, and stainless steel lifestyle products.',
    },
    {
      title: es ? 'Materiales de construcción y herrajes' : 'Building Materials & Hardware',
      href: '/industries/building-materials',
      body: es
        ? 'Herrajes arquitectónicos, extrusiones de aluminio, fijaciones de acero inoxidable y piezas sanitarias.'
        : 'Architectural hardware, aluminum extrusions, stainless steel fasteners, and commercial ceramic sanitaryware.',
    },
    {
      title: es ? 'Muebles y contract' : 'Furniture & Contract Furnishings',
      href: '/industries/furniture',
      body: es
        ? 'Mobiliario para hostelería, armazones de madera maciza, sillería contract y muebles listos para montar (KD).'
        : 'Hospitality furniture, solid wood casegoods, contract commercial seating, and flat-pack KD cabinetry.',
    },
    {
      title: es ? 'Marcas de marca privada' : 'Private Label Brand Development',
      href: '/industries/private-label',
      body: es
        ? 'Desarrollo integral de líneas de producto para e-commerce, Amazon FBA y cadenas minoristas.'
        : 'Turnkey private label brand creation, custom branding dielines, barcode prep, and delivered retail supply.',
    },
  ];

  return (
    <>
      {/* WHO WE HELP / DUAL-DIRECTION PILLARS */}
      <section id="who-we-help" className="editorial-section border-b border-brand-line bg-brand-surface/40 py-20">
        <div className="editorial-container">
          <div className="mb-12 max-w-3xl">
            <p className="editorial-kicker">
              <span className="launch-dot" aria-hidden="true" />
              {es ? '01 — A QUIÉN AYUDAMOS' : '01 — WHO WE HELP'}
            </p>
            <h2 className="editorial-title">
              {es ? 'Dos direcciones.' : 'Two market directions.'}
              <br />
              <em>{es ? 'Una misma ejecución de excelencia.' : 'One operational partner.'}</em>
            </h2>
            <p className="editorial-body mt-4 text-base">
              {es
                ? 'Conectamos a las empresas estadounidenses con los centros de producción más eficientes del mundo y guiamos a los fabricantes internacionales en su expansión comercial en Estados Unidos.'
                : 'We operate at the critical intersection of international manufacturing and North American commerce, solving cross-border friction for both domestic buyers and global producers.'}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Pillar A: US Brands */}
            <div className="flex flex-col justify-between rounded-2xl border border-brand-line bg-white p-8 shadow-sm transition hover:shadow-md">
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Globe2 className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-xs font-bold tracking-wider text-brand-muted uppercase">
                  {es ? 'PARA MARCAS Y EMPRESAS DE EE. UU.' : 'FOR U.S. BRANDS & IMPORTERS'}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-brand-ink">
                  {es ? 'Sourcing y fabricación en el extranjero con fabricantes cualificados.' : 'Source and manufacture overseas with qualified manufacturers.'}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  {es
                    ? 'Te ayudamos a encontrar, evaluar y gestionar fabricantes capaces en China y Asia. Aseguramos transparencia de costes, protegemos la propiedad de utillajes, coordinamos inspecciones de calidad adaptadas y calculamos los costes landed reales antes de emitir pedidos.'
                    : 'We help American companies identify, evaluate, negotiate with, and manage capable overseas manufacturers. Ensure transparent supplier economics, protect tooling ownership, coordinate tailored on-site quality inspections, and calculate realistic landed costs before placing purchase orders.'}
                </p>
                <ul className="mt-6 space-y-2.5 text-xs text-brand-ink">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" />
                    <span>{es ? 'Precios directos de fábrica con economía transparente' : 'Direct factory pricing with transparent supplier economics'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" />
                    <span>{es ? 'Verificación escalonada de fábrica e inspecciones pre-embarque' : 'Layered factory verification & pre-shipment quality inspections'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" />
                    <span>{es ? 'Coordinación de flete marítimo, clasificación HTS y entrada aduanera' : 'Ocean freight coordination, HTS tariff classification support, and customs coordination'}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-brand-line">
                <Link
                  href="/product-sourcing"
                  className="editorial-button inline-flex w-full items-center justify-center gap-2"
                >
                  {es ? 'Explorar servicios de sourcing' : 'Explore Sourcing Services'}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Pillar B: Foreign Manufacturers */}
            <div className="flex flex-col justify-between rounded-2xl border border-brand-line bg-white p-8 shadow-sm transition hover:shadow-md">
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <TrendingUp className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-xs font-bold tracking-wider text-brand-muted uppercase">
                  {es ? 'PARA FABRICANTES INTERNACIONALES' : 'FOR INTERNATIONAL MANUFACTURERS'}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-brand-ink">
                  {es ? 'Entrada y representación comercial en el mercado de EE. UU.' : 'Enter and expand sales in the United States market.'}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  {es
                    ? 'Ayudamos a fabricantes internacionales a evaluar, preparar y ejecutar su estrategia de entrada en EE. UU.: mapeo de requisitos normativos (FDA, CPSC, FCC), determinación y coordinación de una estructura adecuada de importador de registro en EE. UU., coordinación con operadores logísticos 3PL y apoyo en representación comercial B2B.'
                    : 'We help international manufacturers evaluate, prepare, and execute their U.S. market-entry strategy: identifying applicable regulatory requirements, helping determine and coordinate an appropriate U.S. importer-of-record structure, coordinating with third-party logistics (3PL) providers, and supporting B2B commercial representation.'}
                </p>
                <ul className="mt-6 space-y-2.5 text-xs text-brand-ink">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" />
                    <span>{es ? 'Mapeo de requisitos normativos en EE. UU.: FDA, CPSC, FCC y California Prop 65 cuando proceda' : 'U.S. regulatory requirements mapping: FDA, CPSC, FCC and California Prop 65 where applicable'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" />
                    <span>{es ? 'Estructuración de precios mayoristas y márgenes comerciales' : 'Wholesale price matrix, distributor margins & pricing strategy'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" />
                    <span>{es ? 'Apoyo en representación comercial y prospección de compradores B2B' : 'Commercial representation support and targeted B2B buyer outreach'}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-brand-line">
                <Link
                  href="/us-market-entry"
                  className="editorial-button inline-flex w-full items-center justify-center gap-2"
                >
                  {es ? 'Explorar entrada al mercado de EE. UU.' : 'Explore U.S. Market Entry'}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION: REAL CROSS-BORDER RISKS */}
      <section id="risks" className="editorial-section py-24">
        <div className="editorial-container">
          <div className="mb-14 max-w-3xl">
            <p className="editorial-kicker text-brand-error">
              <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
              {es ? '02 — LOS RIESGOS REALES' : '02 — THE REAL RISKS'}
            </p>
            <h2 className="editorial-title">
              {es ? 'Encontrar un fabricante es fácil.' : 'Finding a manufacturer is easy.'}
              <br />
              <em>
                {es
                  ? 'Conseguir el precio, calidad, conformidad y entrega adecuados, no lo es.'
                  : 'Getting the right price, verified quality, and compliance is not.'}
              </em>
            </h2>
            <p className="editorial-body mt-4 text-base">
              {es
                ? 'El comercio transfronterizo está lleno de trampas ocultas que destruyen los márgenes de los compradores desinformados. Estos son los seis fallos críticos que prevenimos de forma sistemática:'
                : 'Cross-border trade carries structural risks that can destroy operating margins if unmanaged. Here is how we safeguard your supply chain before capital is deployed:'}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {riskFactors.map((risk, index) => (
              <div
                key={risk.title}
                className="rounded-xl border border-brand-line bg-white/70 p-6 shadow-xs backdrop-blur-xs transition hover:border-brand-ink/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brand-muted">0{index + 1}</span>
                  <AlertTriangle className="h-4 w-4 text-brand-warning" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-brand-ink">{risk.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-brand-muted">{risk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONAL SAFEGUARDS & VERIFIED STANDARDS */}
      <section id="safeguards" className="editorial-section border-t border-brand-line bg-brand-surface/40 py-20">
        <div className="editorial-container">
          <div className="mb-14 max-w-3xl">
            <p className="editorial-kicker">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
              {es ? 'SEGURIDAD OPERATIVA Y ESTÁNDARES VERIFICABLES' : 'OPERATIONAL SAFEGUARDS & VERIFIED STANDARDS'}
            </p>
            <h2 className="editorial-title">
              {es ? 'Garantías operativas concretas.' : 'Verifiable operational safeguards.'}
              <br />
              <em>
                {es
                  ? 'Estándares internacionales, no promesas vacías.'
                  : 'Rigorous industry standards, not unverified claims.'}
              </em>
            </h2>
            <p className="editorial-body mt-4 text-base">
              {es
                ? 'El abastecimiento internacional exige garantías verificables antes de movilizar capital. Respaldamos cada proyecto con marcos normativos internacionales, auditorías in situ y contratos comerciales transparentes.'
                : 'International procurement and market entry demand verifiable risk mitigation before capital is transferred. We anchor every engagement in recognized quality frameworks, independent lab testing, and enforceable commercial safeguards.'}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left: 4 Verified Standard Cards */}
            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-line bg-white p-6 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green shrink-0">
                    <FileCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">ISO 9001 · ISO 2859-1</span>
                    <h3 className="text-base font-semibold text-brand-ink">{es ? 'Control de calidad AQL' : 'Tailored AQL Quality Control'}</h3>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-brand-muted">
                  {es
                    ? 'Inspecciones independientes durante la producción (DUPRO) y pre-embarque (PSI) con planes de muestreo estadístico ISO 2859-1 adaptados a cada producto.'
                    : 'Independent pre-shipment inspections (PSI) and during-production audits (DUPRO) using ISO 2859-1 statistical sampling with defect thresholds tailored to your product category.'}
                </p>
              </div>

              <div className="rounded-xl border border-brand-line bg-white p-6 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green shrink-0">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">CPSC · ASTM · FDA · FCC</span>
                    <h3 className="text-base font-semibold text-brand-ink">{es ? 'Mapeo normativo de EE. UU.' : 'U.S. Regulatory Mapping'}</h3>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-brand-muted">
                  {es
                    ? 'Identificación anticipada de requisitos federales y estatales aplicables, coordinando ensayos de seguridad con laboratorios acreditados independientes.'
                    : 'Advance mapping of applicable federal and state requirements, coordinating mechanical and safety testing with independent accredited testing laboratories.'}
                </p>
              </div>

              <div className="rounded-xl border border-brand-line bg-white p-6 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green shrink-0">
                    <Lock className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">{es ? 'PAGOS POR HITOS' : 'MILESTONE PAYMENTS'}</span>
                    <h3 className="text-base font-semibold text-brand-ink">{es ? 'Protección total de capital' : 'Zero Pre-Inspection Balance'}</h3>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-brand-muted">
                  {es
                    ? 'El saldo final de producción nunca se libera hasta haber superado con éxito la inspección física de calidad y la verificación de empaque en fábrica.'
                    : 'Production balances remain protected until physical on-site quality inspection and packaging verification reports are fully approved.'}
                </p>
              </div>

              <div className="rounded-xl border border-brand-line bg-white p-6 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green shrink-0">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">{es ? 'PROPIEDAD DE UTILLAJE' : '100% TOOLING IP'}</span>
                    <h3 className="text-base font-semibold text-brand-ink">{es ? 'Propiedad exclusiva de moldes' : 'Client Tooling Covenants'}</h3>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-brand-muted">
                  {es
                    ? 'Acuerdos contractuales por escrito que garantizan la propiedad legal exclusiva de moldes, troqueles, fichas técnicas y archivos CAD para el cliente.'
                    : 'Binding written covenants guaranteeing that custom molds, tooling dies, CAD files, and technical specifications remain 100% client-owned property.'}
                </p>
              </div>
            </div>

            {/* Right: Visual feature showcasing tactile quality and transparency */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-brand-line bg-white p-5 shadow-xs">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/images/packaging-collection.webp"
                  alt="Photorealistic unbranded custom packaging and material sample arrangement"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="w-full h-auto rounded-lg object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 pt-4 border-t border-brand-line/60">
                <p className="text-[11px] leading-relaxed text-brand-muted">
                  <span className="font-semibold text-brand-ink">{es ? 'Inspección de materiales y prototipos' : 'Material Inspection & Prototype Standards'}</span> —{' '}
                  {es
                    ? 'Supervisión directa de gramajes de papel, resistencias de cartón corrugado, tolerancias dimensionales y acabados antes de la producción en masa.'
                    : 'Direct oversight of paperboard calipers, flute strengths, dimensional tolerances, and surface treatments before mass production runs.'}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-medium text-brand-muted">
                  <span className="rounded-md bg-brand-surface px-2 py-0.5 border border-brand-line">
                    {es ? 'Muestras no marcadas' : 'Unbranded Samples'}
                  </span>
                  <span className="rounded-md bg-brand-surface px-2 py-0.5 border border-brand-line">
                    {es ? 'Clasificación HTS 10 dígitos' : '10-Digit HTS Classification'}
                  </span>
                  <span className="rounded-md bg-brand-surface px-2 py-0.5 border border-brand-line">
                    {es ? 'Facturación Francia / China' : 'Invoicing via France / China'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS: 6-STAGE WORKFLOW */}
      <section id="how-it-works" className="editorial-section process-section border-t border-brand-line bg-brand-surface/30 py-24">
        <div className="editorial-container">
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">
                <span className="launch-dot" aria-hidden="true" />
                {es ? '03 — METODOLOGÍA OPERATIVA' : '03 — HOW IT WORKS'}
              </p>
              <h2 className="editorial-title">
                {es ? 'Del brief técnico inicial' : 'From initial technical brief'}
                <br />
                <em>{es ? 'a la entrega del suministro en destino.' : 'to verified supply in warehouse.'}</em>
              </h2>
            </div>
            <p className="editorial-body">
              {es
                ? 'Un proceso transparente y riguroso en 6 etapas que elimina la incertidumbre en cada fase de la compra internacional o de la entrada en el mercado estadounidense.'
                : 'A structured 6-stage operational framework that replaces guesswork with verified data, on-site quality checkpoints, and transparent commercial contracts.'}
            </p>
          </div>

          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((step) => (
              <li
                key={step.step}
                className="flex flex-col justify-between rounded-xl border border-brand-line bg-white p-6 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-brand-line/60 pb-3">
                    <span className="font-mono text-xs font-bold text-brand-green">{step.step}</span>
                    <span className="text-[11px] font-bold tracking-widest text-brand-muted uppercase">{step.name}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-brand-ink">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-brand-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brand-line bg-white p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-brand-green shrink-0" aria-hidden="true" />
              <p className="text-xs text-brand-muted">
                {es
                  ? 'Especificaciones técnicas por escrito. Criterios objetivos de aceptación de calidad acordados antes de la producción en masa.'
                  : 'Clear written specifications. Objective quality acceptance criteria agreed prior to committing mass production capital.'}
              </p>
            </div>
            <Link href="/china-to-us-procurement#order-terms" className="editorial-text-link">
              {es ? 'Conocer las condiciones de pedido y suministro' : 'Review our supply terms & order process'}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE SERVICES GRID */}
      <section id="services" className="editorial-section py-24">
        <div className="editorial-container">
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">
                <span className="launch-dot" aria-hidden="true" />
                {es ? '04 — CATÁLOGO DE SERVICIOS' : '04 — STRATEGIC SERVICES'}
              </p>
              <h2 className="editorial-title">
                {es ? 'Servicios especializados.' : 'Specialized services.'}
                <br />
                <em>{es ? 'Cada área con su propio equipo y metodología.' : 'Each with dedicated expertise and execution.'}</em>
              </h2>
            </div>
            <p className="editorial-body">
              {es
                ? 'No acumulamos materias dispares en una sola propuesta genérica. Cada servicio cuenta con estándares técnicos, directrices documentadas y entregables verificables.'
                : 'We avoid generic broad-brush consulting. Every strategic capability is backed by dedicated methodologies, verifiable inspection checklists, and transparent pricing.'}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {primaryServices.map((service) => (
              <article
                key={service.href}
                className="group flex flex-col justify-between rounded-xl border border-brand-line bg-white p-6 transition hover:border-brand-ink/50 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-brand-surface px-2.5 py-1 text-[10px] font-semibold text-brand-ink border border-brand-line">
                      {service.tag}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-brand-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-brand-ink">
                    <Link href={service.href} className="focus:outline-hidden">
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-brand-muted">{service.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-line/60">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-green hover:underline"
                  >
                    {es ? 'Ver servicio y metodología' : 'View service & methodology'}
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GEO / GENERATIVE ENGINE OPTIMIZATION DIRECT-ANSWER KNOWLEDGE BASE */}
      <section id="knowledge-base" className="editorial-section border-t border-brand-line bg-brand-surface/40 py-24">
        <div className="editorial-container">
          <div className="mb-14 max-w-3xl">
            <p className="editorial-kicker">
              <HelpCircle className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
              {es ? '05 — BASE DE CONOCIMIENTO GEO & IA' : '05 — DIRECT ANSWERS & GEO KNOWLEDGE BASE'}
            </p>
            <h2 className="editorial-title">
              {es ? 'Respuestas claras y directas.' : 'Direct, factual answers.'}
              <br />
              <em>{es ? 'Información verificable para directivos e inteligencias artificiales.' : 'Verifiable insights for executives and AI search engines.'}</em>
            </h2>
            <p className="editorial-body mt-4 text-base">
              {es
                ? 'Definiciones autónomas y fácticas diseñadas para responder a las preguntas más frecuentes sobre el comercio internacional entre Estados Unidos, China y Europa.'
                : 'Self-contained, factual definitions crafted to answer core questions on international trade, factory verification, landed costs, and U.S. market entry.'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {geoAnswers.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-brand-line bg-white p-7 shadow-xs"
              >
                <h3 className="text-base font-semibold text-brand-ink">{item.q}</h3>
                <p className="direct-answer mt-3 pl-3 text-xs leading-relaxed text-brand-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY VERTICALS */}
      <section id="industries" className="editorial-section py-24">
        <div className="editorial-container">
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">
                <Layers className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                {es ? '06 — VERTICALES SECTORIALES' : '06 — INDUSTRY VERTICALS'}
              </p>
              <h2 className="editorial-title">
                {es ? 'Especialización por industria.' : 'Specialized by industry.'}
                <br />
                <em>{es ? 'Conocimiento técnico de materiales y normativas.' : 'Deep knowledge of materials, tooling, and standards.'}</em>
              </h2>
            </div>
            <p className="editorial-body">
              {es
                ? 'Cada industria tiene sus propios centros de producción, requerimientos de laboratorio y márgenes de tolerancia. Operamos en los sectores donde contamos con experiencia directa.'
                : 'Each manufacturing sector operates with distinct industrial clusters, testing protocols, and tolerance standards. We focus on industries backed by deep technical experience.'}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industryVerticals.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="group rounded-xl border border-brand-line bg-white p-6 transition hover:border-brand-ink/50 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-brand-ink group-hover:text-brand-green">
                    {ind.title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="text-brand-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-green"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-brand-muted">{ind.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE FAQ SECTION */}
      <section id="faq" className="editorial-section faq-section border-t border-brand-line bg-brand-surface/30 py-24">
        <div className="editorial-container faq-layout">
          <div>
            <p className="editorial-kicker">
              <span className="launch-dot" aria-hidden="true" />
              {es ? '07 — PREGUNTAS FRECUENTES' : '07 — FREQUENTLY ANSWERED'}
            </p>
            <h2 className="editorial-title">
              {es ? 'Preguntas antes de' : 'Questions before your'}
              <br />
              <em>{es ? 'iniciar tu proyecto.' : 'procurement project.'}</em>
            </h2>
            <p className="editorial-body">
              {es
                ? 'Claridad absoluta sobre cómo trabajamos, cómo se estructuran los contratos y cómo protegemos tus intereses.'
                : 'Complete clarity on our operating methodology, contracting entities, payment structures, and legal protections.'}
            </p>
          </div>
          <div className="faq-list">
            {(es ? homeFaqsES : homeFaqs).map(([question, answer]) => (
              <details className="faq-item" key={question}>
                <summary>
                  {question}
                  <Plus aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / SOURCING BRIEF SUBMISSION */}
      <section id="contact" className="editorial-section contact-section border-t border-brand-line py-24">
        <div className="editorial-container">
          <div className="contact-panel">
            <div>
              <p className="editorial-kicker">
                <span className="launch-dot" aria-hidden="true" />
                {es ? 'COMENCEMOS' : 'START A PROJECT'}
              </p>
              <h2 className="editorial-title">
                {es ? 'Cuéntanos sobre' : 'Tell us about'}
                <br />
                <em>{es ? 'tu próximo proyecto.' : 'your next project.'}</em>
              </h2>
              <p className="editorial-body">
                {es
                  ? 'Tanto si buscas fabricar un producto en el extranjero como si eres una empresa internacional expandiéndose a EE. UU., comparte tu brief y evaluaremos los siguientes pasos operativos.'
                  : 'Whether you need to source and manufacture products overseas or enter the U.S. commercial market, submit your project details for an actionable assessment.'}
              </p>
              <a href="mailto:contact@sourcinglabusa.com" className="contact-email">
                contact@sourcinglabusa.com
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <p className="contact-note">
                {es
                  ? 'Atención en inglés y español · Ejecución operativa para el mercado estadounidense'
                  : 'Bilingual support in English & Spanish · Operational execution for the U.S. market'}
              </p>
            </div>
            <ContactForm locale={locale} appearance="editorial" />
          </div>
        </div>
      </section>
    </>
  );
}
