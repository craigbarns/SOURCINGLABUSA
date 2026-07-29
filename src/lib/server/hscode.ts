import 'server-only';

import { z } from 'zod';

import { getOpenAiServerConfig } from './env';
import {
  hsCodeInputSchema,
  normalizeHsCodeAnalysisResult,
  type ValidatedHsCodeInput,
} from '@/lib/validation/hscode';
import type { HsCodeAnalysisResult } from '@/lib/types';

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const PROVIDER_TIMEOUT_MS = 25_000;

type DemoCategory = 'drinkware' | 'textile' | 'backpack';

const DETERMINISTIC_TARIFFS: Record<DemoCategory, HsCodeAnalysisResult> = {
  drinkware: {
    mode: 'demo',
    sourceLabel: 'Limited U.S. tariff demo data',
    hsCode6Digit: '7323.93',
    hsCode10Digit: '7323.93.0080',
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
    hsCode10Digit: '6109.10.0012',
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
    hsCode10Digit: '4202.92.3120',
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

const providerDutyRate = z.number().finite().min(0).max(500);
const providerText = (maximum: number) =>
  z.string().trim().min(1).max(maximum);

const providerResultSchema = z
  .object({
    hsCode6Digit: providerText(20),
    hsCode10Digit: providerText(24),
    productDescription: providerText(500),
    categoryName: providerText(200),
    dutyRates: z
      .object({
        baseDutyPercent: providerDutyRate,
        section301Percent: providerDutyRate,
        additionalTaxesPercent: providerDutyRate,
      })
      .strict(),
    regulatoryWarnings: z.array(providerText(500)).max(20),
    alternativeHsCodes: z
      .array(
        z
          .object({
            code: providerText(24),
            description: providerText(300),
            dutyRate: providerText(100),
          })
          .strict(),
      )
      .max(10),
  })
  .strict();

type OpenAiResponse = {
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

const SYSTEM_PROMPT = `You produce cautious HS-code and tariff estimates for sourcing teams.
Return one structured result with these fields: hsCode6Digit, hsCode10Digit, productDescription, categoryName, dutyRates, regulatoryWarnings, and alternativeHsCodes.
dutyRates must contain baseDutyPercent, section301Percent, and additionalTaxesPercent as non-negative numbers.
Each alternativeHsCodes item must contain code, description, and dutyRate.
Use a six-digit HS code and a ten-digit national tariff code. Digits or standard dotted notation are accepted.
Use the destination market and country of origin supplied in the user message.
Write all user-facing text in U.S. English.
For requests outside the United States or products not originating in China, set section301Percent to 0.
Use cautious language and clearly state that classifications, rates, trade remedies, fees, and requirements need independent verification.
Do not invent a binding ruling or claim that a classification is definitive.`;

export class HsCodeDemoUnavailableError extends Error {
  constructor() {
    super(
      'This request is not covered by the limited demo data. Live analysis is required for this product, market, or country of origin.',
    );
    this.name = 'HsCodeDemoUnavailableError';
  }
}

export class HsCodeProviderError extends Error {
  constructor(
    message = 'The tariff analysis provider could not complete the request.',
    readonly kind:
      | 'invalid_response'
      | 'request_failed'
      | 'timeout'
      | 'upstream' = 'request_failed',
    readonly upstreamStatus?: number,
  ) {
    super(message);
    this.name = 'HsCodeProviderError';
  }
}

function toOpenAiJsonSchema(schema: z.ZodType): Record<string, unknown> {
  const jsonSchema = z.toJSONSchema(schema, {
    target: 'draft-7',
    unrepresentable: 'any',
  }) as Record<string, unknown>;

  delete jsonSchema.$schema;
  return jsonSchema;
}

function extractOutputText(response: OpenAiResponse): string {
  for (const item of response.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === 'output_text' && typeof content.text === 'string') {
        return content.text;
      }
    }
  }

  throw new HsCodeProviderError(
    'The tariff analysis provider returned no usable output.',
    'invalid_response',
  );
}

function tariffCodeDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function canonicalizeHsCode6(value: string): string {
  const digits = tariffCodeDigits(value);

  if (digits.length !== 6) {
    throw new HsCodeProviderError(
      'The tariff analysis provider returned an invalid six-digit HS code.',
      'invalid_response',
    );
  }

  return `${digits.slice(0, 4)}.${digits.slice(4)}`;
}

function canonicalizeTariffCode10(value: string): string {
  const digits = tariffCodeDigits(value);

  if (digits.length !== 10) {
    throw new HsCodeProviderError(
      'The tariff analysis provider returned an invalid ten-digit tariff code.',
      'invalid_response',
    );
  }

  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
}

function canonicalizeAlternativeCode(value: string): string | null {
  const digits = tariffCodeDigits(value);

  if (digits.length === 4) {
    return digits;
  }

  if (digits.length === 6) {
    return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  }

  if (digits.length === 8) {
    return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
  }

  if (digits.length === 10) {
    return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
  }

  return null;
}

function formatRate(value: number): string {
  return String(value);
}

function buildDutyBreakdownNotes(
  input: ValidatedHsCodeInput,
  rates: {
    baseDutyPercent: number;
    section301Percent: number;
    additionalTaxesPercent: number;
  },
): string[] {
  const effectiveDutyPercent =
    rates.baseDutyPercent +
    rates.section301Percent +
    rates.additionalTaxesPercent;
  const section301Label =
    input.destinationMarket === 'US' && isChinaOrigin(input.originCountry)
      ? 'Estimated Section 301 component'
      : 'Section 301 component for the selected market and origin';
  const additionalLabel =
    input.destinationMarket === 'US'
      ? 'Estimated additional customs fees'
      : 'Estimated additional fees and taxes';

  return [
    `Estimated base duty: ${formatRate(rates.baseDutyPercent)}%.`,
    `${section301Label}: ${formatRate(rates.section301Percent)}%.`,
    `${additionalLabel}: ${formatRate(rates.additionalTaxesPercent)}%.`,
    `Calculated component total: ${formatRate(effectiveDutyPercent)}%.`,
  ];
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
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: config.model,
        instructions: SYSTEM_PROMPT,
        input: JSON.stringify({
          task: 'Estimate a potential HS classification and tariff components for verification.',
          query: input.query,
          destinationMarket: input.destinationMarket,
          originCountry: input.originCountry,
        }),
        text: {
          format: {
            type: 'json_schema',
            name: 'hs_code_tariff_estimate',
            strict: true,
            schema: toOpenAiJsonSchema(providerResultSchema),
          },
        },
      }),
    });

    if (!response.ok) {
      throw new HsCodeProviderError(
        `The tariff analysis provider rejected the request (status ${response.status}).`,
        'upstream',
        response.status,
      );
    }

    const payload = (await response.json()) as OpenAiResponse;
    const parsedJson = JSON.parse(extractOutputText(payload)) as unknown;
    const providerValidation = providerResultSchema.safeParse(parsedJson);

    if (!providerValidation.success) {
      throw new HsCodeProviderError(
        'The tariff analysis provider response did not match the expected schema.',
        'invalid_response',
      );
    }

    const providerResult = providerValidation.data;
    const hsCode6Digit = canonicalizeHsCode6(providerResult.hsCode6Digit);
    const hsCode10Digit = canonicalizeTariffCode10(
      providerResult.hsCode10Digit,
    );

    if (!hsCode10Digit.startsWith(`${hsCode6Digit}.`)) {
      throw new HsCodeProviderError(
        'The tariff analysis provider returned inconsistent tariff codes.',
        'invalid_response',
      );
    }

    const section301Percent =
      input.destinationMarket === 'US' && isChinaOrigin(input.originCountry)
        ? providerResult.dutyRates.section301Percent
        : 0;
    const dutyRates = {
      baseDutyPercent: providerResult.dutyRates.baseDutyPercent,
      section301Percent,
      additionalTaxesPercent:
        providerResult.dutyRates.additionalTaxesPercent,
    };
    const alternativeHsCodes = providerResult.alternativeHsCodes.flatMap(
      (alternative) => {
        const code = canonicalizeAlternativeCode(alternative.code);
        return code ? [{ ...alternative, code }] : [];
      },
    );

    return normalizeHsCodeAnalysisResult({
      mode: 'live',
      sourceLabel: 'AI-generated tariff estimate',
      hsCode6Digit,
      hsCode10Digit,
      productDescription: providerResult.productDescription,
      categoryName: providerResult.categoryName,
      destinationMarket: input.destinationMarket,
      originCountry: displayOriginCountry(input.originCountry),
      dutyRates: {
        ...dutyRates,
        effectiveDutyPercent: 0,
      },
      dutyBreakdownNotes: buildDutyBreakdownNotes(input, dutyRates),
      regulatoryWarnings: providerResult.regulatoryWarnings,
      alternativeHsCodes,
    });
  } catch (error) {
    if (error instanceof HsCodeProviderError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new HsCodeProviderError(
        'The tariff analysis provider timed out.',
        'timeout',
      );
    }

    throw new HsCodeProviderError(
      'The tariff analysis provider request failed.',
      'request_failed',
    );
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
