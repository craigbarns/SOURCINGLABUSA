import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'HS Code Consulting & Tariff Classification USA | Sourcing Lab USA',
  description:
    'Expert HS code consulting and U.S. Harmonized Tariff Schedule (HTS) classification. Avoid customs penalties, overpaid duties, and Section 301 tariff exposure.',
  path: '/hs-code-consulting',
});

const page: ServicePageContent = {
  path: '/hs-code-consulting',
  eyebrow: 'Customs & Trade Advisory · Tariff Classification',
  title: 'HS Code Consulting & U.S. Tariff Classification',
  directAnswer:
    'HS code consulting is the specialized trade advisory service of identifying the precise 10-digit Harmonized Tariff Schedule (HTSUS) classification code for imported commercial goods entering the United States. Accurate classification determines the exact ad valorem duty rate, assesses Section 301 punitive tariff liabilities, supports regulatory compliance with U.S. Customs and Border Protection (CBP), and identifies legitimate tariff engineering options to review with a licensed customs broker. Classification research is advisory: the entry filed remains the importer’s legal responsibility, and only CBP can issue a binding ruling.',
  intro:
    'Importers are legally responsible under U.S. law (19 U.S.C. § 1484) for exercising "reasonable care" in classifying their imported merchandise. Misclassifying an HS code—whether accidentally or through supplier misdirection—can trigger retroactive duty assessments, 20% to 40% negligence penalties from CBP, shipping container holds, and formal customs audits. Sourcing Lab USA provides technical classification research and documents the reasoning behind it, so your customs broker or trade counsel can file with confidence.',
  overviewTitle: 'Defensible classification research, grounded in the GRIs and published CBP rulings.',
  overview:
    'Relying on a 6-digit code provided by a Chinese supplier is one of the most dangerous mistakes an importer can make. Chinese export commodity codes differ fundamentally from U.S. 10-digit HTS codes. We analyze your product’s essential character, chemical composition, primary utility, and General Rules of Interpretation (GRIs) to identify the defensible 10-digit classification.',
  processTitle: 'The 4-step tariff classification methodology.',
  offerName: 'HS Code & Customs Tariff Consulting',
  offerDescription:
    '10-digit HTSUS classification research, Section 301 tariff analysis, preparation of CBP binding ruling requests for the importer, and tariff engineering advisory.',
  focusAreas: [
    {
      title: '10-Digit HTSUS Precision Classification',
      body: 'We classify products down to the 10-digit statistical reporting level based on General Rules of Interpretation (GRIs), Chapter Notes, and Section Notes under the U.S. Harmonized Tariff Schedule.',
    },
    {
      title: 'Section 301 & Antidumping (AD/CVD) Screening',
      body: 'We identify whether your product falls under Section 301 tariff Lists 1, 2, 3, or 4A (carrying additional 7.5%–25% duties), and screen for devastating Antidumping or Countervailing duties (AD/CVD).',
    },
    {
      title: 'CBP Binding Ruling Submissions (e-Rulings)',
      body: 'For novel, complex, or multi-component goods, we draft formal ruling requests to U.S. Customs and Border Protection (e-Rulings), securing a legally binding national classification ruling before you import.',
    },
    {
      title: 'Strategic Tariff Engineering Advisory',
      body: 'We advise on subtle modifications to material composition, minor functional features, or unbundled packaging that legally classify the item into lower-duty tariff subheadings.',
    },
  ],
  briefItems: [
    'Detailed product description, intended use, and functioning mechanism',
    'Component breakdown and material composition percentages (by weight and value)',
    'Manufacturing processes, engineering schematics, and photos from all angles',
    'Country of origin and existing supplier tariff suggestions (if any)',
  ],
  workflow: [
    {
      title: 'Technical Specification & Material Audit',
      body: 'We review your engineering files, material safety data sheets (MSDS), and component breakdowns to establish the product’s essential character and classification factors.',
    },
    {
      title: 'GRI Analysis & CBP Precedent Search',
      body: 'We evaluate the General Rules of Interpretation and search CROSS (Customs Rulings Online Search System) for published CBP precedent rulings on identical or analogous merchandise.',
    },
    {
      title: 'Classification Opinion & Duty Schedule',
      body: 'We deliver an actionable classification memorandum outlining the recommended 10-digit HTS code, base duty rate, Section 301 status, and legal justification.',
    },
    {
      title: 'Broker Coordination & Customs Alignment',
      body: 'We coordinate directly with your licensed customs broker to ensure the approved HTS code and supporting descriptions are reflected on entry summaries (CBP Form 7501).',
    },
  ],
  benchmarks: [
    {
      label: 'Standard classification memo',
      value: '2 to 3 business days',
      qualifier: 'Full 10-digit HTS code report with duty rates, Section 301 analysis, and legal citations.',
    },
    {
      label: 'CBP Binding Ruling petition',
      value: '30 to 45 days',
      qualifier: 'Official binding classification ruling issued directly by U.S. Customs Regulations & Rulings.',
    },
    {
      label: 'Tariff engineering analysis',
      value: '5 to 7 business days',
      qualifier: 'Analysis of material or assembly modifications to legally qualify for lower tariff subheadings.',
    },
  ],
  benchmarksNote:
    'Our classification memos cite official CBP General Rules of Interpretation (GRIs), Explanatory Notes, and relevant CROSS precedents.',
  hideShowcase: true,
  faqs: [
    {
      question: 'What is the difference between an HS code and an HTS code?',
      answer:
        'The HS (Harmonized System) code is an international 6-digit standard administered by the World Customs Organization (WCO) used by over 200 countries. The HTS (Harmonized Tariff Schedule) code adds additional country-specific digits. In the United States, the HTSUS code is 10 digits: 6 international digits plus 2 digits for U.S. duty rate subheadings and 2 digits for statistical reporting.',
    },
    {
      question: 'Can I just use the HS code provided by my Chinese supplier?',
      answer:
        'No. Chinese suppliers provide Chinese export commodity codes, which frequently differ from U.S. import classifications at the 8- and 10-digit levels. Under U.S. Customs law, the U.S. Importer of Record is solely responsible for classification accuracy. Accepting an incorrect supplier code does not relieve you from CBP penalties.',
    },
    {
      question: 'What is a CBP Binding Ruling and why is it valuable?',
      answer:
        'A Binding Ruling is an official written decision issued by U.S. Customs and Border Protection confirming the exact HTS code and duty rate for your specific product. Once issued, it is legally binding on all U.S. ports of entry, protecting you from future customs audits, reclassifications, or retroactive duty clawbacks.',
    },
    {
      question: 'What happens if U.S. Customs reclassifies my imported product?',
      answer:
        'If CBP audits an entry and reclassifies your product into a higher-duty tariff code, you will receive a CBP Form 28 (Request for Information) or Form 29 (Notice of Action). You may be forced to pay back-taxes on past shipments going back up to 5 years, plus interest and penalties.',
    },
    {
      question: 'What is legal tariff engineering?',
      answer:
        'Tariff engineering is the legitimate practice of designing or assembling a product so that it satisfies the specific legal definitions of a lower-duty tariff code. The U.S. Supreme Court has long affirmed that importers have the legal right to fashion merchandise to minimize applicable customs duties.',
    },
  ],
  briefTitle: 'Request an HS code classification review.',
  briefIntro:
    'Share your product description, materials, and photos. Our customs specialists will determine the defensible 10-digit HTS code and calculate applicable import duties.',
  relatedPages: [
    {
      href: '/landed-cost-analysis',
      title: 'Landed Cost Analysis',
      description: 'Model complete import margins incorporating exact HTS duty and Section 301 tariffs.',
    },
    {
      href: '/tools/hs-code-finder',
      title: 'HS Code Finder Tool',
      description: 'Interactive AI-assisted tariff code lookup and duty rate estimation tool.',
    },
    {
      href: '/import-from-china',
      title: 'Importing from China to USA',
      description: 'End-to-end guidance on customs compliance, documentation, and shipping.',
    },
    {
      href: '/freight-logistics',
      title: 'Freight Sourcing & Logistics',
      description: 'Ocean and air shipping with integrated customs clearance.',
    },
  ],
};

export default function HsCodeConsultingPage() {
  return <ServiceLandingPage page={page} />;
}
