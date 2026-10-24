import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { NOT_AN_IMPORTER } from '@/lib/positioning';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Private Label Products from China: Your Brand, Under Contract',
  description:
    'Garments, textile goods and their packaging made under your brand in China and supplied under a written contract, invoiced from France or China. Other products are reviewed for feasibility first.',
  path: '/private-label-manufacturing',
});

const page: ServicePageContent = {
  path: '/private-label-manufacturing',
  eyebrow: 'Private label · Product, labels and packaging',
  title: 'Private label: your brand on the product, not only the box.',
  directAnswer:
    'Private label means a manufacturer’s product sold under your brand: your labels, colors, trims and packaging on a product made to your specification. Sourcing Lab USA supplies private label garments, textile goods and their packaging, made in China under a written contract. Other products are reviewed for feasibility first. The contract and invoice come from the company in France or China named in your quotation.',
  intro:
    'A private label product is decided by its details: the base product, what changes on it, the labels it must carry and the packaging it ships in. Writing them down before the sample is what keeps the bulk order looking like the sample.',
  overviewTitle: 'What changes on the base product.',
  overview:
    'Most private label projects start from a product the factory already makes and change part of it: fabric or color, a woven label, a printed logo, a hang tag, the packaging. The quotation states which parts are custom, the minimum each one sets, and the sample to approve before production.',
  processTitle: 'From base product to branded order.',
  offerName: 'Private label product supply',
  offerDescription:
    'Private label garments, textile goods and their packaging made in China and supplied under a written contract, with other products after a feasibility review.',
  focusAreas: [
    {
      title: 'Base product',
      body: 'A product the factory already makes, or one built from your tech pack. The more that is new, the higher the minimum and the longer the sampling.',
    },
    {
      title: 'Brand details',
      body: 'Woven or printed labels, logo application, colorways, trims and hang tags, each specified with its position and approved on the sample.',
    },
    {
      title: 'Required labels',
      body: 'Products sold in the U.S. may need country-of-origin marking, fiber content and care labels, or other product-specific labels. Which ones apply is confirmed per product before the artwork is approved.',
    },
    {
      title: 'Packaging',
      body: 'Polybags, boxes, mailers and inserts carrying your brand, specified with the product so the minimums line up.',
    },
  ],
  briefItems: [
    'The product, or a reference product or tech pack',
    'What changes: fabric, color, labels, logo, trims',
    'Packaging and any barcode your sales channel requires',
    'Quantity per version and target date',
  ],
  workflow: [
    {
      title: 'Brief',
      body: 'The base product, the custom parts, the packaging and the quantity.',
    },
    {
      title: 'Factory search and pricing',
      body: 'Checked manufacturers and a quotation stating which parts are custom and what each sets as a minimum.',
    },
    {
      title: 'Branded sample',
      body: 'A sample with your labels, colors and packaging; the one you approve becomes the reference.',
    },
    {
      title: 'Order and production follow-up',
      body: 'Production is followed against the approved sample, with any inspection written into the quotation.',
    },
  ],
  faqs: [
    {
      question: 'What is the difference between private label and custom (OEM) manufacturing?',
      answer:
        'Private label starts from a product the factory already makes and adds your brand and chosen changes. Custom manufacturing builds the product from your own specification. Many projects sit between the two.',
    },
    {
      question: 'What products do you supply under private label?',
      answer:
        'Garments, textile goods and their packaging, which are the core of the business. Other products are reviewed for feasibility before anything is quoted.',
    },
    {
      question: 'How are brand colors matched?',
      answer:
        'Colors are specified with standard references such as Pantone, and approved on lab dips, print proofs or the sample before production.',
    },
    {
      question: 'Can the cartons and labels meet my sales channel’s requirements?',
      answer:
        'Barcodes, carton labels and packing can be specified from your channel’s requirements, such as a marketplace or a retailer, and checked on the sample. Preparing or delivering goods to a fulfillment warehouse is not part of the supply.',
    },
    {
      question: 'Who handles freight and the import?',
      answer: NOT_AN_IMPORTER.en,
    },
  ],
  briefTitle: 'Send your private label brief.',
  briefIntro:
    'The product, what changes on it, the packaging and the quantity. We confirm what can be quoted and sampled.',
  relatedPages: [
    {
      href: '/private-label-packaging',
      title: 'Private label packaging',
      description: 'Boxes, labels and inserts that carry your brand.',
    },
    {
      href: '/custom-textile',
      title: 'Clothing and textiles',
      description: 'Garments and textile products, a core specialty.',
    },
    {
      href: '/product-development',
      title: 'Product development',
      description: 'From your specification to an approved sample.',
    },
  ],
};

export default function PrivateLabelManufacturingPage() {
  return <ServiceLandingPage page={page} />;
}
