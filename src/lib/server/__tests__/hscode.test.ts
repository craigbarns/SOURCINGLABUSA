import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getOpenAiServerConfig } from '@/lib/server/env';
import {
  analyzeHsCodeServer,
  HsCodeDemoUnavailableError,
} from '@/lib/server/hscode';

vi.mock('server-only', () => ({}));
vi.mock('@/lib/server/env', () => ({
  getOpenAiServerConfig: vi.fn(),
}));

const getConfigMock = vi.mocked(getOpenAiServerConfig);
const fetchMock = vi.fn();

const PROVIDER_RESULT = {
  hsCode6Digit: '732393',
  hsCode10Digit: '7323930080',
  productDescription: 'Stainless steel household article',
  categoryName: 'Household articles',
  dutyRates: {
    baseDutyPercent: 3.4,
    section301Percent: 7.5,
    additionalTaxesPercent: 0.3464,
  },
  regulatoryWarnings: ['Requirements depend on the final product.'],
  alternativeHsCodes: [
    {
      code: '3924104000',
      description: 'Plastic household article',
      dutyRate: 'Rate to verify',
    },
  ],
};

function providerResponse(result: unknown = PROVIDER_RESULT) {
  return new Response(
    JSON.stringify({
      output: [
        {
          type: 'message',
          content: [
            {
              type: 'output_text',
              text: JSON.stringify(result),
            },
          ],
        },
      ],
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
}

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

  it('uses Structured Outputs, derives trusted fields, and recomputes rates', async () => {
    getConfigMock.mockReturnValue({
      apiKey: 'test-key',
      model: 'test-model',
    });
    fetchMock.mockResolvedValue(providerResponse());
    const sentinel = 'sentinel-product-query';

    const result = await analyzeHsCodeServer({
      query: sentinel,
      destinationMarket: 'US',
      originCountry: 'CN',
    });

    const request = fetchMock.mock.calls[0][1] as RequestInit;
    const requestBody = JSON.parse(String(request.body)) as {
      instructions: string;
      input: string;
      text: {
        format: {
          type: string;
          strict: boolean;
          schema: { additionalProperties?: boolean };
        };
      };
    };

    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://api.openai.com/v1/responses',
    );
    expect(requestBody.instructions).not.toContain(sentinel);
    expect(requestBody.input).toContain(sentinel);
    expect(requestBody.text.format.type).toBe('json_schema');
    expect(requestBody.text.format.strict).toBe(true);
    expect(requestBody.text.format.schema.additionalProperties).toBe(false);
    expect(requestBody).not.toHaveProperty('temperature');
    expect(requestBody).not.toHaveProperty('response_format');
    expect(result.mode).toBe('live');
    expect(result.sourceLabel).toBe('AI-generated tariff estimate');
    expect(result.destinationMarket).toBe('US');
    expect(result.originCountry).toBe('China (CN)');
    expect(result.hsCode6Digit).toBe('7323.93');
    expect(result.hsCode10Digit).toBe('7323.93.0080');
    expect(result.dutyRates.effectiveDutyPercent).toBe(11.2464);
    expect(result.alternativeHsCodes[0]?.code).toBe('3924.10.4000');
  });

  it.each([
    { destinationMarket: 'US' as const, originCountry: 'VN' as const },
    { destinationMarket: 'EU' as const, originCountry: 'CN' as const },
  ])(
    'removes Section 301 outside US/China and derives a consistent total',
    async ({ destinationMarket, originCountry }) => {
      getConfigMock.mockReturnValue({
        apiKey: 'test-key',
        model: 'test-model',
      });
      fetchMock.mockResolvedValue(providerResponse());

      const result = await analyzeHsCodeServer({
        query: 'stainless steel water bottle',
        destinationMarket,
        originCountry,
      });

      expect(result.dutyRates.section301Percent).toBe(0);
      expect(result.dutyRates.effectiveDutyPercent).toBe(3.7464);
      expect(result.dutyBreakdownNotes.join(' ')).not.toContain('7.5');
    },
  );

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
    ).rejects.toMatchObject({
      name: 'HsCodeProviderError',
      kind: 'upstream',
      upstreamStatus: 503,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('rejects provider output that does not match the strict schema', async () => {
    getConfigMock.mockReturnValue({
      apiKey: 'test-key',
      model: 'test-model',
    });
    fetchMock.mockResolvedValue(
      providerResponse({
        ...PROVIDER_RESULT,
        unexpected: true,
      }),
    );

    await expect(
      analyzeHsCodeServer({
        query: 'stainless steel bottle',
        destinationMarket: 'US',
        originCountry: 'CN',
      }),
    ).rejects.toMatchObject({
      name: 'HsCodeProviderError',
      kind: 'invalid_response',
    });
  });

  it('rejects inconsistent six- and ten-digit classifications', async () => {
    getConfigMock.mockReturnValue({
      apiKey: 'test-key',
      model: 'test-model',
    });
    fetchMock.mockResolvedValue(
      providerResponse({
        ...PROVIDER_RESULT,
        hsCode10Digit: '6109100012',
      }),
    );

    await expect(
      analyzeHsCodeServer({
        query: 'stainless steel bottle',
        destinationMarket: 'US',
        originCountry: 'CN',
      }),
    ).rejects.toMatchObject({
      name: 'HsCodeProviderError',
      kind: 'invalid_response',
    });
  });
});
