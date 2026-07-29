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

Le même codebase sert deux espaces avec des bundles séparés :

- `sourcinglabusa.com` : landing page, SEO, tarifs et waitlist ;
- `app.sourcinglabusa.com` : espace applicatif et comparateur de devis.

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

Ouvrir ensuite :

- [http://localhost:3000](http://localhost:3000) pour le marketing ;
- [http://localhost:3000/app](http://localhost:3000/app) pour l’application ;
- [http://app.localhost:3000](http://app.localhost:3000) pour simuler le
  sous-domaine, si le navigateur résout `*.localhost`.

Les fichiers `.env*` sont ignorés, sauf `.env.example`. Ne jamais ajouter le
préfixe `NEXT_PUBLIC_` à un secret.

## Variables d’environnement

| Variable | Requise | Usage |
| --- | --- | --- |
| `MARKETING_ORIGIN` | Production | Origine canonique du site, `https://sourcinglabusa.com` par défaut |
| `APP_ORIGIN` | Production | Origine canonique de l’application, `https://app.sourcinglabusa.com` par défaut |
| `MISTRAL_API_KEY` | Pour l’OCR réel | Envoi serveur-à-serveur des PDF et images à Mistral OCR |
| `MISTRAL_OCR_MODEL` | Non | Modèle OCR, `mistral-ocr-latest` par défaut |
| `OPENAI_API_KEY` | Pour le pipeline IA complet | Structuration enrichie, analyse narrative et cahiers des charges |
| `OPENAI_MODEL` | Non | Modèle OpenAI, `gpt-4o-mini` par défaut |
| `SUPABASE_URL` | Pour la waitlist réelle | URL du projet Supabase |
| `SUPABASE_SECRET_KEY` | Pour la waitlist réelle | Secret Supabase utilisé uniquement dans la route serveur |

`MARKETING_ORIGIN` et `APP_ORIGIN` doivent être des origines HTTP(S) sans
chemin. Ce ne sont pas des secrets, mais aucun préfixe `NEXT_PUBLIC_` n’est
nécessaire : les liens utilisent les alias `/app` et `/marketing`, puis le
serveur effectue les changements de domaine.

## Domaines et déploiement Vercel

Un seul projet Vercel doit être relié à ce dépôt. Dans **Project Settings →
Domains**, ajouter :

```text
sourcinglabusa.com
www.sourcinglabusa.com
app.sourcinglabusa.com
```

Configurer ensuite chez le fournisseur DNS les enregistrements indiqués par
Vercel pour chacun de ces domaines. Les cibles peuvent dépendre du compte et
doivent être copiées depuis Vercel, pas codées en dur depuis un exemple.

Définir également les deux origines dans les environnements Production et
Preview :

```dotenv
MARKETING_ORIGIN=https://sourcinglabusa.com
APP_ORIGIN=https://app.sourcinglabusa.com
```

Le fichier `src/proxy.ts`, convention officielle de Next.js 16 qui remplace
`middleware.ts`, applique alors les règles suivantes :

```text
sourcinglabusa.com/        → landing
sourcinglabusa.com/app     → redirection 308 vers app.sourcinglabusa.com
app.sourcinglabusa.com/    → rewrite interne vers /app
app.sourcinglabusa.com/marketing → redirection vers le site marketing
```

Les domaines Vercel Preview inconnus conservent volontairement `/` et `/app`
sur le même hôte afin qu’une branche puisse être testée sans redirection vers
la production. Les routes `/api/*` restent communes aux deux espaces.

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

src/app/
  page.tsx                entrée marketing, sans import du dashboard
  app/page.tsx            entrée applicative non indexable
  robots.ts               règles d’indexation marketing
  sitemap.ts              sitemap du domaine marketing

src/lib/server/
  ai/provider.ts          interface fournisseur IA et implémentation OpenAI
  quotes/ocr.ts           validation binaire et client Mistral OCR
  quotes/extraction.ts    extraction déterministe depuis le Markdown OCR
  quotes/comparison.ts    contrôles et classement mathématiques
  quotes/pipeline.ts      orchestration live / partial / demo
  product-specs.ts        profils cohérents par catégorie
  supplier-email.ts       modèles RFQ, négociation, échantillon et audit qualité

src/lib/validation/       contrats Zod partagés
src/lib/routing/          décisions de routage par domaine, testables sans réseau
src/lib/landed-cost.ts    calculateur pur et testable
src/components/
  LandingPage.tsx         bundle interactif réservé au marketing
  AppDashboard.tsx        bundle de l’espace applicatif
  AccessibleModal.tsx     modale accessible partagée
src/proxy.ts              séparation des hôtes et garde-fous d’indexation
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
- routage apex, sous-domaine, localhost et Vercel Preview ;
- liens clavier entre les espaces marketing et applicatif ;
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
