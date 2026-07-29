import { NextResponse } from 'next/server';
import { analyzeHsCodeServer } from '@/lib/server/hscode';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await analyzeHsCodeServer(body);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Vérifiez les paramètres de recherche.', details: error.issues },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: 'Erreur lors de l’analyse du Code SH.' },
      { status: 500 },
    );
  }
}
