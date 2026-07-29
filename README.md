# SourcingLab USA

MVP Next.js 16 centré sur un comparateur de devis fournisseurs :

```text
PDF / image
  → upload API Next.js
  → Mistral OCR
  → JSON structuré et validé
  → contrôles mathématiques déterministes
  → analyse narrative optionnelle
  → rapport comparatif
```

Les clés Mistral, OpenAI et Supabase restent exclusivement dans les modules
serveur. Le navigateur appelle uniquement les routes internes `/api/*`.

## Prérequis

- Node.js 20.19+ ou une version LTS plus récente prise en charge
- npm
- un projet Supabase pour activer la liste d’attente
- une clé Mistral pour analyser réellement les documents
- une clé OpenAI pour la structuration et l’analyse IA complètes

## Installation

```bash
cd /Users/gregorybaranes/Documents/SOURCINGLABUSA
npm install
cp .env.example .env.local
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

Les fichiers `.env*` sont ignorés, sauf `.env.example`. Ne jamais ajouter le
préfixe `NEXT_PUBLIC_` à un secret.

## Variables d’environnement

| Variable | Requise | Usage |
| --- | --- | --- |
| `MISTRAL_API_KEY` | Pour l’OCR réel | Envoi serveur-à-serveur des PDF et images à Mistral OCR |
| `MISTRAL_OCR_MODEL` | Non | Modèle OCR, `mistral-ocr-latest` par défaut |
| `OPENAI_API_KEY` | Pour le pipeline IA complet | Structuration enrichie, analyse narrative et cahiers des charges |
| `OPENAI_MODEL` | Non | Modèle OpenAI, `gpt-4o-mini` par défaut |
| `SUPABASE_URL` | Pour la waitlist réelle | URL du projet Supabase |
| `SUPABASE_SECRET_KEY` | Pour la waitlist réelle | Secret Supabase utilisé uniquement dans la route serveur |

## Modes du Quote Analyzer

- `live` : OCR Mistral réel, structuration et analyse OpenAI côté serveur.
- `partial` : OCR Mistral réel, avec extraction ou analyse déterministe lorsque
  OpenAI est absent ou indisponible.
- `demo` : `MISTRAL_API_KEY` est absente. Le rapport est une fixture clairement
  identifiée et aucun contenu du fichier utilisateur n’est présenté comme analysé.

Une panne de Mistral avec une clé configurée renvoie une erreur ; elle ne
déclenche jamais silencieusement une fausse analyse de démonstration.

Le comparateur ne classe les offres que lorsque la devise, l’Incoterm et une
base unitaire extraite sont comparables. Les contrôles mathématiques sont
déterministes et l’analyse narrative ne peut pas modifier les montants, rangs
ou écarts calculés.

## Supabase

La seule donnée persistée par ce lot est l’inscription à la waitlist. Les devis
et leur texte OCR ne sont pas enregistrés par l’application.

Migration :

```text
supabase/migrations/202607290001_create_waitlist_entries.sql
```

Application avec la CLI Supabase :

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
```

La table normalise les e-mails, impose l’unicité insensible à la casse, active
RLS et retire tout accès à `anon` et `authenticated`. Seule la route serveur
utilisant `SUPABASE_SECRET_KEY` peut insérer une entrée.

## Architecture

```text
src/app/api/
  ai/product-specs/       cahier des charges, IA ou trame démo
  ai/supplier-email/      modèles d’e-mails déterministes
  quotes/analyze/         upload, OCR et rapport
  waitlist/               validation et insertion Supabase

src/lib/server/
  ai/provider.ts          interface fournisseur IA et implémentation OpenAI
  quotes/ocr.ts           validation binaire et client Mistral OCR
  quotes/extraction.ts    extraction déterministe depuis le Markdown OCR
  quotes/comparison.ts    contrôles et classement mathématiques
  quotes/pipeline.ts      orchestration live / partial / demo
  product-specs.ts        profils cohérents par catégorie
  supplier-email.ts       modèles RFQ, négociation, échantillon et audit qualité

src/lib/validation/       contrats Zod partagés
src/lib/landed-cost.ts    calculateur pur et testable
src/components/           interface et modale accessible partagée
supabase/migrations/      schéma versionné de la waitlist
```

L’interface `AiProvider` isole le reste du pipeline d’OpenAI et permet de
changer de fournisseur ultérieurement sans déplacer de secret vers le client.

## Commandes de qualité

```bash
npm run lint
npm run typecheck
npm test
npm run test:watch
npm run build
npm audit
npm audit --omit=dev
```

`npm run lint` utilise directement ESLint CLI avec la configuration plate
Next.js, car `next lint` n’existe plus dans Next.js 16.

Les tests Vitest couvrent :

- calcul du coût rendu et validation des valeurs négatives, vides ou non finies ;
- effet du mode de transport, du marché et du taux lié au code HS ;
- extraction structurée OCR et contrôles mathématiques ;
- catégorisation et profils produit ;
- génération `quality_audit` ;
- protections des routes serveur ;
- succès, doublon et indisponibilité du parcours waitlist ;
- fermeture par Échap, piège et restauration du focus des modales.

## Sécurité et limites

- uploads limités à 3 fichiers, 12 Mo chacun et 25 Mo au total ;
- PDF, JPEG, PNG et WebP contrôlés par type déclaré et signature binaire ;
- requêtes POST protégées contre les origines navigateur étrangères et les
  tailles déclarées excessives ;
- limitation de débit en mémoire sur les routes coûteuses et la waitlist ;
- réponses d’upload avec `Cache-Control: no-store` ;
- en-têtes anti-framing, `nosniff`, politique de référent et permissions
  navigateur restrictives.

Avant une ouverture publique, remplacer le rate limit en mémoire par un quota
distribué, ajouter authentification et isolation utilisateur, définir une
politique de rétention, puis brancher les limites d’usage.

Le calculateur n’interroge pas encore de base tarifaire : le code HS et le taux
de droits sont fournis par l’utilisateur et doivent être vérifiés. La TVA UE,
les frais MPF/HMF américains et les droits additionnels éventuels sont signalés
mais non calculés.

Stripe, les abonnements, l’envoi automatique d’e-mails, l’authentification et la
persistance des analyses ne sont pas branchés dans ce lot.
