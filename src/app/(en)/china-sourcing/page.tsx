import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  "title": "China Sourcing and Manufacturing Coordination",
  "description": "China sourcing for U.S. businesses through an independent partnership. Define supplier evidence, sampling, production checks and product supply terms.",
  "path": "/china-sourcing"
});

const page: ServicePageContent = {
  "path": "/china-sourcing",
  "eyebrow": "China sourcing · Supplier coordination and product supply",
  "title": "Move a China sourcing project from discussion to a written plan.",
  "directAnswer": "Sourcing Lab USA coordinates China sourcing for U.S. business customers through an established independent sourcing partnership. The work starts with the product brief, then supplier information, quotations, sample approval and agreed production checkpoints. Clothing, textiles and packaging are the deepest specialties. On-site audits, inspections, laboratory work and shipment services are delivered by appointed specialists when included in the project scope.",
  "intro": "A productive factory conversation needs more than a shared language. Everyone needs the same revision of the specification, the same understanding of what the sample proves and a clear record of what must happen before production or shipment.",
  "overviewTitle": "Keep the evidence attached to the decision.",
  "overview": "The founder’s earlier sourcing projects inform the method; those projects are described with their original business context in the case studies. Current work uses an independent China partnership to coordinate supplier communication and production follow-up. Neither past experience nor a supplier introduction establishes a new factory’s suitability. We agree the information needed for this product and distinguish supplier statements, documents received, sample observations and checks by an appointed specialist.",
  "processTitle": "A record that follows the order.",
  "offerName": "China Sourcing and Manufacturing Coordination",
  "offerDescription": "Supplier communication, quotation comparison, sampling and production coordination in China, with product supply and specialist checks defined for each order.",
  "focusAreas": [
    {
      "title": "Supplier identity and capability",
      "body": "Identify the business offering the goods, where production is proposed and whether subcontracting is involved. Review the relevant information against the product requirement. If a site visit or audit is needed, agree who will perform it and what questions the report must address."
    },
    {
      "title": "One controlled specification",
      "body": "Use a dated brief and a revision record for drawings, materials, artwork, packing and approved changes. A supplier’s acknowledgment should identify the same version used in its quotation. Questions and exceptions belong in the record before the order proceeds."
    },
    {
      "title": "Sampling with a purpose",
      "body": "Choose the sample stage needed for the decision: construction, material, fit, print or complete presentation. Record the differences between a sample and the intended production article. New tooling, testing and repeat sample rounds are quoted when required."
    },
    {
      "title": "Checks matched to the risk",
      "body": "Production coordination tracks agreed milestones and open issues. A specialist inspection or laboratory test has a separate scope, method and report. We coordinate those appointments when agreed and do not present routine follow-up as an accredited inspection service."
    }
  ],
  "briefItems": [
    "Product references and the latest drawing, technical pack or artwork",
    "Material, dimensions, construction, finish and packaging requirements",
    "Quantity by size, color or variant and intended use or sales channel",
    "Destination, requested schedule and questions requiring specialist assessment"
  ],
  "workflow": [
    {
      "title": "Review the brief and sourcing route",
      "body": "We identify missing information, review category fit and confirm whether supplier discussions can begin through the China partnership. Additional product categories are assessed before availability is implied."
    },
    {
      "title": "Set the supplier review questions",
      "body": "Agree the capability information and documentary evidence needed. Where an on-site audit is appropriate, define its scope and the appointed specialist before treating it as part of the engagement."
    },
    {
      "title": "Compare offers and approve samples",
      "body": "Review specification exceptions, price inclusions, tooling, sample costs and proposed dates together. Keep corrections and the final approval linked to a named sample and the current production brief."
    },
    {
      "title": "Confirm the order and checkpoints",
      "body": "The quotation names the company in France or China that contracts and invoices. Product pricing, payment stages, production checks and the route for reporting deviations are agreed for the order."
    },
    {
      "title": "Review the shipment handoff",
      "body": "Confirm packing details, destination, delivery terms and the party handling each transport and import task. Carrier, forwarding, inspection and customs work is assigned to the appointed providers; we coordinate the agreed information exchange."
    }
  ],
  "benchmarks": [
    {
      "label": "Supplier review",
      "value": "Scope set per product",
      "qualifier": "Documents, site visits and specialist checks answer different questions."
    },
    {
      "label": "Production reference",
      "value": "Written sample approval",
      "qualifier": "The approved revision, exceptions and required checkpoints stay with the order."
    },
    {
      "label": "Production and shipment",
      "value": "Dates quoted per order",
      "qualifier": "Materials, revisions, factory scheduling and transport availability affect timing."
    }
  ],
  "benchmarksNote": "No fixed production or transit window is promised. The proposal identifies the milestones and the conditions behind the schedule.",
  "faqs": [
    {
      "question": "Do you own the factories or employ a China inspection team?",
      "answer": "The China sourcing relationship is an established independent partnership. We do not describe it as an owned factory network or an employee inspection team. On-site audits, inspections and laboratory work are performed by appointed specialists when agreed for the project."
    },
    {
      "question": "How do you handle differences between the sample and production?",
      "answer": "The order should identify the approved reference and the characteristics to check. We coordinate the agreed checkpoints and document reported deviations so the parties can decide the response under the order terms. A sample approval or an inspection cannot guarantee that every unit is defect-free."
    },
    {
      "question": "Can you arrange a factory visit or pre-shipment inspection?",
      "answer": "Yes, within an agreed scope. We coordinate the appointment, questions and required report with a suitable specialist. The proposal identifies what is included and who performs the work; a factory visit is not automatically a social audit, a product certification or a laboratory test."
    },
    {
      "question": "How long will sourcing, sampling and production take?",
      "answer": "The schedule is developed from the actual specification, sample stages, tooling, material availability and factory plan. Revised samples or a changed brief can alter it. Production and transport dates are confirmed in the quotation and updated as the project progresses."
    },
    {
      "question": "What can I learn from the founder’s earlier projects?",
      "answer": "The case studies show how sample corrections, production references and written confirmations were handled in earlier projects. Each identifies the business context in which it was delivered. They illustrate the founder’s experience and are not presented as orders completed by the newer Sourcing Lab USA business."
    }
  ],
  "briefTitle": "Prepare your China sourcing brief.",
  "briefIntro": "Send the product, specification, quantity and destination. We review the sourcing route and identify the next information or sample needed.",
  "relatedPages": [
    {
      "href": "/china-sourcing-agent",
      "title": "Choose the commercial arrangement",
      "description": "Understand product supply, coordination fees and who signs each agreement."
    },
    {
      "href": "/case-studies",
      "title": "The founder’s earlier projects",
      "description": "Documented examples with the original business context stated."
    },
    {
      "href": "/blog/verify-chinese-supplier",
      "title": "Supplier evidence checklist",
      "description": "Separate information received from observations and unresolved questions."
    },
    {
      "href": "/landed-cost-analysis",
      "title": "Budget for the delivered order",
      "description": "Review product, transport and import-cost assumptions together."
    }
  ]
};

export default function ChinaSourcingPage() {
  return <ServiceLandingPage page={page} />;
}
