# Love Duo — Implementation Plan

## Project Overview

- Mobile app for couples to onboard, curate shared gallery, and plan dates
- Phased delivery across `docs/implementation/NN-<phase>` with numeric step pattern
- Strict TypeScript, SOLID, and testing standards across all phases

## Implementation Phases

1. `01-setup` — environment, tooling, validation and test baselines
2. `02-onboarding` — auth-lite, couple pairing, local mode, sync gating
3. `03-our-gallery` — media import, tagging, filtering, local SQLite storage
4. `04-dates` — suggestion deck, scheduling, reminders, completion history
5. `05-deploy` — publish channels, branch-based release mapping, rollback

## Phase Structure & Numbering

- Each phase README follows two-digit steps: `00`–`NN`
- Step `00` is Version Control: branch flow and suggested commits
- Subsequent steps cover goals, data models, storage, validation, screens, tests

## CI/CD Workflows

- `validate.yml` (PRs on `develop`, `staging`, `main`)
  - Runs `npm ci`, commitlint, and `npm run validate`
  - `validate` includes `eslint`, `prettier --check`, `tsc --noEmit`, `expo prebuild`
- `tests.yml` (PRs & pushes on `develop`, `staging`, `main`)
  - Runs `npm run test:coverage` and uploads coverage artifacts
- `publish.yml` (deploy phase)
  - Branch → channel mapping documented in `05-deploy/README.md`

## Step-by-Step Tasks

- For each phase, implement steps in order with atomic commits
- Write tests first (TDD), then minimal code, then refactor
- Keep files under 100 lines (excluding tests) and avoid defaults/exports

## Validation Checkpoints

- Phase numbering: `node docs/implementation/validate-order.js`
- Commit messages and hooks: `node docs/implementation/validate-commitlint.js`
- Linting: `npm run lint` and `npm run lint:fix`
- Formatting: `npm run format:check`
- Types: `npm run type-check`
- Coverage: `npm run test:coverage` must reach 100%

## Dependencies

- Expo managed workflow, `expo-sqlite` for local storage
- `zod` for validation, `jest` for testing
- Optional Supabase for sync; gated behind onboarding

## Success Criteria

- All phase steps implemented with passing tests and 100% coverage
- CI validation and test workflows green across branches
- Clear version control discipline per phase with atomic commits
