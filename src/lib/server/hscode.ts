import 'server-only';

import { getOpenAiServerConfig } from './env';
import { hsCodeInputSchema, type HsCodeInputSchema } from '@/lib/validation/hscode';
import type { HsCodeAnalysisResult } from '@/lib/types';

const DETERMINISTIC_TARIFFS: Record<string, HsCodeAnalysisResult> = {
  drinkware: {
    mode: 'demo',
    sourceLabel: 'Tarifaires Officiels US/EU (Base Déterministe)',
    hsCode6Digit: '7323.93',
    hsCode10Digit: '7323.93.00.80',
    productDescription: 'Articles de ménage en acier inoxydable (gourdes, mugs isothermes)',
    categoryName: 'Articles de ménage & Gourdes Inox',
    destinationMarket: 'US',
    originCountry: 'Chine (CN)',
    dutyRates: {
      baseDutyPercent: 3.4,
      section301Percent: 7.5,
      additionalTaxesPercent: 0.35,
      effectiveDutyPercent: 11.25,
    },
    dutyBreakdownNotes: [
      'Droits de douane de base US (HTSUS 7323.93.00) : 3.4%',
      'Surtaxe Section 301 Chine (List 3) : +7.5%',
      'Frais de gestion douanière US (MPF) : 0.3464% (Min $31.67)',
      'Taux effectif global d’importation US : 11.25%',
    ],
    regulatoryWarnings: [
      'FDA 21 CFR : Conformité contact alimentaire obligatoire',
      'California Prop 65 : Test de plomb et cadmium requis',
    ],
    alternativeHsCodes: [
      { code: '3924.10.40', description: 'Gourdes en plastique (BPA Free)', dutyRate: '6.5% + 7.5% Sec 301' },
      { code: '7013.49.20', description: 'Gourdes et bouteilles en verre', dutyRate: '7.2% + 7.5% Sec 301' },
    ],
  },
  textile: {
    mode: 'demo',
    sourceLabel: 'Tarifaires Officiels US/EU (Base Déterministe)',
    hsCode6Digit: '6109.10',
    hsCode10Digit: '6109.10.00.12',
    productDescription: 'T-shirts, maillots de corps et tricots en coton',
    categoryName: 'Textiles & Vêtements Coton',
    destinationMarket: 'US',
    originCountry: 'Chine (CN)',
    dutyRates: {
      baseDutyPercent: 16.5,
      section301Percent: 7.5,
      additionalTaxesPercent: 0.35,
      effectiveDutyPercent: 24.35,
    },
    dutyBreakdownNotes: [
      'Droits de douane de base US (HTSUS 6109.10) : 16.5%',
      'Surtaxe Section 301 Chine : +7.5%',
      'Frais de dossier MPF : 0.3464%',
      'Taux effectif global d’importation US : 24.35%',
    ],
    regulatoryWarnings: [
      'CPSIA : Certificat de conformité enfants (si applicable)',
      'Étiquetage obligatoire de la composition textile en Anglais (FTC)',
    ],
    alternativeHsCodes: [
      { code: '6109.90.10', description: 'T-shirts en fibres synthétiques', dutyRate: '32.0% + 7.5% Sec 301' },
      { code: '6205.20.20', description: 'Chemises tissées en coton', dutyRate: '19.7% + 7.5% Sec 301' },
    ],
  },
  backpack: {
    mode: 'demo',
    sourceLabel: 'Tarifaires Officiels US/EU (Base Déterministe)',
    hsCode6Digit: '4202.92',
    hsCode10Digit: '4202.92.31.20',
    productDescription: 'Sacs à dos, sacs de voyage et sacs isothermes à surface extérieure en matière textile',
    categoryName: 'Bagagerie & Sacs à Dos',
    destinationMarket: 'US',
    originCountry: 'Chine (CN)',
    dutyRates: {
      baseDutyPercent: 17.6,
      section301Percent: 25.0,
      additionalTaxesPercent: 0.35,
      effectiveDutyPercent: 42.95,
    },
    dutyBreakdownNotes: [
      'Droits de douane de base US (HTSUS 4202.92.31) : 17.6%',
      'Surtaxe Section 301 Chine (List 3) : +25.0%',
      'Frais de traitement MPF : 0.3464%',
      'Taux effectif global d’importation US : 42.95%',
    ],
    regulatoryWarnings: [
      'Attention aux droits anti-dumping selon les composants plastiques',
      'Test de phtalates REACH / CPSIA obligatoire',
    ],
    alternativeHsCodes: [
      { code: '4202.91.00', description: 'Sacs à dos en cuir véritable', dutyRate: '4.5% + 25.0% Sec 301' },
      { code: '4202.99.90', description: 'Sacs à dos rigides', dutyRate: '20.0% + 25.0% Sec 301' },
    ],
  },
};

export async function analyzeHsCodeServer(rawInput: unknown): Promise<HsCodeAnalysisResult> {
  const parsed = hsCodeInputSchema.parse(rawInput);
  const openAiConfig = getOpenAiServerConfig();

  if (!openAiConfig) {
    const q = parsed.query.toLowerCase();
    if (q.includes('gourde') || q.includes('inox') || q.includes('7323')) return DETERMINISTIC_TARIFFS.drinkware;
    if (q.includes('shirt') || q.includes('coton') || q.includes('textile') || q.includes('6109')) return DETERMINISTIC_TARIFFS.textile;
    return DETERMINISTIC_TARIFFS.backpack;
  }

  const destination = parsed.destinationMarket || 'US';
  const origin = parsed.originCountry || 'CN';

  const systemPrompt = `Tu es un expert douanier international spécialisé dans le Système Harmonisé (Codes SH / HTSUS / TARIC) et le calcul des droits de douane pour le marché ${destination}.
Analyse la requête de l'utilisateur ("${parsed.query}") et retourne un objet JSON STRICT respectant le schéma suivant :

{
  "mode": "live",
  "sourceLabel": "Base Tarifaire Officielle HTSUS / TARIC par IA",
  "hsCode6Digit": "Code SH à 6 chiffres (ex: 7323.93)",
  "hsCode10Digit": "Code HTSUS/TARIC à 10 chiffres exact",
  "productDescription": "Description exacte du produit et de sa sous-position tarifaire",
  "categoryName": "Nom de la catégorie produit",
  "destinationMarket": "${destination}",
  "originCountry": "${origin}",
  "dutyRates": {
    "baseDutyPercent": 3.4,
    "section301Percent": 7.5,
    "additionalTaxesPercent": 0.35,
    "effectiveDutyPercent": 11.25
  },
  "dutyBreakdownNotes": [
    "Droits de douane de base...",
    "Surtaxe Section 301...",
    "Frais MPF/HMF..."
  ],
  "regulatoryWarnings": [
    "Avertissement ou normes requises à l'importation..."
  ],
  "alternativeHsCodes": [
    { "code": "3924.10.40", "description": "Alternative...", "dutyRate": "6.5%" }
  ]
}

Attention :
- Calcule "effectiveDutyPercent" comme la somme exacte de baseDutyPercent + section301Percent + additionalTaxesPercent.
- Réponds UNIQUEMENT en JSON valide sans aucun texte avant ou après.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: openAiConfig.model,
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Recherche Code SH / Droits de douanes pour : ${parsed.query}` },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Aucun contenu renvoyé par OpenAI');
    }

    const result = JSON.parse(content) as HsCodeAnalysisResult;
    result.mode = 'live';
    result.sourceLabel = 'HSPay & Custom Tariffs Engine IA';
    return result;
  } catch (error) {
    console.error('Erreur API HS Code AI:', error);
    const q = parsed.query.toLowerCase();
    if (q.includes('gourde') || q.includes('inox') || q.includes('7323')) return DETERMINISTIC_TARIFFS.drinkware;
    if (q.includes('shirt') || q.includes('coton') || q.includes('textile') || q.includes('6109')) return DETERMINISTIC_TARIFFS.textile;
    return DETERMINISTIC_TARIFFS.backpack;
  }
}
