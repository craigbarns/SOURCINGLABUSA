import { SourcingOverview } from './SourcingOverview';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { CtaLink } from './CtaLink';
import { homeFaqs, homeFaqsES } from '@/lib/home-faqs';

export function MarketingSections({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const es = locale === 'es';
  const collections = [
    {
      number: '01',
      href: '/custom-packaging',
      title: es
        ? 'Cajas, empaques y etiquetas.'
        : 'Boxes, packaging & labels.',
      name: es ? 'EMPAQUES PERSONALIZADOS' : 'CUSTOM PACKAGING',
      body: es
        ? 'Cajas de producto, bolsas, empaques, etiquetas e insertos. Comparte dimensiones, cantidades, diseños y acabados.'
        : 'Product boxes, bags, packaging, labels and inserts. Share dimensions, quantities, artwork and finishes for your next project.',
      tags: es
        ? ['Cajas y bolsas', 'Acabados personalizados', 'Marca privada']
        : ['Boxes & bags', 'Custom finishes', 'Private label'],
    },
    {
      number: '02',
      href: '/custom-textile',
      title: es ? 'Prendas para tu marca.' : 'Clothing made to your brief.',
      name: es ? 'PRENDAS Y TEXTILES' : 'CLOTHING & TEXTILES',
      body: es
        ? 'Prendas, ropa deportiva y técnica, uniformes y textiles. Tejidos, tallas, construcción y etiquetas definidos según tu proyecto.'
        : 'Clothing, sportswear, technical apparel, uniforms and textiles. Fabrics, sizing, construction and labels specified for your project.',
      tags: es
        ? ['Prendas y uniformes', 'Deporte y técnica', 'Etiquetas y bordado']
        : ['Clothing & uniforms', 'Sportswear & technical', 'Labels & embroidery'],
    },
  ];
  const steps = es
    ? [
        [
          'Comparte tu idea',
          'Producto, cantidad, referencias y destino. Un brief claro es el punto de partida.',
        ],
        [
          'Revisa nuestra propuesta',
          'Revisa nuestra propuesta de producto: especificaciones, cantidades, muestras, precios y condiciones comerciales.',
        ],
        [
          'Confirma el pedido',
          'Tras aprobar el pedido y las muestras acordadas, coordinamos la compra y el seguimiento de producción con el proveedor seleccionado.',
        ],
        [
          'Recibe tus productos',
          'La empresa de Francia o China identificada en tu presupuesto suministra y factura los productos. La entrega puede ser directa desde China, según las condiciones acordadas.',
        ],
      ]
    : [
        [
          'Start with your idea',
          'Your product, quantity, references and destination. A clear brief is where everything begins.',
        ],
        [
          'Review our proposal',
          'Review our product proposal: specifications, quantities, sample requirements, product pricing and commercial terms.',
        ],
        [
          'Confirm your order',
          'After the order and agreed samples are approved, we coordinate purchasing and production follow-up with the selected supplier.',
        ],
        [
          'Receive your products',
          'The company in France or China identified in your quote supplies and invoices your products. Delivery may be direct from China under the agreed order terms.',
        ],
      ];
  const points = es
    ? [
        [
          'El producto primero',
          'Materiales, dimensiones, acabados y cantidades definidos en un brief práctico.',
        ],
        [
          'Una colaboración independiente en China',
          'Coordinación de proveedores y seguimiento de producción a través de una relación establecida.',
        ],
        [
          'Expectativas claras desde el principio',
          'Muestras, puntos de control y responsabilidades de entrega acordados por pedido.',
        ],
      ]
    : [
        [
          'Product thinking, from the start',
          'Materials, dimensions, finishes and quantities brought together in a practical brief.',
        ],
        [
          'An established China partnership',
          'Supplier coordination and production follow-up through an independent sourcing relationship.',
        ],
        [
          'Clear expectations, at every stage',
          'Samples, quality checkpoints and delivery responsibilities agreed for each order.',
        ],
      ];
  return (
    <>
      <section id="offerings" className="editorial-section">
        <div className="editorial-container">
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">
                {es
                  ? '01 — LO QUE DESARROLLAMOS'
                  : '01 — SOURCING SPECIALTIES'}
              </p>
              <h2 className="editorial-title">
                {es ? 'Tu producto.' : 'Your product.'}
                <br />
                <em>{es ? 'Nuestro punto de partida.' : 'Our starting point.'}</em>
              </h2>
            </div>
            <p className="editorial-body">
              {es
                ? 'Prendas y empaques son nuestras especialidades. También estudiamos otros productos bajo pedido, con un alcance y unas condiciones definidos para cada proyecto.'
                : 'Clothing and packaging are where our product experience starts. Our sourcing and supply offer also extends to other products, assessed against your brief.'}
            </p>
          </div>
          <div className="collection-grid">
            {collections.map((item) => (
              <article className="collection-card" key={item.number}>
                <p className="editorial-kicker collection-heading">{item.number} / {item.name}</p>
                <div className="collection-copy">
                  <h3 className="collection-title">
                    <Link href={item.href}>{item.title}</Link>
                  </h3>
                  <p className="editorial-body">{item.body}</p>
                  <ul className="collection-tags">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <CtaLink href={`${item.href}#contact`} location="offering" label={`Discuss ${item.name.toLowerCase()}`} className="editorial-text-link mt-5">{es ? 'Consultar este proyecto' : 'Discuss this project'}<ArrowUpRight size={17} aria-hidden="true" /></CtaLink>
                </div>
              </article>
            ))}
          </div>
          <div className="sourcing-specialist-link">
            <p>{es ? '¿Una colección deportiva o técnica?' : 'Planning a sportswear or technical collection?'}</p>
            <Link href="/sportswear-sourcing" className="editorial-text-link">{es ? 'Ver requisitos de tejidos, tallas y muestras (inglés)' : 'Explore fabrics, fit and sampling requirements'}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div id="other-products" className="other-products-panel">
            <div>
              <p className="editorial-kicker">
                {es ? '03 / OTROS PRODUCTOS' : '03 / OTHER PRODUCTS'}
              </p>
              <h3 className="collection-title">
                {es
                  ? '¿Otro producto en mente?'
                  : 'Have another product in mind?'}
              </h3>
            </div>
            <p className="editorial-body">
              {es
                ? 'Comparte el producto, su uso, las cantidades y tus referencias. Confirmaremos las posibilidades de suministro y los requisitos antes de proponerte una solución.'
                : 'Tell us the product, its intended use, quantities and references. We will review sourcing feasibility and requirements before proposing a supply solution.'}
            </p>
            <CtaLink
              href="#contact"
              location="other_products"
              label="Discuss another product"
              className="editorial-text-link"
            >
              {es ? 'Cuéntanos tu proyecto' : 'Discuss your product'}
              <ArrowUpRight size={17} aria-hidden="true" />
            </CtaLink>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="editorial-section process-section">
        <div className="editorial-container">
          <div className="section-heading-row">
            <div>
              <p className="editorial-kicker">
                {es
                  ? '02 — DE LA IDEA AL PRODUCTO'
                  : '02 — FROM THE FIRST SKETCH'}
              </p>
              <h2 className="editorial-title">
                {es ? 'Una visión clara.' : 'Big on possibility.'}
                <br />
                <em>{es ? 'Un proceso sencillo.' : 'Clear on the process.'}</em>
              </h2>
            </div>
            <p className="editorial-body">
              {es
                ? 'Puedes iniciar tu proyecto ahora. El presupuesto identifica la empresa de Francia o China que suministra y factura los productos, con las especificaciones, precios y responsabilidades acordados para el pedido.'
                : 'You can start your project now. Your quotation identifies the company in France or China supplying and invoicing the products, with specifications, product pricing and responsibilities agreed for your order.'}
            </p>
          </div>
          <ol className="process-steps">
            {steps.map(([title, body], i) => (
              <li className="process-step" key={title}>
                <div className="process-number">
                  <span>0{i + 1}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <p id="compliance" className="process-note">
            {es
              ? 'Los puntos de control de calidad y las responsabilidades de importación y entrega se acuerdan para cada pedido. El seguimiento de producción no es una inspección certificada independiente.'
              : 'Quality checkpoints, import responsibilities and delivery terms are agreed order by order. Production follow-up is not an independent certified inspection service.'}
          </p>
        </div>
      </section>
      <section id="experience" className="editorial-section">
        <div className="editorial-container approach-layout">
<SourcingOverview locale={locale} />
          <div className="approach-copy">
            <p className="editorial-kicker">
              {es
                ? '03 — NUESTRA FORMA DE TRABAJAR'
                : '03 — THE SOURCING LAB APPROACH'}
            </p>
            <h2 className="editorial-title">
              {es ? 'Más intención.' : 'A little more intention.'}
              <br />
              <em>{es ? 'En cada decisión.' : 'In every decision.'}</em>
            </h2>
            <p className="editorial-body">
              {es
                ? 'Gestionamos proyectos de sourcing y suministro desde ahora, con facturación desde Francia o China. Prendas, ropa deportiva y técnica y empaques son nuestras especialidades, con una colaboración independiente establecida en China.'
                : 'We handle sourcing and product supply projects now, with invoicing from France or China. Clothing, sportswear, technical apparel and packaging are our specialties, supported by an established independent China sourcing partnership.'}
            </p>
            <ul className="approach-points">
              {points.map(([title, body], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/about" className="editorial-text-link">
              {es ? 'Conoce Sourcing Lab USA' : 'About Sourcing Lab USA'}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section id="faq" className="editorial-section faq-section">
        <div className="editorial-container faq-layout">
          <div>
            <p className="editorial-kicker">
              {es ? 'SIN COMPLICACIONES' : 'A FEW THINGS, MADE CLEAR'}
            </p>
            <h2 className="editorial-title">
              {es ? 'Buenas preguntas.' : 'Good questions.'}
              <br />
              <em>{es ? 'Respuestas claras.' : 'Straight answers.'}</em>
            </h2>
            <p className="editorial-body">
              {es
                ? 'La primera conversación trata de tu producto y de lo que necesitas para hacerlo realidad.'
                : 'The first conversation is about your product and what it needs to come to life.'}
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
      <section className="editorial-section sourcing-guide-section">
        <div className="editorial-container">
          <p className="editorial-kicker">
            {es ? 'PREPARA TU PROYECTO' : 'A BETTER STARTING POINT'}
          </p>
          <h2 className="editorial-title">
            {es
              ? 'Una idea clara. Un brief mejor.'
              : 'Clearer brief. Better decisions.'}
          </h2>
          <p className="editorial-body">
            {es
              ? 'Qué incluir para solicitar una cotización de prendas, empaques u otros productos. Con una plantilla descargable en inglés.'
              : 'What to include when requesting a quotation for clothing, packaging or another product. Includes a downloadable sourcing brief template.'}
          </p>
          <Link
            href="/blog/china-sourcing-rfq-checklist"
            className="editorial-text-link"
          >
            {es
              ? 'Lee la guía de cotización (inglés)'
              : 'Read the China sourcing RFQ checklist'}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section id="contact" className="editorial-section contact-section">
        <div className="editorial-container">
          <div className="contact-panel">
            <div>
              <p className="editorial-kicker">
                {es
                  ? 'TODO EMPIEZA CON UNA IDEA'
                  : 'IT ALL STARTS WITH AN IDEA'}
              </p>
              <h2 className="editorial-title">
                {es ? 'Cuéntanos' : 'Tell us about'}
                <br />
                <em>{es ? 'tu próximo proyecto.' : 'your next project.'}</em>
              </h2>
              <p className="editorial-body">
                {es
                  ? 'Cuéntanos qué estás imaginando. Comparte el producto, las cantidades y las referencias: definiremos juntos el siguiente paso.'
                  : 'Tell us what you have in mind. Share the product, quantities and references, and we’ll work out the right next step.'}
              </p>
              <a
                href="mailto:contact@sourcinglabusa.com"
                className="contact-email"
              >
                contact@sourcinglabusa.com
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <p className="contact-note">
                {es
                  ? 'Proyectos disponibles ahora · Facturación desde Francia o China'
                  : 'Projects open now · Invoicing from France or China'}
              </p>
            </div>
            <ContactForm locale={locale} appearance="editorial" />
          </div>
        </div>
      </section>
    </>
  );
}
