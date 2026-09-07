import manifest from './product-media.json';

export const PRODUCT_ILLUSTRATION_KINDS = [
  'rigidBox',
  'mailerCarton',
  'paperBag',
  'printedLabel',
  'toteBag',
  'fabricStack',
] as const;

export type ProductIllustrationKind = (typeof PRODUCT_ILLUSTRATION_KINDS)[number];

export type ProductCategory = 'packaging' | 'textile';

export interface ProductMediaEntry {
  id: string;
  category: ProductCategory;
  name: string;
  illustration: ProductIllustrationKind;
  /** File name under public/products, or null while no image exists yet. */
  file: string | null;
  alt: string;
  specs: string[];
}

const IMAGE_BASE_PATH: string = manifest.imageBasePath;

export const PRODUCT_MEDIA: ProductMediaEntry[] = manifest.products.map(
  (product) => ({
    id: product.id,
    category: product.category as ProductCategory,
    name: product.name,
    illustration: product.illustration as ProductIllustrationKind,
    file: product.file,
    alt: product.alt,
    specs: product.specs,
  }),
);

export function productsByCategory(
  category: ProductCategory,
): ProductMediaEntry[] {
  return PRODUCT_MEDIA.filter((product) => product.category === category);
}

export function getProduct(id: string): ProductMediaEntry | undefined {
  return PRODUCT_MEDIA.find((product) => product.id === id);
}

/** Public URL of a product image, or null while the manifest has no file. */
export function productImageSrc(product: ProductMediaEntry): string | null {
  return product.file ? `${IMAGE_BASE_PATH}/${product.file}` : null;
}

/** True once at least one product has a real image to show. */
export const HAS_PRODUCT_IMAGERY = PRODUCT_MEDIA.some(
  (product) => product.file !== null,
);
