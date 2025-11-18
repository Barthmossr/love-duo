# Onboarding Phase

- Purpose: user onboarding flows and documentation

## Steps

Step 00 — Version Control

- [ ] 00.01 Branch: `feature/onboarding`
- [ ] 00.02 Suggested commits: `feat: login/register`, `feat: pairing`

Step 01 — Goals & scope

- [ ] 01.01 Flows: register, login, pair code, confirm, complete
- [ ] 01.02 Success criteria: 100% coverage, happy/error paths tested
- [ ] 01.03 Accessibility: labels, focus order, keyboard navigation

Step 02 — Types & data model

- [ ] 02.01 Create `onboarding.types.ts` with core interfaces

```typescript
interface Credentials {
  email: string
  password: string
}

interface UserProfile {
  id: string
  displayName: string
}

interface CouplePairing {
  code: string
  partnerUserId?: string
}

interface OnboardingState {
  isRegistered: boolean
  isLoggedIn: boolean
  pairing?: CouplePairing
}

export { Credentials, UserProfile, CouplePairing, OnboardingState }
```

Step 03 — Screens & navigation

- [ ] 03.01 Screens: Login, Register, PairCode, Confirm, Complete
- [ ] 03.02 Navigation: Stack with guarded transitions

```typescript
type RouteName = 'Login' | 'Register' | 'PairCode' | 'Confirm' | 'Complete'

const ONBOARDING_ROUTES: RouteName[] = ['Login', 'Register', 'PairCode', 'Confirm', 'Complete']

export { ONBOARDING_ROUTES }
```

Step 04 — Validation (zod)

- [ ] 04.01 Email and password schema
- [ ] 04.02 Couple code: exactly 6 digits

```typescript
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const coupleCodeSchema = z
  .string()
  .length(6)
  .regex(/^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/)

export { credentialsSchema, coupleCodeSchema }
```

Step 05 — Async & error handling

- [ ] 05.01 Wrap await calls in try-catch with structured logs
- [ ] 05.02 Use Result pattern for complex flows (optional)

```typescript
class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

const login = async (c: Credentials): Promise<UserProfile> => {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(c)
    })
    if (!res.ok) throw new AuthError('Login failed')
    return (await res.json()) as UserProfile
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    console.error('Login error', { msg, timestamp: new Date().toISOString() })
    throw e instanceof Error ? e : new AuthError('Unhandled login error')
  }
}

export { AuthError, login }
```

Step 06 — Local storage & gating

- [ ] 06.01 Use `expo-secure-store` for tokens
- [ ] 06.02 Use `expo-sqlite` to persist pairing state

```typescript
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('love-duo.db')

const savePairing = (code: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS pairing (code TEXT)',
        [],
        () => {},
        (_, e) => {
          reject(e)
          return true
        }
      )
      tx.executeSql(
        'DELETE FROM pairing',
        [],
        () => {},
        (_, e) => {
          reject(e)
          return true
        }
      )
      tx.executeSql(
        'INSERT INTO pairing (code) VALUES (?)',
        [code],
        () => resolve(),
        (_, e) => {
          reject(e)
          return true
        }
      )
    }, reject)
  })
}

export { savePairing }
```

Step 07 — Pairing flow

- [ ] 07.01 Display code input with immediate validation feedback
- [ ] 07.02 Block progression until code valid and partner confirms

Step 08 — Sync transition

- [ ] 08.01 After both users confirm, enable cloud sync
- [ ] 08.02 Use Supabase keys from validated `env.ts`

Step 09 — Accessibility & UX

- [ ] 09.01 Label inputs, set accessibilityRole for buttons
- [ ] 09.02 Provide error messages and recovery actions

Step 10 — Tests

- [ ] 10.01 Unit tests: validation schemas
- [ ] 10.02 Integration tests: screen flows (render, input, navigation)
- [ ] 10.03 E2E tests: login → pair → confirm → complete

Step 11 — NPM scripts (onboarding)

- [ ] 11.01 Add focused script

```json
{
  "scripts": {
    "test:onboarding": "jest --testPathPattern=tests/integration/onboarding"
  }
}
```

Step 12 — CI alignment

- [ ] 12.01 `validate.yml` runs `npm run validate` on PRs
- [ ] 12.02 `tests.yml` runs coverage on PRs and pushes
- [ ] 12.03 Coverage must be 100% for onboarding paths
