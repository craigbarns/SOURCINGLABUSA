import { NextResponse } from 'next/server';

import {
  exceedsContentLength,
  isSameOriginRequest,
} from '@/lib/server/http';
import { generateSupplierEmailTemplate } from '@/lib/server/supplier-email';
import { supplierEmailInputSchema } from '@/lib/validation/supplier-email';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { message: 'Origine de requête refusée.' },
      { status: 403, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  if (exceedsContentLength(request, 5 * 1024)) {
    return NextResponse.json(
      { message: 'La requête est trop volumineuse.' },
      { status: 413, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: 'La requête JSON est invalide.' },
      { status: 400 },
    );
  }

  const validation = supplierEmailInputSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        message:
          validation.error.issues[0]?.message ??
          "Les paramètres de l'e-mail sont invalides.",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(generateSupplierEmailTemplate(validation.data));
}
