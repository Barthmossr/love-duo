# Dates Phase

- Purpose: implement suggestion deck, accept/regenerate, scheduling and completion

## Steps

Step 00 — Version Control

- [ ] 00.01 Branch: `feature/dates`
- [ ] 00.02 Suggested commits: `feat: suggestion deck`, `feat: date scheduling`

Step 01 — Goals & scope

- [ ] 01.01 Swipeable suggestions with title/subtitle and category
- [ ] 01.02 Accept/regenerate, detail tips, external links
- [ ] 01.03 Schedule, reminders, completion and history

Step 02 — Types & data model

- [ ] 02.01 Create `dates.types.ts` with core interfaces

```typescript
type DateCategory = 'outdoor' | 'indoor' | 'food' | 'culture'

interface DateSuggestion {
  id: string
  title: string
  subtitle: string
  category: DateCategory
}

interface ScheduledDate {
  id: string
  suggestionId: string
  scheduledAt: string
  completedAt?: string
  notes?: string
}

export { DateCategory, DateSuggestion, ScheduledDate }
```

Step 03 — Storage (SQLite)

- [ ] 03.01 Ensure tables: `date_suggestions`, `scheduled_dates`
- [ ] 03.02 Persist accept/regenerate history

```typescript
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('love-duo.db')

const ensureDateTables = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS date_suggestions (id TEXT PRIMARY KEY, title TEXT, subtitle TEXT, category TEXT)'
        )
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS scheduled_dates (id TEXT PRIMARY KEY, suggestionId TEXT, scheduledAt TEXT, completedAt TEXT, notes TEXT)'
        )
      },
      reject,
      resolve
    )
  })
}

export { ensureDateTables }
```

Step 04 — Scheduling & calendar

- [ ] 04.01 Use date/time picker and validate timezone
- [ ] 04.02 Optional: 3rd-party calendar linking in deploy phase

Step 05 — Reminders & notifications

- [ ] 05.01 Use `expo-notifications` to schedule local reminders
- [ ] 05.02 Respect OS permissions and quiet hours

Step 06 — Screens & navigation

- [ ] 06.01 Screens: SuggestionsDeck, DateDetail, Schedule, History
- [ ] 06.02 Navigation guards: only schedule after accept

```typescript
type DatesRoute = 'SuggestionsDeck' | 'DateDetail' | 'Schedule' | 'History'

const DATES_ROUTES: DatesRoute[] = [
  'SuggestionsDeck',
  'DateDetail',
  'Schedule',
  'History'
]

export { DATES_ROUTES }
```

Step 07 — Validation (zod)

- [ ] 07.01 Suggestion fields non-empty; category is enum
- [ ] 07.02 Scheduling date must be in the future

```typescript
import { z } from 'zod'

const suggestionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  category: z.enum(['outdoor', 'indoor', 'food', 'culture'])
})

const scheduleSchema = z.object({
  suggestionId: z.string().min(1),
  scheduledAt: z
    .string()
    .refine(v => new Date(v).getTime() > Date.now(), 'Must be future')
})

export { suggestionSchema, scheduleSchema }
```

Step 08 — Error handling

- [ ] 08.01 Wrap async calls; structured logs on failures
- [ ] 08.02 Provide user-friendly recovery actions

Step 09 — Completion & history

- [ ] 09.01 Mark as completed and capture notes
- [ ] 09.02 Show history list sorted by `completedAt`

Step 10 — Tests

- [ ] 10.01 Unit: generation, validation schemas
- [ ] 10.02 Integration: deck interactions, schedule flow
- [ ] 10.03 E2E: accept → schedule → remind → complete

Step 11 — NPM scripts

- [ ] 11.01 Add focused test script

```json
{
  "scripts": {
    "test:dates": "jest --testPathPattern=tests/integration/dates"
  }
}
```

Step 12 — CI alignment

- [ ] 12.01 `validate.yml` runs `npm run validate` on PRs
- [ ] 12.02 `tests.yml` runs coverage on PRs and pushes
- [ ] 12.03 Coverage must be 100% for dates paths
