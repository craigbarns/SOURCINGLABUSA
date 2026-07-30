'use client';

import type { QuoteAnalysisResponse } from '@/lib/types';
import { buildQuoteSummaryText } from '@/lib/quote-report-summary';
import { ReportActions } from './ReportActions';

export function QuoteReportActions({
  result,
}: {
  result: QuoteAnalysisResponse;
}) {
  return <ReportActions getSummary={() => buildQuoteSummaryText(result)} />;
}
