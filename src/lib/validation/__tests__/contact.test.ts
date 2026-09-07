import { describe, expect, it } from 'vitest';

import { contactInputSchema } from '@/lib/validation/contact';

const validBrief = {
  name: 'Jane Doe',
  email: 'Jane@Example.COM',
  projectType: 'packaging',
} as const;

describe('contactInputSchema', () => {
  it('normalizes the email and applies the optional defaults', () => {
    const result = contactInputSchema.parse(validBrief);

    expect(result.email).toBe('jane@example.com');
    expect(result.company).toBeUndefined();
    expect(result.quantityRange).toBe('not_sure');
    expect(result.message).toBe('');
    expect(result.sourcePath).toBe('/');
  });

  it('rejects an invalid email and a missing project type', () => {
    const result = contactInputSchema.safeParse({
      name: 'Jane Doe',
      email: 'not-an-email',
    });

    expect(result.success).toBe(false);

    const fieldErrors = result.success
      ? {}
      : result.error.flatten().fieldErrors;

    expect(fieldErrors.email).toBeDefined();
    expect(fieldErrors.projectType).toBeDefined();
  });

  it('keeps the attribution path same-site', () => {
    expect(
      contactInputSchema.parse({
        ...validBrief,
        sourcePath: 'https://attacker.example/phish',
      }).sourcePath,
    ).toBe('/');

    expect(
      contactInputSchema.parse({ ...validBrief, sourcePath: '/custom-textile' })
        .sourcePath,
    ).toBe('/custom-textile');
  });

  it('refuses unknown fields', () => {
    expect(
      contactInputSchema.safeParse({ ...validBrief, isAdmin: true }).success,
    ).toBe(false);
  });
});
