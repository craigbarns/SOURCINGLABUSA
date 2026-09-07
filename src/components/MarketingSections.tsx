import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Layers3, Plus } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { CtaLink } from './CtaLink';
import { homeFaqs, homeFaqsES } from '@/lib/home-faqs';

export function MarketingSections({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const es = locale === 'es';
  const collections = [
    {
      number: '01',
      image: 'packaging-collection',
      href: '/custom-packaging',
      title: es
        ? 'Una primera impresión inolvidable.'
        : 'A first impression that stays.',
      name: es ? 'EMPAQUES PERSONALIZADOS' : 'CUSTOM PACKAGING',
      alt: es
        ? 'Concepto de bolsas kraft, cajas verdes y empaques de papel crema'
        : 'Concept kraft shopping bag, forest green gift box and cream paper packaging',
      body: es
        ? 'Cajas, bolsas, papel de seda y detalles de marca. Cada material y acabado, pensado alrededor de tu producto.'
        : 'Boxes, bags, tissue and the finishing touches. Every material and finish considered around the product inside.',
      tags: es
        ? ['Cajas y bolsas', 'Acabados personalizados', 'Marca privada']
        : ['Boxes & bags', 'Custom finishes', 'Private label'],
    },
    {
      number: '02',
      image: 'textile-collection',
      href: '/custom-textile',
      title: es ? 'Tu marca, en cada hilo.' : 'Your brand, in every thread.',
      name: es ? 'PRENDAS Y TEXTILES' : 'CLOTHING & TEXTILES',
      alt: es
        ? 'Concepto de tote bag de lona, prendas de algodón y muestras textiles'
        : 'Concept canvas tote bag, folded cotton apparel and textured fabric swatches',
      body: es
        ? 'Prendas, tote bags, uniformes y accesorios. Desarrollados según tus especificaciones, del tejido a la etiqueta.'
        : 'Apparel, tote bags, uniforms and accessories. Developed to your specifications, from fabric weight to the final label.',
      tags: es
        ? ['Prendas y tote bags', 'Tejidos y colores', 'Etiquetas y bordado']
        : ['Apparel & totes', 'Fabrics & colors', 'Labels & embroidery'],
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
          'Tras aprobar el pedido y las muestras acordadas, compraremos al proveedor seleccionado y coordinaremos el seguimiento de producción.',
        ],
        [
          'Recibe tus productos',
          'Sourcing Lab USA suministrará y facturará los productos. La entrega podrá ser directa de China a tu destino, según las condiciones del pedido.',
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
          'After the order and agreed samples are approved, we will purchase from the selected supplier and coordinate production follow-up.',
        ],
        [
          'Receive your products',
          'Sourcing Lab USA will supply and invoice the products. Delivery may be direct from China to your destination, under the terms agreed for the order.',
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
                  : '01 — WHAT WE BRING TO LIFE'}
              </p>
              <h2 className="editorial-title">
                {es ? 'Pequeños detalles.' : 'Thoughtful details.'}
                <br />
                <em>{es ? 'Una gran diferencia.' : 'A lasting difference.'}</em>
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
                <Link
                  href={item.href}
                  className="collection-image"
                  aria-label={
                    es
                      ? `Explorar ${item.name.toLowerCase()}`
                      : `Explore ${item.name.toLowerCase()}`
                  }
                >
                  <Image
                    src={`/images/${item.image}.webp`}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                  <span className="collection-index">
                    {item.number} / {item.name}
                  </span>
                  <span className="collection-arrow">
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </span>
                </Link>
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
                </div>
              </article>
            ))}
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
          <p className="concept-caption">
            {es
              ? 'Imágenes conceptuales creadas con IA para ilustrar las categorías. Los materiales y acabados se confirman para cada proyecto.'
              : 'AI-created concept imagery to illustrate product categories. Materials and finishes are confirmed for each project.'}
          </p>
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
                ? 'Nuestro modelo previsto en EE. UU. es la compra y reventa de productos: compraremos a proveedores en China y suministraremos los productos a nuestros clientes empresariales, con precios y condiciones acordados por pedido.'
                : 'Our planned U.S. business will purchase products from suppliers in China and resell them to business customers. You will buy your products from Sourcing Lab USA, with product pricing and responsibilities agreed for each order.'}
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
          <figure className="material-photo">
            <Image
              src="/images/textile-collection.webp"
              alt={
                es
                  ? 'Detalle conceptual de la trama del algodón y acabados textiles'
                  : 'Concept study of natural cotton texture, fabric weight and finishing details'
              }
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
            />
            <figcaption className="material-label">
              <Layers3 aria-hidden="true" />
              <span>
                {es
                  ? 'La diferencia está en lo que se siente.'
                  : 'The difference is in how it feels.'}
                <br />
                <small>
                  {es
                    ? 'Estudio conceptual de materiales'
                    : 'Concept material study'}
                </small>
              </span>
            </figcaption>
          </figure>
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
                ? 'Preparamos nuestro lanzamiento en Miami para 2027 como empresa de sourcing y suministro de productos. Prendas y empaques son nuestras especialidades; otros productos se estudian bajo pedido a través de una colaboración independiente establecida en China.'
                : 'We’re preparing our Miami launch for 2027 as a product sourcing and supply business. Clothing and packaging are our core specialties, with other products assessed on request through an established independent China sourcing partnership.'}
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
                {es ? 'Hagamos algo' : 'Let’s make something'}
                <br />
                <em>{es ? 'que sea tuyo.' : 'worth holding.'}</em>
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
                  ? 'Lanzamiento previsto en Miami · 2027'
                  : 'Planned U.S. market launch · Miami, 2027'}
              </p>
            </div>
            <ContactForm locale={locale} appearance="editorial" />
          </div>
        </div>
      </section>
    </>
  );
}
