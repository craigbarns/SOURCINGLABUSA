import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  "title": "Landed Cost Analysis for U.S. Import Planning",
  "description": "Build an import cost estimate from product, freight, insurance, duties and destination charges. Compare assumptions with the landed cost calculator.",
  "path": "/landed-cost-analysis"
});

const page: ServicePageContent = {
  "path": "/landed-cost-analysis",
  "eyebrow": "Import planning · Costs, assumptions and responsibility",
  "title": "See what is included in the cost of getting the goods to you.",
  "directAnswer": "A landed cost estimate combines the purchase price with the transport, insurance, import and destination costs relevant to an agreed delivery point. Sourcing Lab USA helps assemble the available quotations and assumptions, compare scenarios and identify missing information. It is a planning estimate, not a guaranteed customs bill. Classification, valuation and applicable duties require current product-specific review with the importer and appointed customs specialist.",
  "intro": "Start with the exact supplier terms. A quotation that includes transport should not have the same charge added again, and a factory price should not be mistaken for a delivered price. Every line needs a source, an owner and a date.",
  "overviewTitle": "Keep quoted amounts separate from estimates.",
  "overview": "For each cost, record the amount, currency, unit or shipment basis, inclusions and validity date. Mark the charges that are confirmed and those that depend on the final classification, booking or arrival conditions. The calculation is useful when it exposes unknowns early. It cannot make an unsupported tariff input reliable or predict every port, storage or inspection charge.",
  "processTitle": "Build a cost sheet you can review and update.",
  "offerName": "Landed Cost Planning and Scenario Analysis",
  "offerDescription": "Coordination of product, transport and import-cost inputs, scenario comparisons and a record of assumptions for a proposed order. Scope and any service fee are agreed before work begins.",
  "hideShowcase": true,
  "focusAreas": [
    {
      "title": "The goods and the quotation basis",
      "body": "Record quantity, currency, product price, agreed delivery terms and any tooling or sample charges relevant to the decision. Identify the items already included. Customs value and the invoice amount can require separate review; a planning sheet should state its basis rather than treat them as interchangeable."
    },
    {
      "title": "Freight, insurance and allocation",
      "body": "Use the proposed route, packing dimensions, weights and dated provider quotations. Allocate shared shipment costs using a stated method suited to the order. Compare carton, mode or quantity scenarios without assuming every route has the same charges."
    },
    {
      "title": "Classification and import charges",
      "body": "USITC publishes the Harmonized Tariff Schedule and USTR maintains information on China Section 301 actions. Product classification, origin, valuation and entry date affect the review. Other measures or fees may also apply. An appointed customs specialist checks the applicable treatment; this page publishes no universal duty rate."
    },
    {
      "title": "Destination and contingent costs",
      "body": "Check the agreed delivery point and receiving instructions. Request applicable handling, delivery and receiving quotations. Keep possible storage, examination or delay charges visible as uncertainties rather than presenting a fixed all-inclusive amount without contractual support."
    }
  ],
  "briefItems": [
    "Supplier quotation, currency, quantity, named delivery point and shipping terms",
    "Product description, materials, use, origin and classification information available",
    "Packed dimensions, gross weight, carton count and proposed transport route",
    "Destination and receiving requirements, dated provider quotes and target selling price if relevant"
  ],
  "workflow": [
    {
      "title": "Normalize the quotation",
      "body": "List the goods, quantities, currency and included services. Separate one-time development costs from repeat order costs. Identify where a second quote uses a different material, quantity or delivery basis."
    },
    {
      "title": "Gather transport and destination inputs",
      "body": "Obtain the packing information and available provider quotations. Record expiry dates, surcharges and exclusions. Freight and clearance work are performed by the appointed providers; we coordinate the information needed for the agreed model."
    },
    {
      "title": "Record the customs assumptions",
      "body": "Document the proposed classification, origin and valuation basis with the source of each input. The importer and appointed customs specialist review current treatment. CBP notes that using a broker does not remove the importer’s responsibility for the import."
    },
    {
      "title": "Compare scenarios and unresolved items",
      "body": "Review how quantity, packing, transport or an unconfirmed import input changes the estimate. The cost sheet distinguishes quoted charges from assumptions and identifies the checks needed before an order or shipment decision."
    }
  ],
  "benchmarks": [
    {
      "label": "Cost inputs",
      "value": "Dated and attributed",
      "qualifier": "Keep quote validity, currency, inclusions and shipment basis with every line."
    },
    {
      "label": "Customs treatment",
      "value": "Product-specific review",
      "qualifier": "Confirm classification, origin, valuation, measures and entry-date assumptions."
    },
    {
      "label": "Output",
      "value": "An updateable estimate",
      "qualifier": "Unconfirmed costs and contingent charges remain visible in the calculation."
    }
  ],
  "benchmarksNote": "Scope, deliverable format, schedule and any service fee are agreed per project. An estimate is not a binding tariff ruling or a guaranteed final freight or customs charge.",
  "faqs": [
    {
      "question": "What belongs in a landed cost calculation?",
      "answer": "Start with the agreed delivery point and include the goods plus the applicable transport, insurance, import and destination charges needed to reach it. Check which amounts the supplier or transport quote already includes. Record excluded and uncertain costs rather than assuming a standard package fits every shipment."
    },
    {
      "question": "Can I try a calculation before requesting a project review?",
      "answer": "Yes. The landed cost calculator lets you enter your own planning assumptions and compare the resulting estimate. It does not retrieve or validate a current tariff classification, freight quote or duty rate. Use confirmed inputs and review the open questions before relying on the estimate."
    },
    {
      "question": "Do you determine the final HTS code or duty payable?",
      "answer": "We can coordinate preliminary classification and cost planning within an agreed scope. This is advisory work, not a CBP ruling or a customs entry determination. Review the product-specific classification and current treatment with the importer’s appointed customs specialist and seek a CBP ruling where appropriate."
    },
    {
      "question": "Does Section 301 cover every possible additional import charge?",
      "answer": "No. Review the current HTS, applicable trade measures and CBP guidance for the product, origin and entry date. USTR’s Section 301 hub is one source for China-related actions and exclusions. A single headline rate is not a substitute for the full product-specific review."
    },
    {
      "question": "Why can the final cost differ from the estimate?",
      "answer": "A changed quantity, currency, packing plan, transport quote, customs treatment or arrival condition can affect the result. A quote may also expire or exclude a charge. Keep the assumptions dated and update the estimate when the order or shipment information changes."
    },
    {
      "question": "Who is responsible for the import and the customs entry?",
      "answer": "The order must identify the importer and the parties responsible for transport and import tasks. CBP states that the importer remains responsible for the import even when using a customs broker. Sourcing Lab USA coordinates agreed information and appointed providers; it does not present itself as a licensed customs broker."
    }
  ],
  "reviewedDate": "2026-10-21",
  "references": [
    {
      "title": "USITC: Harmonized Tariff Information and current HTS",
      "url": "https://www.usitc.gov/harmonized_tariff_information"
    },
    {
      "title": "USTR: China Section 301 tariff actions and exclusions",
      "url": "https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions"
    },
    {
      "title": "CBP: Using a customs broker and importer responsibility",
      "url": "https://www.help.cbp.gov/s/article/Article-1169?language=en_US"
    }
  ],
  "briefTitle": "Review the costs behind your proposed order.",
  "briefIntro": "Send the supplier quote, packing details, available transport quotes and destination. We identify the inputs and scope needed for a useful estimate.",
  "relatedPages": [
    {
      "href": "/tools/landed-cost-calculator",
      "title": "Landed cost calculator",
      "description": "Enter your own product, shipment and import-cost assumptions to compare an estimate."
    },
    {
      "href": "/hs-code-consulting",
      "title": "Classification advisory",
      "description": "Prepare the product evidence and questions for classification review."
    },
    {
      "href": "/freight-logistics",
      "title": "Transport coordination",
      "description": "Review the route, provider scope and delivery handoff for the shipment."
    },
    {
      "href": "/product-sourcing",
      "title": "Define the product order",
      "description": "Put specification, quantity and price inclusions on a comparable basis."
    }
  ]
};

export default function LandedCostAnalysisPage() {
  return <ServiceLandingPage page={page} />;
}
