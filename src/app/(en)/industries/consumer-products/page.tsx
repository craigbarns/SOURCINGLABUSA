import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  "title": "Consumer Product Sourcing: Prepare a Feasibility Brief",
  "description": "Prepare product use, materials, component, testing and packing questions before overseas sourcing. Consumer product projects are reviewed for feasibility.",
  "path": "/industries/consumer-products"
});

const page: ServicePageContent = {
  "path": "/industries/consumer-products",
  "eyebrow": "For consumer product buyers · Start with the use case",
  "title": "Review the product requirement before choosing a manufacturing route.",
  "directAnswer": "Sourcing Lab USA reviews consumer product sourcing inquiries against the intended use, construction, quantity and evidence needed for sale. Clothing, textiles and packaging are the deepest specialties; other consumer products require a feasibility review before they can be quoted. The review identifies supplier questions, samples and any appointed technical, testing or inspection specialists needed for the proposed project.",
  "intro": "A product photo rarely explains how the item must perform, who will use it or what would count as a failure. Those questions shape the specification, the sample plan and the decision to proceed.",
  "overviewTitle": "Describe the product as the user will encounter it.",
  "overview": "Record intended users, contact with other materials, expected conditions and the functions that matter. A decorative reference and a performance requirement are different inputs. For a product assembled from several parts, identify the interfaces and who controls the final assembly. We review whether the product can be supported through the available sourcing route before discussing an order. We do not present every manufacturing process or material as an established in-house capability.",
  "processTitle": "A feasibility review with clear open questions.",
  "offerName": "Consumer Product Feasibility and Sourcing Coordination",
  "offerDescription": "Review of consumer product requirements and the sourcing route, followed by supplier, sample and specialist coordination when a feasible project scope is agreed.",
  "hideShowcase": true,
  "focusAreas": [
    {
      "title": "Function and use conditions",
      "body": "Explain the task the item performs, the expected user and the conditions it will encounter. Identify critical features and foreseeable misuse questions for specialist review. Translate words such as durable, leakproof or safe into a requirement that can actually be assessed."
    },
    {
      "title": "Materials and component interfaces",
      "body": "List known materials, coatings and components. Provide drawings for dimensions that affect fit, movement or assembly. If a material or component is undecided, state the tradeoff to investigate instead of letting a supplier substitute one without approval."
    },
    {
      "title": "Evidence and acceptance",
      "body": "Decide what the sample must demonstrate and what needs a separate technical assessment or test. A supplier certificate may cover a different material, model or production date. Appointed specialists review the evidence relevant to the actual product and scope."
    },
    {
      "title": "Packing and receiving",
      "body": "Describe how the product is protected, identified, counted and received. Provide channel-specific instructions and the receiving destination. Agree a packing sample or test where needed; a retail presentation mockup does not establish transport performance."
    }
  ],
  "briefItems": [
    "Product description, intended users, use conditions and sales channel",
    "Drawings, reference samples, component list and known material requirements",
    "Critical functions, known risks and existing test or supplier documents",
    "Quantity by variant, budget basis, packing needs and requested destination"
  ],
  "workflow": [
    {
      "title": "Separate known facts from assumptions",
      "body": "We review the brief, identify missing dimensions or functional requirements and list questions needing a technical answer. Where the category is outside the core specialties, this is a feasibility inquiry rather than confirmation of supply."
    },
    {
      "title": "Review the supplier and development route",
      "body": "Assess the information needed from a proposed supplier and whether development or tooling must be scoped. China discussions use the independent sourcing partnership. Other origins or categories need their own route confirmed."
    },
    {
      "title": "Set the sample and specialist scope",
      "body": "Define the purpose of samples and the specialist work proposed. Appointed technical advisers, laboratories or inspectors perform the assessments included in their agreed scope; we coordinate the project information and appointments."
    },
    {
      "title": "Review a decision-ready proposal",
      "body": "The proposal states what can be supplied or coordinated, remaining conditions, price basis and responsibilities. Tooling rights, approvals, production checks and transport tasks are agreed before commitment."
    }
  ],
  "benchmarks": [
    {
      "label": "Category acceptance",
      "value": "Subject to feasibility",
      "qualifier": "A consumer product inquiry is reviewed against the available sourcing route and technical needs."
    },
    {
      "label": "Development and testing",
      "value": "Scoped where needed",
      "qualifier": "Sample, technical assessment, test and inspection are separate decisions."
    },
    {
      "label": "Quantity and schedule",
      "value": "Quoted for the specification",
      "qualifier": "Tooling, materials, variants and approval stages determine the proposal."
    }
  ],
  "benchmarksNote": "A supplier introduction does not establish suitability, certification or product safety. Required evidence and specialist work must be agreed for the item.",
  "faqs": [
    {
      "question": "Can you source any consumer product?",
      "answer": "No universal catalog is offered. Clothing, textiles and packaging are the deepest specialties. Other products are reviewed using their function, materials, quantity and technical requirements. We confirm feasibility and the sourcing route before quoting."
    },
    {
      "question": "What if I only have a concept image?",
      "answer": "Send the image with the intended use and the features that matter. We identify the missing product details and whether development work is needed. A concept image is not a production specification and does not establish a supplier’s ability to make the product."
    },
    {
      "question": "Do you provide product safety certification?",
      "answer": "We coordinate the agreed product information and appointed specialists. Requirements and evidence depend on the actual product and its use. We do not issue a blanket approval or imply that a supplier’s generic certificate establishes compliance for your order."
    },
    {
      "question": "Who owns a new mold or design?",
      "answer": "Ownership and permitted use must be addressed in the written agreements before development or tooling is ordered. The proposal should identify who pays, who holds the tool or files and which access or reuse rights are agreed. Those rights cannot be assumed from a sample order."
    }
  ],
  "briefTitle": "Submit the product for a feasibility review.",
  "briefIntro": "Send the use case, references, materials if known and quantity. We identify the information and specialist questions needed before a sourcing proposal.",
  "relatedPages": [
    {
      "href": "/product-sourcing",
      "title": "Build the buying brief",
      "description": "Put product specifications and quotation inclusions on a comparable basis."
    },
    {
      "href": "/product-development",
      "title": "Scope product development",
      "description": "Identify the work needed between a concept and a production requirement."
    },
    {
      "href": "/custom-packaging",
      "title": "Prepare the packaging requirement",
      "description": "Define structure, artwork, protection and finished packing."
    },
    {
      "href": "/landed-cost-analysis",
      "title": "Review cost assumptions",
      "description": "Keep product, shipment and import-cost inputs visible in the estimate."
    }
  ]
};

export default function ConsumerProductsIndustryPage() {
  return <ServiceLandingPage page={page} />;
}
