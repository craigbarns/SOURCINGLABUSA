import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'China Sourcing Company USA | Direct Manufacturing & Procurement',
  description:
    'Professional China sourcing company for U.S. businesses. Direct factory identification, bilingual contract negotiation, on-site quality control, and delivered supply.',
  path: '/china-sourcing',
});

const page: ServicePageContent = {
  path: '/china-sourcing',
  eyebrow: 'China Manufacturing & Trade · On-the-Ground Execution',
  title: 'China Sourcing Company for U.S. Brands & Importers',
  directAnswer:
    'A China sourcing company connects American businesses directly with verified, audited Chinese manufacturers. Rather than purchasing through intermediate trading companies with inflated margins, a professional sourcing partner audits factory facilities, verifies business licenses, negotiates direct industrial pricing, oversees sample development, conducts strict quality inspections, and manages cross-border logistics to the United States.',
  intro:
    'China remains the world’s most comprehensive manufacturing ecosystem for consumer goods, textiles, packaging, electronics, and precision hardware. However, successful procurement requires navigating regional industrial clusters, overcoming technical language barriers, and enforcing enforceable quality contracts on the ground.',
  overviewTitle: 'Direct access to China’s primary industrial hubs.',
  overview:
    'Effective China sourcing is localized. China’s manufacturing strengths are organized into specialized industrial clusters: electronics in Shenzhen and Dongguan, hardware and home goods in Ningbo and Yongkang, textiles in Shaoxing and Hangzhou, and packaging in Guangdong and Zhejiang. Sourcing Lab USA evaluates suppliers within their authentic regional manufacturing clusters to secure legitimate factory-floor pricing.',
  processTitle: 'The China manufacturing & procurement workflow.',
  offerName: 'China Sourcing & Manufacturing Management',
  offerDescription:
    'On-the-ground supplier discovery, factory auditing, bilingual commercial negotiation, production monitoring, and delivered supply from China to U.S. destinations.',
  focusAreas: [
    {
      title: 'Cluster-Specific Factory Selection',
      body: 'We identify primary manufacturers situated directly within specialized industrial clusters, ensuring lower component costs, higher technical competence, and verified production capacity.',
    },
    {
      title: 'Bilingual Contract & Term Negotiation',
      body: 'We negotiate contracts with Chinese factory principals in Mandarin, eliminating ambiguity regarding raw material grades, payment milestones, tooling retention, and defect liability.',
    },
    {
      title: 'On-Site Factory Auditing & Anti-Fraud',
      body: 'We conduct physical facility inspections, review official government registrations (AIC records), inspect active production machinery, and verify export licenses before any capital is deployed.',
    },
    {
      title: 'Stringent Pre-Shipment Quality Control',
      body: 'We coordinate independent quality inspections, functional drop testing, and carton packaging checks at the factory floor before final balance payments are authorized.',
    },
  ],
  briefItems: [
    'Product category, detailed technical specifications, BOM, and reference samples',
    'Target initial order volume and anticipated annual reorder frequency',
    'Material requirements, surface treatments, packaging, and custom branding assets',
    'Required delivery date and preferred shipping terms (FOB, CIF, or DDP)',
  ],
  workflow: [
    {
      title: 'Supplier Discovery & Longlist Screening',
      body: 'We filter through dozens of candidate factories across China’s industrial zones, screening out trading companies, unauthorized workshops, and financially unstable entities.',
    },
    {
      title: 'On-Site Verification & RFQ Analysis',
      body: 'Candidate manufacturers are evaluated for capacity, equipment quality, and workforce conditions. We collect itemized cost breakdowns to benchmark true raw material and labor costs.',
    },
    {
      title: 'Sampling, Tooling & Lab Certification',
      body: 'Tooling fabrication and pre-production samples are supervised and tested against U.S. market standards (e.g. CPSC, FDA food contact, ASTM) until approved as the Golden Sample.',
    },
    {
      title: 'Mass Production & In-Line QC',
      body: 'During production, our field monitors inspect raw material inputs and initial output to detect deviations early, avoiding costly end-of-line delays.',
    },
    {
      title: 'Pre-Shipment Inspection & Export Clearance',
      body: 'A final statistical sampling inspection verifies cosmetic quality, functional specs, barcode scanning, and export palletization prior to port container loading.',
    },
  ],
  faqs: [
    {
      question: 'Why hire a China sourcing company instead of buying directly online?',
      answer:
        'Online marketplace listings are predominantly populated by trading companies, brokers, and sales agents who take substantial markups and subcontract production to undisclosed workshops. A professional China sourcing company validates direct factory ownership, inspects physical facilities, negotiates factory-level pricing, and provides on-site quality control.',
    },
    {
      question: 'How do you prevent quality fade between sample and mass production?',
      answer:
        'Quality fade is prevented by establishing clear written manufacturing specifications that tie payment milestones to objective quality inspection results against approved golden samples before releasing final balance payments.',
    },
    {
      question: 'What is the difference between a China sourcing agent and a sourcing partner?',
      answer:
        'A sourcing agent typically acts as an intermediary earning a commission on factory spend, leaving the buyer to handle cross-border payments, shipping, and direct factory disputes. As an operational procurement partner, Sourcing Lab USA provides contract clarity, rigorous oversight, and delivered supply options with full commercial accountability.',
    },
    {
      question: 'How long does it take to produce and ship goods from China to the USA?',
      answer:
        'Typical production runs take 30 to 60 days following sample sign-off. Ocean freight transit from major Chinese ports (Shanghai, Ningbo, Shenzhen) to U.S. West Coast ports takes approximately 14-22 days, and to U.S. East Coast ports takes 28-35 days, plus customs clearance and inland drayage.',
    },
    {
      question: 'How are tariffs and customs duties managed for China imports?',
      answer:
        'We analyze your product’s Harmonized Tariff Schedule (HTS) code to identify general duty rates, Section 301 China tariffs, and potential exclusions, modeling complete landed costs prior to production commitment.',
    },
  ],
  briefTitle: 'Start your China sourcing project.',
  briefIntro:
    'Send your product specifications, target volumes, and timeline. We will review manufacturing feasibility and provide direct factory sourcing options.',
  relatedPages: [
    {
      href: '/china-sourcing-agent',
      title: 'Sourcing Agent vs Supplier Guide',
      description: 'Understanding agency commissions, trading companies, and direct supply models.',
    },
    {
      href: '/factory-verification',
      title: 'Factory Verification Services',
      description: 'On-site factory background checks and legal registration verification across China.',
    },
    {
      href: '/quality-control-china',
      title: 'Quality Control Inspections',
      description: 'On-site quality inspections and factory audit reports.',
    },
    {
      href: '/import-from-china',
      title: 'Importing from China to USA',
      description: 'Complete operational guide to shipping, customs clearance, and compliance.',
    },
  ],
};

export default function ChinaSourcingPage() {
  return <ServiceLandingPage page={page} />;
}
