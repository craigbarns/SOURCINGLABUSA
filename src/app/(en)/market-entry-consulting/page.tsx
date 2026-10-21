import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  "title": "U.S. Market Research & Entry Feasibility for Manufacturers",
  "description": "Scope evidence-based U.S. market research: buyer segments, competitors, pricing and channel assumptions for foreign manufacturers planning their first commercial test.",
  "path": "/market-entry-consulting"
});

const page: ServicePageContent = {
  "path": "/market-entry-consulting",
  "journey": "market-entry",
  "eyebrow": "Decision support · Before market-entry investment",
  "title": "Research the U.S. opportunity before committing to a route.",
  "directAnswer": "A useful market-entry study answers a specific commercial decision: which buyer segment to test, which products to prioritize and which route can work economically. Sourcing Lab USA scopes research around those decisions, documenting public sources, competitor observations, pricing assumptions and unresolved questions. Findings support a commercial test; they are not a forecast of guaranteed demand or a legal clearance.",
  "intro": "Use this service when the target customer, product selection or distribution model is still uncertain. The work begins with the decision you need to make and the evidence available to make it.",
  "overviewTitle": "A research brief that exposes its assumptions.",
  "overview": "A competitor price observed online may exclude freight, volume discounts or distributor terms. A large addressable market does not prove that a new supplier can win business. We distinguish public observations, manufacturer-supplied information and assumptions requiring interviews or professional review. The research scope states the geography, product range, channels, sources and limitations.",
  "processTitle": "Define the decision and build an evidence trail.",
  "offerName": "U.S. Market Research & Feasibility",
  "offerDescription": "Scoped market research and commercial feasibility preparation for international manufacturers considering U.S. buyer channels.",
  "focusAreas": [
    {
      "title": "Customer and use-case hypothesis",
      "body": "Define buyer roles, purchase triggers, current alternatives and qualification criteria. Narrow the initial segment enough to research and contact relevant companies."
    },
    {
      "title": "Competitive offer comparison",
      "body": "Compare relevant product specifications, public prices, channels and positioning. Record the date and basis of each comparison and avoid presenting incomparable retail and factory prices as equivalent."
    },
    {
      "title": "Commercial economics",
      "body": "Model product pricing, estimated delivery costs and channel assumptions using manufacturer inputs. Show sensitivities and missing costs rather than presenting a single unsupported margin."
    },
    {
      "title": "Route-to-market decision",
      "body": "Compare a direct B2B pilot, representative support and distributor development. Assign unresolved product, import and contractual questions to the appropriate specialists."
    }
  ],
  "briefItems": [
    "The decision you need to make",
    "Initial products and documented capabilities",
    "Target buyer or channel hypothesis",
    "Available price inputs, budget and constraints"
  ],
  "workflow": [
    {
      "title": "Scope the research question",
      "body": "Agree the product range, segment, geography, evidence sources and deliverable. State what the research cannot establish."
    },
    {
      "title": "Collect and compare evidence",
      "body": "Record public competitor offers and available industry evidence. Interview or outreach work is included only where explicitly scoped."
    },
    {
      "title": "Test the economics",
      "body": "Use consistent pricing and delivery assumptions. Flag missing buyer or distributor terms and specialist review needs."
    },
    {
      "title": "Recommend a commercial test",
      "body": "Summarize findings, uncertainties and a practical next step. Proceed, revise or stop based on evidence rather than an assumed market size."
    }
  ],
  "faqs": [
    {
      "question": "Does a feasibility study prove that U.S. customers will buy?",
      "answer": "No. Desk research can identify plausible segments and assumptions. Direct buyer feedback and an executable product offer are needed to test demand. Research findings should state their evidence and limitations."
    },
    {
      "question": "What information should a manufacturer provide?",
      "answer": "Provide a product catalog, capabilities, available product evidence, sample terms, export pricing, existing channels and the decision you are trying to make. Identify which figures are current quotes and which are estimates."
    },
    {
      "question": "How does this differ from sales representation?",
      "answer": "Research supports a go-to-market decision. Representation is an ongoing commercial activity with agreed outreach, follow-up and reporting. A research project does not automatically include a representation mandate or distributor introductions."
    }
  ],
  "briefTitle": "Scope a U.S. market research brief.",
  "briefIntro": "Tell us which products and buyers you are considering, and what decision the research needs to support.",
  "relatedPages": [
    {
      "href": "/us-market-entry",
      "title": "Market-entry preparation",
      "description": "Turn the research decision into an initial commercial plan."
    },
    {
      "href": "/us-sales-representation",
      "title": "Ongoing sales representation",
      "description": "Define a recurring prospecting and reporting scope."
    },
    {
      "href": "/tools/us-market-entry-assessment",
      "title": "Free readiness assessment",
      "description": "Identify missing evidence and documents."
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
  "benchmarksNote": "Timing, specialist involvement and deliverables are established for the engagement. No buyer response or sales outcome is guaranteed."
};

export default function Page() { return <ServiceLandingPage page={page} />; }
