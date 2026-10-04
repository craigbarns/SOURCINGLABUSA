import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Textile, Apparel & Garment Sourcing | Sourcing Lab USA',
  description:
    'Direct factory apparel and textile sourcing for U.S. fashion brands, athletic labels, and corporate uniform suppliers. Custom fabrics, tech packs, and production.',
  path: '/industries/textiles',
});

const page: ServicePageContent = {
  path: '/industries/textiles',
  eyebrow: 'Industry Vertical · Textile & Apparel Manufacturing',
  title: 'Textile, Apparel & Technical Garment Sourcing',
  directAnswer:
    'Textile and apparel sourcing connects American fashion labels, sportswear brands, and uniform suppliers with specialized knitting, weaving, dyeing, and garment assembly factories overseas. It manages fabric yarn selection, custom dye lot matching (lab dips), tech pack grading, prototype sampling, FTC fiber labeling compliance, and mass garment production to deliver consistent fit and handfeel.',
  intro:
    'Textile manufacturing has the narrowest margin for error of any consumer goods category. Minor variations in fabric GSM (grams per square meter), shrinkage rates, dye lot batching, or seam stitching destroy consumer fit and trigger massive retail returns. Sourcing Lab USA delivers rigorous garment tech pack execution and on-site fabric inspection.',
  overviewTitle: 'Fabric-first garment procurement across premier textile hubs.',
  overview:
    'Garment quality is decided at the fabric mill, not at the cutting table. We source fabrics directly from specialized textile hubs in Zhejiang (Shaoxing Keqiao), Jiangsu, and Guangdong, verifying fabric composition, colorfastness, tensile strength, and shrinkage before cut-and-sew operations commence.',
  processTitle: 'The complete apparel production lifecycle.',
  offerName: 'Textile & Apparel Manufacturing Sourcing',
  offerDescription:
    'Direct factory procurement of custom clothing collections, technical sportswear, workwear uniforms, knitted fabrics, and branded trims.',
  focusAreas: [
    {
      title: 'Custom Fabric Knitting & Dyeing',
      body: 'Custom weaving, circular knitting, and piece dyeing for organic cotton, French terry, performance nylon/spandex blends, recycled polyester, and merino wool.',
    },
    {
      title: 'Sportswear & Performance Technical Apparel',
      body: 'Moisture-wicking, four-way stretch, anti-microbial treatments, laser-cut ventilation, flatlock stitching, and heat-bonded taped seams for athletic apparel.',
    },
    {
      title: 'Tech Pack Execution & Pattern Grading',
      body: 'Translating design sketches into production-ready tech packs with graded size charts (XS to 3XL), measurement tolerance tables, and construction diagrams.',
    },
    {
      title: 'Branding Trims, Hardware & Hang Tags',
      body: 'Custom branded YKK zippers, embossed metal aglets, high-density silicone heat transfers, woven damask neck labels, and FSC-certified retail hang tags.',
    },
  ],
  briefItems: [
    'Garment style, tech pack, measurement specs, or physical reference garment',
    'Fabric composition, desired GSM weight, finish (brushed, peach, water-repellent)',
    'Size breakdown, colorways, and total order volume (minimum 300–500 units per style)',
    'Target FOB/DDP unit target price and seasonal delivery deadline',
  ],
  workflow: [
    {
      title: 'Tech Pack & Fabric Mill Alignment',
      body: 'We review your tech pack specifications, source candidate fabric swatches, and negotiate yarn spinning and knitting parameters with primary textile mills.',
    },
    {
      title: 'Lab Dips & Pre-Production Proto Samples',
      body: 'The factory submits Pantone lab dips (color swatches under D65 light) and constructs a complete prototype garment for fit and construction approval.',
    },
    {
      title: 'Size-Set & Pre-Production (PP) Approval',
      body: 'Full size sets are sewn across all sizes to verify grading accuracy, followed by formal Pre-Production (PP) golden sample sign-off.',
    },
    {
      title: 'Bulk Cutting, Sewing & In-Line QC',
      body: 'Fabric rolls are rested to prevent post-cutting shrinkage. Continuous in-line QC monitors seam strength, stitch tension (SPI), and print placement.',
    },
    {
      title: 'AQL Garment Inspection & Packing',
      body: 'Where the specification requires it, finished garments undergo metal detector needle checks, measurement tolerance audits, steam finishing, individual polybagging, and master carton packing.',
    },
  ],
  showcaseCategory: 'textile',
  benchmarks: [
    {
      label: 'Minimum order quantity (MOQ)',
      value: 'From 300 to 500 pcs/style',
      qualifier: 'Driven by custom fabric knitting and minimum commercial dye vat capacities.',
    },
    {
      label: 'Lab dips & fit sample',
      value: '10 to 14 days',
      qualifier: 'Includes physical color swatch submission and initial fit garment prototype.',
    },
    {
      label: 'Bulk cut-and-sew production',
      value: '35 to 50 days',
      qualifier: 'Following Pre-Production (PP) sample and trim component approval.',
    },
  ],
  benchmarksNote:
    'All garments undergo mandatory needle-detector safety screening and ASTM wash shrinkage testing prior to export packing.',
  faqs: [
    {
      question: 'What is a tech pack and why is it necessary for clothing manufacturing?',
      answer:
        'A tech pack (technical package) is the architectural blueprint for a garment. It contains flat technical sketches, detailed measurement charts with tolerance limits (+/- 0.5 cm), fabric specifications (composition, yarn count, GSM), stitch instructions (SPI), colorways, and trim details. Without a tech pack, factories will guess dimensions, resulting in inconsistent sizing.',
    },
    {
      question: 'What are lab dips in textile sourcing?',
      answer:
        'Lab dips are small fabric swatches (typically 2x2 inches) dyed by the fabric mill to match your specified Pantone Textile (TCX/TPX) color codes under standardized light boxes (D65 daylight, CWF store light). You inspect and approve these before the mill dyes bulk fabric rolls.',
    },
    {
      question: 'What legal labels are mandatory on clothing imported into the United States?',
      answer:
        'Under FTC regulations, apparel sold in the U.S. must have a permanent label stating: (1) Fiber content percentages in descending order, (2) Country of Origin ("Made in China"), (3) RN or WPL number (or company legal name), and (4) Care instructions in accordance with the Care Labeling Rule.',
    },
    {
      question: 'How do you prevent fabric shrinkage and color bleeding in bulk production?',
      answer:
        'We mandate pre-shrinking processes (such as sanforization or compacting) at the fabric mill and conduct AATCC wash testing for colorfastness to washing and perspiration before bulk cutting begins.',
    },
  ],
  briefTitle: 'Submit your apparel sourcing brief.',
  briefIntro:
    'Send your tech packs, reference garments, and volume projections. We will evaluate fabric sourcing and provide direct factory manufacturing options.',
  relatedPages: [
    {
      href: '/custom-textile',
      title: 'Custom Clothing & Textiles',
      description: 'Our established clothing and apparel procurement framework.',
    },
    {
      href: '/sportswear-sourcing',
      title: 'Sportswear & Technical Apparel',
      description: 'Performance fabrics, fit engineering, and activewear manufacturing.',
    },
    {
      href: '/product-sourcing',
      title: 'Product Sourcing Overview',
      description: 'Direct overseas factory procurement and manufacturing execution.',
    },
    {
      href: '/quality-control-china',
      title: 'Quality Control & Inspections',
      description: 'Textile inspections, needle detection, and size-set audits.',
    },
  ],
};

export default function TextilesIndustryPage() {
  return <ServiceLandingPage page={page} />;
}
