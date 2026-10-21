import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  "title": "Furniture Sourcing Briefs & Manufacturing Feasibility",
  "description": "Prepare a furniture sourcing request with drawings, materials, prototype approvals and packing requirements. Product feasibility and specialist needs reviewed first.",
  "path": "/industries/furniture"
});

const page: ServicePageContent = {
  "path": "/industries/furniture",
  "eyebrow": "Furniture projects \u00b7 Specification-led feasibility",
  "title": "Define the furniture before comparing the factory price.",
  "directAnswer": "A furniture sourcing brief should state intended use, dimensions, construction, materials, finishes, quantity and delivery requirements. A prototype and an agreed packing plan help make offers comparable. Sourcing Lab USA reviews furniture requests for feasibility rather than offering an unlimited catalog. Product testing, technical suitability and regulatory review are scoped with appropriate specialists; there is no universal moisture target or certification covering every design.",
  "intro": "A render can communicate appearance while leaving joinery, material substitutions, assembly and packing unresolved. Bring the drawings and use conditions so those questions can be documented before comparing quotations.",
  "overviewTitle": "Treat the prototype as an approval record.",
  "overview": "Record what the prototype actually represents: dimensions, material, finish, fittings and assembly method. Note every deviation from the production specification. An approved appearance sample does not by itself establish durability, product safety or transport performance. Specify how those questions will be evaluated and by whom.",
  "processTitle": "From drawings to a documented prototype and order.",
  "offerName": "Furniture Sourcing Feasibility & Coordination",
  "offerDescription": "Specification and feasibility review for furniture requests, with supplier offers, prototypes and specialist requirements coordinated within an agreed scope.",
  "focusAreas": [
    {
      "title": "Materials and intended environment",
      "body": "Identify wood or panel type, metal construction, upholstery and intended use conditions. Moisture, coatings and material performance targets must fit the product and environment rather than a blanket number."
    },
    {
      "title": "Assembly and hardware",
      "body": "Document joints, fittings, assembly instructions, spare parts and the acceptance checks needed for the finished item. List proposed substitutions before approving them."
    },
    {
      "title": "Prototype review",
      "body": "Use a signed record of dimensions, appearance, comfort and function. Assign technical or durability testing to the appropriate appointed specialist where required."
    },
    {
      "title": "Packed dimensions and damage prevention",
      "body": "Compare the packing method, carton or crate size, gross weight, assembly state and receiving constraints. Agree a suitable transport evaluation rather than describing every carton as certified."
    }
  ],
  "briefItems": [
    "Drawings, intended use and reference photos with provenance",
    "Material, construction, finish and upholstery requirements",
    "Quantity by model and prototype approval responsibilities",
    "Packed-size constraints, delivery basis, receiving location and budget"
  ],
  "workflow": [
    {
      "title": "Review product feasibility",
      "body": "Clarify the construction and material scope, missing drawings and specialist requirements before supplier research."
    },
    {
      "title": "Compare the same specification",
      "body": "Request offers on one revision, including tooling, prototypes, packing, exclusions and order assumptions."
    },
    {
      "title": "Record prototype decisions",
      "body": "Coordinate samples within the agreed scope. Keep written approval, deviations and unresolved technical questions visible."
    },
    {
      "title": "Agree production and delivery responsibilities",
      "body": "Document the order, appointed inspection scope, packing and transport responsibilities. Verify the quotation\u2019s contracting and invoicing company."
    }
  ],
  "faqs": [
    {
      "question": "Is a photograph enough for a furniture quotation?",
      "answer": "A photograph can start the discussion but usually leaves dimensions, materials, internal construction, fittings and packing undefined. A comparable offer needs those details recorded or expressly marked as assumptions."
    },
    {
      "question": "Do all wood products need the same moisture or test specification?",
      "answer": "No single value or test covers every material, product and intended environment. Have the relevant product professional specify what should be measured and accepted. Request evidence for the exact product rather than relying on a general factory claim."
    },
    {
      "question": "How can I compare flat-pack and assembled furniture?",
      "answer": "Include factory price, assembly labor, packaging, freight volume, destination handling, missing-part support and potential returns. The lowest factory unit price may not produce the lowest cost for the delivery model."
    }
  ],
  "briefTitle": "Share a furniture specification for review.",
  "briefIntro": "Start with the intended use, drawings, materials, quantity and delivery constraints. We review feasibility before proposing a scope.",
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
