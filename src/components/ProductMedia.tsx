import Image from 'next/image';

import { ProductIllustration } from '@/components/illustrations/ProductIllustration';
import { productImageSrc, type ProductMediaEntry } from '@/lib/product-media';

interface ProductMediaProps {
  product: ProductMediaEntry;
  /** Sizing and aspect wrapper classes. */
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Shows the product photograph when the manifest carries one, and the drawn
 * figure until then. Adding a file to src/lib/product-media.json is the only
 * change needed to switch a product over.
 */
export function ProductMedia({
  product,
  className = '',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
}: ProductMediaProps) {
  const src = productImageSrc(product);

  return (
    <div className={`relative overflow-hidden bg-brand-surface ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={product.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <ProductIllustration
          kind={product.illustration}
          className="h-full w-full"
        />
      )}
    </div>
  );
}
