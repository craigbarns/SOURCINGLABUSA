# Revue des dépendances de production — 21 octobre 2026

Cette revue complète l'audit du site. Elle vérifie les versions résolues, les avis publiés et les chemins d'utilisation observés ; elle ne constitue pas une preuve d'absence de vulnérabilité ou un test d'intrusion.

## Correctifs retenus

| Dépendance | Avant | Version dans le lock après correction | Motif |
|---|---|---|---|
| `next` | 16.3.4 | 16.3.8 | Correctifs de la branche 16.3 pour les avis d'image, de cache et de métadonnées signalés par npm. La plage demandée est `~16.3.8` pour rester dans cette branche. |
| `eslint-config-next` | Plage partant de 16.3.4 | Branche `~16.3.8` | Aligner la configuration ESLint avec la branche Next utilisée. |
| `sharp` | Override 0.35.4 | 0.35.5 | L'override précédent empêchait de prendre le correctif du composant natif. Il est remplacé par 0.35.5. |
| `source-map-js` | 1.2.1 | 1.2.2 | Correctif de validation des offsets dans les source maps indexées ; version vérifiée dans le lock. |

Les métadonnées npm consultées confirment l'existence de `next@16.3.8` et son minimum Node `>=20.9.0`. La branche publique `latest` renvoyait 16.4.2 ; `^16.3.8` peut donc sélectionner une nouvelle mineure. Le choix `~16.3.8` conserve le périmètre de mise à jour souhaité. Références : [release Next 16.3.8](https://github.com/vercel/next.js/releases/tag/v16.3.8), [métadonnées npm de cette version](https://registry.npmjs.org/next/16.3.8).

Le [RCE `next/og` GHSA-vcvr-r3jv-pc5j](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j) concerne l'implémentation Node d'ImageResponse recevant des valeurs contrôlées par un attaquant dans du contenu, des attributs ou styles SVG. Le correctif de cet avis seul est 16.3.6 ; ce n'est pas une raison de s'arrêter à cette version lorsque d'autres avis demandent 16.3.8. Les avis signalés comprennent également [SSRF dans Image Optimization](https://github.com/vercel/next.js/security/advisories/GHSA-cjq9-62q9-8jv4), [métadonnées image](https://github.com/advisories/GHSA-f87g-xv8r-7p7x), [cache SSG/ISR](https://github.com/advisories/GHSA-4jqv-mc3x-m676) et [contenu Draft Mode en cache](https://github.com/advisories/GHSA-3w37-wq28-93x7). Aucun incident d'exploitation sur ce site n'a été établi.

L'[avis du mainteneur sharp](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w) indique le correctif à partir de 0.35.5 pour son composant librsvg, avec un risque dépendant notamment de l'environnement et du traitement SVG. Le correctif des offsets de `source-map-js` est documenté dans [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q). Ces correctifs sont appliqués sans tenter de déduire une exploitabilité certaine à partir du seul numéro de version.

## Résidu modéré et portée observée

Le rapport de production initial signalait neuf entrées : une critique, deux hautes et six modérées. Après correction, le [rapport enregistré](./security-audit.json) indique **zéro entrée critique, zéro haute et six modérées** ; le contrôle au seuil `high` réussit. Les entrées propagées ne représentent pas six failles indépendantes : deux dépendances racines vulnérables produisent aussi des alertes sur leurs parents. Une tentative complémentaire depuis l'environnement de revue a rencontré `ENOTFOUND registry.npmjs.org` ; cette erreur réseau n'est ni une réussite ni un nouveau résultat de vulnérabilité.

| Chaîne encore présente | Avis | Utilisation observée et traitement |
|---|---|---|
| `@tailwindcss/typography@0.5.20 → postcss-selector-parser@6.0.10` | [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf), corrigé en 7.1.6 | Le parseur est utilisé pour les styles du projet lors du build. Aucun endpoint acceptant des sélecteurs CSS arbitraires n'a été identifié dans cette revue. Le mainteneur distingue explicitement ce cas de celui de sélecteurs non fiables traités dans une requête. |
| `gray-matter@4.0.3 → js-yaml@3.15.2 → argparse@1.0.10 → sprintf-js@1.0.3` | [GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c), aucune version corrigée indiquée | Les articles sont des fichiers Markdown du dépôt, traités par `src/lib/blog.ts`. Dans js-yaml installé, argparse est importé par l'exécutable CLI ; un test de chargement et d'analyse YAML par gray-matter n'a chargé ni argparse ni sprintf-js. Cela réduit le chemin exposé observé, sans effacer l'alerte de dépendance. |

Le contrôle d'utilisation est limité au code et au scénario analysés. Il ne justifie pas de traiter des téléchargements de YAML, CSS, sélecteurs ou formats arbitraires comme sûrs à l'avenir. Réexaminer ces chaînes avant d'ajouter une telle capacité.

## Pourquoi aucune rétrogradation forcée ou override majeur n'est appliqué

`npm audit fix --force` proposait notamment une ancienne version de typography ou de gray-matter. Une telle rétrogradation peut changer le comportement du site et ne constitue pas un correctif fiable par elle-même.

Typography fixe ici selector-parser à **6.0.10**. Le correctif disponible **7.1.6** franchit une version majeure : il ne peut pas être présenté comme un override sans risque de rupture. Préférer une version maintenue de typography compatible avec le parseur corrigé ; à défaut, examiner un override ciblé avec comparaison du CSS généré et vérification visuelle.

Gray-matter appelle `yaml.safeLoad` et `yaml.safeDump` dans son [moteur YAML](https://github.com/jonschlinkert/gray-matter/blob/master/lib/engines.js). Une substitution brute par une nouvelle majeure de js-yaml change ces API et doit être traitée comme une migration. La branche 3 installée dépend encore d'argparse 1. Aucun override de sprintf-js ne résout un avis indiquant qu'aucune version corrigée n'est disponible.

Le suivi recommandé est une migration volontaire du parseur de front matter ou de son moteur YAML, avec vérification des dates, scalaires, listes et délimiteurs sur tous les articles existants. Garder ce travail distinct des correctifs de sécurité disponibles dans les branches actuelles.

## Vérification de livraison

Relancer après installation à partir du lock : `npm audit --omit=dev --audit-level=high`, puis les contrôles de types, lint, tests et build de production. Conserver les versions résolues et le rapport d'audit daté. Tester aussi les images Open Graph/Twitter et un article avec front matter après la mise à jour de Next. Un contrôle au seuil `high` réussi accepte toujours les alertes modérées documentées ci-dessus ; il ne signifie pas « zéro vulnérabilité ».
