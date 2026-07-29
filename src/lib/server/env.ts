import 'server-only';

export interface OpenAiServerConfig {
  apiKey: string;
  model: string;
}

export interface MistralServerConfig {
  apiKey: string;
  model: string;
}

export function getOpenAiServerConfig(): OpenAiServerConfig | null {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  return {
    apiKey,
    model: process.env.OPENAI_MODEL?.trim() || 'gpt-4o',
  };
}

export function getMistralServerConfig(): MistralServerConfig | null {
  const apiKey = process.env.MISTRAL_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  return {
    apiKey,
    // Modèle officiel Mistral OCR 4 (mistral-ocr-latest / mistral-ocr-4)
    model: process.env.MISTRAL_OCR_MODEL?.trim() || 'mistral-ocr-latest',
  };
}

