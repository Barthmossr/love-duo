# Implementation Folder Structure

- Purpose: centralized, phase-oriented structure for delivering the Love Duo app
- Location: `docs/implementation/`

## Structure

```
implementation/
  01-setup/
  02-onboarding/
  03-our-gallery/
  04-dates/
  05-deploy/
```

## Numbering System

- Two-digit numeric prefixes order phases, e.g., `01-setup`
- Leading zeros are required for 1–9: `01`–`09`
- Numbers must be consecutive with no gaps or duplicates
- Names follow `NN-name` where `name` is lowercase with underscores
- Only rename directories to change order; preserve phase content

## Naming Conventions

- Lowercase with underscores for `name` after the prefix
- Clear, descriptive names; avoid abbreviations

## Phase Dependencies

- `01-setup` → prepares environment, tooling, and baseline configuration
- `02-onboarding` → depends on `01-setup` for auth and device readiness
- `03-our-gallery` → depends on `01-setup` and `02-onboarding` completed
- `04-dates` → depends on `03-our-gallery` baseline patterns and shared components
- `05-deploy` → depends on all features and finalized configuration

## Validation

- Run `node docs/implementation/validate-order.js` to verify numbering
- Fails on invalid names, duplicate numbers, or gaps in sequence
- Include this check in CI to enforce consistency
- Run `node docs/implementation/validate-commitlint.js` to verify commitlint setup
- Fails if config or hook is missing or misconfigured

## Version Control Considerations

- Use branch flow: `feature/*` → `develop` → `staging` → `main`
- Commit atomically per phase change with clear messages
- Avoid direct commits to `main`; create PRs targeting `develop`

## Testability

- Each phase should be independently testable where possible
- Provide phase-specific validation checklists and artifacts
