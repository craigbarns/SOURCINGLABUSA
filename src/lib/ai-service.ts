import type {
  EmailGeneratorInput,
  EmailGeneratorResult,
  HsCodeAnalysisInput,
  HsCodeAnalysisResult,
  ProductSpecResult,
} from '@/lib/types';
import {
  productSpecResultSchema,
} from '@/lib/validation/product-spec';
import {
  hsCodeAnalysisResultSchema,
  normalizeHsCodeAnalysisResult,
} from '@/lib/validation/hscode';
import { supplierEmailResultSchema } from '@/lib/validation/supplier-email';

export class ClientApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientApiError';
  }
}

type ErrorResponse = {
  message?: string;
};

async function parseError(response: Response, fallback: string): Promise<ClientApiError> {
  try {
    const body = (await response.json()) as ErrorResponse;
    return new ClientApiError(body.message || fallback);
  } catch {
    return new ClientApiError(fallback);
  }
}

export async function generateProductSpecs(
  prompt: string,
): Promise<ProductSpecResult> {
  const response = await fetch('/api/ai/product-specs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw await parseError(
      response,
      'The product specification could not be generated.',
    );
  }

  const validation = productSpecResultSchema.safeParse(await response.json());

  if (!validation.success) {
    throw new ClientApiError('The server returned an invalid response.');
  }

  return validation.data;
}

export async function generateSupplierEmail(
  input: EmailGeneratorInput,
): Promise<EmailGeneratorResult> {
  const response = await fetch('/api/ai/supplier-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw await parseError(
      response,
      'The supplier email could not be generated.',
    );
  }

  const validation = supplierEmailResultSchema.safeParse(await response.json());

  if (!validation.success) {
    throw new ClientApiError('The server returned an invalid response.');
  }

  return validation.data;
}

export async function analyzeHsCode(
  input: HsCodeAnalysisInput,
): Promise<HsCodeAnalysisResult> {
  const response = await fetch('/api/ai/hscode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw await parseError(
      response,
      'HS-code analysis failed.',
    );
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new ClientApiError('The server returned an invalid HS-code response.');
  }

  const validation = hsCodeAnalysisResultSchema.safeParse(payload);

  if (!validation.success) {
    throw new ClientApiError('The server returned an invalid HS-code response.');
  }

  return normalizeHsCodeAnalysisResult(validation.data);
}
