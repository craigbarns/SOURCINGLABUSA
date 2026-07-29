import 'server-only';

import { z } from 'zod';

import { getMistralServerConfig, type MistralServerConfig } from '@/lib/server/env';
import {
  ACCEPTED_QUOTE_MIME_TYPES,
  MAX_QUOTE_FILE_BYTES,
  MAX_QUOTE_FILES,
  MAX_QUOTE_UPLOAD_BYTES,
} from '@/lib/validation/quote';

const MISTRAL_OCR_URL = 'https://api.mistral.ai/v1/ocr';
const OCR_TIMEOUT_MS = 60_000;

const ocrResponseSchema = z
  .object({
    pages: z
      .array(
        z
          .object({
            index: z.number().int().nonnegative(),
            markdown: z.string(),
            tables: z.array(z.unknown()).optional(),
            confidence_scores: z
              .object({
                average_page_confidence_score: z.number().min(0).max(1).optional(),
              })
              .passthrough()
              .nullable()
              .optional(),
          })
          .passthrough(),
      )
      .min(1),
    model: z.string().optional(),
  })
  .passthrough();

export interface ValidatedQuoteFile {
  fileName: string;
  mimeType: (typeof ACCEPTED_QUOTE_MIME_TYPES)[number];
  bytes: Uint8Array;
}

export interface OcrDocument {
  fileName: string;
  markdown: string;
  pageCount: number;
  averageConfidence: number | null;
}

export class UploadValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UploadValidationError';
  }
}

export class OcrProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OcrProviderError';
  }
}

function safeFileName(fileName: string): string {
  return fileName.split(/[/\\]/).at(-1)?.slice(0, 255) || 'document';
}

function hasExpectedMagicBytes(
  bytes: Uint8Array,
  mimeType: ValidatedQuoteFile['mimeType'],
): boolean {
  if (mimeType === 'application/pdf') {
    return (
      bytes[0] === 0x25 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x44 &&
      bytes[3] === 0x46 &&
      bytes[4] === 0x2d
    );
  }

  if (mimeType === 'image/jpeg') {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }

  if (mimeType === 'image/png') {
    const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    return pngSignature.every((value, index) => bytes[index] === value);
  }

  return (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  );
}

export async function validateQuoteUploads(
  formData: FormData,
): Promise<ValidatedQuoteFile[]> {
  const entries = formData
    .getAll('files')
    .filter((entry): entry is File => entry instanceof File);

  if (entries.length === 0) {
    throw new UploadValidationError(
      'Sélectionnez au moins un devis PDF, JPEG, PNG ou WebP.',
    );
  }

  if (entries.length > MAX_QUOTE_FILES) {
    throw new UploadValidationError(
      `Vous pouvez comparer au maximum ${MAX_QUOTE_FILES} devis à la fois.`,
    );
  }

  const totalBytes = entries.reduce((sum, file) => sum + file.size, 0);

  if (totalBytes > MAX_QUOTE_UPLOAD_BYTES) {
    throw new UploadValidationError(
      "La taille totale des fichiers dépasse la limite de 25 Mo.",
    );
  }

  return Promise.all(
    entries.map(async (file): Promise<ValidatedQuoteFile> => {
      if (file.size === 0) {
        throw new UploadValidationError(`Le fichier « ${safeFileName(file.name)} » est vide.`);
      }

      if (file.size > MAX_QUOTE_FILE_BYTES) {
        throw new UploadValidationError(
          `Le fichier « ${safeFileName(file.name)} » dépasse la limite de 12 Mo.`,
        );
      }

      if (
        !ACCEPTED_QUOTE_MIME_TYPES.includes(
          file.type as ValidatedQuoteFile['mimeType'],
        )
      ) {
        throw new UploadValidationError(
          `Le format de « ${safeFileName(file.name)} » n'est pas accepté.`,
        );
      }

      const mimeType = file.type as ValidatedQuoteFile['mimeType'];
      const bytes = new Uint8Array(await file.arrayBuffer());

      if (!hasExpectedMagicBytes(bytes, mimeType)) {
        throw new UploadValidationError(
          `Le contenu de « ${safeFileName(file.name)} » ne correspond pas à son format déclaré.`,
        );
      }

      return {
        fileName: safeFileName(file.name),
        mimeType,
        bytes,
      };
    }),
  );
}

function average(values: number[]): number | null {
  if (values.length === 0) {
    return null;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

async function processOneDocument(
  file: ValidatedQuoteFile,
  config: MistralServerConfig,
): Promise<OcrDocument> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OCR_TIMEOUT_MS);
  const base64 = Buffer.from(file.bytes).toString('base64');
  const dataUrl = `data:${file.mimeType};base64,${base64}`;
  const isPdf = file.mimeType === 'application/pdf';

  try {
    const response = await fetch(MISTRAL_OCR_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: config.model,
        document: isPdf
          ? {
              type: 'document_url',
              document_url: dataUrl,
            }
          : {
              type: 'image_url',
              image_url: dataUrl,
            },
        table_format: 'markdown',
        confidence_scores_granularity: 'page',
        include_image_base64: false,
      }),
    });

    if (!response.ok) {
      throw new OcrProviderError(
        `Mistral OCR a refusé « ${file.fileName} » (statut ${response.status}).`,
      );
    }

    const parsed = ocrResponseSchema.safeParse(await response.json());

    if (!parsed.success) {
      throw new OcrProviderError(
        `La réponse OCR de « ${file.fileName} » est invalide.`,
      );
    }

    const markdown = parsed.data.pages
      .map((page) => `## Page ${page.index + 1}\n${page.markdown.trim()}`)
      .join('\n\n');

    if (!markdown.trim()) {
      throw new OcrProviderError(`Aucun texte n'a été extrait de « ${file.fileName} ».`);
    }

    const confidenceValues = parsed.data.pages.flatMap((page) => {
      const value = page.confidence_scores?.average_page_confidence_score;
      return typeof value === 'number' ? [value] : [];
    });

    return {
      fileName: file.fileName,
      markdown,
      pageCount: parsed.data.pages.length,
      averageConfidence: average(confidenceValues),
    };
  } catch (error) {
    if (error instanceof OcrProviderError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new OcrProviderError(
        `Le traitement OCR de « ${file.fileName} » a dépassé le délai autorisé.`,
      );
    }

    throw new OcrProviderError(
      `Le traitement OCR de « ${file.fileName} » a échoué.`,
    );
  } finally {
    clearTimeout(timeout);
  }
}

export function isMistralOcrConfigured(): boolean {
  return getMistralServerConfig() !== null;
}

export async function runMistralOcr(
  files: ValidatedQuoteFile[],
): Promise<OcrDocument[]> {
  const config = getMistralServerConfig();

  if (!config) {
    throw new OcrProviderError("Mistral OCR n'est pas configuré.");
  }

  return Promise.all(files.map((file) => processOneDocument(file, config)));
}

