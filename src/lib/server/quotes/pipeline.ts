import 'server-only';

import type {
  QuoteAnalysisResponse,
  QuoteComparison,
} from '@/lib/types';
import { createAiProvider, AiProviderError } from '@/lib/server/ai/provider';
import { compareQuotesDeterministically } from '@/lib/server/quotes/comparison';
import { createDemoQuoteAnalysis } from '@/lib/server/quotes/demo';
import { extractQuoteDeterministically } from '@/lib/server/quotes/extraction';
import {
  isMistralOcrConfigured,
  runMistralOcr,
  type ValidatedQuoteFile,
} from '@/lib/server/quotes/ocr';

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function mergeAiNarrative(
  comparison: QuoteComparison,
  narrative: {
    summary: string;
    vigilancePoints: string[];
    recommendations: string[];
  },
): QuoteComparison {
  return {
    ...comparison,
    summary: narrative.summary,
    vigilancePoints: unique([
      ...comparison.vigilancePoints,
      ...narrative.vigilancePoints,
    ]),
    recommendations: unique([
      ...comparison.recommendations,
      ...narrative.recommendations,
    ]),
  };
}

export async function analyzeQuoteFiles(
  files: ValidatedQuoteFile[],
): Promise<QuoteAnalysisResponse> {
  if (!isMistralOcrConfigured()) {
    return createDemoQuoteAnalysis();
  }

  const ocrDocuments = await runMistralOcr(files);
  const aiProvider = createAiProvider();
  let extractionUsedFallback = aiProvider === null;

  const quotes = await Promise.all(
    ocrDocuments.map(async (document) => {
      if (!aiProvider) {
        return extractQuoteDeterministically(document);
      }

      try {
        const extracted = await aiProvider.extractQuote(
          document.fileName,
          document.markdown,
        );

        return {
          ...extracted,
          extractionConfidence:
            document.averageConfidence === null
              ? extracted.extractionConfidence
              : Math.min(
                  extracted.extractionConfidence,
                  document.averageConfidence,
                ),
        };
      } catch (error) {
        extractionUsedFallback = true;
        console.error('Structured quote extraction failed', {
          fileName: document.fileName,
          error:
            error instanceof AiProviderError
              ? error.message
              : 'Unexpected extraction error',
        });

        const deterministic = extractQuoteDeterministically(document);
        return {
          ...deterministic,
          warnings: [
            ...deterministic.warnings,
            'AI extraction failed; deterministic extraction was applied to the actual OCR text.',
          ],
        };
      }
    }),
  );

  const deterministicComparison = compareQuotesDeterministically(quotes);
  let comparison = deterministicComparison;
  let analysisUsedFallback = aiProvider === null;

  if (aiProvider) {
    try {
      const narrative = await aiProvider.analyzeQuoteComparison(
        quotes,
        deterministicComparison,
      );
      comparison = mergeAiNarrative(deterministicComparison, narrative);
    } catch (error) {
      analysisUsedFallback = true;
      console.error('Quote comparison narrative failed', {
        error:
          error instanceof AiProviderError
            ? error.message
            : 'Unexpected analysis error',
      });
    }
  }

  const isPartial = extractionUsedFallback || analysisUsedFallback;

  return {
    mode: isPartial ? 'partial' : 'live',
    providers: {
      ocr: 'mistral',
      extraction: extractionUsedFallback ? 'deterministic' : 'openai',
      analysis: analysisUsedFallback ? 'deterministic' : 'openai',
    },
    quotes,
    comparison,
    warning: isPartial
      ? 'Mistral completed OCR on the uploaded files. Some structuring or analysis uses deterministic checks because OpenAI is unavailable or not configured.'
      : null,
  };
}
