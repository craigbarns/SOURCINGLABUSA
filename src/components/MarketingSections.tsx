import Image from 'next/image';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileCheck,
  FileText,
  HelpCircle,
  Lock,
  Plus,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';

import { ContactForm } from './ContactForm';
import { ScopeTable } from './ScopeTable';
import { homeFaqs, homeFaqsES } from '@/lib/home-faqs';

/**
 * Homepage body, under the hero. The order follows the promise: what a supply
 * includes, the risks it is set up against, what the contract settles, how a
 * project runs, what is supplied, short answers and the brief form. Nothing
 * here may offer more than AGENTS.md allows: no default inspections, no
 * freight forwarding or customs clearance, no U.S. entity.
 */
export function MarketingSections({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const es = locale === 'es';

  const riskFactors = es
    ? [
        {
          title: 'Intermediarios ocultos',
          body: 'Una empresa de trading que se presenta como fábrica añade su margen y pasa el pedido a un taller que usted nunca evaluó.',
        },
        {
          title: 'Bajada de calidad',
          body: 'Una muestra aprobada, seguida de una producción con un material más barato o un acabado apresurado.',
        },
        {
          title: 'Especificación perdida en la traducción',
          body: 'Medidas, materiales y tolerancias que la fábrica interpreta de otra manera, porque nunca se escribieron en un solo documento.',
        },
        {
          title: 'Responsabilidades de importación sin nombrar',
          body: 'Aranceles, entrada aduanera y requisitos de producto en EE. UU. recaen en el importador. Si la cotización no dice quién los asume, recaen en usted.',
        },
        {
          title: 'Aranceles descubiertos demasiado tarde',
          body: 'Un arancel de la Sección 301 o un código arancelario erróneo descubierto en el puerto, cuando el precio ya estaba acordado.',
        },
        {
          title: 'Coste en destino incompleto',
          body: 'Un precio de fábrica que deja fuera el flete, el seguro, los aranceles, el agente de aduanas y el transporte interior.',
        },
      ]
    : [
        {
          title: 'Hidden intermediaries',
          body: 'A trading company presenting itself as the factory adds its margin and passes your order to a workshop you never assessed.',
        },
        {
          title: 'Quality fade',
          body: 'An approved sample, followed by production with a cheaper material or a rushed finish.',
        },
        {
          title: 'A specification lost in translation',
          body: 'Dimensions, materials and tolerances read differently by the factory, because they were never written down in one place.',
        },
        {
          title: 'Import responsibilities left unnamed',
          body: 'Duties, customs entry and U.S. product requirements fall on the importer. If the quotation does not say who carries them, they fall on you.',
        },
        {
          title: 'Tariffs found too late',
          body: 'A Section 301 duty or a wrong tariff code discovered at the port, after the price was agreed.',
        },
        {
          title: 'An incomplete landed cost',
          body: 'A factory price that leaves out freight, insurance, duties, brokerage and inland delivery.',
        },
      ];

  const contractTerms = [
    {
      icon: FileCheck,
      tag: es ? 'BRIEF ESCRITO' : 'WRITTEN BRIEF',
      title: es ? 'Especificación y muestra aprobada' : 'Specification and approved sample',
      body: es
        ? 'El producto se define por escrito y con una muestra aprobada. La producción se compara con ambos.'
        : 'The product is defined in writing and by an approved sample. Production is checked against both.',
    },
    {
      icon: Lock,
      tag: es ? 'PAGOS POR HITOS' : 'MILESTONE PAYMENTS',
      title: es ? 'Hitos de pago en la cotización' : 'Payment milestones in the quotation',
      body: es
        ? 'Cada cotización fija los hitos de pago. Cuando incluye una inspección, el saldo de producción puede vincularse a su informe.'
        : 'Each quotation sets the payment milestones. When an inspection is written into it, the production balance can be tied to its report.',
    },
    {
      icon: ShieldCheck,
      tag: es ? 'PROPIEDAD DE UTILLAJE' : 'TOOLING OWNERSHIP',
      title: es ? 'Utillaje por escrito' : 'Tooling terms in writing',
      body: es
        ? 'La propiedad de los moldes, troqueles, archivos CAD y especificaciones que usted paga se fija por escrito en el contrato de cada pedido, antes de fabricar el utillaje.'
        : 'Ownership of the custom molds, tooling dies, CAD files and specifications you pay for is set out in writing in the contract for each order, before any tooling is cut.',
    },
    {
      icon: FileText,
      tag: es ? 'SOLO SI FIGURA EN LA COTIZACIÓN' : 'ONLY IF IN THE QUOTATION',
      title: es ? 'Inspecciones y ensayos' : 'Inspections and lab tests',
      body: es
        ? 'Una inspección por terceros o un ensayo de laboratorio se coordina cuando figura en la cotización, con su alcance y sus criterios de aceptación. No se presupone en cada pedido.'
        : 'A third-party inspection or a lab test is coordinated when it is written into the quotation, with its scope and acceptance criteria. It is not assumed on every order.',
    },
  ];

  const workflowSteps = es
    ? [
        { step: '01', name: 'Definir', title: 'Brief y precio objetivo', body: 'Producto, referencias, materiales, cantidad por variante, destino y precio objetivo, reunidos en un solo brief.' },
        { step: '02', name: 'Buscar', title: 'Búsqueda de fábrica', body: 'Los fabricantes se identifican a través de nuestra colaboración independiente en China y se evalúan frente al brief.' },
        { step: '03', name: 'Cotizar', title: 'Precio y condiciones', body: 'Las opciones de fábrica se cotizan. La cotización indica la empresa contratante en Francia o China, los hitos de pago y las condiciones del utillaje.' },
        { step: '04', name: 'Muestrear', title: 'Muestras y aprobación', body: 'Las muestras se fabrican y se revisan frente al brief. Nada pasa a producción antes de aprobar una muestra.' },
        { step: '05', name: 'Producir', title: 'Pedido y seguimiento', body: 'Se emite el pedido y la producción se sigue frente a la muestra aprobada. Una inspección o un ensayo se añade solo si figura en la cotización.' },
        { step: '06', name: 'Enviar', title: 'Entrega', body: 'El flete, el seguro y la aduana se indican en el presupuesto o quedan de su lado. No reservamos flete ni despachamos la entrada.' },
      ]
    : [
        { step: '01', name: 'Define', title: 'Brief and target price', body: 'Product, references, materials, quantity by variant, destination and target price, written into one brief.' },
        { step: '02', name: 'Source', title: 'Factory search', body: 'Manufacturers are identified through our independent partnership in China and assessed against the brief.' },
        { step: '03', name: 'Quote', title: 'Pricing and terms', body: 'Factory options are priced. The quotation names the contracting company in France or China, the payment milestones and the tooling terms.' },
        { step: '04', name: 'Sample', title: 'Samples and approval', body: 'Samples are made and reviewed against the brief. Nothing goes into production before a sample is approved.' },
        { step: '05', name: 'Produce', title: 'Order and follow-up', body: 'The order is placed and production is followed against the approved sample. An inspection or a lab test is added only if written into the quotation.' },
        { step: '06', name: 'Ship', title: 'Hand off', body: 'Freight, insurance, and customs are named in the quotation or stay with you. We do not book freight or clear the entry.' },
      ];

  const supplyLines = [
    {
      href: '/custom-packaging',
      tag: es ? 'Núcleo' : 'Core',
      title: es ? 'Packaging a medida' : 'Custom packaging',
      body: es
        ? 'Cajas rígidas, estuches plegables, cajas de envío, bolsas, etiquetas e insertos fabricados según su especificación.'
        : 'Rigid boxes, folding cartons, mailers, bags, labels and inserts, made to your specification.',
    },
    {
      href: '/custom-textile',
      tag: es ? 'Núcleo' : 'Core',
      title: es ? 'Ropa y textiles' : 'Clothing and textiles',
      body: es
        ? 'Colecciones, uniformes, tejidos y acabados, de la ficha técnica a la muestra aprobada.'
        : 'Collections, uniforms, fabrics and finishes, from tech pack to approved sample.',
    },
    {
      href: '/sportswear-sourcing',
      tag: es ? 'Núcleo' : 'Core',
      title: es ? 'Ropa deportiva y técnica' : 'Sportswear and technical apparel',
      body: es
        ? 'Ajuste, tejido y elasticidad definidos para la actividad; las propiedades técnicas solo con evidencias.'
        : 'Fit, fabric and stretch defined for the activity; performance claims only with evidence.',
    },
    {
      href: '/private-label-packaging',
      tag: es ? 'Núcleo' : 'Core',
      title: es ? 'Packaging de marca privada' : 'Private label packaging',
      body: es
        ? 'Packaging para su propia línea: estructura, impresión y la información que debe llevar.'
        : 'Packaging for your own product line: structure, print and the information it has to carry.',
    },
    {
      href: '/product-sourcing',
      tag: es ? 'Bajo petición' : 'On request',
      title: es ? 'Otros productos' : 'Other products',
      body: es
        ? 'Otros productos se estudian para confirmar su viabilidad antes de cotizar nada.'
        : 'Other products are reviewed for feasibility before anything is quoted.',
    },
  ];

  const brandPoints = es
    ? [
        'Precio de fábrica y el proveedor indicado en el presupuesto.',
        'Aprobación de la muestra antes de producir.',
        'Una inspección o un modelo de coste en destino solo cuando el presupuesto lo incluye.',
      ]
    : [
        'Factory pricing and the supplier named in the quotation.',
        'Sample approval before production.',
        'An inspection or a landed-cost model only when the quotation includes it.',
      ];

  const shortAnswers = es
    ? [
        {
          q: '¿Qué hace una empresa de sourcing?',
          a: 'Busca y evalúa fabricantes, cotiza el producto, gestiona las muestras y sigue la producción. Sourcing Lab USA además compra y suministra la mercancía: la empresa indicada en su cotización, en Francia o China, contrata con usted y la factura. El flete, la aduana y la importación quedan con las partes indicadas en la cotización.',
        },
        {
          q: '¿Qué es un agente de sourcing en China?',
          a: 'Un agente busca proveedores por cuenta del comprador, normalmente a cambio de una comisión, y el comprador contrata con la fábrica. Sourcing Lab USA no trabaja así: compra y suministra los productos, y la empresa indicada en la cotización le factura.',
        },
        {
          q: '¿Cómo se comprueba un fabricante en el extranjero?',
          a: 'Se comprueba el registro y la actividad de la empresa, que fabrique el producto en lugar de revenderlo, y las muestras frente al brief. Cuando el riesgo lo justifica, una auditoría o inspección por terceros se añade a la cotización. Cada comprobación se acuerda por proyecto.',
        },
        {
          q: '¿Quién se encarga del flete y la aduana?',
          a: 'El flete, el seguro y la aduana se indican en el presupuesto o quedan de su lado. No reservamos flete ni despachamos la entrada: no somos transitario, ni agente de aduanas, ni el importador.',
        },
      ]
    : [
        {
          q: 'What does a sourcing company do?',
          a: 'It finds and assesses manufacturers, prices the product, manages samples and follows production. Sourcing Lab USA also buys and supplies the goods: the company named in your quotation, in France or China, contracts with you and invoices them. Freight, customs and import stay with the parties named in the quotation.',
        },
        {
          q: 'What is a China sourcing agent?',
          a: 'An agent finds suppliers on the buyer’s behalf, usually for a commission, and the buyer contracts with the factory. Sourcing Lab USA works differently: it buys and supplies the products, and the company named in the quotation invoices you.',
        },
        {
          q: 'How do you check an overseas manufacturer?',
          a: 'Check the company’s registration and business scope, confirm it makes the product rather than reselling it, and review samples against the brief. Where the stakes justify it, a third-party audit or inspection is added to the quotation. Each check is agreed per project.',
        },
        {
          q: 'Who handles freight and customs?',
          a: 'Freight, insurance, and customs are named in the quotation or stay with you. We do not book freight or clear the entry: we are not a freight forwarder, a customs broker, or the importer.',
        },
      ];

  return (
    <>
      <ScopeTable locale={locale} />

      {/* THE RISKS A SUPPLY IS SET UP AGAINST */}
      <section id="risks" className="editorial-section py-24">
        <div className="editorial-container">
          <div className="mb-14 max-w-3xl">
            <p className="editorial-kicker text-brand-error">
              <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
              {es ? '01 — LOS RIESGOS REALES' : '01 — THE REAL RISKS'}
            </p>
            <h2 className="editorial-title">
              {es ? 'Encontrar un fabricante es fácil.' : 'Finding a manufacturer is easy.'}
              <br />
              <em>{es ? 'Recibir el producto aprobado, no.' : 'Getting the product you approved is not.'}</em>
            </h2>
            <p className="editorial-body mt-4 text-base">
              {es
                ? 'Esto es lo que una especificación escrita, una muestra aprobada y una cotización completa están para evitar:'
                : 'This is what a written specification, an approved sample and a complete quotation are there to prevent:'}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {riskFactors.map((risk, index) => (
              <div
                key={risk.title}
                className="rounded-xl border border-brand-line bg-white/70 p-6 shadow-xs backdrop-blur-xs"
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

      {/* WHAT THE CONTRACT SETTLES */}
      <section id="contract" className="editorial-section border-t border-brand-line bg-brand-surface/40 py-20">
        <div className="editorial-container">
          <div className="mb-14 max-w-3xl">
            <p className="editorial-kicker">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
              {es ? '02 — EN EL CONTRATO' : '02 — IN THE CONTRACT'}
            </p>
            <h2 className="editorial-title">
              {es ? 'Lo que fija el contrato.' : 'What the contract settles.'}
              <br />
              <em>{es ? 'No lo que promete una portada.' : 'Not what a homepage promises.'}</em>
            </h2>
            <p className="editorial-body mt-4 text-base">
              {es
                ? 'Cada pedido se apoya en una cotización y un contrato. Indican el producto, las muestras, los hitos de pago, el utillaje y todo lo que se añade bajo petición.'
                : 'Every order rests on a quotation and a contract. They name the product, the samples, the payment milestones, the tooling and anything added on request.'}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
              {contractTerms.map(({ icon: Icon, tag, title, body }) => (
                <div key={title} className="rounded-xl border border-brand-line bg-white p-6 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green shrink-0">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">{tag}</span>
                      <h3 className="text-base font-semibold text-brand-ink">{title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-brand-muted">{body}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-brand-line bg-white p-5 shadow-xs">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/images/packaging-collection.webp"
                  alt="Illustrative image of unbranded custom packaging and material samples"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <div className="mt-4 pt-4 border-t border-brand-line/60">
                <p className="text-[11px] leading-relaxed text-brand-muted">
                  <span className="font-semibold text-brand-ink">{es ? 'Revisión de muestras' : 'Sample review'}</span> —{' '}
                  {es
                    ? 'Los gramajes, la resistencia del cartón, las medidas y los acabados se comparan con la muestra aprobada antes de producir.'
                    : 'Board caliper, flute strength, dimensions and finishes are compared with the approved sample before production.'}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-medium text-brand-muted">
                  {[
                    es ? 'Imagen ilustrativa' : 'Illustrative image',
                    es ? 'Especificación escrita' : 'Written specification',
                    es ? 'Facturación Francia / China' : 'Invoicing via France / China',
                  ].map((tag) => (
                    <span key={tag} className="rounded-md bg-brand-surface px-2 py-0.5 border border-brand-line">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW A PROJECT RUNS */}
      <section id="how-it-works" className="editorial-section process-section border-t border-brand-line bg-brand-surface/30 py-24">
        <div className="editorial-container">
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">
                <span className="launch-dot" aria-hidden="true" />
                {es ? '03 — CÓMO FUNCIONA' : '03 — HOW IT WORKS'}
              </p>
              <h2 className="editorial-title">
                {es ? 'Del brief' : 'From brief'}
                <br />
                <em>{es ? 'al pedido aprobado.' : 'to an approved order.'}</em>
              </h2>
            </div>
            <p className="editorial-body">
              {es
                ? 'Seis etapas, cada una por escrito antes de empezar la siguiente.'
                : 'Six steps, each written down before the next one starts.'}
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
                  ? 'Especificaciones escritas y criterios de aceptación acordados antes de la producción.'
                  : 'Written specifications and acceptance criteria agreed before production.'}
              </p>
            </div>
            <Link href="/how-we-work" className="editorial-text-link text-brand-ink">
              {es ? 'Cómo trabajamos' : 'How we work'}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE SUPPLY */}
      <section id="supply" className="editorial-section py-24">
        <div className="editorial-container">
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">
                <span className="launch-dot" aria-hidden="true" />
                {es ? '04 — LO QUE SUMINISTRAMOS' : '04 — WHAT WE SUPPLY'}
              </p>
              <h2 className="editorial-title">
                {es ? 'Packaging y textiles.' : 'Packaging and textiles.'}
                <br />
                <em>{es ? 'Fabricados según su especificación.' : 'Made to your specification.'}</em>
              </h2>
            </div>
            <div className="rounded-xl border border-brand-line bg-white p-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                {es ? 'Para marcas de EE. UU.' : 'For U.S. brands'}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-brand-ink">
                {brandPoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supplyLines.map((line) => (
              <article
                key={line.href}
                className="group flex flex-col justify-between rounded-xl border border-brand-line bg-white p-6 transition hover:border-brand-ink/50 hover:shadow-md"
              >
                <div>
                  <span className="rounded-md bg-brand-surface px-2.5 py-1 text-[10px] font-semibold text-brand-ink border border-brand-line">
                    {line.tag}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-brand-ink">
                    <Link href={line.href}>{line.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-brand-muted">{line.body}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-line/60">
                  <Link
                    href={line.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-green hover:underline"
                  >
                    {es ? 'Ver la página' : 'View the page'}
                    <span className="sr-only">: {line.title}</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SHORT ANSWERS */}
      <section id="knowledge-base" className="editorial-section border-t border-brand-line bg-brand-surface/40 py-24">
        <div className="editorial-container">
          <div className="mb-14 max-w-3xl">
            <p className="editorial-kicker">
              <HelpCircle className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
              {es ? '05 — RESPUESTAS BREVES' : '05 — SHORT ANSWERS'}
            </p>
            <h2 className="editorial-title">
              {es ? 'Respuestas directas.' : 'Direct answers.'}
              <br />
              <em>{es ? 'Que se sostienen por sí solas.' : 'That stand on their own.'}</em>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {shortAnswers.map((item) => (
              <div key={item.q} className="rounded-xl border border-brand-line bg-white p-7 shadow-xs">
                <h3 className="text-base font-semibold text-brand-ink">{item.q}</h3>
                <p className="direct-answer mt-3 pl-3 text-xs leading-relaxed text-brand-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTIONS */}
      <section id="faq" className="editorial-section faq-section border-t border-brand-line bg-brand-surface/30 py-24">
        <div className="editorial-container faq-layout">
          <div>
            <p className="editorial-kicker">
              <span className="launch-dot" aria-hidden="true" />
              {es ? '06 — PREGUNTAS FRECUENTES' : '06 — QUESTIONS'}
            </p>
            <h2 className="editorial-title">
              {es ? 'Preguntas antes de' : 'Questions before your'}
              <br />
              <em>{es ? 'su primer pedido.' : 'first order.'}</em>
            </h2>
            <p className="editorial-body">
              {es
                ? 'Quién factura, qué incluye un suministro, quién importa y qué queda fuera.'
                : 'Who invoices, what a supply includes, who imports, and what stays outside.'}
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

      {/* BRIEF FORM */}
      <section id="contact" className="editorial-section contact-section border-t border-brand-line py-24">
        <div className="editorial-container">
          <div className="contact-panel">
            <div>
              <p className="editorial-kicker">
                <span className="launch-dot" aria-hidden="true" />
                {es ? 'COMENCEMOS' : 'START A PROJECT'}
              </p>
              <h2 className="editorial-title">
                {es ? 'Cuéntenos sobre' : 'Tell us about'}
                <br />
                <em>{es ? 'su próximo proyecto.' : 'your next project.'}</em>
              </h2>
              <p className="editorial-body">
                {es
                  ? 'Envíe su brief: confirmamos qué se puede cotizar y muestrear, y respondemos por correo.'
                  : 'Send your brief: we confirm what can be quoted and sampled, and reply by email.'}
              </p>
              <a href="mailto:contact@sourcinglabusa.com" className="contact-email">
                contact@sourcinglabusa.com
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <p className="contact-note">
                {es
                  ? 'Atención en inglés y español · Facturación desde Francia o China'
                  : 'Replies in English and Spanish · Invoicing from France or China'}
              </p>
            </div>
            <ContactForm locale={locale} appearance="editorial" />
          </div>
        </div>
      </section>
    </>
  );
}
