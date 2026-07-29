import type {
  QuoteComparison,
  QuoteMathCheck,
  QuoteRankingItem,
  StructuredQuote,
} from '@/lib/types';

const ABSOLUTE_MONEY_TOLERANCE = 0.02;
const RELATIVE_MONEY_TOLERANCE = 0.001;

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

export function compareQuotesDeterministically(
  quotes: StructuredQuote[],
): QuoteComparison {
  const currencies = new Set(
    quotes.map((quote) => quote.currency).filter(Boolean),
  );
  const incoterms = new Set(
    quotes.map((quote) => normalizedIncoterm(quote.incoterm)).filter(Boolean),
  );
  const oneKnownCurrency =
    currencies.size === 1 && quotes.every((quote) => quote.currency);
  const oneKnownIncoterm =
    incoterms.size === 1 &&
    quotes.every((quote) => normalizedIncoterm(quote.incoterm));
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
    oneKnownCurrency &&
    oneKnownIncoterm &&
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
      amount: amounts[index].amount,
      basis: amounts[index].basis,
    }))
    .filter(
      (entry): entry is typeof entry & { amount: number } =>
        entry.amount !== null,
    )
    .sort((left, right) => left.amount - right.amount);
  const rankByFile = new Map(
    sortable.map((entry, index) => [entry.quote.fileName, index + 1]),
  );
  const ranking: QuoteRankingItem[] = quotes.map((quote, index) => ({
    rank:
      comparability === 'high'
        ? rankByFile.get(quote.fileName) ?? null
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

  for (const check of mathChecks) {
    if (check.status === 'mismatch') {
      vigilancePoints.push(
        `Le total déclaré dans « ${check.fileName} » diffère du total recalculé à partir des données extraites.`,
      );
    }
  }

  for (const quote of quotes) {
    if (!quote.paymentTerms) {
      vigilancePoints.push(
        `Conditions de paiement absentes ou non extraites dans « ${quote.fileName} ».`,
      );
    }
    if (!quote.incoterm) {
      vigilancePoints.push(
        `Incoterm absent ou non extrait dans « ${quote.fileName} ».`,
      );
    }
  }

  if (currencies.size > 1) {
    vigilancePoints.push(
      'Les devis utilisent plusieurs devises : aucune conversion automatique n’a été appliquée.',
    );
  }

  if (incoterms.size > 1) {
    vigilancePoints.push(
      'Les Incoterms diffèrent : les bases de prix ne sont pas directement équivalentes.',
    );
  }

  const summary =
    comparability === 'high'
      ? `Les ${quotes.length} devis partagent une devise et un Incoterm, avec un montant ramené à la quantité extraite.`
      : comparability === 'limited'
        ? 'Les montants extraits sont visibles, mais les quantités, Incoterms ou bases de prix ne permettent pas un classement fiable.'
        : 'Les données ou devises ne permettent pas de comparer mathématiquement ces devis sans informations supplémentaires.';

  return {
    comparability,
    summary,
    recommendedQuoteFileName,
    priceSpreadPercent,
    ranking,
    mathChecks,
    vigilancePoints,
    recommendations: [
      'Confirmer que les produits, quantités, unités, devises et Incoterms sont équivalents avant décision.',
      'Faire corriger tout écart entre total déclaré et total recalculé.',
      'Vérifier les conditions de paiement, délais, validité et propriété des outillages.',
    ],
  };
}
