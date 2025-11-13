# Expo/EAS Token Guide

## Overview

- Use EAS Update for publishing and automation
- The token is only for CI; do not include it in app code or `.env.*`

## Get Token (Web)

- Sign in at `https://expo.dev`
- Open Account Settings → Access Tokens
- Create a new token and copy it

## Get Token (CLI)

- Login: `npx eas login`
- Verify account: `npx eas whoami`
- Create token: `npx eas token:create`
- Revoke token: `npx eas token:revoke`

## Add Token To GitHub Secrets

- Go to your repository → Settings → Secrets and variables → Actions → New repository secret
- Name: `EXPO_TOKEN`
- Value: paste the token created above

## Use Token In CI (EAS Update)

- Set `EXPO_TOKEN` in the job environment
- Example steps:

```
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: npm
- run: npm ci
- env:
    EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
  run: npx eas update --branch staging --message "Update from CI"
```

## Security

- Never commit tokens or store them in app `.env.*`
- Create separate tokens per environment
- Rotate and revoke tokens regularly
