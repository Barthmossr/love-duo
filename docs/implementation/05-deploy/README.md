# Deploy Phase

- Purpose: deployment workflows and configuration

## Steps

Step 00 — Version Control

- [ ] 00.01 Branch: `feature/deploy`
- [ ] 00.02 Suggested commits: `chore: publish workflow`, `chore: eas config`

Step 01 — Prerequisites

- [ ] 01.01 `01-setup` validate and `tests.yml` passing with 100% coverage
- [ ] 01.02 Expo token created and stored as `EXPO_TOKEN` secret

Step 02 — Release channels

- [ ] 02.01 Channel mapping
  - `develop` → `dev`
  - `staging` → `staging`
  - `main` → `production`

Step 03 — Publish workflow

- [ ] 03.01 Create `.github/workflows/publish.yml`

```yaml
name: publish
on:
  push:
    branches: [develop, staging, main]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx expo login --token ${{ secrets.EXPO_TOKEN }}
      - name: Publish to channel
        run: |
          if [ "${GITHUB_REF##*/}" = "develop" ]; then
            npx eas update --branch dev --message "Deploy from develop"
          elif [ "${GITHUB_REF##*/}" = "staging" ]; then
            npx eas update --branch staging --message "Deploy from staging"
          else
            npx eas update --branch production --message "Deploy from main"
          fi
```

Step 04 — EAS build (optional)

- [ ] 04.01 Configure `eas.json` profiles: `development`, `staging`, `production`
- [ ] 04.02 Android signing and submission documented

Step 05 — Validation

- [ ] 05.01 Confirm publish success and channel
- [ ] 05.02 Smoke test on emulator/device for staging

Step 06 — Rollback plan

- [ ] 06.01 Document how to republish to previous stable channel
- [ ] 06.02 Keep release notes for each publish
