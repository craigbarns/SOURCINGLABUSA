import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/** Product scope in plain text, without illustrative products or stock imagery. */
export function SourcingOverview({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const es = locale === 'es';
  const categories = es ? [
    ['/custom-textile', '01', 'Prendas', 'Colecciones, uniformes, tejidos y acabados.'],
    ['/sportswear-sourcing', '02', 'Deporte y prendas técnicas', 'Uso, ajuste, tejidos y requisitos de rendimiento.'],
    ['/custom-packaging', '03', 'Packaging y etiquetas', 'Cajas, bolsas, empaques, insertos y etiquetas.'],
    ['/es#other-products', '04', 'Tu solicitud de sourcing', 'Otros productos, tras revisar su viabilidad.'],
  ] : [
    ['/custom-textile', '01', 'Clothing', 'Collections, uniforms, fabrics and finishes.'],
    ['/sportswear-sourcing', '02', 'Sportswear & technical apparel', 'Intended use, fit, fabrics and performance requirements.'],
    ['/custom-packaging', '03', 'Packaging & labels', 'Boxes, bags, packaging, inserts and labels.'],
    ['/#other-products', '04', 'Your sourcing request', 'Other products, after a feasibility review.'],
  ];
  return (
    <aside className="sourcing-overview" aria-label={es ? 'Especialidades de sourcing' : 'Sourcing specialties'}>
      <p className="editorial-kicker">SOURCING LAB USA / {es ? 'ALCANCE DEL PRODUCTO' : 'PRODUCT SCOPE'}</p>
      <h2>{es ? '¿Qué necesitas fabricar?' : 'What do you need made?'}</h2>
      <div>{categories.map(([href, number, title, body]) => (
        <Link href={href} key={number} className="sourcing-category">
          <span className="sourcing-category-number">{number}</span>
          <div><h3>{title}</h3><p>{body}</p></div>
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      ))}</div>
      <p className="sourcing-overview-note">{es ? 'Producto + cantidades + referencias + destino + fechas' : 'Product + quantity + references + destination + timing'}</p>
    </aside>
  );
}
