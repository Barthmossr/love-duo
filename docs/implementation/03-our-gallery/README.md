# Our Gallery Phase

- Purpose: albums, photo selection, offline-first grid UI

## Steps

Step 00 — Version Control

- [ ] 00.01 Branch: `feature/our-gallery`
- [ ] 00.02 Suggested commits: `feat: album grid`, `feat: album creation`

Step 01 — Goals & scope

- [ ] 01.01 Features: create album, add photos, view grid, filter
- [ ] 01.02 Offline-first with SQLite, sync later when online
- [ ] 01.03 Accessibility: labels, roles, focus order

Step 02 — Types & data model

- [ ] 02.01 Create `gallery.types.ts` with core interfaces

```typescript
type MediaType = "image" | "video"

interface GalleryItem {
  id: string
  title: string
  uri: string
  type: MediaType
  createdAt: string
  remoteId?: string
}

interface Album {
  id: string
  title: string
  coverItemId?: string
  createdAt: string
}

export { MediaType, GalleryItem, Album }
```

Step 03 — Storage (SQLite)

- [ ] 03.01 Ensure tables: `gallery`, `album`, `album_items`
- [ ] 03.02 Persist items with local URIs for offline access

```typescript
import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("love-duo.db")

const ensureGalleryTables = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS gallery (id TEXT PRIMARY KEY, title TEXT, uri TEXT, type TEXT, createdAt TEXT)"
        )
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS album (id TEXT PRIMARY KEY, title TEXT, coverItemId TEXT, createdAt TEXT)"
        )
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS album_items (albumId TEXT, itemId TEXT)"
        )
      },
      reject,
      resolve
    )
  })
}

export { ensureGalleryTables }
```

Step 04 — Permissions & media access

- [ ] 04.01 Use `expo-image-picker` to request permissions
- [ ] 04.02 Validate media type and size before save

Step 05 — Local file handling

- [ ] 05.01 Copy selected media to app storage via `expo-file-system`
- [ ] 05.02 Store local URI into `gallery` for reliable rendering

Step 06 — Screens & navigation

- [ ] 06.01 Screens: GalleryGrid, AlbumCreate, AlbumDetail
- [ ] 06.02 Navigation routes: list → detail → add

```typescript
type GalleryRoute = "GalleryGrid" | "AlbumCreate" | "AlbumDetail"

const GALLERY_ROUTES: GalleryRoute[] = [
  "GalleryGrid",
  "AlbumCreate",
  "AlbumDetail",
]

export { GALLERY_ROUTES }
```

Step 07 — Filtering & sorting

- [ ] 07.01 Filter by date range and album
- [ ] 07.02 Sort by createdAt descending by default

Step 08 — Validation (zod)

- [ ] 08.01 Title min length 1
- [ ] 08.02 Only allow `image` or `video`

```typescript
import { z } from "zod"

const itemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  uri: z.string().min(1),
  type: z.enum(["image", "video"]),
  createdAt: z.string().min(1),
})

export { itemSchema }
```

Step 09 — Error handling

- [ ] 09.01 Wrap async calls and log context on failures
- [ ] 09.02 Surface actionable messages to users

Step 10 — Sync (optional, later)

- [ ] 10.01 Use `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- [ ] 10.02 Upload media to storage, save remoteId; sync when online

Step 11 — Tests

- [ ] 11.01 Unit: validation and helpers
- [ ] 11.02 Integration: grid rendering and add flow
- [ ] 11.03 E2E: pick → save → view → filter

Step 12 — NPM scripts

- [ ] 12.01 Add focused test script

```json
{
  "scripts": {
    "test:gallery": "jest --testPathPattern=tests/integration/gallery"
  }
}
```

Step 13 — CI alignment

- [ ] 13.01 `validate.yml` runs `npm run validate` on PRs
- [ ] 13.02 `tests.yml` runs coverage on PRs and pushes
- [ ] 13.03 Coverage must be 100% for gallery paths
