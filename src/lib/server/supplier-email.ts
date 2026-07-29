import type {
  EmailGeneratorInput,
  EmailGeneratorResult,
} from '@/lib/types';

function englishTemplate(input: EmailGeneratorInput): EmailGeneratorResult {
  const greeting = input.contactPerson
    ? `Dear ${input.contactPerson},`
    : `Dear ${input.supplierName} team,`;
  const requirements = input.specificRequirements
    ? `\nAdditional requirements:\n${input.specificRequirements}\n`
    : '';

  if (input.emailType === 'quality_audit') {
    return {
      subject: `Quality system and test-report request — ${input.productName}`,
      body: `${greeting}

Before supplier approval for ${input.productName}, please provide the following current documents:

1. Factory quality-system certificate and scope, if available.
2. Recent product test reports that match the exact materials and construction quoted.
3. Incoming-material, in-process and final-inspection procedures.
4. Traceability method for critical materials, components and production lots.
5. Your standard AQL plan and procedure for handling non-conformities.
6. Confirmation that an independent pre-shipment inspection can be arranged.
${requirements}
Please identify the issuing body, report number, tested sample and expiry date for each document. A document will be considered supporting evidence only after its scope and authenticity have been verified.

Best regards,
Procurement Team`,
      tips: [
        'Vérifier le numéro, le périmètre, le titulaire et la date de chaque rapport.',
        'Exiger que l’échantillon testé soit représentatif de la configuration achetée.',
      ],
    };
  }

  if (input.emailType === 'negotiation') {
    return {
      subject: `Quotation review — ${input.productName} (${input.quantity} units)`,
      body: `${greeting}

Thank you for your quotation for ${input.productName}.

We are comparing offers on the same quantity, specification, currency and Incoterm. Our current target is ${input.targetPrice || '[target price to confirm]'} for ${input.quantity} units.

Please confirm whether you can revise the commercial offer while keeping the approved materials, quality plan, packaging and lead time unchanged. Please also separate any tooling, testing, freight and optional charges from the unit price.
${requirements}
Please return a revised quotation with validity, payment terms, Incoterm, production lead time and ownership of tooling clearly stated.

Best regards,
Procurement Team`,
      tips: [
        'Comparer uniquement des offres alignées sur la même spécification et le même Incoterm.',
        'Ne pas présenter un benchmark non vérifié comme un fait.',
      ],
    };
  }

  if (input.emailType === 'sample_request') {
    const sampleQuantity = Math.min(input.quantity, 5);
    return {
      subject: `Sample request — ${input.productName}`,
      body: `${greeting}

We would like to order ${sampleQuantity} representative sample${sampleQuantity > 1 ? 's' : ''} of ${input.productName} for technical and quality validation.

Please confirm:
1. Sample configuration, materials and finish.
2. Sample price and courier cost shown separately.
3. Preparation time and dispatch date.
4. Whether the sample is made on production tooling.
5. Documents and test reports supplied with the sample.
${requirements}
Please do not substitute materials or components without written approval.

Best regards,
Procurement Team`,
      tips: [
        'Identifier et photographier chaque échantillon reçu.',
        'Faire approuver un échantillon de référence avant production.',
      ],
    };
  }

  return {
    subject: `RFQ — ${input.productName} (${input.quantity} units)`,
    body: `${greeting}

Please provide a formal quotation for ${input.quantity} units of ${input.productName}.

Your quotation should state:
1. Unit price and currency.
2. MOQ and price breaks.
3. Incoterm and named port/place.
4. Tooling, testing, packaging and other charges shown separately.
5. Sample and mass-production lead times.
6. Payment terms and quotation validity.
7. Available evidence for materials, quality controls and applicable compliance.
${requirements}
Requirements and compliance documents will be verified against the final product configuration and destination market.

Best regards,
Procurement Team`,
    tips: [
      'Joindre une spécification versionnée afin que tous les fournisseurs chiffrent la même base.',
      'Demander une ventilation des coûts ponctuels et récurrents.',
    ],
  };
}

function frenchTemplate(input: EmailGeneratorInput): EmailGeneratorResult {
  const translated = englishTemplate(input);
  const greeting = input.contactPerson
    ? `Bonjour ${input.contactPerson},`
    : `Bonjour l’équipe ${input.supplierName},`;
  const requirements = input.specificRequirements
    ? `\nExigences complémentaires :\n${input.specificRequirements}\n`
    : '';

  if (input.emailType === 'quality_audit') {
    return {
      subject: `Demande système qualité et rapports d’essais — ${input.productName}`,
      body: `${greeting}

Avant l’approbation du fournisseur pour ${input.productName}, merci de transmettre les documents actuels suivants :

1. Certificat du système qualité de l’usine et son périmètre, si disponible.
2. Rapports d’essais récents correspondant exactement aux matières et à la construction chiffrées.
3. Procédures de contrôle à réception, en cours de fabrication et final.
4. Méthode de traçabilité des matières, composants et lots critiques.
5. Plan AQL standard et traitement des non-conformités.
6. Confirmation qu’une inspection indépendante avant expédition est possible.
${requirements}
Pour chaque document, indiquez l’organisme émetteur, le numéro, l’échantillon testé et la date de validité. Son périmètre et son authenticité seront vérifiés.

Cordialement,
Équipe Achats`,
      tips: translated.tips,
    };
  }

  if (input.emailType === 'negotiation') {
    return {
      subject: `Révision du devis — ${input.productName} (${input.quantity} unités)`,
      body: `${greeting}

Merci pour votre devis concernant ${input.productName}.

Nous comparons les offres sur une quantité, une spécification, une devise et un Incoterm identiques. Notre cible actuelle est ${input.targetPrice || '[prix cible à confirmer]'} pour ${input.quantity} unités.

Pouvez-vous réviser l’offre sans modifier les matières approuvées, le plan qualité, l’emballage et le délai ? Merci de séparer l’outillage, les essais, le fret et les options du prix unitaire.
${requirements}
Merci de retourner un devis révisé indiquant sa validité, les conditions de paiement, l’Incoterm, le délai et la propriété des outillages.

Cordialement,
Équipe Achats`,
      tips: translated.tips,
    };
  }

  if (input.emailType === 'sample_request') {
    const sampleQuantity = Math.min(input.quantity, 5);
    return {
      subject: `Demande d’échantillons — ${input.productName}`,
      body: `${greeting}

Nous souhaitons commander ${sampleQuantity} échantillon(s) représentatif(s) de ${input.productName} pour validation technique et qualité.

Merci de confirmer la configuration, les matières, la finition, le prix des échantillons, le transport, le délai, l’outillage utilisé et les rapports fournis.
${requirements}
N’effectuez aucune substitution de matière ou composant sans accord écrit.

Cordialement,
Équipe Achats`,
      tips: translated.tips,
    };
  }

  return {
    subject: `Demande de prix — ${input.productName} (${input.quantity} unités)`,
    body: `${greeting}

Merci de fournir un devis formel pour ${input.quantity} unités de ${input.productName}.

Le devis doit indiquer le prix unitaire et la devise, le MOQ et les paliers, l’Incoterm et le lieu nommé, les frais séparés, les délais, les conditions de paiement, la validité et les preuves disponibles concernant matières, qualité et conformité.
${requirements}
Les documents de conformité seront vérifiés pour la configuration finale et le marché de destination.

Cordialement,
Équipe Achats`,
    tips: translated.tips,
  };
}

function chineseTemplate(input: EmailGeneratorInput): EmailGeneratorResult {
  const english = englishTemplate(input);
  const greeting = input.contactPerson
    ? `${input.contactPerson} 您好，`
    : `${input.supplierName} 团队您好，`;
  const typeLabels = {
    rfq: '正式报价请求',
    negotiation: '报价调整请求',
    sample_request: '样品请求',
    quality_audit: '质量体系与测试报告请求',
  } as const;

  return {
    subject: `${typeLabels[input.emailType]} — ${input.productName}`,
    body: `${greeting}

我们正在评估 ${input.productName}（数量：${input.quantity}）。

请提供完整且可核验的信息，包括：产品配置与材料、单价与币种、MOQ、Incoterm、单独列出的模具/测试/包装/运输费用、交期、付款条件和报价有效期。

${
  input.emailType === 'quality_audit'
    ? '另外请提供工厂质量体系证书范围、与最终产品配置一致的测试报告、来料/过程/出货检验流程、批次追溯方式、AQL 标准以及是否接受第三方出货前检验。'
    : ''
}

${input.specificRequirements ? `补充要求：\n${input.specificRequirements}\n` : ''}
所有证书和报告的适用范围、真实性、样品配置及有效期都需要进一步核验。未经书面批准，请勿替换材料或部件。

此致
采购团队`,
    tips: english.tips,
  };
}

export function generateSupplierEmailTemplate(
  input: EmailGeneratorInput,
): EmailGeneratorResult {
  if (input.language === 'fr') return frenchTemplate(input);
  if (input.language === 'zh') return chineseTemplate(input);
  return englishTemplate(input);
}
