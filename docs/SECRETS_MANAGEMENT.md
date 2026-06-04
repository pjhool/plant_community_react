# Secrets Management Guide

## Overview
This guide documents the strategy for managing sensitive configuration in the Plant Community React application.

## Current Status (Phase 0)
- **No secrets required** at this stage
- Secrets will be needed starting from **Phase 1** (Firebase integration)

## Required Secrets (Phase 1+)

### Firebase Configuration
Add these to GitHub Repository Secrets (Settings → Secrets and variables → Actions):

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

### Vercel Deployment
If using Vercel, add the same secrets to Vercel project settings.

## Local Development

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Note**: `.env.local` is already in `.gitignore` and will not be committed.

## Best Practices

1. **Never commit secrets** to version control
2. **Use GitHub Secrets** for CI/CD workflows
3. **Rotate secrets** periodically
4. **Limit access** to production secrets
5. **Use environment-specific** secrets (dev/staging/prod)

## Verification

To verify secrets are configured:
```bash
# Check GitHub Secrets (via CLI)
gh secret list

# Check local environment
cat .env.local
```
