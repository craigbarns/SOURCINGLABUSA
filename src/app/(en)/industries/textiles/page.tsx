import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Textile & Garment Production in China: Tech Packs, Lab Dips, Size Sets',
  description:
    'How a garment order is prepared and approved before bulk production: tech pack, fabric, lab dips, fit and size sets. Clothing and textiles supplied under a written contract, invoiced from France or China.',
  path: '/industries/textiles',
});

const page: ServicePageContent = {
  path: '/industries/textiles',
  eyebrow: 'Clothing and textiles · How a garment order is approved',
  title: 'Garment production: what gets approved before bulk.',
  directAnswer:
    'A garment order is decided before bulk production, through a sequence of approvals: the tech pack, the fabric, the lab dips for color, the fit sample and the size set. Sourcing Lab USA supplies clothing and textiles made in China under a written contract, and follows production against the approved pre-production sample. The contract and invoice come from the company in France or China named in the quotation.',
  intro:
    'Small variations in fabric weight, shrinkage, dye lot or stitching change how a garment fits and looks. Most of them are prevented by what is written and approved before cutting, not by what is checked after.',
  overviewTitle: 'Fabric first.',
  overview:
    'Garment quality is largely decided at the fabric stage. Composition, weight, finish and shrinkage are agreed in the specification, and fabric is approved before cutting. Where a wash or colorfastness test is needed, it is done by the laboratory named in the quotation, when written into it.',
  processTitle: 'The approvals, in order.',
  offerName: 'Clothing and textile supply',
  offerDescription:
    'Custom clothing, sportswear and textile products made in China and supplied under a written contract, with tech pack, fabric, lab dip and sample approvals before bulk production.',
  focusAreas: [
    {
      title: 'Fabric',
      body: 'Knits and wovens such as cotton, French terry, nylon or polyester blends with elastane, and recycled polyester. Composition, weight and finish are written into the specification.',
    },
    {
      title: 'Sportswear constructions',
      body: 'Stretch fabrics, flatlock stitching, bonded or taped seams. A performance claim on the label needs evidence behind it, agreed before production.',
    },
    {
      title: 'Tech pack and grading',
      body: 'Flat sketches, a graded size chart with tolerances and construction details. Without them, the factory fills the gaps itself.',
    },
    {
      title: 'Trims, labels and tags',
      body: 'Zippers, heat transfers, woven labels and hang tags. A branded component or an FSC claim on a tag is specified and evidenced before the artwork is approved.',
    },
  ],
  briefItems: [
    'Garment style, tech pack, measurement specs, or physical reference garment',
    'Fabric composition, desired GSM weight, finish (brushed, peach, water-repellent)',
    'Size breakdown, colorways and quantity per style',
    'Target unit price (FOB) and delivery date',
  ],
  workflow: [
    {
      title: 'Tech pack and fabric',
      body: 'We review your tech pack, propose fabric options and agree composition, weight and finish with the factory.',
    },
    {
      title: 'Lab dips and fit sample',
      body: 'The factory submits lab dips against your color references and makes a fit sample for construction and fit approval.',
    },
    {
      title: 'Size set and pre-production sample',
      body: 'A size set checks the grading; the pre-production sample you approve becomes the reference for bulk.',
    },
    {
      title: 'Bulk production',
      body: 'Production is followed against the approved pre-production sample: fabric, color, measurements, print placement and packing.',
    },
    {
      title: 'Inspection, if in the quotation',
      body: 'A third-party inspection of finished garments, such as measurements, workmanship or needle detection, is added when written into the quotation.',
    },
  ],
  showcaseCategory: 'textile',
  faqs: [
    {
      question: 'What is a tech pack and why is it necessary for clothing manufacturing?',
      answer:
        'A tech pack is the written specification of a garment: flat sketches, a measurement chart with tolerances, fabric composition and weight, construction details, colorways and trims. Without one, the factory decides what is missing, and sizing drifts.',
    },
    {
      question: 'What are lab dips in textile sourcing?',
      answer:
        'Small fabric swatches dyed to match your color references, checked under agreed light sources. You approve them before the bulk fabric is dyed.',
    },
    {
      question: 'What labels does clothing sold in the United States need?',
      answer:
        'Under FTC rules, most apparel needs fiber content, country of origin and the identity of the manufacturer or dealer (an RN number or company name), plus care instructions under the Care Labeling Rule. Check the FTC guidance for your product before artwork is approved.',
    },
    {
      question: 'How are shrinkage and color bleeding handled?',
      answer:
        'Shrinkage limits and finishing are written into the fabric specification and checked on the approved samples. Where a wash or colorfastness test is needed, it is done by the laboratory named in the quotation, when written into it.',
    },
  ],
  briefTitle: 'Send your garment brief.',
  briefIntro:
    'Tech pack or reference garment, quantity per style and target date. We confirm what can be quoted and sampled.',
  relatedPages: [
    {
      href: '/custom-textile',
      title: 'Clothing and textiles',
      description: 'The clothing and textile supply: scope, terms and what to send.',
    },
    {
      href: '/sportswear-sourcing',
      title: 'Sportswear',
      description: 'Activewear and team apparel supplied under a written contract.',
    },
    {
      href: '/product-sourcing',
      title: 'Other products',
      description: 'How products outside packaging and textiles are reviewed.',
    },
    {
      href: '/quality-control-china',
      title: 'Inspections',
      description: 'Third-party inspections, added when written into the quotation.',
    },
  ],
};

export default function TextilesIndustryPage() {
  return <ServiceLandingPage page={page} />;
}
