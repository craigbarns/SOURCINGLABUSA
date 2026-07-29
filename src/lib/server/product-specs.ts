import type { ProductSpecResult } from '@/lib/types';

const VERIFICATION_NOTICE =
  'The certifications and regulatory requirements below are items to verify, not legal advice. Applicability depends on the exact product, intended use, target users, destination market, and current regulations.';

export function detectProductCategory(
  prompt: string,
): ProductSpecResult['category'] {
  const normalized = prompt.toLocaleLowerCase('en-US');

  if (
    /(gourde|bouteille|thermos|drinkware|tumbler|water bottle|inox)/.test(normalized)
  ) {
    return 'drinkware';
  }

  if (
    /(électronique|electronique|batterie|écouteur|bluetooth|chargeur|electronic|earbud)/.test(
      normalized,
    )
  ) {
    return 'electronics';
  }

  if (/(sacs? à dos|sacs? a dos|backpack|rucksack|bagage)/.test(normalized)) {
    return 'backpack';
  }

  if (
    /(textile|t-shirt|hoodie|vêtement|coton|\bfabric\b|garment)/.test(
      normalized,
    )
  ) {
    return 'textile';
  }

  return 'generic';
}

function sharedPricing(): ProductSpecResult['pricingTarget'] {
  return {
    estimatedFob: 'To be quoted using at least 3 comparable supplier quotes',
    targetLandCost:
      'To be calculated after freight, country of origin, HS code, and duties are verified',
    recommendedMSRP: 'To be determined based on sales channel and actual costs',
    marginPotential: 'Not calculated until actual costs are known',
  };
}

const DEMO_PROFILES: Record<
  ProductSpecResult['category'],
  Omit<ProductSpecResult, 'mode' | 'sourceLabel' | 'category'>
> = {
  drinkware: {
    productTitle: 'Insulated food container — starter specification',
    targetMarket: 'Target market to be confirmed with requester',
    specsSummary:
      'A coherent starting point for an insulated container. Final values must be validated against drawings, prototypes, and use testing.',
    technicalSpecs: {
      materials: [
        'Stainless steel grade to be confirmed by material certificate',
        'Food-contact-safe gasket material; formulation must be documented',
        'Exterior coating composition and durability to be tested',
      ],
      dimensions: 'Define based on usable capacity, lid, and target cup holders',
      weight: 'Target to be set after CAD and prototype',
      tolerances:
        'Specify dimensional tolerances on production drawings, including critical leak-tightness points',
      keyFeatures: [
        'Measurable leak resistance with a defined procedure and duration',
        'Thermal performance measured under repeatable conditions',
        'Removable, cleanable components with no residue-trap areas',
      ],
    },
    certifications: {
      toVerify: [
        'Food-contact rules applicable to materials and coatings in the target market',
        'Local restricted-substance and labeling requirements',
      ],
      recommended: [
        'Audit the factory quality system and lot traceability',
        'Migration test reports for the final material configuration',
      ],
      testingLabs: [
        'ISO/IEC 17025-accredited laboratory selected for the required tests',
      ],
      verificationNotice: VERIFICATION_NOTICE,
    },
    moq: {
      recommended: 0,
      sampleMoq: 1,
      unit: 'pcs',
      notes:
        'MOQ unknown: request separate quotes for prototype, pilot, and production runs.',
    },
    pricingTarget: sharedPricing(),
    qualityControl: [
      'Visual and dimensional inspection against the approved drawing',
      'Documented leak test using a defined sampling plan',
      'Thermal performance test with defined temperature, duration, and tolerance',
      'Verify material certificates by lot',
    ],
  },
  textile: {
    productTitle: 'Textile product — starter specification',
    targetMarket: 'Target market, age group, and sales channel to be confirmed',
    specsSummary:
      'Starter textile tech pack covering materials, construction, sizing, colors, and inspections. Final patterns and measurements still need to be provided.',
    technicalSpecs: {
      materials: [
        'Exact fiber composition by percentage',
        'Fabric weight (GSM) with agreed tolerance',
        'Thread, ribbing, labels, and trims specified separately',
      ],
      dimensions: 'Include a size measurement chart in the tech pack',
      weight: 'Confirm garment weight by size after prototype',
      tolerances:
        'Agree on measurement, GSM, shrinkage, and color tolerances in the tech pack',
      keyFeatures: [
        'Define seam construction and stitch density',
        'Measurable color standard and lab-dip approval method',
        'Validate fiber content, care, and country-of-origin labeling',
      ],
    },
    certifications: {
      toVerify: [
        'Textile labeling requirements for the target market',
        'Chemical and product-safety requirements based on material, decoration, and target user',
      ],
      recommended: [
        'Support organic or recycled claims with appropriate chain-of-custody records',
        'Social or environmental audit based on purchasing policy',
      ],
      testingLabs: ['Accredited textile laboratory selected for the test plan'],
      verificationNotice: VERIFICATION_NOTICE,
    },
    moq: {
      recommended: 0,
      sampleMoq: 1,
      unit: 'pcs / color / size',
      notes: 'Negotiate MOQ by color and size range after prototype approval.',
    },
    pricingTarget: sharedPricing(),
    qualityControl: [
      'Flat measurements by size against the approved chart',
      'Shrinkage, colorfastness, and pilling tests based on intended use',
      'Inspect seams, prints, embroidery, and trims',
      'Approve and sign a preproduction sample',
    ],
  },
  electronics: {
    productTitle: 'Electronic product — starter specification',
    targetMarket: 'Sales country, radio frequencies, and power requirements to be confirmed',
    specsSummary:
      'Electronic product planning baseline. Electrical design, software, battery, and regulatory testing must be validated by qualified specialists.',
    technicalSpecs: {
      materials: [
        'Enclosure and flammability rating to be defined by the design',
        'Document battery, cell, and protection circuitry when applicable',
        'Electronic BOM with critical part numbers and approved alternates',
      ],
      dimensions: 'Provide CAD envelope and mechanical interfaces',
      weight: 'Confirm target after EVT/DVT prototype',
      tolerances:
        'Define mechanical, electrical, and RF tolerances in drawings and specifications',
      keyFeatures: [
        'Battery-life specification and repeatable test method',
        'Traceable hardware and firmware versions',
        'Documented safety, charging, temperature, and aging criteria',
      ],
    },
    certifications: {
      toVerify: [
        'Target-market radio approvals and electromagnetic compatibility',
        'Electrical safety, battery, and transport requirements applicable to the final design',
        'Restricted substances, recycling, and marking requirements for countries of sale',
      ],
      recommended: [
        'Test reports for a production-representative sample',
        'Audit critical-component controls and firmware traceability',
      ],
      testingLabs: ['Accredited laboratory recognized in the target market'],
      verificationNotice: VERIFICATION_NOTICE,
    },
    moq: {
      recommended: 0,
      sampleMoq: 3,
      unit: 'pcs',
      notes: 'Plan separate EVT, DVT, and PVT builds before mass production.',
    },
    pricingTarget: sharedPricing(),
    qualityControl: [
      'Documented functional testing on every unit or based on justified risk',
      'Traceability for critical components and firmware versions',
      'Charging, battery-life, temperature, and aging tests',
      'Final inspection using a production-representative sample',
    ],
  },
  backpack: {
    productTitle: 'Backpack — starter specification',
    targetMarket: 'Intended use, capacity, load, and target market to be confirmed',
    specsSummary:
      'A coherent foundation for a luggage tech pack covering materials, reinforcements, hardware, dimensions, and durability tests.',
    technicalSpecs: {
      materials: [
        'Outer fabric with specified composition, denier, coating, and color',
        'Specify lining, foam, and reinforcements by area',
        'Approved part numbers for zippers, buckles, webbing, and thread',
      ],
      dimensions: 'Define height × width × depth and usable volume on the drawing',
      weight: 'Confirm target weight after development sample',
      tolerances:
        'Define pattern, seam, symmetry, and hardware-placement tolerances',
      keyFeatures: [
        'Payload rating and handle/strap test protocol',
        'Water resistance defined by a measurable test method',
        'Dimension compartments and access points on the drawing',
      ],
    },
    certifications: {
      toVerify: [
        'Target-market chemical requirements for materials, coatings, and hardware',
        'Additional requirements if intended for children or containing electronics',
      ],
      recommended: [
        'Traceability for claimed recycled materials',
        'Quality audit of cutting, sewing, and hardware installation',
      ],
      testingLabs: [
        'Accredited materials/textile laboratory selected for the test plan',
      ],
      verificationNotice: VERIFICATION_NOTICE,
    },
    moq: {
      recommended: 0,
      sampleMoq: 1,
      unit: 'pcs / color',
      notes: 'Confirm MOQ by color, material, and customization level.',
    },
    pricingTarget: sharedPricing(),
    qualityControl: [
      'Complete measurements against approved pattern and tolerances',
      'Tensile tests for straps, handles, and critical seams',
      'Cycle testing for zippers and buckles',
      'Abrasion and water-resistance testing based on claimed use',
    ],
  },
  generic: {
    productTitle: 'Product details required — specification template',
    targetMarket: 'To be determined',
    specsSummary:
      'The description is not detailed enough to create a product-specific specification without inventing data. This template lists the information to collect.',
    technicalSpecs: {
      materials: [
        'Exact materials, grades, and approved suppliers to be specified',
        'Document finishes, colors, and treatments',
      ],
      dimensions: 'Provide a dimensioned drawing and critical interfaces',
      weight: 'Define target weight and tolerance',
      tolerances: 'Define functional tolerances based on actual use',
      keyFeatures: [
        'Describe essential functions and measurable criteria',
        'Specify use conditions, service life, and operating environment',
      ],
    },
    certifications: {
      toVerify: [
        'Identify applicable regulations after confirming the product, use, and market',
      ],
      recommended: ['Have a product specialist validate the test plan'],
      testingLabs: ['Select a laboratory after defining the test plan'],
      verificationNotice: VERIFICATION_NOTICE,
    },
    moq: {
      recommended: 0,
      sampleMoq: 1,
      unit: 'units',
      notes: 'Cannot estimate MOQ without process, material, and customization details.',
    },
    pricingTarget: sharedPricing(),
    qualityControl: [
      'Define critical-to-quality characteristics',
      'Create a control plan linked to approved drawings and specifications',
      'Approve a reference sample before production',
    ],
  },
};

export function createDemoProductSpecs(prompt: string): ProductSpecResult {
  const category = detectProductCategory(prompt);

  return {
    mode: 'demo',
    sourceLabel: 'Demo template — no AI analysis',
    category,
    ...DEMO_PROFILES[category],
  };
}
