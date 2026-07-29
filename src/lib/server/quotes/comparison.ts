import type {
  QuoteComparison,
  QuoteMathCheck,
  QuoteRankingItem,
  StructuredQuote,
} from '@/lib/types';

const ABSOLUTE_MONEY_TOLERANCE = 0.02;
const RELATIVE_MONEY_TOLERANCE = 0.001;
const NON_PRODUCT_LINE_ITEM_PATTERN =
  /(tooling|mou?ld|freight|shipping|tax|vat|discount|outillage|moule|fret|transport)/i;

const UNIT_ALIASES: Record<string, string> = {
  ea: 'piece',
  each: 'piece',
  pc: 'piece',
  pcs: 'piece',
  piece: 'piece',
  pieces: 'piece',
  unit: 'piece',
  units: 'piece',
  kg: 'kilogram',
  kgs: 'kilogram',
  kilogram: 'kilogram',
  kilograms: 'kilogram',
  lb: 'pound',
  lbs: 'pound',
  pound: 'pound',
  pounds: 'pound',
  m: 'meter',
  meter: 'meter',
  meters: 'meter',
  metre: 'meter',
  metres: 'meter',
};

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function sumLineTotals(quote: StructuredQuote): number | null {
  if (quote.lineItems.length === 0) {
    return null;
  }

  const totals = quote.lineItems.map((item) => {
    if (item.total !== null) {
      return item.total;
    }

    if (item.quantity !== null && item.unitPrice !== null) {
      return item.quantity * item.unitPrice;
    }

    return null;
  });

  if (totals.some((total) => total === null)) {
    return null;
  }

  return roundMoney(
    (totals as number[]).reduce((sum, lineTotal) => sum + lineTotal, 0),
  );
}

function knownAdjustments(quote: StructuredQuote): {
  hasAny: boolean;
  amount: number;
} {
  const values = [
    quote.totals.freight,
    quote.totals.tooling,
    quote.totals.tax,
    quote.totals.discount,
  ];
  const amount =
    (quote.totals.freight ?? 0) +
    (quote.totals.tooling ?? 0) +
    (quote.totals.tax ?? 0) -
    (quote.totals.discount ?? 0);

  return {
    hasAny: values.some((value) => value !== null),
    amount: roundMoney(amount),
  };
}

function buildMathCheck(quote: StructuredQuote): QuoteMathCheck {
  const computedLinesTotal = sumLineTotals(quote);
  const reportedTotal = quote.totals.total;
  const adjustments = knownAdjustments(quote);
  const candidates: Array<{
    value: number;
    basis: QuoteMathCheck['calculationBasis'];
  }> = [];

  if (computedLinesTotal !== null) {
    candidates.push({
      value: computedLinesTotal,
      basis: 'line_items',
    });

    if (adjustments.hasAny) {
      candidates.push({
        value: roundMoney(computedLinesTotal + adjustments.amount),
        basis: 'line_items_plus_adjustments',
      });
    }
  }

  if (quote.totals.subtotal !== null) {
    candidates.push({
      value: quote.totals.subtotal,
      basis: 'subtotal',
    });

    if (adjustments.hasAny) {
      candidates.push({
        value: roundMoney(quote.totals.subtotal + adjustments.amount),
        basis: 'subtotal_plus_adjustments',
      });
    }
  }

  if (reportedTotal === null || candidates.length === 0) {
    return {
      fileName: quote.fileName,
      reportedTotal,
      computedLinesTotal,
      computedExpectedTotal: null,
      difference: null,
      calculationBasis: 'insufficient_data',
      status: 'insufficient_data',
    };
  }

  const closest = candidates.reduce((best, candidate) =>
    Math.abs(reportedTotal - candidate.value) <
    Math.abs(reportedTotal - best.value)
      ? candidate
      : best,
  );
  const difference = roundMoney(reportedTotal - closest.value);
  const tolerance = Math.max(
    ABSOLUTE_MONEY_TOLERANCE,
    Math.abs(reportedTotal) * RELATIVE_MONEY_TOLERANCE,
  );

  return {
    fileName: quote.fileName,
    reportedTotal,
    computedLinesTotal,
    computedExpectedTotal: closest.value,
    difference,
    calculationBasis: closest.basis,
    status: Math.abs(difference) <= tolerance ? 'matched' : 'mismatch',
  };
}

function comparableAmount(quote: StructuredQuote): {
  amount: number | null;
  basis: QuoteRankingItem['basis'];
} {
  const quantity = quote.totalQuantity;

  if (
    quote.totals.total !== null &&
    quantity !== null &&
    quantity > 0
  ) {
    return {
      amount: roundMoney(quote.totals.total / quantity),
      basis: 'reported_total_per_unit',
    };
  }

  const computed = sumLineTotals(quote);

  if (computed !== null && quantity !== null && quantity > 0) {
    return {
      amount: roundMoney(computed / quantity),
      basis: 'weighted_unit_price',
    };
  }

  if (quote.totals.total !== null) {
    return {
      amount: quote.totals.total,
      basis: 'reported_total',
    };
  }

  return {
    amount: null,
    basis: 'insufficient_data',
  };
}

function normalizedIncoterm(incoterm: string | null): string | null {
  return incoterm?.trim().toUpperCase().split(/\s+/)[0] || null;
}

function normalizeComparableText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function productLineItems(quote: StructuredQuote): StructuredQuote['lineItems'] {
  return quote.lineItems.filter(
    (item) => !NON_PRODUCT_LINE_ITEM_PATTERN.test(item.description),
  );
}

function normalizedProductIdentity(quote: StructuredQuote): string | null {
  const identities = productLineItems(quote)
    .map((item) => normalizeComparableText(item.description))
    .filter(Boolean)
    .sort();

  return identities.length > 0 ? identities.join('|') : null;
}

function normalizeUnit(unit: string | null): string | null {
  if (!unit) {
    return null;
  }

  const normalized = normalizeComparableText(unit);

  if (!normalized) {
    return null;
  }

  return UNIT_ALIASES[normalized] ?? normalized;
}

function normalizedKnownUnit(quote: StructuredQuote): string | null {
  const items = productLineItems(quote);

  if (items.length === 0) {
    return null;
  }

  const units = items.map((item) => normalizeUnit(item.unit));

  if (units.some((unit) => unit === null)) {
    return null;
  }

  const knownUnits = new Set(units as string[]);
  return knownUnits.size === 1 ? [...knownUnits][0] : null;
}

function normalizedCurrency(currency: string | null): string | null {
  return currency?.trim().toUpperCase() || null;
}

function normalizedFileName(fileName: string): string {
  return fileName.normalize('NFKC').trim().toLowerCase();
}

export function compareQuotesDeterministically(
  quotes: StructuredQuote[],
): QuoteComparison {
  const currencies = new Set(
    quotes
      .map((quote) => normalizedCurrency(quote.currency))
      .filter((currency): currency is string => currency !== null),
  );
  const incoterms = new Set(
    quotes
      .map((quote) => normalizedIncoterm(quote.incoterm))
      .filter((incoterm): incoterm is string => incoterm !== null),
  );
  const oneKnownCurrency =
    currencies.size === 1 &&
    quotes.every((quote) => normalizedCurrency(quote.currency) !== null);
  const oneKnownIncoterm =
    incoterms.size === 1 &&
    quotes.every((quote) => normalizedIncoterm(quote.incoterm) !== null);
  const fileNames = quotes.map((quote) => normalizedFileName(quote.fileName));
  const hasUniqueFileNames = new Set(fileNames).size === fileNames.length;
  const productIdentities = quotes.map(normalizedProductIdentity);
  const allProductIdentitiesKnown = productIdentities.every(
    (identity) => identity !== null,
  );
  const sameProductIdentity =
    allProductIdentitiesKnown && new Set(productIdentities).size === 1;
  const units = quotes.map(normalizedKnownUnit);
  const allUnitsKnown = units.every((unit) => unit !== null);
  const sameKnownUnit = allUnitsKnown && new Set(units).size === 1;
  const quantities = quotes.map((quote) => quote.totalQuantity);
  const allQuantitiesKnown = quantities.every(
    (quantity) =>
      quantity !== null && Number.isFinite(quantity) && quantity > 0,
  );
  const sameTotalQuantity =
    allQuantitiesKnown && new Set(quantities).size === 1;
  const amounts = quotes.map(comparableAmount);
  const allAmountsKnown = amounts.every((entry) => entry.amount !== null);
  const allAmountsPerUnit = amounts.every(
    (entry) =>
      entry.basis === 'reported_total_per_unit' ||
      entry.basis === 'weighted_unit_price',
  );

  let comparability: QuoteComparison['comparability'] = 'not_comparable';

  if (
    quotes.length >= 2 &&
    hasUniqueFileNames &&
    oneKnownCurrency &&
    oneKnownIncoterm &&
    sameProductIdentity &&
    sameKnownUnit &&
    sameTotalQuantity &&
    allAmountsKnown &&
    allAmountsPerUnit
  ) {
    comparability = 'high';
  } else if (
    quotes.length >= 2 &&
    oneKnownCurrency &&
    amounts.some((entry) => entry.amount !== null)
  ) {
    comparability = 'limited';
  }

  const sortable = quotes
    .map((quote, index) => ({
      quote,
      quoteIndex: index,
      amount: amounts[index].amount,
      basis: amounts[index].basis,
    }))
    .filter(
      (entry): entry is typeof entry & { amount: number } =>
        entry.amount !== null,
    )
    .sort(
      (left, right) =>
        left.amount - right.amount || left.quoteIndex - right.quoteIndex,
    );
  const rankByQuoteIndex = new Map(
    sortable.map((entry, index) => [entry.quoteIndex, index + 1]),
  );
  const ranking: QuoteRankingItem[] = quotes.map((quote, index) => ({
    rank:
      comparability === 'high'
        ? rankByQuoteIndex.get(index) ?? null
        : null,
    fileName: quote.fileName,
    supplierName: quote.supplierName,
    amount: amounts[index].amount,
    currency: quote.currency,
    basis: amounts[index].basis,
  }));
  const mathChecks = quotes.map(buildMathCheck);
  const minimum = sortable[0]?.amount ?? null;
  const maximum = sortable.at(-1)?.amount ?? null;
  const priceSpreadPercent =
    comparability === 'high' &&
    minimum !== null &&
    maximum !== null &&
    minimum > 0
      ? Math.round((((maximum - minimum) / minimum) * 100 + Number.EPSILON) * 10) /
        10
      : null;
  const recommendedQuoteFileName =
    comparability === 'high' ? sortable[0]?.quote.fileName ?? null : null;
  const vigilancePoints: string[] = [];

  if (!hasUniqueFileNames) {
    vigilancePoints.push(
      'Duplicate file names were detected. Rename each file so every quote can be tracked unambiguously.',
    );
  }

  for (const check of mathChecks) {
    if (check.status === 'mismatch') {
      vigilancePoints.push(
        `The reported total in "${check.fileName}" differs from the total recalculated from the extracted data.`,
      );
    }
  }

  for (const quote of quotes) {
    if (!quote.paymentTerms) {
      vigilancePoints.push(
        `Payment terms are missing or were not extracted from "${quote.fileName}".`,
      );
    }
    if (!quote.incoterm) {
      vigilancePoints.push(
        `The Incoterm is missing or was not extracted from "${quote.fileName}".`,
      );
    }
    if (!normalizedCurrency(quote.currency)) {
      vigilancePoints.push(
        `The currency is missing or was not extracted from "${quote.fileName}".`,
      );
    }
    if (normalizedProductIdentity(quote) === null) {
      vigilancePoints.push(
        `A reliable product identity was not extracted from "${quote.fileName}".`,
      );
    }
    if (normalizedKnownUnit(quote) === null) {
      vigilancePoints.push(
        `A consistent unit of measure was not extracted from "${quote.fileName}".`,
      );
    }
    if (
      quote.totalQuantity === null ||
      !Number.isFinite(quote.totalQuantity) ||
      quote.totalQuantity <= 0
    ) {
      vigilancePoints.push(
        `A positive total quantity was not extracted from "${quote.fileName}".`,
      );
    }
  }

  if (currencies.size > 1) {
    vigilancePoints.push(
      'The quotes use multiple currencies; no automatic currency conversion was applied.',
    );
  }

  if (incoterms.size > 1) {
    vigilancePoints.push(
      'The Incoterms differ, so the pricing bases are not directly equivalent.',
    );
  }

  if (allProductIdentitiesKnown && !sameProductIdentity) {
    vigilancePoints.push(
      'The extracted product descriptions differ, so the quotes may not cover equivalent products.',
    );
  }

  if (allUnitsKnown && !sameKnownUnit) {
    vigilancePoints.push(
      'The extracted units of measure differ, so the unit pricing is not directly equivalent.',
    );
  }

  if (allQuantitiesKnown && !sameTotalQuantity) {
    vigilancePoints.push(
      'The extracted total quantities differ, so volume pricing may not be directly equivalent.',
    );
  }

  quotes.forEach((quote, index) => {
    if (amounts[index].amount === null) {
      vigilancePoints.push(
        `A comparable amount could not be calculated for "${quote.fileName}".`,
      );
    }
  });

  const summary =
    comparability === 'high'
      ? `All ${quotes.length} quotes have unique file names and match on product identity, unit, total quantity, currency, and Incoterm.`
      : comparability === 'limited'
        ? 'Some extracted amounts are visible, but required comparison fields are missing or differ, so no reliable ranking is shown.'
        : 'The available fields or currencies do not support a mathematical comparison without additional information.';

  return {
    comparability,
    summary,
    recommendedQuoteFileName,
    priceSpreadPercent,
    ranking,
    mathChecks,
    vigilancePoints,
    recommendations: [
      'Confirm that products, quantities, units, currencies, and Incoterms are equivalent before making a decision.',
      'Have any difference between the reported and recalculated totals corrected.',
      'Verify payment terms, lead times, validity, and tooling ownership.',
    ],
  };
}
