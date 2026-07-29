import {
  savedAnalysisSchema,
  savedAnalysisSummaryListSchema,
  savedAnalysisSummarySchema,
  type HistoryTool,
  type SavedAnalysis,
  type SavedAnalysisSummary,
} from '@/lib/validation/history';

export class HistoryClientError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'HistoryClientError';
    this.status = status;
  }
}

type ErrorBody = { message?: string };

async function errorFrom(
  response: Response,
  fallback: string,
): Promise<HistoryClientError> {
  try {
    const body = (await response.json()) as ErrorBody;
    return new HistoryClientError(body.message || fallback, response.status);
  } catch {
    return new HistoryClientError(fallback, response.status);
  }
}

export async function listAnalyses(): Promise<SavedAnalysisSummary[]> {
  const response = await fetch('/api/history', { method: 'GET' });

  if (!response.ok) {
    throw await errorFrom(response, 'Could not load your saved history.');
  }

  const parsed = savedAnalysisSummaryListSchema.safeParse(
    await response.json(),
  );

  if (!parsed.success) {
    throw new HistoryClientError('The server returned an invalid history list.');
  }

  return parsed.data.items;
}

export async function saveAnalysis(input: {
  tool: HistoryTool;
  title: string;
  payload: unknown;
}): Promise<SavedAnalysisSummary> {
  const response = await fetch('/api/history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw await errorFrom(response, 'Could not save the analysis.');
  }

  const parsed = savedAnalysisSummarySchema.safeParse(await response.json());

  if (!parsed.success) {
    throw new HistoryClientError('The server returned an invalid save response.');
  }

  return parsed.data;
}

export async function getAnalysis(id: string): Promise<SavedAnalysis> {
  const response = await fetch(`/api/history/${id}`, { method: 'GET' });

  if (!response.ok) {
    throw await errorFrom(response, 'Could not load the analysis.');
  }

  const parsed = savedAnalysisSchema.safeParse(await response.json());

  if (!parsed.success) {
    throw new HistoryClientError('The server returned an invalid analysis.');
  }

  return parsed.data;
}

export async function deleteAnalysis(id: string): Promise<void> {
  const response = await fetch(`/api/history/${id}`, { method: 'DELETE' });

  if (!response.ok) {
    throw await errorFrom(response, 'Could not delete the analysis.');
  }
}
