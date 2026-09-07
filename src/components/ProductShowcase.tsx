import { ProductMedia } from '@/components/ProductMedia';
import {
  PRODUCT_MEDIA,
  productsByCategory,
  type ProductCategory,
} from '@/lib/product-media';

type ShowcaseLocale = 'en' | 'es';

const COPY: Record<
  ShowcaseLocale,
  { eyebrow: string; title: string; intro: string }
> = {
  en: {
    eyebrow: 'What we develop',
    title: 'Packaging and textile, specified down to the finish.',
    intro:
      'Material, construction, print method, and branding are confirmed against your brief before anything goes into production.',
  },
  es: {
    eyebrow: 'Lo que desarrollamos',
    title: 'Packaging y textil, especificados hasta el acabado.',
    intro:
      'El material, la construcción, el método de impresión y la marca se confirman con su brief antes de iniciar la producción.',
  },
};

interface ProductShowcaseProps {
  locale?: ShowcaseLocale;
  /** Narrows the grid to one category, for a category landing page. */
  category?: ProductCategory;
}

export function ProductShowcase({ locale = 'en', category }: ProductShowcaseProps) {
  const copy = COPY[locale];
  const products = category ? productsByCategory(category) : PRODUCT_MEDIA;

  return (
    <section
      id="products"
      className="scroll-mt-20 border-t border-white/[0.07] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2 className="text-balance mt-6 max-w-3xl text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              {copy.title}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#94a198] lg:pb-1">
            {copy.intro}
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <li
              key={product.id}
              className="bento-card overflow-hidden rounded-[22px]"
            >
              <ProductMedia
                product={product}
                priority={index < 3}
                className="aspect-[4/3] w-full border-b border-white/[0.07]"
              />
              <div className="p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#70e1b2]">
                  {product.category === 'packaging' ? 'Packaging' : 'Textile'}
                </p>
                <h3 className="mt-3 text-lg font-bold tracking-[-0.02em] text-white">
                  {product.name}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.specs.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-semibold text-[#a9b5ae]"
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
