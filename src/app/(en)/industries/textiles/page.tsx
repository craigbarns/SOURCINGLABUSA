import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  "title": "Textile and Apparel Buying: Collection and Reorder Planning",
  "description": "Prepare a textile or apparel collection for sourcing: fabric references, fit, size and color matrices, sample approvals and reorder records.",
  "path": "/industries/textiles"
});

const page: ServicePageContent = {
  "path": "/industries/textiles",
  "eyebrow": "For apparel and textile buyers · Plan the collection",
  "title": "Give every style, size and color a clear production reference.",
  "directAnswer": "Clothing and textiles are core specialties for Sourcing Lab USA. We help U.S. buyers prepare fabric, construction, fit, color and branding requirements for supplier discussions through the independent China partnership. A useful collection brief includes the quantity matrix, sample approval plan and requirements for each style. Specialist testing and inspections are coordinated when agreed; performance or certification claims require evidence.",
  "intro": "A collection total hides the details that drive production. Break the order into styles, fabrics, colors and sizes, then identify which decisions can be shared and which need a separate approval.",
  "overviewTitle": "Connect the assortment plan to the technical pack.",
  "overview": "For each style, keep the drawing or reference garment, material specification, measurement points, construction details and trim list together. Add the quantities by color and size. A common fabric may support several styles, while a distinct dye color, decoration or trim can create another minimum or sample step. We review those dependencies before treating the range as a single order. Packaging is another core specialty and can be scoped alongside the garments.",
  "processTitle": "From collection brief to a repeatable order record.",
  "offerName": "Textile and Apparel Collection Sourcing",
  "offerDescription": "Coordination of textile and garment requirements, supplier quotations, sampling, trim and packing approvals, and agreed production follow-up for U.S. business buyers.",
  "showcaseCategory": "textile",
  "focusAreas": [
    {
      "title": "Fabric and finish references",
      "body": "State composition, construction, weight if known, finish and intended use. Provide a physical swatch when hand feel or appearance matters. Distinguish a material preference from a performance claim that needs a defined method and supporting test evidence."
    },
    {
      "title": "Fit and measurement decisions",
      "body": "Identify the reference size, measurement points and proposed tolerances for review. State the intended fit and provide the size chart or grading information available. Decide which sizes need samples before accepting the full range."
    },
    {
      "title": "Color, decoration and trims",
      "body": "Keep color references and approved swatches linked to each style. Specify print or embroidery placement, labels, fasteners and packaging. Named branded components or certified materials require availability, authenticity and relevant evidence to be checked; they are not assumed inclusions."
    },
    {
      "title": "Reorder continuity",
      "body": "Retain the approved specification, samples, quantity matrix and record of accepted changes. At reorder, review material availability and any supplier or process changes. An earlier approval does not automatically establish that a later fabric batch will be identical."
    }
  ],
  "briefItems": [
    "Style list, drawings or reference garments and intended fit",
    "Fabric composition, construction, weight, finish and physical swatches if available",
    "Size and color quantity matrix, trim list and branding artwork",
    "Sample stages, sales channel, packing instructions and requested delivery destination"
  ],
  "workflow": [
    {
      "title": "Review the collection matrix",
      "body": "Identify shared fabrics, repeat trims and separate color or size requirements. List missing information and the supplier questions that affect quantities, sampling and pricing."
    },
    {
      "title": "Compare material and construction options",
      "body": "Coordinate swatches and supplier proposals against the brief. Record differences in fabric, finish or construction so a price comparison does not hide a changed garment requirement."
    },
    {
      "title": "Agree sample stages and corrections",
      "body": "Decide which fabric, color, fit, size or decoration samples are needed. Keep the comments and final approval linked to the relevant style and revision rather than a general collection approval."
    },
    {
      "title": "Confirm checks and production terms",
      "body": "Agree quantity splits, approvals, production checkpoints and packing. Appointed testing or inspection specialists perform the work included in their scope; production coordination is not a certification of fabric performance."
    },
    {
      "title": "Retain the order reference",
      "body": "Before the next order, compare the proposed material, colors, size breakdown and packing with the retained record. Review changes and update the quotation instead of relying only on a previous product name."
    }
  ],
  "benchmarks": [
    {
      "label": "Minimum quantity",
      "value": "Reviewed by fabric and variant",
      "qualifier": "Style count, material, color, decoration and size split affect the supplier proposal."
    },
    {
      "label": "Sample approvals",
      "value": "Planned per collection",
      "qualifier": "Fabric, fit, size, color and trims can require distinct decisions."
    },
    {
      "label": "Reorders",
      "value": "Checked against the record",
      "qualifier": "Availability and changes to material or construction are reviewed before a repeat order."
    }
  ],
  "benchmarksNote": "Quantity, sampling and production dates are quoted for the actual range. No universal textile minimum or production turnaround is published here.",
  "faqs": [
    {
      "question": "What should an apparel technical pack contain?",
      "answer": "Include the style reference, drawings, fabric specification, measurement points, size information, construction details, trims, artwork and packing requirements available. Identify unresolved decisions. The required level of detail depends on the garment and the supplier discussions."
    },
    {
      "question": "What if I have a reference garment but no technical pack?",
      "answer": "Send the garment reference and explain what should be retained or changed. We review which measurements, fabric details and construction decisions are needed for a quote and sample. Any design, pattern or technical development work must be included in an agreed scope."
    },
    {
      "question": "Can you supply performance or certified fabrics?",
      "answer": "State the exact property or certification requirement and intended use. We review sourcing feasibility and the evidence needed for that material. A supplier description, branded component name or general test document is not treated as proof for every fabric or production lot."
    },
    {
      "question": "How should I prepare U.S. garment labeling?",
      "answer": "Gather the composition, origin, responsible business details and care information relevant to the item. FTC guidance distinguishes textile, wool and care-label requirements and their scope. Confirm the product-specific label with the appointed specialist before artwork approval; we coordinate the agreed information and supplier application."
    },
    {
      "question": "Can a reorder use the previous sample approval?",
      "answer": "Keep the previous approval as a reference, then review the proposed material, batch, color, construction and supplier changes. Agree which checks or fresh samples are needed. A reorder should identify the version being purchased and any accepted differences."
    }
  ],
  "reviewedDate": "2026-10-21",
  "references": [
    {
      "title": "FTC: Clothing and textiles business guidance",
      "url": "https://www.ftc.gov/business-guidance/industry/clothing-and-textiles"
    },
    {
      "title": "FTC: Textile and wool labeling requirements",
      "url": "https://www.ftc.gov/business-guidance/resources/threading-your-way-through-labeling-requirements-under-textile-wool-acts"
    }
  ],
  "briefTitle": "Prepare the collection you want to source.",
  "briefIntro": "Send the style list, fabric references, size and color quantities, and sample priorities. We review the information needed for a proposal.",
  "relatedPages": [
    {
      "href": "/custom-textile",
      "title": "Clothing and textile supply",
      "description": "Define the product specification and quotation for the garments."
    },
    {
      "href": "/sportswear-sourcing",
      "title": "Sportswear requirements",
      "description": "Identify fabric properties, fit and evidence needed for technical apparel."
    },
    {
      "href": "/custom-packaging",
      "title": "Garment packaging",
      "description": "Coordinate labels, boxes and presentation with the product brief."
    },
    {
      "href": "/blog/apparel-sourcing-tech-packs-moq",
      "title": "Technical packs and order quantities",
      "description": "Review the information that connects a garment design with a sourcing request."
    }
  ]
};

export default function TextilesIndustryPage() {
  return <ServiceLandingPage page={page} />;
}
