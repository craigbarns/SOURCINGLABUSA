import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getOpenAiServerConfig } from '@/lib/server/env';
import {
  analyzeHsCodeServer,
  HsCodeDemoUnavailableError,
  HsCodeProviderError,
} from '@/lib/server/hscode';

vi.mock('server-only', () => ({}));
vi.mock('@/lib/server/env', () => ({
  getOpenAiServerConfig: vi.fn(),
}));

const getConfigMock = vi.mocked(getOpenAiServerConfig);
const fetchMock = vi.fn();

const PROVIDER_RESULT = {
  mode: 'live',
  sourceLabel: 'Model-provided label',
  hsCode6Digit: '7323.93',
  hsCode10Digit: '7323.93.00.80',
  productDescription: 'Stainless steel household article',
  categoryName: 'Household articles',
  destinationMarket: 'US',
  originCountry: 'China',
  dutyRates: {
    baseDutyPercent: 3.4,
    section301Percent: 7.5,
    additionalTaxesPercent: 0.3464,
    effectiveDutyPercent: 999,
  },
  dutyBreakdownNotes: ['Verify each tariff component.'],
  regulatoryWarnings: ['Requirements depend on the final product.'],
  alternativeHsCodes: [],
};

describe('HS-code server analysis', () => {
  beforeEach(() => {
    getConfigMock.mockReturnValue(null);
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  it.each([
    ['stainless steel water bottle', '7323.93'],
    ['100% cotton T-shirt', '6109.10'],
    ['35 L travel backpack', '4202.92'],
  ])('returns limited demo data only for recognized US/China query %s', async (
    query,
    expectedCode,
  ) => {
    const result = await analyzeHsCodeServer({
      query,
      destinationMarket: 'US',
      originCountry: 'CN',
    });

    expect(result.mode).toBe('demo');
    expect(result.hsCode6Digit).toBe(expectedCode);
    expect(result.sourceLabel).toMatch(/limited/i);
  });

  it.each([
    {
      query: 'wireless earbuds',
      destinationMarket: 'US',
      originCountry: 'CN',
    },
    {
      query: 'cotton T-shirt',
      destinationMarket: 'EU',
      originCountry: 'CN',
    },
    {
      query: 'cotton T-shirt',
      destinationMarket: 'US',
      originCountry: 'VN',
    },
  ])('rejects requests outside the limited demo dataset', async (input) => {
    await expect(analyzeHsCodeServer(input)).rejects.toBeInstanceOf(
      HsCodeDemoUnavailableError,
    );
  });

  it('keeps the query out of the system message and recomputes rates', async () => {
    getConfigMock.mockReturnValue({
      apiKey: 'test-key',
      model: 'test-model',
    });
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: JSON.stringify(PROVIDER_RESULT),
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );
    const sentinel = 'sentinel-product-query';

    const result = await analyzeHsCodeServer({
      query: sentinel,
      destinationMarket: 'US',
      originCountry: 'CN',
    });

    const request = fetchMock.mock.calls[0][1] as RequestInit;
    const requestBody = JSON.parse(String(request.body)) as {
      messages: Array<{ role: string; content: string }>;
    };
    const systemMessage = requestBody.messages.find(
      (message) => message.role === 'system',
    );
    const userMessage = requestBody.messages.find(
      (message) => message.role === 'user',
    );

    expect(systemMessage?.content).not.toContain(sentinel);
    expect(userMessage?.content).toContain(sentinel);
    expect(result.mode).toBe('live');
    expect(result.sourceLabel).toBe('AI-generated tariff estimate');
    expect(result.dutyRates.effectiveDutyPercent).toBe(11.2464);
  });

  it('returns a provider error instead of demo data after provider failure', async () => {
    getConfigMock.mockReturnValue({
      apiKey: 'test-key',
      model: 'test-model',
    });
    fetchMock.mockResolvedValue(new Response('provider unavailable', { status: 503 }));

    await expect(
      analyzeHsCodeServer({
        query: 'stainless steel water bottle',
        destinationMarket: 'US',
        originCountry: 'CN',
      }),
    ).rejects.toBeInstanceOf(HsCodeProviderError);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('tolerates benign HS-code formatting from the provider', async () => {
    getConfigMock.mockReturnValue({
      apiKey: 'test-key',
      model: 'test-model',
    });
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  ...PROVIDER_RESULT,
                  hsCode6Digit: '732393',
                  hsCode10Digit: '7323930080',
                }),
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );

    const result = await analyzeHsCodeServer({
      query: 'stainless steel water bottle',
      destinationMarket: 'US',
      originCountry: 'CN',
    });

    expect(result.hsCode6Digit).toBe('7323.93');
    expect(result.hsCode10Digit).toBe('7323.93.00.80');
  });

  it('exposes the provider status on the thrown error', async () => {
    getConfigMock.mockReturnValue({
      apiKey: 'test-key',
      model: 'test-model',
    });
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({ error: { message: 'insufficient_quota' } }),
        { status: 429 },
      ),
    );

    await expect(
      analyzeHsCodeServer({
        query: 'stainless steel water bottle',
        destinationMarket: 'US',
        originCountry: 'CN',
      }),
    ).rejects.toMatchObject({ name: 'HsCodeProviderError', status: 429 });
  });

  it('rejects provider output that does not match the strict schema', async () => {
    getConfigMock.mockReturnValue({
      apiKey: 'test-key',
      model: 'test-model',
    });
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  ...PROVIDER_RESULT,
                  unexpected: true,
                }),
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );

    await expect(
      analyzeHsCodeServer({
        query: 'stainless steel bottle',
        destinationMarket: 'US',
        originCountry: 'CN',
      }),
    ).rejects.toBeInstanceOf(HsCodeProviderError);
  });
});
