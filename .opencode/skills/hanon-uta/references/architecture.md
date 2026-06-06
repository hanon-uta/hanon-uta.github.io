# Architecture Reference

## Table of Contents

1. [Entry & Bootstrap](#entry--bootstrap)
2. [Routing](#routing)
3. [Data Loading Pipeline](#data-loading-pipeline)
4. [Composable Orchestration](#composable-orchestration)
5. [State Management](#state-management)
6. [Google Auth & Drive Sync](#google-auth--drive-sync)
7. [Multi-Page Build](#multi-page-build)
8. [Chrome Extension](#chrome-extension)

---

## Entry & Bootstrap

**`index.html`** → **`src/main.ts`**

`main.ts` creates the Vue 3 app and installs plugins in order:

```ts
createApp(App)
  .use(createHead())        // @vueuse/head — <head> management
  .use(createPinia())       // State management
  .use(router)              // Vue Router
  .use(VueLazyload, {...})  // YouTube thumbnail lazy loading
```

Then imports Bootstrap JS (for modals, toasts, tooltips, dropdowns), registers the tooltip directive, and mounts to `#app`. Google Identity Services script is loaded via a `<script>` tag in `index.html`.

---

## Routing

**`src/router/routes.ts`** generates routes dynamically from `VTUBERS` config:

```ts
const vtuberRoutes = VTUBERS.map((v) => ({
  path: v.uri,
  name: v.name.toLowerCase(),
  component: () => import(`../views/${v.name}.vue`),
  meta: { vtuber: v },
}));
```

Each VTuber gets a lazy-loaded route. The default `/` maps to Hanon. Static pages (Terms, Privacy, 404) are defined inline.

**`src/router/index.ts`** creates the router with `createWebHistory()` and a global error handler for chunk load failures (forces full page reload).

**Route structure:**

| Path | View | VTuber |
|---|---|---|
| `/` | `Hanon.vue` | 香鳴ハノン |
| `/saotomegabu` | `Gabu.vue` | 鎖乙女がぶ |
| `/akatsukiclara` | `Clara.vue` | 暁月クララ |
| `/tokiwakaname` | `Kaname.vue` | 常磐カナメ |
| `/terms` | `Terms.vue` | — |
| `/privacy` | `Privacy.vue` | — |
| `/:pathMatch(.*)*` | `404.vue` | — |

---

## Data Loading Pipeline

### Step 1: Build-time glob

Vite's `import.meta.glob` in `loadSongs.ts` collects all JSON files:

```ts
const modules = import.meta.glob('../../assets/data/**/*.json');
```

At build time, these are split into chunks by VTuber name and year (configured in `vite.config.ts`).

### Step 2: JSON parsing → Song[]

`parseSong(video: Video): Song[]` does the heavy lifting:

1. Splits `video.song_timeline` by newline
2. Regex extracts timestamp (`MM:SS` or `HH:MM:SS`), song title, artist name
3. HTML entity decoding via `he`
4. Filters out non-song lines: OP, ED, MC, superchat readings, BGM, etc.
5. Extracts inline tags: `#{=tag1,tag2}` → `Song.tags[]`
6. Generates `youtube_url` with `&t={seconds}s` for timestamp linking
7. Sorts songs by timestamp within each video

### Step 3: Grouping

`groupSongByKana(songs: Song[]): SongMetaGroup[]` groups songs by Japanese kana row (あ行, か行, さ行, etc.) for the `SongMetaListModal`.

### Step 4: Reactive consumption

`useSongData` composable calls `loadSongs()` on mount, stores results in reactive refs:

```ts
const { songs, songMetaGroups } = useSongData(vtuberName);
```

The composable also loads favorites from `favoriteStore` and merges the `isFavorite` flag into each Song.

---

## Composable Orchestration

`HelloWorld.vue` is the main orchestrator. It wires together composables in this order:

```
useSongData(vtuber)          → songs, songMetaGroups
useSongFilter(songs, ...)    → filteredSongs, searchQuery, filterOption
usePagination(filteredSongs) → paginatedSongs (desktop) / loadedSongs (mobile)
usePlaceholder(searchQuery, filteredSongs) → autocomplete suggestions
useHeadMeta(filteredSongs, searchQuery, vtuber) → SEO meta
useScreenSize()              → responsive breakpoint refs
useBackTop()                 → scroll-to-top on mobile
useSyncFavorite()            → toast on cloud sync events
```

**Key rule**: composables communicate through shared reactive refs, not by importing each other. `useSongFilter` receives `songs` as a parameter, not by importing `useSongData`.

---

## State Management

### Pinia Stores

| Store | File | Persistence | Responsibility |
|---|---|---|---|
| `auth` | `auth-store.ts` | localStorage | Google OAuth token, user info, token expiry |
| `favorite` | `favorite-store.ts` | localStorage | Song favorites CRUD, cloud sync trigger |
| `loading` | `loading.ts` | In-memory | Initial load spinner flag |
| `color-mode` | `color-mode.ts` | In-memory (from OS) | Dark/light mode detection |
| `modal-init` | `modal-init.ts` | In-memory | Lazy modal first-open flags |

### localStorage Keys

| Key | Value | Written By |
|---|---|---|
| `favorites` | `FavoriteData` JSON | `favorite-store.ts` |
| `google_access_token` | OAuth token string | `auth-store.ts` |
| `google_user` | `GoogleUserInfo` JSON | `googleUser.ts` |

---

## Google Auth & Drive Sync

### Auth Flow

1. User clicks Google sign-in → `googleAuth.ts` initializes Google Identity Services
2. OAuth2 Implicit Flow: token obtained client-side, no backend
3. Token + user info saved to localStorage
4. `auth-store.ts` sets a timeout to check token expiry
5. On successful login, `FavoriteSync.sync()` is automatically triggered

### Favorites Sync Algorithm

`FavoriteSync.sync()` implements a three-way merge:
- Compare local `version` + `updateMs`/`syncMs` against cloud
- If local is newer (same version, higher `updateMs`): upload local → cloud
- If cloud is newer: download cloud → local
- If versions diverge: union of both ID sets, increment version
- After sync: `syncMs` updated to match

---

## Multi-Page Build

`vite.config.ts` has a custom plugin that runs after build:
1. Reads the built `dist/index.html`
2. For each VTuber, creates a copy at `dist/{uri}/index.html`
3. Replaces meta tags (title, description, OG image, favicon) with VTuber-specific values
4. This enables search engines to crawl each VTuber page with correct meta

Code splitting: `rollupOptions.output.manualChunks` splits JSON data by VTuber name + year, e.g.:
```
data-Hanon-2023.js
data-Gabu-2024.js
```

---

## Chrome Extension

Path: `hanon-uta-uploader/`

Manifest v3. Purpose: extract singing timelines from YouTube video descriptions and upload JSON data to the GitHub repo.

Key files:
- `content.js` — injected into YouTube pages, reads video description, detects VTuber
- `timeline.js` — parses the timeline text into structured JSON
- `popup.html/js` — UI for reviewing and submitting the parsed data
- `background.js` — service worker for GitHub API communication

The extension is a separate project, not bundled by Vite. It uses GitHub's API to commit files directly to this repository.
