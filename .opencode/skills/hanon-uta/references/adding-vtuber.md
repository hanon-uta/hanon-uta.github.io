# Adding a New VTuber

## Overview

Adding a new VTuber requires changes in 5 areas. Follow each step in order.

---

## Step 1: Add VTuber Config

**File:** `src/config/constants.ts`

Add a new entry to the `VTUBERS` array. Use the existing entries as a template:

```ts
{
  name: 'NewVtuber',          // Must match the View file name (without .vue)
  name_jp: '日本語名',
  mark: '🎤',                 // Emoji mark for UI
  favicon: '/favicon-newvtuber.png',
  uri: '/newvtuber',          // URL path
  cover: 'https://...',       // YouTube channel cover image URL (for OG tags)
  color: '#HEXCOLOR',         // Brand color → CSS --netease-accent
}
```

---

## Step 2: Create View File

**File:** `src/views/NewVtuber.vue`

Create an identical copy of any existing VTuber view (e.g., `Hanon.vue`). The structure is always:

```vue
<template>
  <div>
    <HelloWorld vtuber="name" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import { useSpecificPage } from '@/composables/useSpecificPage';
useSpecificPage('name');  // VTuber name from constants
</script>
```

Replace `'name'` with the VTuber `name` field from the config.

---

## Step 3: Add Data Directory

**Directory:** `src/assets/data/NewVtuber/`

Create the folder and add JSON files following the existing naming convention: `YYYY-MM-DD.json` (ISO date). Each JSON file must follow the `Video` interface:

```json
{
  "id": "11-char-youtube-id",
  "title": "Stream title",
  "date": "2024-01-15",
  "song_timeline": "00:00 song title / artist\n01:30 another song / artist\n..."
}
```

The `song_timeline` format: `MM:SS song name / artist name`, one entry per line. Tags can be inline: `#{=tag1,tag2}`. Lines containing OP/ED/MC/BGM are automatically filtered out.

---

## Step 4: Add Favicon

**File:** `public/favicon-newvtuber.png`

Add a favicon image. The file name must match the `favicon` field in the config (relative to `public/`).

---

## Step 5: Verify Build

Run the build and check:

```bash
pnpm run build
```

The Vite custom plugin should generate `dist/newvtuber/index.html` with VTuber-specific meta tags. Verify:

- [ ] New route accessible at `/newvtuber`
- [ ] VTuber tab appears in `Nav.vue`
- [ ] Song data loads and is searchable
- [ ] Charts work with the new VTuber's data
- [ ] Favicon switches correctly on the new route
- [ ] OG meta tags in generated HTML are correct
- [ ] JSON validation passes (`validate-json.yml` CI will check this)

---

## Files Summary

| What | Where |
|---|---|
| Config entry | `src/config/constants.ts` → `VTUBERS` array |
| View file | `src/views/NewVtuber.vue` (create new) |
| Data files | `src/assets/data/NewVtuber/*.json` (create new) |
| Favicon | `public/favicon-newvtuber.png` (create new) |
| Route | Auto-generated from config — no manual routing needed |
| VTuber tab | Auto-generated in `Nav.vue` from config |
