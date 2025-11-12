# Setup Phase

- Purpose: initial configuration, environment setup, and baseline tooling

## Steps

Step 00 — Version Control (do this first)

- [x] 00.01 Create and switch to branch `feature/setup`
- [x] 00.02 Commit atomically after every single checkbox below (suggested messages only)
  - Suggestions: `chore: tooling setup`, `chore: android sdk config`, etc.

Step 01 — System prerequisites

- [x] 01.01 Windows updates applied and rebooted
- [x] 01.02 Git installed (`git --version`)
- [x] 01.03 Node `22.x` installed (`node -v`), npm `11.x` (`npm -v`)
- [x] 01.04 Java JDK `17+` installed (`java -version`)
- [x] 01.05 Android Studio installed with SDK Platform `Android 14` and Build-Tools

Step 02 — Android SDK and AVD setup

- [ ] 02.01 Set `ANDROID_HOME` and add SDK `platform-tools` to `PATH`
- [ ] 02.02 Verify `adb devices` shows emulator/device
- [ ] 02.03 Create AVD (Pixel 6, Android 14) and boot once

Step 03 — Project bootstrap

- [x] 03.01 Initialize Expo app (if new) using TypeScript
  - `npx create-expo-app@latest --template expo-template-blank-typescript`
- [x] 03.02 Install dependencies with exact versions
  - `npm ci` for existing lockfile or `npm i --save-exact <pkgs>`

Step 04 — TypeScript configuration

- [x] 04.01 Add strict options in `tsconfig.json`

  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "strictBindCallApply": true,
      "strictPropertyInitialization": true,
      "noImplicitThis": true,
      "alwaysStrict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedIndexedAccess": true
    }
  }
  ```

Step 05 — ESLint and Prettier setup

- [x] 05.01 Use ESLint flat config (v9+)

  ```js
  // eslint.config.js
  import typescriptPlugin from '@typescript-eslint/eslint-plugin'
  import typescriptParser from '@typescript-eslint/parser'
  import importPlugin from 'eslint-plugin-import'

  export default [
    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parser: typescriptParser,
        parserOptions: { project: ['./tsconfig.json'] }
      },
      plugins: {
        '@typescript-eslint': typescriptPlugin,
        import: importPlugin
      },
      rules: {
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              ['parent', 'sibling'],
              'index'
            ],
            'newlines-between': 'always',
            alphabetize: { order: 'asc' }
          }
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-unused-vars': 'error'
      }
    }
  ]
  ```

- [x] 05.02 Add Prettier config

  ```json
  {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "none",
    "printWidth": 80,
    "tabWidth": 2,
    "arrowParens": "avoid"
  }
  ```

Step 06 — Husky and lint-staged

- [x] 06.01 Initialize Husky
  - `npx husky init`
- [x] 06.02 Configure commit message linting
  - `echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg`
- [x] 06.03 Add lint-staged configuration

  ```json
  // .lintstagedrc
  {
    "**/*.{ts,tsx}": ["eslint --max-warnings=0"],
    "**/*.{js,jsx,ts,tsx,json,md}": ["prettier --check"]
  }
  ```

- [x] 06.04 Pre-commit hook commands

  ```sh
  # .husky/pre-commit
  npm run type-check
  npm run validate
  npx --no -- lint-staged
  ```

- [x] 06.05 Pre-push hook to enforce 100% coverage

  ```sh
  # .husky/pre-push
  npm run test:coverage
  ```

- [x] 06.06 Coverage enforcement via Jest config (in package.json)

  ```json
  {
    "jest": {
      "collectCoverage": true,
      "coverageThreshold": {
        "global": {
          "branches": 100,
          "functions": 100,
          "lines": 100,
          "statements": 100
        }
      }
    }
  }
  ```

Step 07 — Environment variables

- [ ] 07.01 Create `.env.example`, `.env.development`, `.env.staging`, `.env.production`
- [x] 07.02 Add `env.ts` with validation schema (using `zod`)

```typescript
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  API_KEY: z.string().min(1),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug'])
})

export const env = envSchema.parse(process.env)
```

Step 08 — NPM scripts

- [x] 08.01 Add scripts to `package.json`
  ```json
  {
    "scripts": {
      "dev": "expo start",
      "build": "tsc",
      "start": "expo start",
      "android": "expo start --android",
      "ios": "expo start --ios",
      "validate": "eslint . --ext .ts,.tsx && prettier --check . && tsc --noEmit",
      "prebuild": "expo prebuild",
      "test": "jest",
      "test:coverage": "jest --coverage",
      "test:unit": "jest --testPathPattern=tests/unit",
      "test:integration": "jest --testPathPattern=tests/integration",
      "test:e2e": "jest --testPathPattern=tests/e2e",
      "test:a11y": "jest --testPathPattern=tests/a11y",
      "test:watch": "jest --watch",
      "debug": "node --inspect-brk dist/main.js",
      "lint": "eslint . --ext .ts,.tsx",
      "lint:fix": "eslint . --ext .ts,.tsx --fix",
      "format": "prettier --write .",
      "format:check": "prettier --check .",
      "type-check": "tsc --noEmit"
    }
  }
  ```

Step 09 — Commitlint

- [x] 09.01 Install dev dependencies
  - `npm i --save-exact -D @commitlint/cli @commitlint/config-conventional`
- [x] 09.02 Add configuration file
  - Ensure `commitlint.config.js` exists at the repo root
- [x] 09.03 Initialize Husky
  - `npx husky init`
- [x] 09.04 Add `commit-msg` hook
  - `echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg`
- [ ] 09.05 Validate a test message locally
  - `echo "foo: test" | npx commitlint` should fail
  - `echo "feat: add onboarding flow" | npx commitlint` should pass
- [x] 09.06 CI enforcement
  - Add a CI step to run `npx commitlint --from=HEAD~10 --to=HEAD`

Step 10 — Validation

- [ ] 10.01 `node -v` and `npm -v` match required versions
- [ ] 10.02 `adb devices` lists at least one emulator/device
- [x] 10.03 `npm run type-check` passes
- [x] 10.04 `npm run lint` passes with no errors
- [x] 10.05 `npm run format:check` passes
- [ ] 10.06 Expo app runs in emulator without runtime errors

Step 11 — CI/CD workflows (separated)

- [ ] 11.01 Add GitHub secrets (as needed)
  - `EXPO_TOKEN` if publishing is handled in deploy phase

- [x] 11.02 Create validation workflow `.github/workflows/validate.yml`

  ```yaml
  name: validate
  on:
    pull_request:
      branches: [develop, staging, main]
  jobs:
    validate:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
          with:
            fetch-depth: 0
        - uses: actions/setup-node@v4
          with:
            node-version: 22
            cache: npm
        - run: npm ci
        - run: npx commitlint --from=HEAD~10 --to=HEAD
        - run: npm run validate
  ```

- [x] 12.03 Create tests workflow `.github/workflows/tests.yml`

  ```yaml
  name: tests
  on:
    pull_request:
      branches: [develop, staging, main]
    push:
      branches: [develop, staging, main]
  jobs:
    tests:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 22
            cache: npm
        - run: npm ci
        - run: npm run test:coverage
        - uses: actions/upload-artifact@v4
          if: always()
          with:
            name: coverage-${{ github.sha }}
            path: coverage
  ```

- [ ] 12.04 Note on Expo publish
  - Expo publish is documented in `05-deploy` and can be a separate workflow

Step 13 — SQLite configuration

- [ ] 13.01 Install dependency `expo-sqlite` with exact version
- [ ] 13.02 Initialize database and tables

  ```typescript
  import { openDatabase, SQLiteDatabase } from 'expo-sqlite'

  const getDatabase = (): SQLiteDatabase => {
    return openDatabase('love-duo.db')
  }

  const ensureTables = (db: SQLiteDatabase): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY NOT NULL, key TEXT NOT NULL, value TEXT)',
          [],
          () => resolve(),
          (_, error) => {
            reject(error)
            return true
          }
        )
      })
    })
  }

  export { getDatabase, ensureTables }
  ```

- [ ] 13.03 Validation checklist
  - Open db, create table, insert and query one row

Step 14 — DB sync for testing (Supabase)

- [ ] 14.01 Add environment variables
  - `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- [ ] 14.02 Fetch and seed local SQLite for tests

  ```typescript
  import { createClient } from '@supabase/supabase-js'
  import { openDatabase, SQLiteDatabase } from 'expo-sqlite'

  interface GalleryItem {
    id: string
    title: string
  }

  const syncGallery = async (url: string, key: string): Promise<void> => {
    const client = createClient(url, key)
    const db = SQLite.openDatabase('love-duo.db')
    const { data, error } = await client.from('gallery').select('id,title')
    if (error) throw new Error(error.message)
    await new Promise<void>((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            'DELETE FROM gallery',
            [],
            () => {},
            (_, e) => {
              reject(e)
              return true
            }
          )
          data.forEach((item: GalleryItem) => {
            tx.executeSql(
              'INSERT INTO gallery (id, title) VALUES (?, ?)',
              [item.id, item.title],
              () => {},
              (_, e) => {
                reject(e)
                return true
              }
            )
          })
        },
        reject,
        resolve
      )
    })
  }

  export { syncGallery }
  ```

- [ ] 14.03 CI note
  - Use `SUPABASE_URL` and `SUPABASE_ANON_KEY` as CI secrets if needed

Step 15 — Basic test and coverage

- [x] 15.01 Jest configuration in `package.json`

  ```json
  {
    "jest": {
      "preset": "jest-expo",
      "collectCoverage": true,
      "collectCoverageFrom": ["src/**/*.{ts,tsx}"],
      "coverageThreshold": {
        "global": {
          "branches": 100,
          "functions": 100,
          "lines": 100,
          "statements": 100
        }
      }
    }
  }
  ```

- [x] 15.02 Minimal App component example

  ```typescript
  import React from "react"
  import { View, Text } from "react-native"

  const App = (): JSX.Element => {
    return (
      <View>
        <Text>Love Duo</Text>
      </View>
    )
  }

  export { App }
  ```

- [x] 15.03 Unit test example

  ```typescript
  import React from "react"
  import { render, screen } from "@testing-library/react-native"
  import { App } from "../../src/App"

  describe("App", () => {
    it("shows title", () => {
      render(<App />)
      expect(screen.getByText("Love Duo")).toBeTruthy()
    })
  })
  ```
