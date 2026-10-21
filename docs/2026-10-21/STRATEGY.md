# Sourcing Lab USA — stratégie SEO, visibilité IA et acquisition sur 90 jours

Date : 21 octobre 2026. Document de recherche et de planification. Le code examiné au démarrage correspondait à `401bd35`, après synchronisation du dépôt. Les observations de concurrents et la documentation officielle ont été consultées le 21 octobre 2026. Les travaux de mise en œuvre et leur validation sont documentés séparément dans ce dossier.

## Décision commerciale et limites des observations

La priorité est de générer des opportunités B2B qualifiées pour deux parcours : entreprises américaines cherchant une fabrication internationale, puis fabricants internationaux préparant leur développement commercial aux États-Unis. Le sourcing en Chine, le textile et le packaging constituent un point d'appui concret ; les autres projets sont examinés selon leur faisabilité. La nouvelle instruction du fondateur autorise le positionnement à deux piliers et prime sur l'ancienne limitation de l'offre dans `AGENTS.md`.

Présenter une marque tournée vers les États-Unis ne prouve pas une implantation américaine. Les contenus doivent distinguer les projets disponibles aujourd'hui, la coordination par des partenaires internationaux indépendants et la future implantation américaine. Le devis doit identifier l'entreprise contractante réelle. Aucun nom d'entité, bureau américain, visa obtenu, prix d'abonnement, réseau de clients ou résultat commercial n'est déduit de cette stratégie.

Aucun accès authentifié en direct à Search Console, Bing Webmaster Tools, GA4, un CRM, un outil de volumes de recherche ou une base de backlinks n'a été utilisé pour cette recherche. Un export historique Search Console a été analysé séparément en lecture seule et remis au fondateur dans un rapport local privé. Ses chiffres ne sont pas publiés dans le dépôt. Les volumes de marché, difficultés SEO, positions actuelles et performances commerciales restent non mesurés. Les données historiques d'un export ne sont ni des classements actuels vérifiés ni des citations dans une réponse IA.

## Points de départ observés dans le dépôt

- Des URL commerciales utiles existent déjà : `/china-sourcing`, `/china-sourcing-agent`, `/private-label-manufacturing`, `/product-development`, `/factory-verification`, `/landed-cost-analysis`, `/us-market-entry` et `/us-sales-representation`. Les conserver évite une migration sans nécessité.
- Les pages de représentation et d'entrée sur le marché évoquaient une présence locale, une équipe sur place, des délais et des capacités réglementaires non étayés. Les réécrire est prioritaire pour la crédibilité et l'exactitude.
- Le sitemap est déjà produit par Next.js ; ses entrées doivent correspondre aux pages canoniques réellement indexables. Éviter les dates de modification renouvelées artificiellement.
- La bibliothèque contient déjà des guides RFQ, vérification fournisseur, coût rendu, textile et packaging. Les améliorer avant de multiplier les articles.
- `docs/geo/benchmark-prompts.json` contient déjà 120 questions. `visibility-runs.json` ne prétend pas avoir testé les plateformes IA. Cette distinction honnête doit être conservée ; ajouter une tranche explicite sur l'entrée aux États-Unis.
- Les anciennes URL proches ne prouvent pas une cannibalisation réelle. Comparer leur contenu, leur fonction et les futures données Search Console avant de décider une fusion et une redirection.

## Références officielles qui orientent l'exécution

Le [guide Google sur l'optimisation pour les fonctionnalités IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), annoncé le [15 mai 2026](https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing), privilégie un contenu original et les fondamentaux de recherche. Il n'existe pas de schéma spécial ou de fichier `llms.txt` nécessaire pour Google. Les réponses directes proposées ici servent les acheteurs ; elles ne constituent pas une formule de classement.

La documentation actuelle de [Search generative AI control](https://support.google.com/webmasters/answer/16908024) indique un déploiement mondial le 31 août 2026 et décrit le réglage d'inclusion dans Search Console. Le propriétaire doit vérifier le réglage effectif et son héritage ; son état pour ce site n'a pas été observé. Le [rapport Generative AI performance](https://support.google.com/webmasters/answer/16984139) décrit des impressions dans AI Overviews et AI Mode, avec des dimensions page, pays, date et appareil. Un rapport absent peut refléter un volume d'impressions insuffisant. Ne pas traiter ses chiffres comme des ventes ou les additionner sans précaution aux données Web dont ils sont issus.

Le [rapport AI Performance de Bing, annoncé le 10 février 2026](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/), concerne Copilot, les synthèses IA de Bing et certains partenaires. Il présente les citations, les pages citées et un échantillon de requêtes de grounding. Ces mesures ne donnent ni la position dans une réponse ni une note d'autorité. Disponibilité et données du compte du fondateur : à vérifier.

Les [seuils Core Web Vitals de Google](https://web.dev/articles/defining-core-web-vitals-thresholds) sont, au 75e percentile, LCP ≤ 2,5 s, INP ≤ 200 ms et CLS ≤ 0,1. Les mesures terrain doivent rester séparées des tests de laboratoire. Un score Lighthouse seul ne prouve pas une réussite terrain.

Selon les [instructions sitemap de Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), `lastmod` doit refléter une modification substantielle et exacte ; Google ignore `priority` et `changefreq`. Le [journal officiel Google](https://developers.google.com/search/updates) indique la fin des résultats enrichis FAQ au 7 mai 2026. Des FAQ utiles et un balisage Schema.org valide peuvent être conservés, sans promettre cet affichage.

## Architecture recommandée et préservation des URL

| Niveau | Destination | Rôle et prochaine action |
|---|---|---|
| Accueil | `/` | Expliquer les deux publics et proposer deux choix visibles : fabricant recherché / développement aux États-Unis. |
| Pilier sourcing | `/china-sourcing` | Page commerciale principale pour les projets chinois ; montrer le déroulement, les livrables et les limites. |
| Sourcing international | `/product-sourcing` | Cadre plus large, faisabilité par produit et pays ; ne pas promettre une couverture mondiale déjà opérationnelle. |
| Choix du partenaire | `/china-sourcing-agent` | Expliquer le rôle d'un agent, les responsabilités et les modèles de rémunération ; distinguer son intention de `/china-sourcing`. |
| Manufacturing | `/private-label-manufacturing`, `/product-development` | Séparer personnalisation d'un produit existant, développement et modalités OEM/ODM sans définitions excessivement rigides. |
| Maîtrise fournisseur | `/factory-verification`, `/quality-control-china` | Vérifications, points de contrôle, coordination de tiers selon accord ; aucune certification indépendante supposée. |
| Spécialités | `/custom-packaging`, `/custom-textile`, `/sportswear-sourcing`, `/private-label-packaging` | Briefs concrets, variantes, approbation d'échantillons, quantité et destination. |
| Parcours import | `/china-to-us-procurement`, `/import-from-china`, `/landed-cost-analysis`, `/hs-code-consulting` | Expliquer responsabilités et recherche documentaire ; renvoyer les décisions douanières aux professionnels appropriés. |
| Pilier entrée USA | `/us-market-entry` | Faisabilité, positionnement, canaux, plan de travail et formulaire fabricant. |
| Offre récurrente | `/us-sales-representation` | Périmètre mensuel, reporting, prospection et coordination ; prix, commission, territoire et exclusivité fixés dans une proposition approuvée. |
| Conseil existant | `/market-entry-consulting` | Donner une fonction distincte de cadrage stratégique ; fusion éventuelle après analyse des données, jamais par simple similarité de mots. |
| Outils prioritaires | `/tools/landed-cost-calculator`, `/tools/us-market-entry-assessment` | Fournir un résultat utile avant la demande de contact ; calculs/hypothèses et limites visibles. |
| Ressources | `/resources`, `/blog`, `/resources/product-sourcing-brief` | Relier modèles téléchargeables, outils, guides et services. |
| Confiance | `/about`, `/how-we-work`, `/editorial-policy`, `/contact-us`, `/privacy` | Expérience factuelle du fondateur, procédure, politique éditoriale et contact opérationnel. |
| Documents contractuels | À confirmer avec le fondateur | Préparer les points nécessaires aux conditions de service ; ne pas publier de nouvelles obligations, identité ou clauses sans validation. |

Le menu, les liens dans les contenus et le pied de page doivent relier chaque pilier à son outil et à sa qualification. Les URL proposées dans le prompt telles que `/global-sourcing`, `/oem-odm-manufacturing` ou `/apparel-manufacturing` ne justifient pas seules la création de doublons. Une page distributeurs ou une page dédiée aux fabricants chinois/européens n'est publiée que si elle apporte un processus et des preuves distincts. Les traductions doivent rester cohérentes avec l'offre actuelle ; réserver `hreflang` aux équivalents réels.

## Carte des opportunités de mots-clés

Les priorités et le potentiel ci-dessous sont des hypothèses commerciales fondées sur la proximité avec un projet payant. Pour chaque ligne, demande mensuelle américaine, difficulté SEO, CPC et position actuelle sont inconnus et à valider. Les observations de l'export historique et leurs limites ont été remises au fondateur séparément. Les destinations proposées doivent être vérifiées par un croisement requête–page ; les impressions ne sont pas un volume mensuel de marché. Le paysage concurrentiel ci-dessous décrit des sites observés, pas une étude de parts de voix.

| Groupe de requêtes en anglais | Intention | Page principale | Priorité / potentiel de qualification | Contenu qui soutient la conversion |
|---|---|---|---|---|
| china sourcing company; china manufacturing partner | Sélection de prestataire | `/china-sourcing` | P1 / élevé | Étapes, responsabilités, exemples de livrables, demande de devis. |
| china sourcing agent; china sourcing agent cost | Prestataire et coût | `/china-sourcing-agent` | P1 / élevé | Différences agent/fournisseur, modèles de facturation sans tarifs inventés. |
| product sourcing company; overseas manufacturing sourcing | Prestataire | `/product-sourcing` | P1 / élevé | Critères de faisabilité, chaîne de coordination, brief. |
| international procurement services; supplier sourcing services | Prestataire | `/supplier-sourcing` | P2 / élevé si projet adapté | Livrables de recherche fournisseur et critères de sélection. |
| find manufacturers in china; factory sourcing china | Recherche d'une solution | `/china-sourcing` | P1 / élevé | Méthode opérationnelle et lien vers le guide pratique. |
| how to find manufacturers in China | Information préalable | `/blog/china-sourcing-guide-us-businesses` | P1 / intermédiaire | Guide, RFQ, lien vers devis sourcing. |
| china factory verification; verify Chinese supplier | Réduction du risque | `/factory-verification` | P1 / élevé | Vérifications possibles, limites et documentation attendue. |
| china factory audit; supplier audit china | Expertise spécialisée | `/supplier-audit-china` | P2 / conditionnel | Distinguer coordination d'un audit tiers et audit certifié exécuté en propre. |
| private label manufacturer; private label manufacturing china | Fabrication | `/private-label-manufacturing` | P1 / élevé | Produit de départ, adaptations, échantillons et budget. |
| custom manufacturing china; OEM manufacturing china; ODM manufacturing china | Développement/fabrication | `/product-development` | P1 / élevé | Fichiers nécessaires, faisabilité, propriété des outils à convenir. |
| quality control china | Contrôle production | `/quality-control-china` | P2 / élevé si périmètre adapté | Checkpoints et rôle des inspecteurs indépendants. |
| custom packaging manufacturer china; custom packaging sourcing | Achat/fabrication | `/custom-packaging` | P1 / élevé | Formats, dimensions, finitions, quantités et destination. |
| private label packaging | Fabrication de marque | `/private-label-packaging` | P2 / élevé | Distinguer packaging et fabrication du produit contenu. |
| apparel manufacturer china; textile sourcing company | Fabrication | `/custom-textile` | P1 / élevé | Tech pack, tissu, tailles, couleurs et volumes. |
| sportswear manufacturer china | Fabrication spécialisée | `/sportswear-sourcing` | P2 / élevé | Construction, usage, preuves à demander pour les performances revendiquées. |
| import products from china to usa | Mise en œuvre import | `/import-from-china` | P2 / intermédiaire | Qui fait quoi, coûts à rechercher, professionnels concernés. |
| landed cost analysis service | Conseil de projet | `/landed-cost-analysis` | P1 / élevé | Hypothèses, postes de coût et scénarios. |
| landed cost calculator; China import cost calculator | Utilitaire | `/tools/landed-cost-calculator` | P1 / intermédiaire à élevé | Calcul modifiable et proposition d'examiner le projet réel. |
| china import tariffs usa; section 301 tariffs | Recherche réglementaire | `/import-from-china` | P2 / variable | Sources datées et méthode ; aucune grille de taux universelle. |
| HTS code classification | Recherche spécialisée | `/hs-code-consulting` | P2 / conditionnel | Recherche documentaire, limites, vérification par professionnel. |
| us market entry consulting; us market entry services | Choix d'accompagnement | `/us-market-entry` | P1 / élevé | Parcours, livrables, qualification du fabricant. |
| us market feasibility research; us market research for manufacturers | Cadrage | `/market-entry-consulting` | P2 / élevé | Segments acheteurs, concurrence et hypothèses économiques à tester. |
| us sales representative for foreign manufacturers | Représentation commerciale | `/us-sales-representation` | P1 / élevé | Prospection, reporting, périmètre mensuel, conditions sur proposition. |
| american sales agent for chinese manufacturers; us business development for manufacturers | Représentation | `/us-sales-representation` | P1 / élevé | Ciblage, documentation commerciale, processus d'introduction sans garantie. |
| find distributors in usa; us distributor search | Recherche de partenaires | `/us-market-entry` | P1 / élevé | Section distributeurs substantielle ; page autonome seulement si nécessaire. |
| china to usa market entry; how Chinese manufacturers sell in America | Entrée commerciale | `/us-market-entry` | P2 / élevé | Cas de préparation chinois documentés, sans page pays artificielle. |
| European manufacturer US market entry | Entrée commerciale | `/us-market-entry` | P2 / élevé | Différences de préparation et canaux réels, pas de stéréotypes de marché. |
| US market entry readiness assessment | Auto-évaluation | `/tools/us-market-entry-assessment` | P1 / intermédiaire à élevé | Résultat explicable, lacunes et demande d'évaluation. |

Validation à effectuer après accès aux comptes : extraire 90 jours de requêtes/pages Search Console avec segment États-Unis, compléter par Keyword Planner ou une base SEO autorisée avec date/pays/source, relever les pages réellement présentes dans des résultats américains comparables, puis mesurer les demandes qualifiées par page. Conserver une seule destination principale par intention. Si deux pages servent la même intention sans contenu distinct, examiner impressions, liens et conversions avant la consolidation.

## Benchmark de concurrents et acteurs adjacents

Observation publique de contenu, navigation et mécanismes de conversion ; aucune vérification indépendante des affirmations de ces sociétés. Ni trafic, ni backlinks, ni domination des résultats ne sont mesurés.

| Acteur et source consultée | Observation directe | Enseignement pour Sourcing Lab USA |
|---|---|---|
| [Sofeast](https://www.sofeast.com/) | Parcours distincts pour ingénierie produit, assurance qualité et chaîne fournisseur ; bibliothèque de guides, podcasts et glossaire ; CTA de contact selon le problème. | Donner des étapes et livrables compréhensibles, relier les ressources aux services. Ne pas reprendre ses moyens techniques ou certifications. |
| [JingSourcing](https://jingsourcing.com/) | Parcours « trouver des fournisseurs » et « gérer mes fournisseurs », liens private label/développement/qualité, guide d'import et section fondateur. | Segmenter par situation du prospect et expliquer le modèle économique. Éviter ses promesses absolues de qualité/économies. |
| [Intralink — North America](https://www.intralinkgroup.com/markets/north-america) | Présente l'accompagnement de sociétés asiatiques et européennes vers le marché américain, les secteurs et des contacts. | Définir le public fabricant et les canaux de vente ; publier seulement les implantations réellement propres à Sourcing Lab USA. |
| [ALTIOS](https://altios.com/) | Sépare priorisation de marchés, développement commercial et services d'implantation ; propose des publications, partenaires et success stories. | Séparer faisabilité, prospection et services spécialisés ; prouver les compétences par des travaux autorisés. |
| [Foothold America](https://www.footholdamerica.com/) | Acteur adjacent centré notamment sur implantation/emploi ; sa navigation propose un readiness calculator, comparaisons et études de cas. | Un outil de préparation est un format concurrent réel. Se différencier avec un diagnostic spécifique aux produits, coûts, capacités et acheteurs B2B. |
| [Guided Imports](https://guidedimports.com/) | L'accueil observé privilégie freight forwarding, préparation FBA et logistique ; CTA de devis. | Acteur adjacent actuel plutôt que concurrent sourcing identique. Éviter un benchmark basé sur son ancienne réputation uniquement. |

Opportunité à tester : un brief de fabrication suffisamment précis pour rendre les devis comparables, un coût rendu avec hypothèses visibles et un diagnostic fabricant qui mène à un plan commercial concret. Cette proposition découle des besoins acheteurs ; elle ne prouve pas que le marché est sans concurrence.

## Politique de robots et lisibilité machine

Laisser les contenus publics commerciaux accessibles et protéger réellement les API, documents privés et comptes. `robots.txt` n'est pas un contrôle de sécurité. Les groupes spécifiques doivent conserver les exclusions nécessaires ; ne pas supposer qu'ils héritent du groupe générique. Vérifier aussi les règles de l'hébergeur/CDN et les journaux disponibles.

| Agent / contrôle | Rôle vérifié | Politique recommandée |
|---|---|---|
| Googlebot / Bingbot | Découverte et recherche | Autoriser les pages publiques canoniques et ressources nécessaires au rendu. |
| OAI-SearchBot | Recherche ChatGPT | Autoriser les pages publiques ; contrôler les requêtes avec les plages IP officielles plutôt que le nom d'agent seul. |
| GPTBot | Collecte susceptible de servir à l'entraînement | Décision distincte de la recherche ; un blocage conservateur reste compatible avec l'autorisation d'OAI-SearchBot. |
| ChatGPT-User | Consultation déclenchée par utilisateur | Ne pas le confondre avec le crawler de recherche ; les règles robots peuvent ne pas s'appliquer à ces actions. |
| PerplexityBot | Recherche Perplexity, pas entraînement de modèles de fondation | Autoriser l'exploration publique et vérifier les IP publiées si une règle WAF est requise. |
| Perplexity-User | Consultation demandée par utilisateur | Accès utilisateur distinct de l'indexation ; ne pas supposer que robots suffit à le contrôler. |
| Google-Extended | Contrôle pour entraînement et grounding de certains produits Gemini/Vertex | Décision documentée séparément : le bloquer peut affecter l'objectif Gemini ; ce n'est pas un bouton de classement Google Search. |
| Search Console / Search generative AI | Inclusion dans certaines fonctionnalités IA Search | Vérifier le réglage effectif et l'héritage dans le compte propriétaire. |

Sources : [OpenAI — crawlers](https://developers.openai.com/api/docs/bots), [Perplexity — crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), [Google — common crawlers / Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended). Une autorisation technique ne garantit aucune indexation ou recommandation. Ne pas généraliser un simple groupe wildcard à tous les robots futurs.

Le graphe JSON-LD doit relier Organization, WebSite, WebPage, Service, BreadcrumbList, Person et Article uniquement là où ils correspondent au contenu visible. Garder les identifiants stables. Une zone servie « United States » exprime une cible commerciale, pas une adresse. Ajouter `sameAs` uniquement pour des profils vérifiés. La validité Schema.org et l'éligibilité à un affichage Google sont deux vérifications distinctes.

`llms.txt` reste une ressource facultative expérimentale si elle est maintenue à jour. Elle ne doit pas contenir une offre plus large que les pages publiques ni être présentée comme une exigence d'indexation IA.

## Ressources, contenu et conversion

Publier progressivement après revue : une ressource substantielle et sa page de service liée valent davantage qu'une série de pages quasi identiques. Ordre conseillé :

1. RFQ téléchargeable et guide pour comparer des devis : spécification, quantité, variantes, échantillons, emballage, livraison et responsabilités.
2. Calculateur de coût rendu : total et coût unitaire, champs modifiables, scénario favorable/prudent, absence de double comptage. Les droits saisis sont des hypothèses de l'utilisateur ; ne pas fabriquer un taux officiel ni conclure qu'une classification est correcte.
3. Diagnostic d'entrée USA : dimensions acheteurs, produit, documentation, capacité/échantillons, prix/marge, canaux, budget et suivi. Un score de préparation est une heuristique explicable, pas une probabilité statistique de vente ni une validation réglementaire.
4. Checklist de vérification fournisseur et grille d'évaluation distributeur avec questions, preuves demandées et limites.
5. Deux guides de décision : agent vs distributeur ; offre de représentation et livrables d'un mois de travail. Expliquer les modèles sans publier de prix définitif.
6. Cas réel anonymisé uniquement après documents et autorisation ; sinon, exemple pédagogique clairement désigné, sans résultat client inventé.

Pour les contenus douaniers ou de conformité, conserver un registre source/date/auteur/relecteur et vérifier avant publication. Sources de départ : [HTSUS — USITC](https://hts.usitc.gov/), [USTR — Section 301](https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions), [CPSC — Business Education](https://www.cpsc.gov/Business--Manufacturing/Business-Education), [FTC — textile labeling](https://www.ftc.gov/business-guidance/resources/threading-your-way-through-labeling-requirements-under-textile-wool-acts). La page CBP « Importing into the United States » a renvoyé 403 à l'outil pendant cette recherche ; aucun taux n'en a été déduit. Les taux, régimes, classifications et décisions doivent être vérifiés pour le produit, l'origine et la date avec les professionnels compétents.

Les deux parcours utilisent des formulaires de qualification distincts, avec un début court et des champs complémentaires facultatifs. Le parcours sourcing demande société, email professionnel, catégorie, spécification et quantité ; le parcours fabricant demande société, pays, produit, capacité et objectif aux États-Unis. Afficher l'usage des données. N'émettre la conversion lead qu'après acceptation réelle du serveur. Pour les pièces techniques, vérifier le mécanisme d'envoi privé, les limites et les accès avant d'annoncer un upload sécurisé.

## Cadre de test de visibilité IA : 48 questions réutilisables

Les questions ci-dessous complètent l'inventaire existant ; **elles ne sont pas des tests exécutés**. L'ordre hebdomadaire stable proposé est S01–S08, C01–C04 et M01–M08 ; le jeu complet est mensuel. Utiliser des conversations neuves sans mention préalable de la marque. Les questions ne demandent pas au système de recommander artificiellement Sourcing Lab USA.

| ID | Question en anglais | Destination à évaluer |
|---|---|---|
| S01 | Which companies help U.S. businesses find manufacturers in China? | `/china-sourcing` |
| S02 | How do I choose a China sourcing agent for a new product? | `/china-sourcing-agent` |
| S03 | Who can coordinate private label manufacturing for an American brand? | `/private-label-manufacturing` |
| S04 | What should I send a sourcing company to get a useful manufacturing quote? | `/resources/product-sourcing-brief` |
| S05 | How can I find a Chinese factory for custom packaging? | `/custom-packaging` |
| S06 | Who can help source apparel from China using my tech pack? | `/custom-textile` |
| S07 | How do American importers verify a Chinese manufacturer? | `/factory-verification` |
| S08 | What does a sourcing agent actually do during production? | `/china-sourcing-agent` |
| S09 | How much does a China sourcing agent cost and how are fees structured? | `/china-sourcing-agent` |
| S10 | What is the difference between a sourcing agent and a trading company? | `/blog/alibaba-vs-sourcing-company` |
| S11 | What should I compare before choosing between Chinese supplier quotations? | `/resources` |
| S12 | What information belongs in a China manufacturing RFQ? | `/blog/china-sourcing-rfq-checklist` |
| S13 | How should I set up sample approval before a production order? | `/product-development` |
| S14 | How do I negotiate manufacturing MOQs without changing product quality? | `/private-label-manufacturing` |
| S15 | What is the difference between OEM, ODM and private label manufacturing? | `/product-development` |
| S16 | Who can help coordinate sportswear samples and production in China? | `/sportswear-sourcing` |
| S17 | What specifications matter for custom printed packaging? | `/custom-packaging` |
| S18 | How do I prepare sizes, colors and quantities for an apparel quote? | `/custom-textile` |
| S19 | How do I distinguish factory verification from a product inspection? | `/factory-verification` |
| S20 | Which quality checkpoints should I agree before manufacturing overseas? | `/quality-control-china` |
| C01 | How can I calculate landed cost for an import order from China? | `/tools/landed-cost-calculator` |
| C02 | Which costs are missing from a factory's FOB quotation? | `/landed-cost-analysis` |
| C03 | Where should I verify current U.S. tariffs for a Chinese product? | `/import-from-china` |
| C04 | Who should confirm an HTSUS classification before I import? | `/hs-code-consulting` |
| C05 | How can I compare two suppliers with different freight terms? | `/landed-cost-analysis` |
| C06 | How should an importer account for samples, tooling and packaging costs? | `/tools/landed-cost-calculator` |
| C07 | What responsibilities should be agreed when a product is shipped directly from China to a U.S. buyer? | `/china-to-us-procurement` |
| C08 | What documents should I prepare before discussing an import project with a customs broker? | `/import-from-china` |
| M01 | Who can help a foreign manufacturer find customers in the United States? | `/us-sales-representation` |
| M02 | How can a Chinese factory find suitable U.S. distributors? | `/us-market-entry` |
| M03 | How can European manufacturers enter the U.S. market? | `/us-market-entry` |
| M04 | What does a U.S. market entry consultant do for manufacturers? | `/us-market-entry` |
| M05 | How is a sales representative different from a distributor? | `/us-sales-representation` |
| M06 | How much does outsourced U.S. sales representation cost? | `/us-sales-representation` |
| M07 | What should a monthly manufacturer representation retainer include? | `/us-sales-representation` |
| M08 | How do I assess whether my factory is ready to sell to American buyers? | `/tools/us-market-entry-assessment` |
| M09 | What information does a foreign manufacturer need before approaching U.S. buyers? | `/us-market-entry` |
| M10 | How do I research U.S. competitors and wholesale prices before entering the market? | `/market-entry-consulting` |
| M11 | How can a manufacturer choose between direct sales and U.S. distributors? | `/us-market-entry` |
| M12 | What questions should I ask before hiring a commercial representative? | `/us-sales-representation` |
| M13 | How can I evaluate whether a U.S. distributor is a good fit for my products? | `/us-market-entry` |
| M14 | What should a U.S. market entry budget include for an overseas manufacturer? | `/market-entry-consulting` |
| M15 | What sales materials should a factory prepare for American wholesale buyers? | `/us-sales-representation` |
| M16 | How should I measure progress during the first three months of outsourced B2B prospecting? | `/us-sales-representation` |
| M17 | Who can help an international packaging manufacturer approach American brands? | `/us-market-entry` |
| M18 | What should an apparel manufacturer prepare before seeking U.S. sales representation? | `/us-market-entry` |
| M19 | How are sales commissions and monthly representation retainers usually discussed? | `/us-sales-representation` |
| M20 | How can an overseas manufacturer test U.S. demand before committing to local infrastructure? | `/tools/us-market-entry-assessment` |

Exécuter sur ChatGPT Search, AI Overviews, AI Mode, Gemini, Perplexity et Copilot seulement via une interface accessible ou une API officielle autorisée. Une API ne représente pas automatiquement le produit grand public. Si la fonction IA n'apparaît pas ou l'accès est indisponible, noter `unavailable` ; pour une question non testée, noter `not_run`. Un champ vide n'est pas un zéro.

Chaque observation doit enregistrer : identifiant de question, formulation exacte, plateforme, modèle si exposé, date/heure, langue, pays réel et conditions de compte, recherche activée ou non, état d'exécution, mention de marque, recommandation explicite, URL citée exacte, concurrents nommés, contexte et erreur factuelle éventuelle, preuve/transcription et page visée. Les données de référent et conversions, si disponibles, se mesurent séparément sur le site.

Relever séparément taux de mentions, de citations du domaine et de recommandations, avec dénominateur de questions effectivement testées et couverture par plateforme. Répéter trois fois une tranche stable pour observer la volatilité. Conserver toutes les observations, y compris négatives, et comparer des conditions similaires. Le score éditorial existant est une aide interne ; il ne remplace pas ces observations.

## Mesure commerciale et tableau de bord minimal

Le succès principal est une **opportunité B2B qualifiée**, définie dans le registre commercial : entreprise identifiable, besoin correspondant à l'offre, projet exploitable, interlocuteur pertinent et prochaine étape acceptée. Une demande reçue reste un lead jusqu'à cette qualification. Mesurer séparément les commandes ou acomptes sourcing et les engagements de représentation signés/payés.

| Indicateur | Source à connecter / vérifier | Fréquence | Utilisation |
|---|---|---|---|
| Leads sourcing et market entry reçus | Enregistrements serveur, dédupliqués | Hebdomadaire | Contrôle livraison des formulaires. |
| Opportunités qualifiées par pilier et page d'entrée | CRM restreint | Hebdomadaire | Mesure primaire d'acquisition. |
| Taux démarrage → soumission acceptée | Analytics consenti + journaux | Hebdomadaire | Identifier les abandons et erreurs, en affichant les limites de consentement. |
| Proposition → commande/acompte ou contrat payé | CRM et comptabilité | Mensuelle | Vérifier la valeur économique, sans déduire une vente d'un clic. |
| Clics et impressions organiques non-marque, États-Unis | Search Console / Bing | Mensuelle | Diagnostiquer demande et visibilité utiles. |
| Pages canoniques indexées / exclues | Search Console / Bing | Mensuelle | Examiner les exclusions et erreurs. |
| Impressions des fonctionnalités IA Google | Rapport GenAI Search Console, si données | Mensuelle | Suivi par page/pays/appareil, sans double comptage Web. |
| Citations et pages citées Bing | AI Performance, si disponible | Mensuelle | Observer citations et requêtes échantillonnées, sans les appeler rankings. |
| Mentions/citations sur le panel IA | Observations prouvées | Mensuelle | Répétabilité et exactitude des réponses. |
| Référents IA → leads qualifiés | Analytics et CRM, si mesurable | Mensuelle | Attribution partielle ; certaines visites sont sans référent. |
| p75 LCP / INP / CLS mobile | CrUX/Search Console ou RUM adapté | Mensuelle | Distinguer données terrain, laboratoire et absence de volume. |

Le dashboard peut être un tableau mensuel avec mois, pilier, page d'entrée, leads reçus, opportunités qualifiées, propositions, commandes/contrats payés, valeur et devise, clics non-marque, impressions IA, citations Bing et couverture des tests IA. Baseline et objectif commercial : à renseigner après accès aux données, jamais à inventer. Les montants clients et coordonnées restent hors du dépôt public.

Préparation des comptes : vérifier la propriété DNS Search Console et Bing Webmaster Tools, soumettre le sitemap canonique, examiner URL Inspection sur les deux parcours, vérifier le contrôle GenAI Google et les rapports disponibles. Vérifier GA4/consentement et les événements réels en DebugView ; ne pas activer un identifiant factice. [IndexNow](https://www.indexnow.org/documentation) peut notifier des URL changées après déploiement : clé de propriété servie sur le domaine, URL canoniques modifiées et contrôle des réponses. Un HTTP 200 signifie réception de la notification, pas indexation garantie.

## Feuille de route : 22 octobre 2026 – 19 janvier 2027

Les chiffres de production ci-dessous sont des engagements de travail proposés, pas des prévisions de trafic ou de ventes. Le calendrier commercial et les prix restent à confirmer par le fondateur.

| Période | Travail prioritaire | Critère de sortie mesurable |
|---|---|---|
| J1–J7 / 22–28 octobre | Fiabiliser les affirmations, harmoniser l'accueil et les deux piliers, distinguer les formulaires, corriger erreurs SEO prioritaires. | Pages prioritaires avec un H1, titre/description/canonical propres ; aucune présence américaine inventée ; soumissions vérifiées sans sollicitation réelle non voulue. |
| J8–J14 / 29 octobre–4 novembre | Finaliser et tester les deux outils ; liens standards HTML ; sitemap/robots ; revue clavier et mobile. | Calculs documentés et cas vérifiés ; erreurs et entrées invalides gérées ; aucun doublon canonique dans le sitemap ; parcours clavier/mobile utilisables. |
| J15–J30 / 5–20 novembre | Vérifications comptes, baseline search/analytics/CRM ; améliorations RFQ et vérification fournisseur ; panel IA initial selon accès. | Baseline datée ou accès explicitement manquant ; 2 ressources relues ; panel de 48 questions prêt avec nombre effectivement testé et preuves. |
| J31–J45 / 21 novembre–5 décembre | Guide agent vs distributeur ; grille distributeur ; périmètre mensuel de représentation à faire approuver ; recherche concurrentielle américaine ciblée. | 2 ressources distinctes reliées aux pages commerciales ; proposition de livrables et mesure définies ; aucune tarification publiée sans accord. |
| J46–J60 / 6–20 décembre | Revue des premiers leads ; corriger frictions formulaires ; enrichir le contenu à partir des questions réellement reçues ; documenter un projet autorisé si disponible. | Revue de toutes les demandes reçues ; motifs de qualification renseignés ; deux périodes comparables de mesure séparées par pilier. |
| J61–J75 / 21 décembre–4 janvier | Préparer contributions professionnelles, partenaires et recherche originale ; nouvelle mesure IA et indexation. | Liste argumentée de 10 cibles éditoriales/partenaires légitimes ; panel répété avec couverture ; aucune prospection externe envoyée sans instruction. |
| J76–J90 / 5–19 janvier | Prioriser les pages selon opportunités qualifiées ; consolidation uniquement étayée ; plan du trimestre suivant. | Rapport 90 jours séparant implémentation, visibilité, leads et revenus ; décisions justifiées par données ou limites explicites. |

## Autorité externe et recherche originale

Préparer une liste courte de partenaires, associations et publications liés aux secteurs réellement servis. Les opportunités comprennent un entretien du fondateur sur un processus documenté, une contribution pratique sur le brief industriel, une collaboration logistique autorisée et une publication expliquant les coûts souvent omis d'une comparaison fournisseur. Évaluer la pertinence du lectorat et les visites qualifiées plutôt qu'un nombre brut de liens.

Une recherche originale possible : comparer des **devis anonymisés autorisés** et compter les informations manquantes (Incoterm, emballage, outillage, quantité, validité). Publier méthode, effectif, période, catégories et limites ; ne pas présenter un petit échantillon comme une statistique de marché. Si les devis réels ne sont pas disponibles, publier un modèle de comparaison clairement pédagogique.

Le fondateur peut préparer des publications LinkedIn et contributions techniques avec preuves, sans faux témoignages, achats de liens ou annuaires massifs. Aucun message à un tiers, demande de lien, inscription de profil ou publication externe n'est envoyé dans le cadre de cette recherche. Ajouter les profils contrôlés au graphe d'entité après vérification. Un futur lieu américain sera ajouté lorsque l'activité et l'adresse seront réelles et éligibles ; aucune page locale artificielle ou fiche d'établissement fictive ne doit précéder cette étape.
