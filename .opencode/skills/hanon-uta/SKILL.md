---
name: hanon-uta
description: Hanon Uta VTuber karaoke archive web app (Vue 3, TypeScript, Vite, Pinia, Bootstrap 5, SCSS, Chart.js, Google Drive sync). Use when working on hanon-uta code - UI modifications, bug fixes, search logic, favorites sync, chart stats, routing, SEO meta, data loading, or Chrome extension. Trigger keywords: hanon-uta, VTuber, 歌枠, karaoke, song search, YouTube timestamp, Vue 3, Pinia, 香鳴ハノン, 暁月クララ, 鎖乙女がぶ, 常磐カナメ, Bootstrap, Chart.js, SCSS.
---

# Hanon Uta

IRON LAW: ① URL query params are the single source of truth for search/filter state — never manage search state only in component local state. ② All business logic must live in composables (`src/composables/`); View files are thin wrappers that only pass props and render templates. ③ Communicate in Chinese; write code and comments in English; UI text shown on page must be in Japanese.

Red flags: a reactive ref in a component that mirrors a URL param; logic in a `.vue` file's `<script setup>` beyond prop/event wiring; hardcoded VTuber names or route paths; Chinese text in code/comments or English text on the page UI.

## Quick Reference

| File / Module | Role |
|---|---|
| `src/config/constants.ts` | VTuber definitions, site branding, pagination defaults |
| `src/main.ts` | App bootstrap: Vue, Pinia, Router, vue-lazyload, Bootstrap JS, tooltip directive |
| `src/types/song.d.ts` | `Song` interface — all song fields |
| `src/types/video.d.ts` | `Video` interface — raw JSON data structure |
| `src/api/instance.ts` | Axios client setup & interceptors |
| `src/router/routes.ts` | Dynamic route generation from `VTUBERS` config |
| `src/utils/loadSongs.ts` | `import.meta.glob` JSON loading, song parsing, grouping |
| `src/utils/syncFavorites.ts` | Google Drive appDataFolder sync with version/timestamp merge |
| `src/utils/googleAuth.ts` | Google OAuth2 Implicit Flow (sign-in, logout, token verification) |
| `src/utils/meta.ts` | Dynamic `<title>`, OG, Twitter Card generation |
| `src/utils/timeUtils.ts` | Time string parsing & formatting (`HH:MM:SS` → seconds) |
| `src/utils/songTagUtils.ts` | Inline tag parsing (`#{=tag1,tag2}`), color mapping, song ID |
| `src/utils/placeholderUtils.ts` | Search autocomplete, debounce, half-width/full-width conversion |
| `src/utils/routerUtils.ts` | URL query parameter read/write helpers |
| `src/composables/useSongData.ts` | Loads songs + favorites on mount; provides `songs`, `songMetaGroups` |
| `src/composables/useSongFilter.ts` | Scored search + filter + URL sync |
| `src/composables/usePagination.ts` | Desktop pagination + mobile infinite scroll |
| `src/composables/useScreenSize.ts` | Responsive breakpoints |
| `src/composables/useHeadMeta.ts` | Dynamic meta tags per VTuber/query |
| `src/composables/usePlaceholder.ts` | Search autocomplete suggestions |
| `src/composables/useSyncFavorite.ts` | Cloud sync trigger with toast feedback |
| `src/composables/useBackTop.ts` | Back-to-top button (mobile) |
| `src/stores/favorite-store.ts` | localStorage favorites + cloud sync coordination |
| `src/stores/auth-store.ts` | Google OAuth token & user info in localStorage |
| `src/stores/color-mode.ts` | Dark/light mode from `prefers-color-scheme` |
| `src/stores/loading.ts` | Initial loading state flag |
| `src/stores/modal-init.ts` | Lazy modal/chart initialization flags |
| `src/components/HelloWorld.vue` | Main layout orchestrator for a VTuber page |
| `src/components/SongList.vue` | Song card grid with thumbnails |
| `src/components/SongStats.vue` | 5 Chart.js chart types (lazy-loaded) |
| `src/components/SongStatsModal.vue` | Modal wrapper for SongStats |
| `src/components/SongMetaListModal.vue` | Grouped song list by kana |
| `src/components/Nav.vue` | Navbar: VTuber tabs, search, filters, user menu |
| `src/components/FavoriteIcon.vue` | Heart icon with animation |
| `src/scss/_song-list.scss` | Song card styles, animations, truncation |
| `src/views/` | Thin wrappers: each VTuber has one identical View → passes `vtuber` prop to HelloWorld |
| `src/style.scss` | Global styles, CSS variables (`--netease-accent` per VTuber) |

## Core Patterns

### URL-as-State

`useSongFilter` bidirectionally syncs three query params with `routerUtils.ts`:
- `?search=` — search text
- `?filter=favorite` — favorites-only toggle
- `?v=VIDEO_ID` — filter by specific stream

Search URL updates are debounced (868ms). When modifying search, always update both the reactive state AND the URL via `routerUtils`.

### Composable-First

Each `HelloWorld.vue` orchestrates composables but contains no domain logic itself. If you're adding logic, ask: "Does this belong in `src/utils/` (pure function), `src/composables/` (reactive logic), or `src/stores/` (cross-component state)?" It should never go in the `.vue` file.

### Data Flow

```
import.meta.glob (build time) → loadSongs.ts (parse JSON → Song[]) → useSongData (reactive ref) → HelloWorld (orchestrates) → useSongFilter → usePagination → SongList
```

Song JSON files live in `src/assets/data/{VTuber}/`. Vite code-splits them by VTuber + year. The glob pattern: `import.meta.glob('../../assets/data/**/*.json')`.

### Styling

- Primary: Bootstrap 5 utility classes (`d-flex`, `mb-3`, `text-truncate`, etc.)
- Custom styles: `src/scss/_song-list.scss` for card-specific styles
- Global: `src/style.scss`
- VTuber accent color: CSS variable `--netease-accent`, set per VTuber route
- Dark mode: Bootstrap's `data-bs-theme` attribute, auto-detected from OS; Chart.js charts must use dark-mode-appropriate colors

### Google OAuth & Drive Sync

- Auth: OAuth2 Implicit Flow (no backend), scopes: `drive.appdata` + `profile`
- Token stored in `localStorage` (`google_access_token`), auto-refresh handled by timeout checks
- Favorites sync: `FavoriteSync.sync()` in `syncFavorites.ts` merges local + cloud via version numbers and `updateMs`/`syncMs` timestamps; union on conflict; cloud wins if local is stale
- Cloud file: `hanon-uta-favorites.json` in `appDataFolder`
- Debounced upload: 3s after local change

## Task Workflows

### Modify UI / Components

1. Identify the component in `src/components/` or `src/views/`
2. Prefer Bootstrap 5 utility classes over custom CSS
3. Custom styles go in `src/scss/_song-list.scss` or `src/style.scss`
4. Verify dark mode: toggle OS dark mode or `data-bs-theme="dark"` on `<html>`
5. Verify mobile: check `useScreenSize` breakpoints (md = 768px)
6. Verify no logic crept into the `.vue` file — move to a composable or util

### Modify Search Logic

1. Open `src/composables/useSongFilter.ts`
2. Scoring: exact match +100, startsWith (title +50, artist +30), contains (title +30, artist +20)
3. Half-width/full-width normalization in `placeholderUtils.ts`
4. Verify URL sync: type a search, check `?search=` in the address bar; reload page, search should persist
5. Verify debounce: rapid typing should not spam URL updates

### Add / Modify Charts

1. Open `src/components/SongStats.vue`
2. Chart.js components are tree-shaken registered at file top
3. Each chart has a dark/light mode color config
4. The component is lazy-loaded via `defineAsyncComponent` in `SongStatsModal.vue`
5. Re-initialization flags are in `src/stores/modal-init.ts`

### Modify Favorites / Sync

1. Local: `src/stores/favorite-store.ts` — add/remove/toggle, reads/writes `localStorage` key `"favorites"`
2. Cloud: `src/utils/syncFavorites.ts` — Google Drive API calls, merge logic
3. Key types: `FavoriteData` (local), `FavoriteCloud` (drive file metadata) in `src/types/favorite.d.ts`
4. Merge strategy: version-based; union on conflict; 3s debounced upload
5. Never bypass the store — always use `useFavoriteStore()` actions

### Modify Routing

1. Route definitions are generated programmatically in `src/router/routes.ts` from `VTUBERS` config
2. Never hardcode a VTuber path — add to `constants.ts` instead
3. If adding a new page (non-VTuber), edit `routes.ts` manually but follow the `AppRouteRecordRaw` type

### Modify SEO / Meta

1. `src/utils/meta.ts` — generates `<title>`, `<meta>`, OG, Twitter Card strings
2. `src/composables/useHeadMeta.ts` — applies meta dynamically based on VTuber + search query
3. `vite.config.ts` has a custom plugin that creates per-VTuber HTML files with static meta for crawlability
4. Favicon switches per VTuber route (`src/assets/favicon-*.png`)

### Modify the Chrome Extension

1. Located in `hanon-uta-uploader/` (separate sub-project, not part of Vite build)
2. Manifest v3; `content.js` runs on YouTube pages; `popup.html/js` is the UI
3. `timeline.js` parses YouTube description text into structured song entries
4. Uploads data directly to the GitHub repo (commit + PR)

## Anti-Patterns

- **Writing business logic in `.vue` `<script setup>`** — move to composable or util
- **Hardcoding VTuber names, route paths, or URLs** — use `VTUBERS` config and router utils
- **Direct `localStorage.setItem/getItem`** — use the relevant Pinia store
- **Adding CSS without checking dark mode** — always test both themes
- **Ignoring mobile** — check `useScreenSize` breakpoints
- **Adding npm dependencies without checking if Bootstrap/Chart.js already covers the need**
- **Modifying `useSongFilter` without updating URL sync** — if search state changes, URL must reflect it

## Pre-Delivery Checklist

- [ ] `vue-tsc -b` passes (`pnpm run build` includes type-check)
- [ ] Dark mode renders correctly (`data-bs-theme="dark"`)
- [ ] Light mode renders correctly (`data-bs-theme="light"`)
- [ ] Mobile responsive (test at 375px and 768px widths)
- [ ] URL query params sync correctly (enter search, reload page — state preserved)
- [ ] Half-width and full-width Japanese text both match in search
- [ ] No new console errors in dev mode
- [ ] No logic in `.vue` files beyond prop/event wiring

## References

Load on demand when deeper context is needed:

- `references/architecture.md` — load when modifying data loading, adding new VTuber, or understanding full component tree
- `references/adding-vtuber.md` — load when adding a new VTuber to the app
