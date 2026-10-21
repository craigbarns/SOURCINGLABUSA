import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  "title": "Building Materials Sourcing: Specifications & Feasibility",
  "description": "Prepare a building materials sourcing brief with drawings, quantities, finish requirements and project approvals. Feasibility reviewed before supplier commitments.",
  "path": "/industries/building-materials"
});

const page: ServicePageContent = {
  "path": "/industries/building-materials",
  "eyebrow": "Other product projects \u00b7 Feasibility reviewed first",
  "title": "Prepare a building materials sourcing brief that can be evaluated.",
  "directAnswer": "A building materials request needs more than a photograph and a target price. Drawings, material grades, tolerances, finish requirements, quantities and the intended installation determine whether a supplier offer is comparable. Sourcing Lab USA reviews such projects on request, subject to feasibility. Engineering suitability, code acceptance and product approvals remain matters for the project\u2019s qualified professionals; sourcing is not an engineering certification.",
  "intro": "Bring the bill of quantities, specification revision and required approval process. This page explains the information needed to evaluate a request; it does not present a stocked catalog, a certification or a track record in every construction category.",
  "overviewTitle": "Separate the supply specification from project approval.",
  "overview": "The buyer\u2019s architect or engineer may need to approve drawings, materials and submittals before procurement. Document that decision route before seeking an offer. A supplier certificate must be relevant to the exact material and batch; a generic certificate is not evidence that a finished product is suitable for a particular building.",
  "processTitle": "From an installation requirement to an agreed supply scope.",
  "offerName": "Building Materials Sourcing Feasibility",
  "offerDescription": "Feasibility review and sourcing coordination for specified building material requests, with project approval and specialist responsibilities identified.",
  "focusAreas": [
    {
      "title": "Drawings and revision control",
      "body": "Record dimensions, interfaces, tolerances and the controlling drawing revision. Identify any detail that a supplier must not substitute without written approval."
    },
    {
      "title": "Material and finish evidence",
      "body": "State the required material grade, surface finish and evidence to be provided. Distinguish a visual finish sample from evidence of technical performance."
    },
    {
      "title": "Submittal and sample approvals",
      "body": "Name the person authorized to approve shop drawings, physical samples and any testing plan. Keep the approved reference with the purchase specification."
    },
    {
      "title": "Packing and site receipt",
      "body": "List piece weights, packing constraints, unloading facilities and storage limitations. Have the appointed logistics provider validate routing and handling rather than assuming a container or road limit."
    }
  ],
  "briefItems": [
    "Bill of quantities, drawings and revision identifiers",
    "Material grades, tolerances, finishes and intended use",
    "Approval authority and required evidence specified by project professionals",
    "Quantity, delivery location, unloading constraints and budget basis"
  ],
  "workflow": [
    {
      "title": "Screen the request",
      "body": "Review the product scope, required evidence and supply feasibility before committing to supplier research."
    },
    {
      "title": "Request comparable offers",
      "body": "Use one controlled specification and list exclusions, proposed substitutions and unanswered questions separately."
    },
    {
      "title": "Approve the evidence",
      "body": "Coordinate the agreed samples and documents for buyer and project-professional review. Appointed specialists perform any agreed tests or inspection."
    },
    {
      "title": "Document the supply and receiving plan",
      "body": "Agree the contracting company, purchase terms, packing, import and delivery responsibilities before order approval."
    }
  ],
  "faqs": [
    {
      "question": "Do you guarantee compliance with U.S. building codes?",
      "answer": "No. Code suitability and project acceptance depend on the exact product, installation and jurisdiction. The buyer\u2019s qualified project professionals must define and approve the requirements. Sourcing coordination does not substitute for engineering review, testing or certification."
    },
    {
      "question": "Can I request materials outside clothing and packaging?",
      "answer": "You can submit a specified request for a feasibility review. Clothing, textiles and packaging are the deepest specialties. A building materials request is assessed before any supplier search or supply commitment is agreed."
    },
    {
      "question": "How should heavy or fragile items be quoted?",
      "answer": "State unit and packed dimensions, weights, handling and unloading conditions, breakage acceptance criteria and delivery location. The supplier and appointed logistics provider should quote the exact packing and transport scope. Compare total included costs, not just the piece price."
    }
  ],
  "briefTitle": "Discuss a specified materials request.",
  "briefIntro": "Send the product, quantities and available drawings. Identify who defines and approves project requirements.",
  "hideShowcase": true,
  "benchmarks": [
    {
      "label": "Order quantity",
      "value": "Quoted per specification",
      "qualifier": "Material, variants and supplier setup determine the practical run size."
    },
    {
      "label": "Samples and approvals",
      "value": "Agreed in the proposal",
      "qualifier": "Record what must be reviewed and who can approve it before production."
    },
    {
      "label": "Production and delivery",
      "value": "Confirmed per order",
      "qualifier": "There is no published standard lead time or guaranteed saving."
    }
  ],
  "benchmarksNote": "These are scoping principles, not performance benchmarks. Availability is subject to product feasibility. Clothing, textiles and packaging remain the deepest specialties.",
  "relatedPages": [
    {
      "href": "/product-sourcing",
      "title": "Product sourcing and scope",
      "description": "Understand how feasibility, quotations and responsibilities are agreed."
    },
    {
      "href": "/factory-verification",
      "title": "Factory verification",
      "description": "Compare the evidence required for a particular supplier decision."
    },
    {
      "href": "/tools/landed-cost-calculator",
      "title": "Landed cost calculator",
      "description": "Model the costs included in your quotation and delivery plan."
    }
  ]
};

export default function Page() { return <ServiceLandingPage page={page} />; }
