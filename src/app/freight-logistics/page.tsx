import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Freight Sourcing & Cross-Border Logistics USA | Sourcing Lab USA',
  description:
    'Strategic international freight sourcing and cross-border logistics. Ocean freight (FCL/LCL), air cargo, U.S. customs clearance, port drayage, and warehouse delivery.',
  path: '/freight-logistics',
});

const page: ServicePageContent = {
  path: '/freight-logistics',
  eyebrow: 'Cross-Border Supply Chain · International Freight & Drayage',
  title: 'Freight Sourcing & Cross-Border Logistics Management',
  directAnswer:
    'Freight sourcing is the procurement and management of international transport services across ocean, air, and ground modes to move manufactured goods from overseas factories to domestic distribution centers. Professional freight management secures competitive container shipping contracts, coordinates origin port export handling, ensures compliant customs brokerage filings, and oversees port drayage to avoid demurrage penalties.',
  intro:
    'Cross-border freight costs can represent anywhere from 15% to 40% of your total product landed cost. Fluctuating carrier spot rates, complex demurrage fees, port congestion, and unexpected fuel surcharges can wipe out operating margins if logistics are left unmanaged. Sourcing Lab USA optimizes international shipping lanes for cost, reliability, and speed.',
  overviewTitle: 'Competitive international shipping without hidden carrier fees.',
  overview:
    'Too many importers accept the supplier’s freight recommendation or pay retail spot rates to freight brokers. By benchmarking established NVOCCs (Non-Vessel Operating Common Carriers) and ocean liners across major global trade routes, we secure competitive contract rates for Full Container Loads (20GP, 40GP, 40HQ) and consolidated Less-than-Container Loads (LCL).',
  processTitle: 'The end-to-end freight & logistics workflow.',
  offerName: 'International Freight Sourcing & Logistics Coordination',
  offerDescription:
    'Global ocean freight, expedited air cargo, origin factory pickup, customs brokerage, and domestic U.S. drayage for manufactured commercial cargo.',
  focusAreas: [
    {
      title: 'Ocean Freight Contracting (FCL & LCL)',
      body: 'Direct booking of 20ft, 40ft, and 40ft High Cube containers, as well as consolidated LCL shipments, from major Asian ports directly to U.S. West Coast and East Coast container terminals.',
    },
    {
      title: 'Expedited Air Freight & Courier Services',
      body: 'Commercial air freight and air express solutions for urgent product launches, high-value electronics, seasonal inventory replenishment, and time-sensitive marketing campaigns.',
    },
    {
      title: 'Demurrage & Detention Avoidance',
      body: 'Proactive tracking of vessel arrival notices, pre-cleared customs documentation, and scheduled motor carrier drayage to prevent costly port demurrage and container detention penalties.',
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
      body: 'We benchmark spot and contract rates across top ocean carriers, locking in container allocation and issuing shipping orders (S/O) prior to factory cargo readiness.',
    },
    {
      title: 'Origin Factory Pickup & Export Clearance',
      body: 'Local origin drayage retrieves cargo from the manufacturing plant, delivers it to the port container yard, and clears export customs formalities.',
    },
    {
      title: 'Transpacific Passage & Customs Coordination',
      body: 'We track real-time container vessel coordinates, coordinating U.S. Customs entry documentation with qualified customs brokers prior to port arrival to facilitate timely cargo release.',
    },
    {
      title: 'Terminal Drayage & Direct Warehouse Offloading',
      body: 'Licensed motor carriers pick up the container from the marine terminal and deliver it directly to your receiving facility, returning the empty container promptly.',
    },
  ],
  benchmarks: [
    {
      label: 'Ocean transit (China to LA/Long Beach)',
      value: '14 to 18 days',
      qualifier: 'Direct port-to-port fast ocean service from Shenzhen/Ningbo to Southern California.',
    },
    {
      label: 'Ocean transit (China to NY/Savannah)',
      value: '28 to 32 days',
      qualifier: 'All-water vessel service via the Panama Canal to U.S. East Coast ports.',
    },
    {
      label: 'Air cargo transit',
      value: '4 to 7 days',
      qualifier: 'Standard commercial air freight airport-to-airport including customs clearance.',
    },
  ],
  benchmarksNote:
    'Freight rates fluctuate based on seasonal carrier general rate increases (GRI), bunker fuel adjustment factors (BAF), and peak shipping seasons.',
  hideShowcase: true,
  faqs: [
    {
      question: 'What is the difference between FCL and LCL ocean shipping?',
      answer:
        'FCL (Full Container Load) reserves an entire shipping container (20ft, 40ft, or 40HQ) exclusively for your cargo. LCL (Less than Container Load) consolidates multiple buyers’ smaller shipments into one shared container, priced per cubic meter (CBM). FCL is faster, safer, and significantly cheaper per unit of volume once your cargo exceeds 15 CBM.',
    },
    {
      question: 'What are demurrage and detention fees, and how can they be avoided?',
      answer:
        'Demurrage is charged by the marine port terminal when a loaded container is not picked up within the free-time window (typically 3–5 days). Detention is charged by the ocean carrier when the empty container is not returned to the port within its designated time. We prevent these fees by pre-clearing customs and pre-booking drayage trucks prior to ship docking.',
    },
    {
      question: 'Should I let my overseas supplier arrange the shipping?',
      answer:
        'Allowing suppliers to control shipping (CIF or DDP terms from unknown forwarders) frequently leads to surprise destination terminal fees, excessive handling surcharges, and a total lack of control if a container is held or delayed. Booking freight under FOB terms ensures transparent pricing and direct control.',
    },
    {
      question: 'How do you calculate volumetric (chargeable) weight for air freight?',
      answer:
        'For air freight, carriers charge based on either actual gross weight or volumetric weight, whichever is greater. Volumetric weight is calculated using the formula: (Length x Width x Height in cm) / 6,000 (or 5,000 for express couriers). Lightweight, bulky cargo is billed at its volumetric equivalent.',
    },
    {
      question: 'Can you deliver shipments directly into Amazon FBA warehouses?',
      answer:
        'Yes. We coordinate Amazon-compliant FBA deliveries, booking carrier delivery appointments through Amazon Carrier Central, verifying box weight and pallet height restrictions, and attaching required FBA box and pallet labels.',
    },
  ],
  briefTitle: 'Request a freight & logistics quote.',
  briefIntro:
    'Provide your cargo origin, destination address, and estimated volume. We will benchmark optimal carrier lanes and provide transparent shipping rates.',
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
      description: 'Model exact shipping and duty expenses within your product margins.',
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
