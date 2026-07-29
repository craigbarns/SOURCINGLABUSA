import 'server-only';

import { z } from 'zod';

import type {
  ProductSpecResult,
  QuoteComparison,
  StructuredQuote,
} from '@/lib/types';
import { getOpenAiServerConfig, type OpenAiServerConfig } from '@/lib/server/env';
import {
  aiQuoteNarrativeSchema,
  structuredQuoteSchema,
} from '@/lib/validation/quote';
import { productSpecResultSchema } from '@/lib/validation/product-spec';

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const REQUEST_TIMEOUT_MS = 45_000;
const MAX_OCR_TEXT_CHARS = 120_000;

type AiQuoteNarrative = z.output<typeof aiQuoteNarrativeSchema>;

export interface AiProvider {
  readonly name: 'openai';
  extractQuote(fileName: string, ocrMarkdown: string): Promise<StructuredQuote>;
  analyzeQuoteComparison(
    quotes: StructuredQuote[],
    deterministicComparison: QuoteComparison,
  ): Promise<AiQuoteNarrative>;
  generateProductSpecs(
    prompt: string,
    category: ProductSpecResult['category'],
  ): Promise<ProductSpecResult>;
}

export class AiProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AiProviderError';
  }
}

type OpenAiResponse = {
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

function extractOutputText(response: OpenAiResponse): string {
  for (const item of response.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === 'output_text' && typeof content.text === 'string') {
        return content.text;
      }
    }
  }

  throw new AiProviderError("Le fournisseur IA n'a pas renvoyé de sortie exploitable.");
}

function toOpenAiJsonSchema(schema: z.ZodType): Record<string, unknown> {
  const jsonSchema = z.toJSONSchema(schema, {
    target: 'draft-7',
    unrepresentable: 'any',
  }) as Record<string, unknown>;

  delete jsonSchema.$schema;
  return jsonSchema;
}

class OpenAiProvider implements AiProvider {
  readonly name = 'openai' as const;

  constructor(private readonly config: OpenAiServerConfig) {}

  private async structuredResponse<T>(
    name: string,
    schema: z.ZodType<T>,
    instructions: string,
    input: string,
  ): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(OPENAI_RESPONSES_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: this.config.model,
          instructions,
          input,
          text: {
            format: {
              type: 'json_schema',
              name,
              strict: true,
              schema: toOpenAiJsonSchema(schema),
            },
          },
        }),
      });

      if (!response.ok) {
        throw new AiProviderError(
          `Le fournisseur IA a refusé la requête (statut ${response.status}).`,
        );
      }

      const payload = (await response.json()) as OpenAiResponse;
      const parsedJson = JSON.parse(extractOutputText(payload)) as unknown;
      const validation = schema.safeParse(parsedJson);

      if (!validation.success) {
        throw new AiProviderError(
          "La réponse du fournisseur IA ne respecte pas le schéma attendu.",
        );
      }

      return validation.data;
    } catch (error) {
      if (error instanceof AiProviderError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new AiProviderError("Le fournisseur IA n'a pas répondu à temps.");
      }

      throw new AiProviderError("L'appel au fournisseur IA a échoué.");
    } finally {
      clearTimeout(timeout);
    }
  }

  async extractQuote(fileName: string, ocrMarkdown: string): Promise<StructuredQuote> {
    const truncatedText = ocrMarkdown.slice(0, MAX_OCR_TEXT_CHARS);
    const truncationNotice =
      ocrMarkdown.length > MAX_OCR_TEXT_CHARS
        ? '\n\n[Le texte OCR a été tronqué par le serveur.]'
        : '';

    const quote = await this.structuredResponse(
      'structured_supplier_quote',
      structuredQuoteSchema,
      [
        'Extract data from one supplier quotation.',
        'Use only facts explicitly present in the OCR text.',
        'Return null for unknown values and never infer a supplier, currency, amount,',
        'incoterm, certification, payment term, lead time, or line item.',
        'Amounts must be plain non-negative numbers without currency symbols.',
        'Evidence excerpts must be short verbatim fragments from the OCR text.',
        'Warnings must describe missing or ambiguous fields, not invented risks.',
      ].join(' '),
      `File name: ${fileName}\n\nOCR markdown:\n${truncatedText}${truncationNotice}`,
    );

    return {
      ...quote,
      fileName,
      warnings:
        ocrMarkdown.length > MAX_OCR_TEXT_CHARS
          ? [...quote.warnings, 'Texte OCR tronqué avant extraction structurée.']
          : quote.warnings,
    };
  }

  analyzeQuoteComparison(
    quotes: StructuredQuote[],
    deterministicComparison: QuoteComparison,
  ): Promise<AiQuoteNarrative> {
    return this.structuredResponse(
      'quote_comparison_narrative',
      aiQuoteNarrativeSchema,
      [
        'Analyze supplier quotations using only the provided structured data and',
        'deterministic math checks. Do not change amounts, ranks, comparability, or',
        'calculated differences. Do not claim market benchmarks or mandatory legal',
        'certifications. When information is missing, say that it must be verified.',
        'Return only a narrative summary, vigilance points and next actions.',
      ].join(' '),
      JSON.stringify({ quotes, deterministicComparison }),
    );
  }

  async generateProductSpecs(
    prompt: string,
    category: ProductSpecResult['category'],
  ): Promise<ProductSpecResult> {
    const result = await this.structuredResponse(
      'product_specification',
      productSpecResultSchema,
      [
        'Create a sourcing specification from the user request.',
        'Keep dimensions, materials, features and quality tests coherent with the category.',
        'Never describe a certification or regulation as mandatory without an explicit',
        'statement that applicability must be verified for the exact product, use case,',
        'age group, destination and current regulation. Put possible requirements in',
        'certifications.toVerify and include a prominent verificationNotice.',
        'Pricing values are preliminary ranges to validate with current supplier quotes.',
        'Return mode live and sourceLabel "Analyse IA serveur".',
      ].join(' '),
      JSON.stringify({ prompt, category }),
    );

    return {
      ...result,
      mode: 'live',
      sourceLabel: 'Analyse IA serveur',
      category,
    };
  }
}

export function createAiProvider(): AiProvider | null {
  const config = getOpenAiServerConfig();
  return config ? new OpenAiProvider(config) : null;
}
