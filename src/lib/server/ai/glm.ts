import 'server-only';

/**
 * GLM classification provider, routed through OpenRouter's OpenAI-compatible
 * chat completions endpoint. Classification only: the model never supplies
 * duty rates — every rate shown to the user comes from the USITC lookup in
 * src/lib/server/duty.ts, with the date checked on the page.
 *
 * If no OPENROUTER_API_KEY is configured, callers fall back to the OpenAI
 * key already used by hscode.ts, and finally to the deterministic demo data.
 */

const OPENROUTER_CHAT_COMPLETIONS_URL =
  'https://openrouter.ai/api/v1/chat/completions';
const TIMEOUT_MS = 25_000;

export function getGlmServerConfig(): {
  apiKey: string;
  model: string;
} | null {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) return null;
  return {
    apiKey,
    model: process.env.GLM_MODEL?.trim() || 'z-ai/glm-4.6',
  };
}

export async function glmChatCompletion(
  system: string,
  user: string,
): Promise<string | null> {
  const config = getGlmServerConfig();
  if (!config) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(OPENROUTER_CHAT_COMPLETIONS_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
        // OpenRouter requires attribution headers; HTTP-Referer is the origin.
        'HTTP-Referer': 'https://sourcinglabusa.com',
        'X-Title': 'Sourcing Lab USA Duty Calculator',
      },
      body: JSON.stringify({
        model: config.model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return data.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
