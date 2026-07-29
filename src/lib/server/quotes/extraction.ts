import type { QuoteLineItem, StructuredQuote } from '@/lib/types';
import type { OcrDocument } from '@/lib/server/quotes/ocr';

function normalizeCell(value: string): string {
  return value.replace(/\*\*/g, '').replace(/<br\s*\/?>/gi, ' ').trim();
}

export function parseLocalizedNumber(value: string): number | null {
  const sanitized = value
    .replace(/[^\d,.\-]/g, '')
    .replace(/(?!^)-/g, '')
    .trim();

  if (!sanitized || sanitized === '-') {
    return null;
  }

  const lastComma = sanitized.lastIndexOf(',');
  const lastDot = sanitized.lastIndexOf('.');
  let normalized = sanitized;

  if (lastComma >= 0 && lastDot >= 0) {
    const decimalSeparator = lastComma > lastDot ? ',' : '.';
    const thousandsSeparator = decimalSeparator === ',' ? '.' : ',';
    normalized = normalized.split(thousandsSeparator).join('');
    normalized = normalized.replace(decimalSeparator, '.');
  } else if (lastComma >= 0) {
    const decimals = sanitized.length - lastComma - 1;
    normalized =
      decimals === 1 || decimals === 2
        ? sanitized.replace(',', '.')
        : sanitized.replace(/,/g, '');
  } else if (lastDot >= 0) {
    const decimals = sanitized.length - lastDot - 1;
    normalized =
      decimals === 1 || decimals === 2 ? sanitized : sanitized.replace(/\./g, '');
  }

  const number = Number(normalized);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function extractMatch(markdown: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = markdown.match(pattern);
    const value = match?.[1]?.trim();

    if (value) {
      return normalizeCell(value).slice(0, 500);
    }
  }

  return null;
}

function extractAmount(markdown: string, labels: string[]): number | null {
  const escapedLabels = labels.map((label) => label.replace(/\s+/g, '\\s*')).join('|');
  const pattern = new RegExp(
    `(?:${escapedLabels})\\s*[:|]?\\s*(?:USD|EUR|GBP|CNY|RMB|\\$|€|£)?\\s*([\\d][\\d\\s,.]*)`,
    'i',
  );
  const match = markdown.match(pattern);
  return match?.[1] ? parseLocalizedNumber(match[1]) : null;
}

function findHeaderIndex(headers: string[], candidates: string[]): number {
  return headers.findIndex((header) =>
    candidates.some((candidate) => header.includes(candidate)),
  );
}

function parseMarkdownLineItems(markdown: string): QuoteLineItem[] {
  const lines = markdown.split(/\r?\n/);
  const items: QuoteLineItem[] = [];

  for (let index = 0; index < lines.length - 2; index += 1) {
    const headerLine = lines[index];
    const separatorLine = lines[index + 1];

    if (!headerLine.includes('|') || !/^\s*\|?[\s:|-]+\|/.test(separatorLine)) {
      continue;
    }

    const headers = headerLine
      .split('|')
      .map((cell) => normalizeCell(cell).toLowerCase())
      .filter(Boolean);
    const descriptionIndex = findHeaderIndex(headers, [
      'description',
      'product',
      'item',
      'article',
      'produit',
    ]);
    const quantityIndex = findHeaderIndex(headers, ['quantity', 'qty', 'quantité', 'qte']);
    const unitPriceIndex = findHeaderIndex(headers, [
      'unit price',
      'prix unitaire',
      'unit cost',
      'price/pc',
    ]);
    const totalIndex = findHeaderIndex(headers, [
      'amount',
      'line total',
      'total price',
      'montant',
    ]);
    const skuIndex = findHeaderIndex(headers, ['sku', 'reference', 'référence', 'model']);
    const unitIndex = findHeaderIndex(headers, ['unit', 'unité', 'uom']);

    if (descriptionIndex < 0 || (quantityIndex < 0 && totalIndex < 0)) {
      continue;
    }

    for (let rowIndex = index + 2; rowIndex < lines.length; rowIndex += 1) {
      const rowLine = lines[rowIndex];

      if (!rowLine.includes('|') || !rowLine.trim()) {
        index = rowIndex;
        break;
      }

      const cells = rowLine
        .split('|')
        .map(normalizeCell)
        .filter((cell, cellIndex, all) => {
          if (cell) return true;
          return cellIndex > 0 && cellIndex < all.length - 1;
        });
      const description = cells[descriptionIndex]?.trim();

      if (!description || /^total$/i.test(description)) {
        continue;
      }

      const quantity =
        quantityIndex >= 0 ? parseLocalizedNumber(cells[quantityIndex] ?? '') : null;
      const unitPrice =
        unitPriceIndex >= 0 ? parseLocalizedNumber(cells[unitPriceIndex] ?? '') : null;
      const total =
        totalIndex >= 0 ? parseLocalizedNumber(cells[totalIndex] ?? '') : null;

      if (quantity === null && unitPrice === null && total === null) {
        continue;
      }

      items.push({
        description: description.slice(0, 500),
        sku: skuIndex >= 0 ? cells[skuIndex]?.slice(0, 200) || null : null,
        quantity,
        unit: unitIndex >= 0 ? cells[unitIndex]?.slice(0, 50) || null : null,
        unitPrice,
        total,
      });

      if (items.length >= 250) {
        return items;
      }
    }
  }

  return items;
}

function detectCurrency(markdown: string): string | null {
  const explicit = markdown.match(/\b(USD|EUR|GBP|CNY|RMB|CAD|AUD|JPY)\b/i)?.[1];

  if (explicit) {
    return explicit.toUpperCase() === 'RMB' ? 'CNY' : explicit.toUpperCase();
  }

  if (markdown.includes('€')) return 'EUR';
  if (markdown.includes('£')) return 'GBP';
  if (markdown.includes('$')) return 'USD';
  return null;
}

function sumKnownQuantities(items: QuoteLineItem[]): number | null {
  const productItems = items.filter(
    (item) =>
      !/(tooling|mou?ld|freight|shipping|tax|vat|discount|outillage|moule|fret|transport)/i.test(
        item.description,
      ),
  );
  const sourceItems = productItems.length > 0 ? productItems : items;
  const quantities = sourceItems.flatMap((item) =>
    typeof item.quantity === 'number' ? [item.quantity] : [],
  );
  return quantities.length > 0
    ? quantities.reduce((sum, quantity) => sum + quantity, 0)
    : null;
}

export function extractQuoteDeterministically(document: OcrDocument): StructuredQuote {
  const { markdown } = document;
  const lineItems = parseMarkdownLineItems(markdown);
  const supplierName = extractMatch(markdown, [
    /(?:supplier|vendor|manufacturer|fournisseur)(?:\s+name)?\s*[:|]\s*([^\n|]+)/i,
    /^#{1,3}\s+([^\n]{3,120}(?:ltd|limited|inc|corp|company|co\.))/im,
  ]);
  const total = extractAmount(markdown, [
    'grand total',
    'quotation total',
    'total amount',
    'montant total',
    'total',
  ]);
  const subtotal = extractAmount(markdown, ['subtotal', 'sous-total']);
  const freight = extractAmount(markdown, ['freight', 'shipping', 'fret']);
  const tooling = extractAmount(markdown, ['tooling', 'mould', 'mold', 'outillage', 'moule']);
  const tax = extractAmount(markdown, ['tax', 'vat', 'tva']);
  const discount = extractAmount(markdown, ['discount', 'remise']);
  const currency = detectCurrency(markdown);
  const warnings: string[] = [];

  if (!supplierName) warnings.push("Nom du fournisseur non identifié dans le texte OCR.");
  if (!currency) warnings.push('Devise non identifiée.');
  if (total === null) warnings.push('Total du devis non identifié.');
  if (lineItems.length === 0) warnings.push('Aucune ligne article structurée détectée.');
  if (document.averageConfidence !== null && document.averageConfidence < 0.75) {
    warnings.push('Confiance OCR faible : vérifier le document source.');
  }

  const evidence = [
    supplierName ? { field: 'supplierName', excerpt: supplierName } : null,
    total !== null
      ? { field: 'total', excerpt: `${currency ?? 'devise inconnue'} ${total}` }
      : null,
  ].filter((entry): entry is { field: string; excerpt: string } => entry !== null);

  const identifiedCoreFields = [supplierName, currency, total].filter(
    (value) => value !== null,
  ).length;

  return {
    fileName: document.fileName,
    supplierName,
    quoteNumber: extractMatch(markdown, [
      /(?:quote|quotation|devis)(?:\s+(?:no|number|n°))?\s*[:#|]\s*([^\n|]+)/i,
    ]),
    quoteDate: extractMatch(markdown, [
      /(?:quote date|quotation date|date du devis|date)\s*[:|]\s*([^\n|]+)/i,
    ]),
    currency,
    incoterm: extractMatch(markdown, [
      /\b(EXW|FCA|FOB|CFR|CIF|CPT|CIP|DAP|DPU|DDP)(?:\s+([A-Za-z -]+))?\b/i,
    ]),
    paymentTerms: extractMatch(markdown, [
      /(?:payment terms?|conditions? de paiement)\s*[:|]\s*([^\n|]+)/i,
    ]),
    leadTime: extractMatch(markdown, [
      /(?:lead time|production time|délai(?: de production)?)\s*[:|]\s*([^\n|]+)/i,
    ]),
    validity: extractMatch(markdown, [
      /(?:validity|valid until|validité)\s*[:|]\s*([^\n|]+)/i,
    ]),
    moq: extractAmount(markdown, ['MOQ', 'minimum order quantity']),
    totalQuantity: sumKnownQuantities(lineItems),
    totals: {
      subtotal,
      freight,
      tooling,
      tax,
      discount,
      total,
    },
    lineItems,
    evidence,
    extractionConfidence: Math.min(
      0.85,
      0.2 + identifiedCoreFields * 0.15 + Math.min(lineItems.length, 3) * 0.08,
    ),
    warnings,
  };
}
