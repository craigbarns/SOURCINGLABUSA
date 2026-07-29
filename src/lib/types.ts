export interface ProductSpecResult {
  mode: 'live' | 'demo';
  sourceLabel: string;
  category: 'drinkware' | 'textile' | 'electronics' | 'backpack' | 'generic';
  productTitle: string;
  targetMarket: string;
  specsSummary: string;
  technicalSpecs: {
    materials: string[];
    dimensions: string;
    weight: string;
    tolerances: string;
    keyFeatures: string[];
  };
  certifications: {
    toVerify: string[];
    recommended: string[];
    testingLabs: string[];
    verificationNotice: string;
  };
  moq: {
    recommended: number;
    sampleMoq: number;
    unit: string;
    notes: string;
  };
  pricingTarget: {
    estimatedFob: string;
    targetLandCost: string;
    recommendedMSRP: string;
    marginPotential: string;
  };
  qualityControl: string[];
}

export type QuotePipelineMode = 'live' | 'demo' | 'partial';

export interface QuoteLineItem {
  description: string;
  sku: string | null;
  quantity: number | null;
  unit: string | null;
  unitPrice: number | null;
  total: number | null;
}

export interface QuoteTotals {
  subtotal: number | null;
  freight: number | null;
  tooling: number | null;
  tax: number | null;
  discount: number | null;
  total: number | null;
}

export interface QuoteEvidence {
  field: string;
  excerpt: string;
}

export interface StructuredQuote {
  fileName: string;
  supplierName: string | null;
  quoteNumber: string | null;
  quoteDate: string | null;
  currency: string | null;
  incoterm: string | null;
  paymentTerms: string | null;
  leadTime: string | null;
  validity: string | null;
  moq: number | null;
  totalQuantity: number | null;
  totals: QuoteTotals;
  lineItems: QuoteLineItem[];
  evidence: QuoteEvidence[];
  extractionConfidence: number;
  warnings: string[];
}

export interface QuoteMathCheck {
  fileName: string;
  reportedTotal: number | null;
  computedLinesTotal: number | null;
  computedExpectedTotal: number | null;
  difference: number | null;
  calculationBasis:
    | 'line_items'
    | 'line_items_plus_adjustments'
    | 'subtotal'
    | 'subtotal_plus_adjustments'
    | 'insufficient_data';
  status: 'matched' | 'mismatch' | 'insufficient_data';
}

export interface QuoteRankingItem {
  rank: number | null;
  fileName: string;
  supplierName: string | null;
  amount: number | null;
  currency: string | null;
  basis:
    | 'reported_total'
    | 'reported_total_per_unit'
    | 'weighted_unit_price'
    | 'insufficient_data';
}

export interface QuoteComparison {
  comparability: 'high' | 'limited' | 'not_comparable';
  summary: string;
  recommendedQuoteFileName: string | null;
  priceSpreadPercent: number | null;
  ranking: QuoteRankingItem[];
  mathChecks: QuoteMathCheck[];
  vigilancePoints: string[];
  recommendations: string[];
}

export interface QuoteAnalysisResponse {
  mode: QuotePipelineMode;
  providers: {
    ocr: 'mistral' | 'demo';
    extraction: 'openai' | 'deterministic' | 'demo';
    analysis: 'openai' | 'deterministic' | 'demo';
  };
  quotes: StructuredQuote[];
  comparison: QuoteComparison;
  warning: string | null;
}

export interface LandedCostInput {
  unitPriceFob: number;
  quantity: number;
  shippingMode: 'sea_fcl' | 'sea_lcl' | 'air_express' | 'air_freight';
  hsCode: string;
  destinationMarket: 'US' | 'EU';
  customsDutyRate: number;
  freightCostTotal: number;
  insuranceCost: number | null;
  localPortCharges: number;
  lastMileDelivery: number;
  targetRetailPrice: number;
}

export interface LandedCostResult {
  factoryCostTotal: number;
  freightCostTotal: number;
  insuranceCostTotal: number;
  customsDutyTotal: number;
  totalLandedCost: number;
  unitLandedCost: number;
  marginPerUnit: number;
  marginPercent: number;
  roiPercent: number;
  breakdownPct: {
    factoryPct: number;
    freightPct: number;
    dutyPct: number;
    localPct: number;
  };
  calculationContext: {
    destinationMarket: LandedCostInput['destinationMarket'];
    shippingMode: LandedCostInput['shippingMode'];
    hsCode: string;
    customsDutyRate: number;
    insuranceWasEstimated: boolean;
  };
  warnings: string[];
}

export interface EmailGeneratorInput {
  supplierName: string;
  contactPerson?: string;
  productName: string;
  quantity: number;
  emailType: 'rfq' | 'negotiation' | 'sample_request' | 'quality_audit';
  language: 'en' | 'fr' | 'zh';
  targetPrice?: string;
  specificRequirements?: string;
}

export interface EmailGeneratorResult {
  subject: string;
  body: string;
  tips: string[];
}

export type HsCodeOriginCountry = 'CN' | 'VN' | 'IN' | 'MX' | 'TR';

export interface HsCodeAnalysisInput {
  query: string;
  destinationMarket?: 'US' | 'EU';
  originCountry?: HsCodeOriginCountry;
}

export interface HsCodeAnalysisResult {
  mode: 'live' | 'demo';
  sourceLabel: string;
  hsCode6Digit: string;
  hsCode10Digit: string;
  productDescription: string;
  categoryName: string;
  destinationMarket: 'US' | 'EU';
  originCountry: string;
  dutyRates: {
    baseDutyPercent: number;
    section301Percent: number;
    additionalTaxesPercent: number;
    effectiveDutyPercent: number;
  };
  dutyBreakdownNotes: string[];
  regulatoryWarnings: string[];
  alternativeHsCodes: Array<{
    code: string;
    description: string;
    dutyRate: string;
  }>;
}
