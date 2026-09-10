import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Sportswear & Technical Apparel Sourcing from China',
  description: 'Custom sportswear and technical apparel sourcing from China. Fabrics, fit, size runs, labels and samples. Projects open now: request a sourcing quotation.',
  path: '/sportswear-sourcing',
});

const page: ServicePageContent = {
  path: '/sportswear-sourcing',
  eyebrow: 'China sourcing · sportswear & technical apparel',
  overviewTitle: 'Specify fabric, fit and performance requirements.',
  processTitle: 'From sportswear brief to sampling and supply.',
  title: 'Sportswear and technical clothing, specified for the way it is used.',
  intro: 'Planning a sportswear collection or a technical garment? Share the intended use, fabric, fit, size range and quantities. We review the sourcing brief through our independent China partnership. Projects can start now, with invoicing from France or China as confirmed in your quotation.',
  overview: 'A technical garment starts with a precise specification. Stretch, fabric weight, seam construction, fit, decoration and care requirements need to work together. Performance requirements belong in the brief so feasibility and any evidence needed can be discussed before an order is agreed.',
  offerName: 'Sportswear & Technical Apparel Sourcing',
  offerDescription: 'Sportswear and technical clothing sourcing from China, with fabrics, fit, size runs, branding and sample requirements defined for each project.',
  focusAreas: [
    { title: 'Fabric and intended use', body: 'Describe the activity, fabric composition, weight and feel. Include any stretch, moisture management or durability requirements that need to be reviewed with the supplier.' },
    { title: 'Fit and construction', body: 'Share a size chart or reference garment, measurement tolerances, seam details and construction requirements. Specify how samples should be assessed before approval.' },
    { title: 'Your branding', body: 'Define colors, logo placement, print or embroidery, care labels, hangtags and packaging. Note quantities by size and color so the proposal has a useful basis.' },
    { title: 'Samples and evidence', body: 'Agree sample requirements and the evidence needed for any performance claim. Test results and certifications cannot be assumed from a fabric description or reference product.' },
  ],
  briefItems: [
    'Garment type, sport or intended use, and target customer',
    'Tech pack, reference images or an existing garment',
    'Fabric, measurements, size range and quantities by color',
    'Branding, labels, sample requirements, destination and timing',
  ],
  workflow: [
    { title: 'Review your product brief', body: 'Start with the garment and target use. We identify missing specifications and assess what can be sourced against the intended quantity and timing.' },
    { title: 'Confirm options and sampling', body: 'Review fabric and construction options, sample scope, quantity requirements and a project-specific quotation basis. No fixed MOQ or production deadline is assumed.' },
    { title: 'Agree the order', body: 'The company in France or China identified in your quotation purchases and supplies the products. Specifications, pricing, samples, quality checkpoints and delivery responsibilities are agreed for the order.' },
  ],
  faqs: [
    { question: 'Do I need a complete tech pack to start?', answer: 'No. You can start with reference images or an existing garment, the intended use, approximate quantities and destination. Measurements, materials, construction and branding will need to be clarified before a production specification is approved.' },
    { question: 'Can you source technical fabrics?', answer: 'Include the required fabric properties and intended use in your brief. We review sourcing feasibility and the evidence needed for those requirements. We do not guarantee a performance rating, certification or test result before the material and evidence have been checked.' },
    { question: 'What is the minimum order quantity for sportswear?', answer: 'Minimum quantities depend on the garment, fabric, construction, decoration and quantities by size and color. Send your estimated size and color breakdown so the available options can be reviewed.' },
    { question: 'Can labels and packaging be included with the clothing?', answer: 'Yes. Include care labels, brand labels, hangtags, bags or boxes in the brief. Their specifications, quantities, pricing and responsibilities are confirmed for the project.' },
    { question: 'Can I start a project now?', answer: 'Yes. Sourcing projects and invoicing are available now through France or China. The contracting company, scope, price and timing are confirmed in your quotation. You do not need to wait for the planned U.S. expansion. Submitting a brief does not place an order.' },
  ],
  showcaseCategory: 'textile',
  briefTitle: 'Let’s review your sportswear brief.',
  briefIntro: 'Start with the garment, intended use, approximate quantities and required timing. Add a reference or tech pack details if you have them. No order is placed by submitting this form.',
  relatedPages: [
    { href: '/custom-textile', title: 'Clothing and textile sourcing', description: 'Explore the broader clothing offer and the specification process.' },
    { href: '/custom-packaging', title: 'Boxes, packaging and labels', description: 'Plan the packaging and branded details alongside your garments.' },
    { href: '/blog/apparel-sourcing-tech-packs-moq', title: 'Tech packs and garment quantities', description: 'Prepare the information needed for a useful sourcing conversation.' },
    { href: '/blog/china-sourcing-rfq-checklist', title: 'Download the sourcing brief', description: 'Use a practical template to prepare your request.' },
  ],
};

export default function SportswearSourcingPage() {
  return <ServiceLandingPage page={page} />;
}
