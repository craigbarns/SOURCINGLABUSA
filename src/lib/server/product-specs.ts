import type { ProductSpecResult } from '@/lib/types';

const VERIFICATION_NOTICE =
  "Les certifications et exigences réglementaires ci-dessous sont des pistes de vérification, pas une qualification juridique. Leur applicabilité dépend du produit exact, de son usage, du public visé, du marché de destination et des règles en vigueur.";

export function detectProductCategory(
  prompt: string,
): ProductSpecResult['category'] {
  const normalized = prompt.toLocaleLowerCase('fr');

  if (
    /(gourde|bouteille|thermos|drinkware|tumbler|water bottle|inox)/.test(normalized)
  ) {
    return 'drinkware';
  }

  if (
    /(électronique|electronique|batterie|écouteur|bluetooth|chargeur|electronic|earbud)/.test(
      normalized,
    )
  ) {
    return 'electronics';
  }

  if (/(sacs? à dos|sacs? a dos|backpack|rucksack|bagage)/.test(normalized)) {
    return 'backpack';
  }

  if (
    /(textile|t-shirt|hoodie|vêtement|coton|\bfabric\b|garment)/.test(
      normalized,
    )
  ) {
    return 'textile';
  }

  return 'generic';
}

function sharedPricing(): ProductSpecResult['pricingTarget'] {
  return {
    estimatedFob: 'À chiffrer avec au moins 3 devis comparables',
    targetLandCost: 'À calculer après fret, origine, code HS et droits vérifiés',
    recommendedMSRP: 'À définir selon le canal de vente et les coûts réels',
    marginPotential: 'Non calculée tant que les coûts réels ne sont pas connus',
  };
}

const DEMO_PROFILES: Record<
  ProductSpecResult['category'],
  Omit<ProductSpecResult, 'mode' | 'sourceLabel' | 'category'>
> = {
  drinkware: {
    productTitle: 'Contenant alimentaire isotherme — spécification de départ',
    targetMarket: 'Marché à confirmer avec le demandeur',
    specsSummary:
      "Base de cadrage cohérente pour un contenant isotherme. Les valeurs finales doivent être validées sur plan, prototype et essais d'usage.",
    technicalSpecs: {
      materials: [
        'Acier inoxydable de nuance à confirmer par certificat matière',
        'Joint en matériau apte au contact alimentaire, formulation à documenter',
        'Revêtement extérieur dont la composition et la tenue doivent être testées',
      ],
      dimensions: 'À définir selon la capacité utile, le bouchon et les porte-gobelets visés',
      weight: 'Cible à fixer après CAO et prototype',
      tolerances:
        "Tolérances dimensionnelles à indiquer sur le plan industriel, avec points critiques d'étanchéité",
      keyFeatures: [
        'Étanchéité mesurable avec protocole et durée définis',
        'Performance thermique mesurée dans des conditions reproductibles',
        'Pièces démontables et nettoyables sans zone de rétention',
      ],
    },
    certifications: {
      toVerify: [
        'Règles de contact alimentaire applicables aux matériaux et revêtements du marché cible',
        'Exigences locales relatives aux substances restreintes et à l’étiquetage',
      ],
      recommended: [
        'Système qualité de l’usine et traçabilité des lots à auditer',
        'Rapports de migration émis pour la configuration matière finale',
      ],
      testingLabs: ['Laboratoire accrédité ISO/IEC 17025 à sélectionner selon les essais'],
      verificationNotice: VERIFICATION_NOTICE,
    },
    moq: {
      recommended: 0,
      sampleMoq: 1,
      unit: 'pcs',
      notes: 'MOQ inconnue : demander séparément prototype, pilote et série.',
    },
    pricingTarget: sharedPricing(),
    qualityControl: [
      'Contrôle visuel et dimensionnel selon plan approuvé',
      'Essai d’étanchéité documenté sur échantillonnage défini',
      'Essai de performance thermique avec température, durée et tolérance définies',
      'Vérification des certificats matière par lot',
    ],
  },
  textile: {
    productTitle: 'Article textile — spécification de départ',
    targetMarket: 'Marché, catégorie d’âge et canal de vente à confirmer',
    specsSummary:
      'Base de tech pack textile couvrant matière, construction, tailles, coloris et contrôles. Le patronage et les mesures finales restent à fournir.',
    technicalSpecs: {
      materials: [
        'Composition fibre exacte en pourcentage',
        'Poids matière (GSM) avec tolérance convenue',
        'Fil, bord-côte, étiquettes et accessoires décrits séparément',
      ],
      dimensions: 'Tableau de mesures par taille à joindre au tech pack',
      weight: 'Poids du vêtement à confirmer par taille après prototype',
      tolerances:
        'Tolérances de mesures, GSM, retrait et colorimétrie à convenir dans le tech pack',
      keyFeatures: [
        'Construction des coutures et densité de points définies',
        'Référence couleur mesurable et méthode de validation du lab dip',
        'Étiquetage de composition, entretien et origine à valider',
      ],
    },
    certifications: {
      toVerify: [
        'Exigences d’étiquetage textile du marché cible',
        'Exigences chimiques et sécurité produit selon matière, décoration et public visé',
      ],
      recommended: [
        'Allégation biologique ou recyclée à justifier par une chaîne de traçabilité appropriée',
        'Audit social ou environnemental selon la politique d’achat',
      ],
      testingLabs: ['Laboratoire textile accrédité à choisir selon le plan d’essais'],
      verificationNotice: VERIFICATION_NOTICE,
    },
    moq: {
      recommended: 0,
      sampleMoq: 1,
      unit: 'pcs / coloris / taille',
      notes: 'MOQ à négocier par coloris et grille de tailles après validation du prototype.',
    },
    pricingTarget: sharedPricing(),
    qualityControl: [
      'Mesures à plat par taille selon tableau approuvé',
      'Tests de retrait, solidité des couleurs et boulochage selon usage',
      'Contrôle des coutures, impressions, broderies et accessoires',
      'Validation d’un échantillon de préproduction signé',
    ],
  },
  electronics: {
    productTitle: 'Produit électronique — spécification de départ',
    targetMarket: 'Pays de vente, radiofréquences et alimentation à confirmer',
    specsSummary:
      'Base de cadrage électronique. La conception électrique, le logiciel, la batterie et les essais réglementaires doivent être validés par des spécialistes compétents.',
    technicalSpecs: {
      materials: [
        'Boîtier et classe d’inflammabilité à définir selon la conception',
        'Batterie, cellule et circuit de protection documentés le cas échéant',
        'BOM électronique avec références critiques et alternatives approuvées',
      ],
      dimensions: 'Enveloppe CAO et interfaces mécaniques à fournir',
      weight: 'Cible à confirmer après prototype EVT/DVT',
      tolerances:
        'Tolérances mécaniques, électriques et radio à définir dans les plans et spécifications',
      keyFeatures: [
        'Spécification d’autonomie et protocole de mesure reproductible',
        'Versions matériel/firmware traçables',
        'Critères de sécurité, charge, température et vieillissement documentés',
      ],
    },
    certifications: {
      toVerify: [
        'Autorisations radio et compatibilité électromagnétique du marché cible',
        'Sécurité électrique, batterie et exigences de transport applicables à la conception finale',
        'Substances restreintes, recyclage et marquage selon les pays vendus',
      ],
      recommended: [
        'Rapports d’essais sur l’échantillon représentatif de production',
        'Audit du contrôle des composants critiques et de la traçabilité firmware',
      ],
      testingLabs: ['Laboratoire accrédité et reconnu pour le marché cible'],
      verificationNotice: VERIFICATION_NOTICE,
    },
    moq: {
      recommended: 0,
      sampleMoq: 3,
      unit: 'pcs',
      notes: 'Prévoir des lots distincts EVT, DVT et PVT avant la série.',
    },
    pricingTarget: sharedPricing(),
    qualityControl: [
      'Test fonctionnel documenté sur chaque unité ou selon risque justifié',
      'Traçabilité des composants critiques et versions firmware',
      'Essais de charge, autonomie, température et vieillissement',
      'Contrôle final sur échantillon représentatif de la série',
    ],
  },
  backpack: {
    productTitle: 'Sac à dos — spécification de départ',
    targetMarket: 'Usage, volume, charge et marché à confirmer',
    specsSummary:
      'Base cohérente pour construire un tech pack de bagagerie avec matière, renforts, accessoires, dimensions et tests de résistance.',
    technicalSpecs: {
      materials: [
        'Tissu extérieur avec composition, denier, enduction et couleur définis',
        'Doublure, mousse et renforts spécifiés par zone',
        'Fermetures, boucles, sangles et fils avec références approuvées',
      ],
      dimensions: 'Hauteur × largeur × profondeur et volume utile à définir sur plan',
      weight: 'Poids cible à confirmer après échantillon de développement',
      tolerances:
        'Tolérances de patronage, coutures, symétrie et emplacement accessoires à définir',
      keyFeatures: [
        'Charge utile et protocole d’essai des anses/bretelles',
        'Résistance à l’eau définie par une méthode d’essai mesurable',
        'Compartiments et accès cotés sur le plan',
      ],
    },
    certifications: {
      toVerify: [
        'Exigences chimiques des matériaux, revêtements et accessoires du marché cible',
        'Exigences spécifiques si le produit vise les enfants ou comporte de l’électronique',
      ],
      recommended: [
        'Traçabilité des matières revendiquées recyclées',
        'Audit qualité de la coupe, couture et pose des accessoires',
      ],
      testingLabs: ['Laboratoire matériaux/textile accrédité selon le plan d’essais'],
      verificationNotice: VERIFICATION_NOTICE,
    },
    moq: {
      recommended: 0,
      sampleMoq: 1,
      unit: 'pcs / coloris',
      notes: 'MOQ à confirmer par coloris, matière et niveau de personnalisation.',
    },
    pricingTarget: sharedPricing(),
    qualityControl: [
      'Mesure complète selon patronage et tolérances approuvés',
      'Essais de traction des bretelles, poignées et coutures critiques',
      'Cycles d’ouverture des fermetures et boucles',
      'Essai d’abrasion et de résistance à l’eau selon l’usage annoncé',
    ],
  },
  generic: {
    productTitle: 'Produit à préciser — trame de spécification',
    targetMarket: 'À préciser',
    specsSummary:
      'La description ne permet pas encore de produire un cahier des charges spécifique sans inventer de données. Cette trame indique les informations à collecter.',
    technicalSpecs: {
      materials: [
        'Matières exactes, grades et fournisseurs approuvés à préciser',
        'Finitions, couleurs et traitements à documenter',
      ],
      dimensions: 'Plan coté et interfaces critiques à fournir',
      weight: 'Poids cible et tolérance à définir',
      tolerances: 'Tolérances fonctionnelles à définir à partir de l’usage réel',
      keyFeatures: [
        'Fonctions essentielles et critères mesurables à décrire',
        'Conditions d’utilisation, durée de vie et environnement à préciser',
      ],
    },
    certifications: {
      toVerify: [
        'Identifier les réglementations applicables après confirmation du produit, de son usage et du marché',
      ],
      recommended: ['Faire valider le plan d’essais par un spécialiste du produit'],
      testingLabs: ['Laboratoire à sélectionner après définition du plan d’essais'],
      verificationNotice: VERIFICATION_NOTICE,
    },
    moq: {
      recommended: 0,
      sampleMoq: 1,
      unit: 'unités',
      notes: 'MOQ impossible à estimer sans procédé, matière et personnalisation.',
    },
    pricingTarget: sharedPricing(),
    qualityControl: [
      'Définir les caractéristiques critiques pour la qualité',
      'Créer un plan de contrôle relié aux plans et spécifications approuvés',
      'Valider un échantillon de référence avant production',
    ],
  },
};

export function createDemoProductSpecs(prompt: string): ProductSpecResult {
  const category = detectProductCategory(prompt);

  return {
    mode: 'demo',
    sourceLabel: 'Trame de démonstration — aucune analyse IA',
    category,
    ...DEMO_PROFILES[category],
  };
}
