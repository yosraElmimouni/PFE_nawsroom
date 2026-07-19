# Newsroom USMS — Application mobile (Frontend)

Application mobile multiplateforme de journalisme **Newsroom USMS**, développée avec **Ionic/Angular/Capacitor**, dans le cadre d'un PFE pour France Télévisions. Elle consomme l'API backend NestJS documentée séparément.

## Sommaire

- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Authentification](#authentification)
- [Fonctionnalité hors-ligne (offline-first)](#fonctionnalité-hors-ligne-offline-first)
- [Modules fonctionnels](#modules-fonctionnels)
- [Assistant conversationnel IA](#assistant-conversationnel-ia)
- [Gestion des médias](#gestion-des-médias)
- [Variables d'environnement](#variables-denvironnement)
- [Installation et démarrage](#installation-et-démarrage)
- [Points d'attention](#points-dattention)

## Stack technique

| Composant | Technologie |
|---|---|
| Framework UI | Ionic + Angular |
| Conteneur natif | Capacitor (Android/iOS/Web) |
| Authentification | MSAL (Azure Entra ID) via `@azure/msal-angular` |
| Stockage local | SQLite (`@capacitor-community/sqlite`), avec support web via `jeep-sqlite` |
| Réseau | `@capacitor/network` pour la détection en ligne/hors ligne |
| Médias | `@capacitor/camera`, upload direct vers Cloudinary |
| Rendu Markdown | `ngx-markdown` (réponses de l'assistant IA) |
| Backend consommé | API NestJS déployée sur Render (`https://newsroom-ai-api-u0vt.onrender.com`) |

## Architecture du projet

```
src/
├── app/
│   ├── app.module.ts          # Module racine : Ionic, MSAL, initialisation SQLite/réseau au démarrage
│   ├── app-routing.module.ts  # Routes principales, lazy-loading par feature
│   ├── core/
│   │   ├── auth/               # Guard de route + configuration MSAL
│   │   ├── models/             # Interfaces TypeScript + enums (miroir des entités backend)
│   │   ├── services/
│   │   │   ├── sqlite.service.ts    # Cache local + file d'opérations en attente
│   │   │   ├── network.service.ts   # Détection de connectivité
│   │   │   ├── sync.service.ts      # Synchronisation différée vers le backend
│   │   │   └── gemini.ts            # Service Gemini (voir section IA — actuellement inutilisé)
│   │   └── core.module.ts      # Initialisation MSAL
│   └── features/
│       ├── auth/login/          # Écran de connexion (MSAL)
│       ├── dashboard/           # Tableaux de bord (journaliste, éditeur, admin)
│       ├── articles/            # Liste, rédaction, détail des articles
│       ├── capture/              # Capture photo/vidéo + upload Cloudinary
│       ├── agenda/               # Événements à couvrir
│       ├── veille-info/          # Veille informationnelle (actualités externes)
│       ├── ai-assistant/         # Assistant conversationnel
│       └── profile/               # Profil utilisateur
├── environments/                 # Configuration par environnement (clés API, MSAL, Cloudinary)
└── theme/, assets/                # Thème Ionic et ressources statiques
```

Chaque feature est un **module Angular chargé en lazy-loading** (`loadChildren`) avec son propre module de routing, ce qui permet de garder le bundle initial léger.

## Authentification

L'authentification repose exclusivement sur **Azure Entra ID (MSAL)** :

- Sur **web**, `MsalService.loginRedirect()` déclenche une redirection standard OAuth2/OIDC. Au retour, `handleRedirectPromise()` récupère le compte actif dans `login.page.ts` et `auth.guard.ts`.
- Sur **plateforme native (Android/iOS)**, le flux passe par le navigateur système puis un callback custom-scheme (`msauth://ma.ac.usms.newsroom/auth`) ; le jeton applicatif obtenu depuis le backend (`/user/msal-login` ou `/auth/msal-mobile-callback`) est stocké dans `localStorage` (`token`, `user`), et c'est cette présence qui est vérifiée par `AuthGuard` pour éviter de repasser par l'écran de connexion.
- Un `MsalInterceptor` HTTP est enregistré globalement dans `app.module.ts` pour joindre automatiquement les jetons aux appels vers les ressources protégées déclarées dans `protectedResourceMap` (actuellement vide dans `msal.config.ts` — aucune ressource n'y est explicitement mappée).

Il n'existe pas d'écran de connexion classique par email/mot de passe côté frontend : bien que le backend expose `POST /auth/login`, ce flux ne semble pas consommé dans le code du frontend actuel.

## Fonctionnalité hors-ligne (offline-first)

L'application peut fonctionner sans connexion grâce à trois services combinés :

1. **`NetworkService`** : écoute les changements de connectivité (`@capacitor/network`) et expose un `BehaviorSubject<boolean>` (`online$`).
2. **`SqliteService`** : maintient une base SQLite locale avec les tables `articles`, `agendas`, `news_items` (mise en cache des données serveur) et une table générique `pending_operations` qui journalise les créations/modifications/suppressions effectuées hors ligne.
3. **`SyncService`** : s'abonne aux changements de connectivité, attend 2 secondes de stabilité réseau (debounce), puis rejoue les opérations en attente auprès du backend (articles, agenda, veille info) une par une, en marquant chaque opération comme synchronisée une fois le serveur confirmé. Les échecs avec un statut 404 sont considérés comme résolus (l'entité n'existe plus) ; les autres échecs restent en attente pour une prochaine tentative.

Chaque service de feature (`ArticleService`, `ServiceAgenda`, `ServiceVeille`) applique le même patron : lecture réseau si en ligne (avec mise en cache locale du résultat), sinon lecture depuis SQLite ; écriture directe si en ligne, sinon enregistrement dans `pending_operations` avec un `local_id` temporaire en attendant la confirmation serveur.

## Modules fonctionnels

| Module | Rôle |
|---|---|
| **Dashboard** | Trois tableaux de bord distincts selon le rôle : journaliste, éditeur (cellule de validation), administrateur |
| **Articles** | Liste, rédaction (création/édition), détail, et gestion des médias associés à un article |
| **Capture** | Prise de photo/vidéo via la caméra de l'appareil, saisie des informations (titre, description, localisation) puis upload |
| **Agenda** | Consultation et création d'événements à couvrir par la rédaction |
| **Veille Info** | Liste et détail des actualités provenant de sources externes suivies |
| **Assistant IA** | Interface de chat avec historique persistant |
| **Profil** | Informations du compte connecté |

## Assistant conversationnel IA

⚠️ **Point important pour la documentation académique :** deux implémentations coexistent dans le code, mais une seule est réellement utilisée par l'écran de chat.

- **`ai-assistant.ts`** (utilisé par `ai-assistant.page.ts`) : envoie l'historique complet de la conversation à l'API **OpenRouter** (`openrouter/auto` comme modèle), pour conserver le contexte entre les messages.
- **`gemini.ts`** (dans `core/services/`) : appelle directement l'API **Google Gemini**, mais n'est importé par aucune autre partie du code — ce service semble être une implémentation antérieure ou en réserve, non branchée à l'interface actuelle.

L'historique des échanges (question/réponse) est en revanche bien persisté côté backend NestJS via les routes `/ia-analyse` (création, récupération et effacement de l'historique par utilisateur), ce qui correspond à la fonctionnalité réellement en place.

> À vérifier auprès de l'équipe avant de rédiger le rapport : si le sujet du PFE mentionne explicitement "Gemini" comme moteur du chatbot, il conviendrait de clarifier si c'est OpenRouter qui est utilisé en pratique aujourd'hui, ou si `gemini.ts` doit encore être branché.

## Gestion des médias

Le flux de capture fonctionne ainsi :
1. Capture d'une photo via `@capacitor/camera` (`capture.page.ts`), ou sélection/enregistrement d'une vidéo.
2. Upload direct du fichier vers **Cloudinary** (`CloudinaryService`), en `unsigned upload` via le preset `newsroom_upload`.
3. Récupération de l'URL sécurisée Cloudinary (`secure_url`), puis redirection vers l'écran de saisie des métadonnées (`infos-media`).
4. Enregistrement final du média (URL Cloudinary + métadonnées) via `ServiceCapture`, qui appelle le endpoint `POST /media` du backend.

## Variables d'environnement

Le fichier `environment.local.ts` (utilisé en développement/build local) contient :

| Variable | Description |
|---|---|
| `geminiApiKey` | Clé API Google Gemini |
| `msal.clientId` / `msal.authority` | Identifiants de l'application Azure Entra ID |
| `msal.webRedirectUri` / `msal.nativeRedirectUri` | URI de redirection MSAL selon la plateforme |
| `CLOUD_NAME` | Nom du compte Cloudinary utilisé pour l'upload de médias |

`environment.ts` et `environment.prod.ts` (utilisés par `ng build`) sont actuellement vides de ces valeurs (commentées), ce qui signifie que **seul `environment.local.ts` contient une configuration fonctionnelle** aujourd'hui.

## Installation et démarrage

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement (navigateur)
ionic serve

# Build et synchronisation Capacitor pour Android
ionic build
npx cap sync android
npx cap open android
```

## Points d'attention

- **Secrets en clair dans le code source** : la clé API Gemini, l'identifiant client MSAL et le nom de compte Cloudinary sont actuellement en dur dans `environment.local.ts`, un fichier généralement suivi par le contrôle de version. Il est recommandé de les déplacer vers des variables d'environnement non versionnées avant tout partage public du dépôt, et de faire tourner (régénérer) la clé Gemini exposée.
- **Service Gemini non utilisé** : `gemini.ts` existe mais n'est appelé nulle part ; le chat utilise en réalité OpenRouter (voir section dédiée ci-dessus) — à clarifier pour la cohérence du rapport PFE.
- **URLs d'API en dur** : chaque service (`ArticleService`, `ServiceCapture`, `AiAssistant`, etc.) définit son URL d'API backend directement dans le code (avec une ligne commentée pour `localhost:10000`), plutôt que via un fichier de configuration centralisé.
- **`getMedias()` pointe vers `localhost`** : dans `article.service.ts`, la méthode `getMedias(id)` utilise encore `http://localhost:10000/media/Article/${id}` alors que les autres méthodes du même service utilisent l'URL de production Render — probablement un oubli lors du passage en production.
- **`protectedResourceMap` vide** : la configuration de l'intercepteur MSAL (`msal.config.ts`) ne mappe aujourd'hui aucune ressource protégée, ce qui signifie que l'ajout automatique du jeton par `MsalInterceptor` ne cible explicitement aucun appel HTTP particulier.