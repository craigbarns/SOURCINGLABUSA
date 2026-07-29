import 'server-only';

import { z } from 'zod';

import { getOpenAiServerConfig } from './env';
import {
  hsCodeInputSchema,
  normalizeHsCodeAnalysisResult,
  type ValidatedHsCodeInput,
} from '@/lib/validation/hscode';
import type { HsCodeAnalysisResult } from '@/lib/types';

const OPENAI_CHAT_COMPLETIONS_URL =
  'https://api.openai.com/v1/chat/completions';
const PROVIDER_TIMEOUT_MS = 25_000;

type DemoCategory = 'drinkware' | 'textile' | 'backpack';

const DETERMINISTIC_TARIFFS: Record<DemoCategory, HsCodeAnalysisResult> = {
  drinkware: {
    mode: 'demo',
    sourceLabel: 'Limited U.S. tariff demo data',
    hsCode6Digit: '7323.93',
    hsCode10Digit: '7323.93.00.80',
    productDescription: 'Stainless steel household articles (water bottles and insulated mugs)',
    categoryName: 'Stainless Steel Household Articles & Drinkware',
    destinationMarket: 'US',
    originCountry: 'China (CN)',
    dutyRates: {
      baseDutyPercent: 3.4,
      section301Percent: 7.5,
      additionalTaxesPercent: 0.3464,
      effectiveDutyPercent: 11.2464,
    },
    dutyBreakdownNotes: [
      'Base U.S. customs duty (HTSUS 7323.93.00): 3.4%',
      'China Section 301 tariff (List 3): +7.5%',
      'U.S. Merchandise Processing Fee (MPF): 0.3464% (minimum $31.67)',
      'Calculated component total: 11.2464%',
    ],
    regulatoryWarnings: [
      'FDA 21 CFR: Verify applicable food-contact requirements',
      'California Proposition 65: Verify whether lead and cadmium testing applies',
    ],
    alternativeHsCodes: [
      { code: '3924.10.40', description: 'BPA-free plastic drinkware', dutyRate: '6.5% + 7.5% Sec 301' },
      { code: '7013.49.20', description: 'Glass water bottles and drinkware', dutyRate: '7.2% + 7.5% Sec 301' },
    ],
  },
  textile: {
    mode: 'demo',
    sourceLabel: 'Limited U.S. tariff demo data',
    hsCode6Digit: '6109.10',
    hsCode10Digit: '6109.10.00.12',
    productDescription: 'Cotton T-shirts, undershirts, and knit tops',
    categoryName: 'Cotton Textiles & Apparel',
    destinationMarket: 'US',
    originCountry: 'China (CN)',
    dutyRates: {
      baseDutyPercent: 16.5,
      section301Percent: 7.5,
      additionalTaxesPercent: 0.3464,
      effectiveDutyPercent: 24.3464,
    },
    dutyBreakdownNotes: [
      'Base U.S. customs duty (HTSUS 6109.10): 16.5%',
      'China Section 301 tariff: +7.5%',
      'MPF processing fee: 0.3464%',
      'Calculated component total: 24.3464%',
    ],
    regulatoryWarnings: [
      "CPSIA: Verify whether a Children's Product Certificate applies",
      'FTC: Verify fiber-content and country-of-origin labeling requirements',
    ],
    alternativeHsCodes: [
      { code: '6109.90.10', description: 'Synthetic-fiber T-shirts', dutyRate: '32.0% + 7.5% Sec 301' },
      { code: '6205.20.20', description: 'Woven cotton shirts', dutyRate: '19.7% + 7.5% Sec 301' },
    ],
  },
  backpack: {
    mode: 'demo',
    sourceLabel: 'Limited U.S. tariff demo data',
    hsCode6Digit: '4202.92',
    hsCode10Digit: '4202.92.31.20',
    productDescription: 'Backpacks, travel bags, and insulated bags with an outer surface of textile materials',
    categoryName: 'Luggage & Backpacks',
    destinationMarket: 'US',
    originCountry: 'China (CN)',
    dutyRates: {
      baseDutyPercent: 17.6,
      section301Percent: 25.0,
      additionalTaxesPercent: 0.3464,
      effectiveDutyPercent: 42.9464,
    },
    dutyBreakdownNotes: [
      'Base U.S. customs duty (HTSUS 4202.92.31): 17.6%',
      'China Section 301 tariff (List 3): +25.0%',
      'MPF processing fee: 0.3464%',
      'Calculated component total: 42.9464%',
    ],
    regulatoryWarnings: [
      'Review potential antidumping duties based on plastic components',
      'CPSIA phthalates testing may apply; verify based on the product and intended age group',
    ],
    alternativeHsCodes: [
      { code: '4202.91.00', description: 'Genuine-leather backpacks', dutyRate: '4.5% + 25.0% Sec 301' },
      { code: '4202.99.90', description: 'Hard-shell backpacks', dutyRate: '20.0% + 25.0% Sec 301' },
    ],
  },
};

const providerEnvelopeSchema = z
  .object({
    choices: z
      .array(
        z
          .object({
            message: z
              .object({
                content: z.string().min(1),
              })
              .passthrough(),
          })
          .passthrough(),
      )
      .min(1),
  })
  .passthrough();

const SYSTEM_PROMPT = `You produce cautious HS-code and tariff estimates for sourcing teams.
Return one JSON object with these fields: mode, sourceLabel, hsCode6Digit, hsCode10Digit, productDescription, categoryName, destinationMarket, originCountry, dutyRates, dutyBreakdownNotes, regulatoryWarnings, and alternativeHsCodes.
dutyRates must contain baseDutyPercent, section301Percent, additionalTaxesPercent, and effectiveDutyPercent as non-negative numbers.
Each alternativeHsCodes item must contain code, description, and dutyRate.
Use the destination market and country of origin supplied in the user message.
Write all user-facing text in U.S. English.
For requests outside the United States or products not originating in China, set section301Percent to 0.
Use cautious language and clearly state that classifications, rates, trade remedies, fees, and requirements need independent verification.
Return JSON only, with no markdown or surrounding commentary.`;

export class HsCodeDemoUnavailableError extends Error {
  constructor() {
    super(
      'This request is not covered by the limited demo data. Live analysis is required for this product, market, or country of origin.',
    );
    this.name = 'HsCodeDemoUnavailableError';
  }
}

export class HsCodeProviderError extends Error {
  readonly status?: number;

  constructor(
    message = 'The tariff analysis provider could not complete the request.',
    status?: number,
  ) {
    super(message);
    this.name = 'HsCodeProviderError';
    this.status = status;
  }
}

/**
 * Regroup any HS-code-like string into the dotted form the schema expects
 * (four digits, then two-digit segments), tolerating model output such as
 * "7323930080" or "7323.93.0080". Non-code text is returned untouched.
 */
function formatHsCodeDigits(value: unknown): unknown {
  if (typeof value !== 'string') {
    return value;
  }

  const digits = value.replace(/\D/g, '');

  if (digits.length < 4 || digits.length % 2 !== 0 || digits.length > 10) {
    return value.trim();
  }

  const head = digits.slice(0, 4);
  const rest = digits.slice(4).match(/.{2}/g) ?? [];
  return [head, ...rest].join('.');
}

/**
 * Reformat only the HS-code fields of the provider payload so benign
 * formatting differences do not fail strict validation. Unknown fields are
 * left in place so the strict schema still rejects unexpected output.
 */
function sanitizeProviderResult(raw: unknown): unknown {
  if (typeof raw !== 'object' || raw === null) {
    return raw;
  }

  const source = raw as Record<string, unknown>;
  const sanitized: Record<string, unknown> = { ...source };

  if ('hsCode6Digit' in source) {
    sanitized.hsCode6Digit = formatHsCodeDigits(source.hsCode6Digit);
  }

  if ('hsCode10Digit' in source) {
    sanitized.hsCode10Digit = formatHsCodeDigits(source.hsCode10Digit);
  }

  if (Array.isArray(source.alternativeHsCodes)) {
    sanitized.alternativeHsCodes = source.alternativeHsCodes.map((entry) => {
      if (typeof entry !== 'object' || entry === null) {
        return entry;
      }

      const alt = entry as Record<string, unknown>;
      return 'code' in alt
        ? { ...alt, code: formatHsCodeDigits(alt.code) }
        : alt;
    });
  }

  return sanitized;
}

function recognizeDemoCategory(query: string): DemoCategory | null {
  const normalized = query.toLocaleLowerCase('en-US');

  if (
    /(water bottle|drinkware|tumbler|thermos|stainless|gourde|inox|\b7323(?:\.93)?\b)/.test(
      normalized,
    )
  ) {
    return 'drinkware';
  }

  if (
    /(\bt-?shirt\b|cotton|textile|coton|\b6109(?:\.10)?\b)/.test(normalized)
  ) {
    return 'textile';
  }

  if (
    /(backpack|rucksack|travel bag|insulated bag|sac à dos|\b4202(?:\.92)?\b)/.test(
      normalized,
    )
  ) {
    return 'backpack';
  }

  return null;
}

function isChinaOrigin(originCountry: string): boolean {
  return originCountry === 'CN';
}

function displayOriginCountry(originCountry: string): string {
  const labels: Record<string, string> = {
    CN: 'China (CN)',
    IN: 'India (IN)',
    MX: 'Mexico (MX)',
    TR: 'Türkiye (TR)',
    VN: 'Vietnam (VN)',
  };
  const code = originCountry.trim().toUpperCase();
  return labels[code] ?? originCountry.trim();
}

function limitedDemoResult(
  input: ValidatedHsCodeInput,
): HsCodeAnalysisResult {
  const category = recognizeDemoCategory(input.query);

  if (
    input.destinationMarket !== 'US' ||
    !isChinaOrigin(input.originCountry) ||
    category === null
  ) {
    throw new HsCodeDemoUnavailableError();
  }

  return normalizeHsCodeAnalysisResult(DETERMINISTIC_TARIFFS[category]);
}

async function requestProviderAnalysis(
  input: ValidatedHsCodeInput,
  config: { apiKey: string; model: string },
): Promise<HsCodeAnalysisResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

  try {
    const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: config.model,
        temperature: 0.1,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: JSON.stringify({
              task: 'Estimate a potential HS classification and tariff components for verification.',
              query: input.query,
              destinationMarket: input.destinationMarket,
              originCountry: input.originCountry,
            }),
          },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      let providerMessage = '';

      try {
        providerMessage =
          (JSON.parse(detail) as { error?: { message?: string } })?.error
            ?.message ?? '';
      } catch {
        providerMessage = '';
      }

      console.error('HS code provider returned an error status', {
        status: response.status,
        detail: (providerMessage || detail).slice(0, 500),
      });

      throw new HsCodeProviderError(
        `The tariff analysis provider rejected the request (status ${response.status}).`,
        response.status,
      );
    }

    const envelope = providerEnvelopeSchema.parse(await response.json());
    const providerResult = sanitizeProviderResult(
      JSON.parse(envelope.choices[0].message.content) as unknown,
    );
    const normalized = normalizeHsCodeAnalysisResult(providerResult);
    const section301Percent =
      input.destinationMarket === 'US' && isChinaOrigin(input.originCountry)
        ? normalized.dutyRates.section301Percent
        : 0;

    return normalizeHsCodeAnalysisResult({
      ...normalized,
      mode: 'live',
      sourceLabel: 'AI-generated tariff estimate',
      destinationMarket: input.destinationMarket,
      originCountry: displayOriginCountry(input.originCountry),
      dutyRates: {
        ...normalized.dutyRates,
        section301Percent,
      },
    });
  } catch (error) {
    if (error instanceof HsCodeProviderError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new HsCodeProviderError('The tariff analysis provider timed out.');
    }

    console.error('HS code provider request failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw new HsCodeProviderError();
  } finally {
    clearTimeout(timeout);
  }
}

export async function analyzeHsCodeServer(
  rawInput: unknown,
): Promise<HsCodeAnalysisResult> {
  const input = hsCodeInputSchema.parse(rawInput);
  const providerConfig = getOpenAiServerConfig();

  if (!providerConfig) {
    return limitedDemoResult(input);
  }

  return requestProviderAnalysis(input, providerConfig);
}
