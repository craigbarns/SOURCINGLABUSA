import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Freight Sourcing & Cross-Border Logistics USA | Sourcing Lab USA',
  description:
    'Freight quotation comparison and shipping coordination for sourcing projects. Define cargo, route, exclusions and the roles of appointed logistics providers.',
  path: '/freight-logistics',
});

const page: ServicePageContent = {
  path: '/freight-logistics',
  reviewedDate: '2026-10-21',
  references: [
    { title: 'FMC — Detention and demurrage billing practices', url: 'https://www.fmc.gov/articles/fmc-publishes-final-rule-on-detention-and-demurrage-billing-practices/' },
    { title: 'CBP — Tips for New Importers and Exporters', url: 'https://www.help.cbp.gov/s/article/Article-1894?language=en_US' },
  ],
  eyebrow: 'Cross-Border Supply Chain · International Freight & Drayage',
  title: 'Freight Sourcing & Cross-Border Logistics Management',
  directAnswer:
    'Freight sourcing compares transport options, quotation exclusions and delivery responsibilities for a defined cargo movement. Sourcing Lab USA can coordinate supplier information and review options within an agreed sourcing project. Appointed carriers, forwarders and customs brokers perform their specialist services; rates, availability, release and delivery dates require shipment-specific confirmation.',
  intro:
    'Freight can materially change a sourcing budget. Cargo dimensions, route, transport mode, seasonal availability and destination charges all matter. Compare total quoted costs and assumptions before committing; Sourcing Lab USA supports the coordination agreed for the project and does not act as a freight forwarder or customs broker.',
  overviewTitle: 'Compare the full shipping scope and its exclusions.',
  overview:
    'Request comparable quotes on the same cargo dimensions, weight, origin, destination and service basis. Identify origin handling, main transport, destination handling, clearance, inland delivery and exclusions. An apparently lower main-freight price may not produce a lower total cost.',
  processTitle: 'The end-to-end freight & logistics workflow.',
  offerName: 'International Freight Sourcing & Logistics Coordination',
  offerDescription:
    'Shipment information, quotation comparison and coordination with appointed transport and customs providers for agreed sourcing projects.',
  focusAreas: [
    {
      title: 'Ocean Freight Contracting (FCL & LCL)',
      body: 'Compare full-container and consolidated options with the appointed forwarder using the shipment volume, weight and receiving constraints. The provider confirms the service and booking terms.',
    },
    {
      title: 'Expedited Air Freight & Courier Services',
      body: 'Commercial air freight and air express solutions for urgent product launches, high-value electronics, seasonal inventory replenishment, and time-sensitive marketing campaigns.',
    },
    {
      title: 'Demurrage & Detention Planning',
      body: 'Confirm the applicable free time, release dependencies, collection appointment and equipment-return plan with appointed providers. Planning can reduce exposure, but does not guarantee that charges will be avoided.',
    },
    {
      title: 'Inland Drayage & Amazon FBA Distribution',
      body: 'Coordinated intermodal rail and flatbed/chassis trucking from U.S. container marine terminals directly to commercial warehouses, 3PL facilities, or Amazon fulfillment centers.',
    },
  ],
  briefItems: [
    'Origin city/port and final U.S. delivery zip code or facility address',
    'Total cargo volume (CBM / cubic meters), gross weight (kg), and carton count',
    'Palletization requirements (standard 48x40 wooden pallets, plastic, or floor loaded)',
    'Target cargo ready date (CRD) and required on-dock delivery date',
  ],
  workflow: [
    {
      title: 'Cargo Profiling & Shipping Lane Optimization',
      body: 'We analyze your cargo dimensions, volumetric weight, and destination to determine the most cost-effective routing (all-water East Coast vs. West Coast intermodal rail).',
    },
    {
      title: 'Carrier Tender & Booking Confirmation',
      body: 'Compare available provider quotes, validity dates, exclusions and cancellation terms. The appointed forwarder or carrier confirms capacity and the booking; no allocation is assumed before confirmation.',
    },
    {
      title: 'Origin Factory Pickup & Export Clearance',
      body: 'Local origin drayage retrieves cargo from the manufacturing plant, delivers it to the port container yard, and clears export customs formalities.',
    },
    {
      title: 'Transpacific Passage & Customs Coordination',
      body: 'Follow provider shipment updates and coordinate missing supplier documents. The importer’s appointed broker handles customs filings; release remains subject to the relevant authorities and shipment circumstances.',
    },
    {
      title: 'Terminal Drayage & Direct Warehouse Offloading',
      body: 'Licensed motor carriers pick up the container from the marine terminal and deliver it directly to your receiving facility, returning the empty container promptly.',
    },
  ],
  benchmarks: [
    {
      label: 'Ocean transit (China to LA/Long Beach)',
      value: 'Carrier estimate',
      qualifier: 'Request the current sailing and scope of the quoted service.',
    },
    {
      label: 'Ocean transit (China to NY/Savannah)',
      value: 'Route to confirm',
      qualifier: 'Confirm routing, transshipment and destination handling assumptions.',
    },
    {
      label: 'Air cargo transit',
      value: 'Cargo-specific quote',
      qualifier: 'Acceptance, available capacity and clearance can affect the schedule.',
    },
  ],
  benchmarksNote:
    'Freight rates fluctuate based on seasonal carrier general rate increases (GRI), bunker fuel adjustment factors (BAF), and peak shipping seasons.',
  hideShowcase: true,
  faqs: [
    {
      question: 'What is the difference between FCL and LCL ocean shipping?',
      answer:
        'FCL uses a full container for the shipment; LCL consolidates smaller cargoes. Compare total costs, handling, packing, schedule and destination charges for your actual cargo. There is no universal volume threshold at which one option is always cheaper or faster.',
    },
    {
      question: 'What are demurrage and detention fees, and how can they be avoided?',
      answer:
        'These charges concern terminal dwell or use of carrier equipment beyond the applicable arrangements. Confirm definitions, free time, rates and billing responsibilities in the provider’s terms and current guidance. Timely documents, collection and return planning can help, but customs holds and other delays can still generate charges.',
    },
    {
      question: 'Should I let my overseas supplier arrange the shipping?',
      answer:
        'Either arrangement needs a clear written scope. Compare the total cost, provider identity, import responsibilities and exclusions with your appointed broker and forwarder. A shipping term alone does not guarantee transparent costs or a delivery outcome.',
    },
    {
      question: 'How do you calculate volumetric (chargeable) weight for air freight?',
      answer:
        'Providers may compare gross weight with a dimensional weight derived from package dimensions. The divisor, rounding, minimum charge and surcharges depend on the service. Ask the quoting provider to state the formula rather than assuming a universal divisor.',
    },
    {
      question: 'Can you deliver shipments directly into Amazon FBA warehouses?',
      answer:
        'Provide the receiving facility and its current requirements when requesting the shipment review. Any platform-specific preparation, appointment or labeling work must be confirmed with the appointed provider; it is not assumed to be included in a sourcing quote.',
    },
  ],
  briefTitle: 'Request a freight & logistics quote.',
  briefIntro:
    'Provide your cargo origin, destination address, and estimated volume. We will confirm the coordination scope and information needed for provider quotations.',
  relatedPages: [
    {
      href: '/import-from-china',
      title: 'Importing from China to USA',
      description: 'Comprehensive guide to customs entry, tariffs, and shipping documentation.',
    },
    {
      href: '/hs-code-consulting',
      title: 'HS Code & Tariff Consulting',
      description: 'Accurate tariff classification and duty optimization for imported goods.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed Cost Analysis',
      description: 'Model shipping and duty assumptions within your product margins.',
    },
    {
      href: '/china-to-us-procurement',
      title: 'China-to-U.S. Procurement Overview',
      description: 'End-to-end procurement, supply terms, and delivered order management.',
    },
  ],
};

export default function FreightLogisticsPage() {
  return <ServiceLandingPage page={page} />;
}
