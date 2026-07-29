import { describe, expect, it } from 'vitest';

import {
  createDemoProductSpecs,
  detectProductCategory,
} from '@/lib/server/product-specs';

describe('product specification profiles', () => {
  it.each([
    ['Gourde inox isotherme 750 ml', 'drinkware'],
    ['T-shirt 100% coton 240 GSM', 'textile'],
    ['Écouteurs Bluetooth avec batterie', 'electronics'],
    ['Fabricant de sacs à dos de voyage 35 L', 'backpack'],
    ['Objet promotionnel à définir', 'generic'],
  ] as const)('classifies %s as %s', (prompt, expected) => {
    expect(detectProductCategory(prompt)).toBe(expected);
  });

  it('returns category-specific demo content without mandatory certification claims', () => {
    const backpack = createDemoProductSpecs(
      'Fabricant de sacs à dos de voyage 35 L résistants à la pluie',
    );

    expect(backpack.category).toBe('backpack');
    expect(backpack.technicalSpecs.materials.join(' ')).toMatch(
      /tissu|fermetures/i,
    );
    expect(backpack.technicalSpecs.keyFeatures.join(' ')).toMatch(
      /charge|résistance à l’eau/i,
    );
    expect(backpack.certifications.verificationNotice).toMatch(
      /applicabilité|dépend/i,
    );
    expect(backpack.mode).toBe('demo');
  });
});
