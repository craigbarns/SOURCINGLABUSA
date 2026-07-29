import { describe, expect, it } from 'vitest';

import { generateSupplierEmailTemplate } from '@/lib/server/supplier-email';

describe('supplier email templates', () => {
  it.each([
    ['en', /quality-system certificate|test reports/i],
    ['fr', /système qualité|rapports d’essais/i],
    ['zh', /质量体系|测试报告/i],
  ] as const)(
    'generates a real quality-audit request in %s',
    (language, expectedContent) => {
      const result = generateSupplierEmailTemplate({
        supplierName: 'Supplier Test',
        contactPerson: 'Quality Manager',
        productName: 'Travel backpack 35 L',
        quantity: 1000,
        emailType: 'quality_audit',
        language,
        specificRequirements: 'Material reports',
      });

      expect(result.subject).toMatch(/quality|qualité|质量/i);
      expect(result.body).toMatch(expectedContent);
      expect(result.body).toMatch(/verif|vérifi|核验/i);
      expect(result.tips.length).toBeGreaterThan(0);
    },
  );
});
