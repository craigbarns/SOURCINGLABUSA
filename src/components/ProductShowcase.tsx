import type { ProductCategory } from '@/lib/product-media';

type ShowcaseLocale = 'en' | 'es';

const COPY: Record<
  ShowcaseLocale,
  { eyebrow: string; title: string; intro: string }
> = {
  en: {
    eyebrow: 'Product briefs we review',
    title: 'Clothing, sportswear, packaging and labels.',
    intro:
      'Material, construction, print method, and branding are confirmed against your brief before anything goes into production.',
  },
  es: {
    eyebrow: 'Proyectos que estudiamos',
    title: 'Prendas, ropa deportiva, empaques y etiquetas.',
    intro:
      'El material, la construcción, el método de impresión y la marca se confirman con su brief antes de iniciar la producción.',
  },
};

interface ProductShowcaseProps {
  locale?: ShowcaseLocale;
  /** Narrows the grid to one category, for a category landing page. */
  category?: ProductCategory;
}

export function ProductShowcase({
  locale = 'en',
  category,
}: ProductShowcaseProps) {
  const copy = COPY[locale];
  const es = locale === 'es';
  const briefs = [
    { id: 'boxes', category: 'packaging', name: es ? 'Cajas de producto' : 'Product boxes', specs: es ? ['Dimensiones y estructura', 'Material y acabado', 'Diseños y cantidades'] : ['Dimensions & structure', 'Material & finish', 'Artwork & quantities'] },
    { id: 'labels', category: 'packaging', name: es ? 'Etiquetas e insertos' : 'Labels & inserts', specs: es ? ['Formato y uso', 'Texto y diseño', 'Requisitos del producto'] : ['Format & intended use', 'Copy & artwork', 'Product requirements'] },
    { id: 'packaging', category: 'packaging', name: es ? 'Bolsas y conjuntos de packaging' : 'Bags & packaging sets', specs: es ? ['Componentes necesarios', 'Materiales y colores', 'Cantidades por componente'] : ['Required components', 'Materials & colors', 'Quantities by component'] },
    { id: 'clothing', category: 'textile', name: es ? 'Prendas y uniformes' : 'Clothing & uniforms', specs: es ? ['Tejido y construcción', 'Medidas y tallas', 'Marca y etiquetas'] : ['Fabric & construction', 'Measurements & sizes', 'Branding & labels'] },
    { id: 'sportswear', category: 'textile', name: es ? 'Ropa deportiva' : 'Sportswear', specs: es ? ['Actividad y ajuste', 'Tejido y elasticidad', 'Muestras por talla'] : ['Activity & fit', 'Fabric & stretch', 'Size-set samples'] },
    { id: 'technical', category: 'textile', name: es ? 'Prendas técnicas' : 'Technical apparel', specs: es ? ['Uso previsto', 'Propiedades necesarias', 'Evidencias por confirmar'] : ['Intended use', 'Required properties', 'Evidence to confirm'] },
  ];
  const products = category ? briefs.filter((brief) => brief.category === category) : briefs;

  return (
    <section
      id="products"
      className="scroll-mt-20 border-t border-brand-line py-24 sm:py-28"
    >
      <div className="editorial-container">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2 className="text-balance mt-6 max-w-3xl text-3xl font-medium tracking-[-0.045em] text-brand-ink sm:text-5xl">
              {copy.title}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-brand-muted lg:pb-1">
            {copy.intro}
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li
              key={product.id}
              className="bento-card overflow-hidden rounded-[4px]"
            >
              <div className="p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-green">
                  {product.category === 'packaging' ? 'Packaging' : 'Textile'}
                </p>
                <h3 className="mt-3 text-lg font-bold tracking-[-0.02em] text-brand-ink">
                  {product.name}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.specs.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-lg border border-brand-line bg-brand-surface px-2.5 py-1 text-[11px] font-semibold text-brand-muted"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
