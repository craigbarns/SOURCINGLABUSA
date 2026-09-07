import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Layers3, Plus } from 'lucide-react';
import { ContactForm } from './ContactForm';

const faqs = [
  [
    'Do you only source packaging?',
    'No. Our initial focus is custom packaging and textile products for brands, e-commerce businesses, and companies.',
  ],
  [
    'Where are you based?',
    'Sourcing Lab USA is preparing its U.S. market launch from Miami for 2027, supported by an established China sourcing partnership.',
  ],
  [
    'Can you work from an existing design or sample?',
    'Yes. Send your brief, reference images, dimensions, quantity, and target timing. We will confirm what can be quoted and sampled.',
  ],
  [
    'Who handles compliance and import requirements?',
    'Requirements depend on the exact product and destination. Product specifications, certificates, shipping terms, and importer responsibilities are confirmed for each order before production and shipment.',
  ],
];
const faqsES = [
  [
    '¿Solo trabajan con empaques?',
    'No. Nuestro enfoque inicial son los empaques y productos textiles personalizados para marcas, empresas de comercio electrónico y otros negocios.',
  ],
  [
    '¿Dónde están ubicados?',
    'Sourcing Lab USA prepara su lanzamiento al mercado estadounidense desde Miami para 2027, con el apoyo de una colaboración de sourcing establecida en China.',
  ],
  [
    '¿Pueden trabajar con un diseño o una muestra existente?',
    'Sí. Comparte tu brief, imágenes de referencia, dimensiones, cantidad y fechas previstas. Confirmaremos qué se puede cotizar y producir como muestra.',
  ],
  [
    '¿Quién se encarga de los requisitos de importación?',
    'Los requisitos dependen del producto y el destino. Las especificaciones, los certificados, las condiciones de envío y las responsabilidades del importador se confirman para cada pedido antes de producir y enviar.',
  ],
];

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
      name: es ? 'TEXTILES PERSONALIZADOS' : 'CUSTOM TEXTILES',
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
          'Define los detalles',
          'Revisa opciones, precios, materiales y requisitos de muestra antes de decidir.',
        ],
        [
          'Aprueba la producción',
          'Especificaciones y muestras aprobadas, con seguimiento en los puntos acordados.',
        ],
        [
          'Prepara la entrega',
          'Entrega de China a tu destino en EE. UU., según las condiciones acordadas para tu pedido.',
        ],
      ]
    : [
        [
          'Start with your idea',
          'Your product, quantity, references and destination. A clear brief is where everything begins.',
        ],
        [
          'Make it your own',
          'Review supplier options, pricing, materials and sample requirements before you decide.',
        ],
        [
          'Approve every detail',
          'Agreed specifications and samples, with production follow-up at the checkpoints set for your order.',
        ],
        [
          'Plan the handover',
          'Direct delivery from China to your U.S. destination, under the shipping terms agreed for your order.',
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
                ? 'Dos especialidades, una visión compartida: productos que transmiten la identidad de tu marca en cada punto de contacto.'
                : 'Two specialties. One shared belief: the things people hold, open and wear should feel like your brand.'}
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
                ? 'Un proceso de compra y suministro documentado, desde la primera conversación hasta los términos de entrega.'
                : 'A considered purchase-and-supply process, with the important decisions documented from the first conversation to delivery terms.'}
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
                ? 'El sourcing empieza al entender el producto. Preparamos nuestro lanzamiento en Miami para 2027 con un enfoque en empaques y textiles, apoyados por una colaboración independiente establecida en China.'
                : 'Good sourcing starts with understanding the product. We’re preparing our Miami launch for 2027 with a focused packaging and textile offer, supported by an established independent partnership in China.'}
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
            {(es ? faqsES : faqs).map(([question, answer]) => (
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
