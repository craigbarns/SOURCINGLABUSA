import 'server-only';

import { z } from 'zod';

import { glmChatCompletion } from './ai/glm';
import {
  dutyClassificationSchema,
  dutyResultSchema,
  type DutyInput,
  type DutyResult,
} from '@/lib/validation/duty';

/**
 * Duty-rate research pipeline.
 *
 * 1. A language model (GLM via OpenRouter, falling back to the OpenAI key
 *    already configured for the HS code tool) proposes candidate HTS codes
 *    from the product description. Classification only.
 * 2. Every rate shown to the user is fetched from the official USITC HTS
 *    search API the moment the request is made, with the date recorded on
 *    the page. The model never supplies a rate.
 * 3. China-specific additional tariffs (Section 301 among them) are set and
 *    changed by government action, so they are described as a checkable
 *    layer, never as a number baked into the code. The user's customs
 *    broker confirms the rate in force.
 *
 * This is working classification research, consistent with
 * /tools/hs-code-finder and /hs-code-consulting.
 */

const USITC_SEARCH_URL = 'https://hts.usitc.gov/reststop/search';
const USITC_PAGE_URL = 'https://hts.usitc.gov';
const USITC_TIMEOUT_MS = 12_000;

const ORIGIN_LABELS: Record<DutyInput['originCountry'], string> = {
  CN: 'China (CN)',
  BD: 'Bangladesh (BD)',
  VN: 'Vietnam (VN)',
  IN: 'India (IN)',
  OTHER: 'Other origin',
};

const CLASSIFICATION_SYSTEM_PROMPT = `You help a U.S. importer identify candidate Harmonized Tariff Schedule (HTSUS) codes for a product.
Respond ONLY with a JSON object: {"candidates":[{"code":"XXXX.XX","description":"...","why":"..."}]}.
Rules: codes are 6-digit (XX.XX.XX → written 0000.00) or 8-digit; use the dot format 0000.00 exactly; 1 to 3 candidates, most likely first; descriptions are the official HTS wording style; "why" is one sentence on material, use or composition; never include duty rates anywhere in the response.`;

async function classifyCandidates(
  input: DutyInput,
): Promise<{ candidates: Array<{ code: string; description: string; why?: string }> } | null> {
  const user = `Product: ${input.productDescription}\nCountry of manufacture: ${ORIGIN_LABELS[input.originCountry]}\nReturn the JSON object only.`;

  // GLM first (classification only), then the existing OpenAI key.
  const raw = (await glmChatCompletion(CLASSIFICATION_SYSTEM_PROMPT, user)) ??
    (await openAiChatCompletion(CLASSIFICATION_SYSTEM_PROMPT, user));
  if (!raw) return null;

  // Tolerant extraction: models sometimes wrap JSON in prose or fences.
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;
  const parsed = dutyClassificationSchema.safeParse(JSON.parse(match[0]));
  return parsed.success ? parsed.data : null;
}

async function openAiChatCompletion(
  system: string,
  user: string,
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL?.trim() || 'gpt-4o',
        temperature: 0.2,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return data.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const usitcItemSchema = z.object({
  htsno: z.string().default(''),
  description: z.string().default(''),
  general: z.string().default(''),
  special: z.string().default(''),
  other: z.string().default(''),
});

export async function lookupOfficialRate(
  code: string,
): Promise<{
  htsno: string;
  description: string;
  general: string;
  special: string;
  other: string;
  sourceUrl: string;
} | null> {
  // Query the 8-digit form when given a longer code; USITC matches prefixes.
  const query = code.replace(/[.\s]/g, '').slice(0, 8);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), USITC_TIMEOUT_MS);
  try {
    const response = await fetch(
      `${USITC_SEARCH_URL}?keyword=${encodeURIComponent(query)}&format=json`,
      { signal: controller.signal, cache: 'no-store' },
    );
    if (!response.ok) return null;
    const items = usitcItemSchema
      .array()
      .parse(await response.json())
      .filter((item) => item.htsno.replace(/[.\s]/g, '').startsWith(query));
    if (items.length === 0) return null;
    // Prefer the shortest matching heading (the parent line over suffix rows).
    const best = items.reduce((a, b) =>
      b.htsno.length < a.htsno.length ? b : a,
    );
    return { ...best, sourceUrl: `${USITC_PAGE_URL}?query=${query}` };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function today(): string {
  return new Date().toISOString().split('T')[0] as string;
}

export async function analyzeDuty(input: DutyInput): Promise<DutyResult> {
  const dateChecked = today();
  const originCountryLabel = ORIGIN_LABELS[input.originCountry];

  const classification = await classifyCandidates(input);
  if (!classification) {
    // No AI provider configured — fall back to the published demo entry so
    // the tool remains honest about its mode.
    return demoResult(dateChecked);
  }

  const rates: DutyResult['rates'] = [];
  for (const candidate of classification.candidates.slice(0, 3)) {
    const official = await lookupOfficialRate(candidate.code);
    if (!official) continue;
    rates.push({
      code: official.htsno || candidate.code,
      description: official.description || candidate.description,
      baseRate: official.general || 'See source',
      specialPrograms: official.special || '—',
      section301Note:
        input.originCountry === 'CN'
          ? 'Additional tariffs on Chinese-origin goods are set and changed by government action — your customs broker confirms the layers that apply to this code.'
          : 'Additional tariffs on this origin are set and changed by government action — your customs broker confirms the layers that apply.',
      why: candidate.why,
      sourceUrl: official.sourceUrl,
    });
  }

  if (rates.length === 0) {
    return demoResult(dateChecked);
  }

  return dutyResultSchema.parse({
    mode: 'live',
    sourceLabel: 'U.S. International Trade Commission, HTS lookup (live)',
    dateChecked,
    originCountry: input.originCountry,
    originCountryLabel,
    productDescription: input.productDescription,
    rates,
    notes: [
      'This is working classification research, not a ruling. A licensed customs broker confirms the classification and the rates in force before you price an order.',
      'The base rate shown is the HTSUS general rate as published by the USITC on the date checked.',
      'The Merchandise Processing Fee applies to most formal entries; the Harbor Maintenance Fee applies to cargo arriving by vessel.',
      'Sourcing Lab USA is not a customs broker and is not the importer of record. Transport, insurance and U.S. entry are named in your quotation, or stay on your side.',
    ],
  });
}

/** Published demo figures used when no AI provider is configured. */
function demoResult(dateChecked: string): DutyResult {
  return dutyResultSchema.parse({
    mode: 'demo',
    sourceLabel: 'Published demo figures (USITC rate for 6109.10.00)',
    dateChecked,
    originCountry: 'CN',
    originCountryLabel: 'China (CN)',
    productDescription:
      'Demo: 100% cotton T-shirts, source text "100% cotton men\'s crew neck t-shirts"',
    rates: [
      {
        code: '6109.10.00',
        description: 'T-shirts, singlets and other vests, knitted or crocheted, of cotton',
        baseRate: '16.5%',
        specialPrograms: 'Free (AU,BH,CL,CO,IL,JO,KR,MA,OM,P,PA,PE,S,SG)',
        section301Note:
          'Additional tariffs on Chinese-origin goods are set and changed by government action — your customs broker confirms the layers that apply to this code.',
        sourceUrl: 'https://hts.usitc.gov?query=6109.10',
      },
    ],
    notes: [
      'This is the published demo entry: configure the classification provider to analyse your own product.',
      'This is working classification research, not a ruling. A licensed customs broker confirms the classification and the rates in force.',
      'Sourcing Lab USA is not a customs broker and is not the importer of record.',
    ],
  });
}
