# Firebase App Distribution Guide

This guide explains how to set up and use Firebase App Distribution for testing the Plant Community React application (specifically for PWA/Web testing or early distribution).

## Setup Steps

1. **Firebase Console**:
   - Go to Release & Monitor > App Distribution.
   - Select your Web/PWA app.
   - Create a **Tester Group** (e.g., `internal-testers`).

2. **GitHub Actions Integration**:
   - To automate distribution, you need a Firebase Service Account Key.
   - Store the key as a GitHub Secret: `FIREBASE_SERVICE_ACCOUNT_JSON`.
   - The `develop.yml` workflow can be extended to include the `w9jds/firebase-action`.

## Manual Distribution

You can also distribute using the Firebase CLI:

```bash
pnpm firebase appdistribution:distribute <artifact_path> --app <app_id> --groups "internal-testers"
```

> [!NOTE]
> For Web/PWA, typically Vercel Preview URLs are preferred for testing. App Distribution is more commonly used for native builds (iOS/Android).
