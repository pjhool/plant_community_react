# Environment Variables Guide

This document outlines the environment variables required for the Plant Community React application.

## Local Development

Copy `.env.local.example` to `.env.local` and fill in your Firebase configuration values.

```bash
cp .env.local.example .env.local
```

> [!CAUTION]
> Never commit `.env.local` to version control. It is already included in `.gitignore`.

## Required Variables

| Variable | Description | Source |
|----------|-------------|--------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key | Firebase Console |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Firebase Console |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | Firebase Console |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Firebase Console |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Firebase Console |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | Firebase Console |

## Production & CI/CD (GitHub/Vercel)

These variables must be added as **Secrets** in GitHub and **Environment Variables** in Vercel.

### GitHub Secrets
1. Go to Repository Settings > Secrets and variables > Actions.
2. Add each variable listed above.

### Vercel Environment Variables
1. Go to Project Settings > Environment Variables.
2. Add each variable for Production, Preview, and Development environments.
