import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  "title": "U.S. Market Entry Services for International Manufacturers",
  "description": "Prepare a U.S. market entry plan: buyer segments, competitive pricing, distributor research and sales preparation. Projects scoped through France or China.",
  "path": "/us-market-entry"
});

const page: ServicePageContent = {
  "path": "/us-market-entry",
  "journey": "market-entry",
  "eyebrow": "For international manufacturers · U.S. market development",
  "title": "A practical route to your first U.S. buyer conversations.",
  "directAnswer": "U.S. market entry starts with a specific buyer segment, a product offer that fits that segment and a workable delivery model. Sourcing Lab USA helps international manufacturers research the opportunity, prepare commercial materials, identify potential distributors and plan targeted B2B outreach. Product, import and legal questions are coordinated with appropriate specialists. Current engagements are contracted through France or China; Miami expansion is planned for 2027.",
  "intro": "Bring your product catalog, export experience and commercial objectives. We use that information to scope the research and preparation needed before committing to an ongoing sales campaign.",
  "overviewTitle": "Decide what to sell, to whom and on what terms.",
  "overview": "A broad ambition to sell in America is difficult to act on. A useful market-entry brief narrows the initial product range, defines the buyer and use case, compares competing offers and tests channel economics. The result should be a documented decision: proceed to outreach, resolve specific gaps or reconsider the initial route. Research does not by itself establish demand.",
  "processTitle": "From manufacturer brief to a testable commercial plan.",
  "offerName": "U.S. Market Entry Support",
  "offerDescription": "Market research, product positioning, distributor identification and commercial preparation for foreign manufacturers targeting U.S. business buyers.",
  "focusAreas": [
    {
      "title": "Buyer and competitor research",
      "body": "Define an initial buyer segment, compare public competitor offers and record pricing assumptions with their sources. Separate observed evidence from hypotheses that need buyer interviews."
    },
    {
      "title": "Channel and distributor fit",
      "body": "Compare direct B2B sales, independent representatives and distributors. A distributor may buy and resell stock; a representative may support sales without taking title. Responsibilities depend on the agreement."
    },
    {
      "title": "Product and delivery preparation",
      "body": "List specifications, labeling questions, sample requirements and delivery responsibilities. Coordinate unresolved import, testing and legal questions with appointed professionals before presenting an executable offer."
    },
    {
      "title": "Commercial launch materials",
      "body": "Prepare a concise English product sheet, quotation basis, buyer qualification criteria and outreach sequence. Agree how inquiries, samples and technical questions will be handled."
    }
  ],
  "briefItems": [
    "Company and manufacturing country",
    "Priority products, capabilities and evidence",
    "Existing exports and target U.S. buyer segments",
    "Commercial objective, working budget and constraints"
  ],
  "workflow": [
    {
      "title": "Review your starting point",
      "body": "Identify the products, target customer and evidence already available. Use the free readiness checklist to expose missing preparation."
    },
    {
      "title": "Research the initial route",
      "body": "Compare relevant competing offers, likely buyer requirements and channel options. Record uncertainties and the work needed to validate them."
    },
    {
      "title": "Prepare the commercial test",
      "body": "Build the agreed sales materials, pricing assumptions and a qualified prospecting brief. Refer product-specific requirements to the appropriate specialists."
    },
    {
      "title": "Review and decide next steps",
      "body": "Assess buyer feedback, qualification gaps and economics. If suitable, scope a separate representation engagement with deliverables and reporting."
    }
  ],
  "faqs": [
    {
      "question": "How can a foreign manufacturer start selling in the United States?",
      "answer": "Start with one defined buyer segment and a focused product offer. Validate requirements and delivery responsibilities, prepare samples and pricing, then test interest through targeted buyer conversations. The route depends on the exact product and channel; a warehouse or U.S. entity is not assumed as part of every plan."
    },
    {
      "question": "Do you find U.S. distributors?",
      "answer": "Distributor research can form part of the engagement. We define criteria such as product fit, territory, channels and service capacity, then research prospective partners. A list is not evidence of buyer interest or an agreement to distribute your products."
    },
    {
      "question": "Is the team already based in the United States?",
      "answer": "Current engagements are executed and invoiced through the company in France or China identified in the proposal. Miami expansion is planned for 2027. The website does not represent an existing U.S. office, workforce or warehouse."
    },
    {
      "question": "How is market-entry support priced?",
      "answer": "Research and preparation can be scoped as a project. Ongoing representation may use a monthly retainer and an agreed commission. The written proposal defines deliverables, responsibilities, fees and any commission basis; there are no published fixed prices or guaranteed sales."
    }
  ],
  "briefTitle": "Request a U.S. market assessment.",
  "briefIntro": "Tell us what you manufacture, where you export today and which American customers you want to reach.",
  "relatedPages": [
    {
      "href": "/tools/us-market-entry-assessment",
      "title": "Free readiness assessment",
      "description": "Identify eight preparation gaps before approaching buyers."
    },
    {
      "href": "/market-entry-consulting",
      "title": "Market research and feasibility",
      "description": "Define the questions and evidence needed for a go-to-market decision."
    },
    {
      "href": "/us-sales-representation",
      "title": "U.S. sales representation",
      "description": "Understand the proposed monthly commercial workflow and reporting."
    },
    {
      "href": "/tools/landed-cost-calculator",
      "title": "Landed cost calculator",
      "description": "Test price assumptions with user-supplied costs and duties."
    }
  ],
  "hideShowcase": true,
  "benchmarks": [
    {
      "label": "Current delivery",
      "value": "International coordination",
      "qualifier": "Current projects contracted and invoiced through the company in France or China named in your proposal."
    },
    {
      "label": "U.S. presence",
      "value": "Miami planned for 2027",
      "qualifier": "The proposed expansion is separate from services available today."
    },
    {
      "label": "Commercial commitment",
      "value": "Scope agreed first",
      "qualifier": "Deliverables, timing, responsibilities and pricing are documented before work begins."
    }
  ],
  "benchmarksNote": "Timing, specialist involvement and deliverables are established for the engagement. No buyer response or sales outcome is guaranteed.",
  "references": [
    {
      "title": "U.S. International Trade Commission — Harmonized Tariff Schedule",
      "url": "https://hts.usitc.gov/"
    },
    {
      "title": "U.S. Customs and Border Protection — Basic importing and exporting",
      "url": "https://www.cbp.gov/trade/basic-import-export"
    }
  ],
  "reviewedDate": "2026-10-21"
};

export default function Page() { return <ServiceLandingPage page={page} />; }
