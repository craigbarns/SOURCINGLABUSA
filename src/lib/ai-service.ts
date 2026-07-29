import type {
  EmailGeneratorInput,
  EmailGeneratorResult,
  ProductSpecResult,
} from '@/lib/types';
import {
  productSpecResultSchema,
} from '@/lib/validation/product-spec';
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
      "Le cahier des charges n'a pas pu être généré.",
    );
  }

  const validation = productSpecResultSchema.safeParse(await response.json());

  if (!validation.success) {
    throw new ClientApiError('La réponse du serveur est invalide.');
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
      "L'e-mail fournisseur n'a pas pu être généré.",
    );
  }

  const validation = supplierEmailResultSchema.safeParse(await response.json());

  if (!validation.success) {
    throw new ClientApiError('La réponse du serveur est invalide.');
  }

  return validation.data;
}
