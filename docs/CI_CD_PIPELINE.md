# CI/CD Pipeline Documentation

## Pipeline Overview

This document describes the CI/CD pipeline for the Plant Community React application.

## Pipeline Diagram

```mermaid
graph TB
    A[Developer] -->|Push to feature branch| B[Create Pull Request]
    B --> C{PR Check Workflow}
    
    C --> D[Install Dependencies]
    D --> E[Lint Check]
    E --> F[Type Check]
    F --> G[Security Audit]
    G --> H[Run Tests]
    H --> I[Upload Coverage]
    
    I --> J{All Checks Pass?}
    J -->|No| K[Fix Issues]
    K --> B
    J -->|Yes| L[Merge to develop]
    
    L --> M[Develop Workflow]
    M --> N[Run Tests]
    N --> O[Build Application]
    O --> P[Deploy to Vercel Preview]
    
    L --> Q{Ready for Release?}
    Q -->|Yes| R[Merge to release branch]
    R --> S[Release Workflow]
    S --> T[Full Test Suite]
    T --> U[Production Build]
    U --> V[Deploy to Staging]
    
    V --> W{Staging Tests Pass?}
    W -->|Yes| X[Merge to main]
    X --> Y[Production Deployment]
    W -->|No| K
```

## Workflow Triggers

| Branch Pattern | Event | Workflow | Actions |
|---------------|-------|----------|---------|
| `feature/*` | Pull Request | PR Check | Lint, Type Check, Audit, Test |
| `develop` | Push | Develop Build | Test, Build, Preview Deploy |
| `release/*` | Push | Release Build | Full Test, Build, Staging Deploy |
| `main` | Merge | Production | Full Test, Build, Production Deploy |

## Workflow Files

### pr-check.yml
Location: `.github/workflows/pr-check.yml`

**Purpose**: Validate code quality on every pull request

**Steps**:
1. Install dependencies with `pnpm install --frozen-lockfile`
2. Run linting with `pnpm lint`
3. Run type checking with `pnpm type-check`
4. Run security audit with `pnpm audit`
5. Run tests with coverage `pnpm test:coverage`
6. Upload coverage report as artifact

## Environment Variables

See [SECRETS_MANAGEMENT.md](./SECRETS_MANAGEMENT.md) for details on managing secrets.

## Quality Gates

All workflows enforce the following quality gates:

- ✅ Zero linting errors
- ✅ Zero type errors
- ✅ No critical security vulnerabilities
- ✅ All tests passing
- ✅ Code coverage threshold met (when configured)

## Next Steps

- Phase 1: Add Vercel deployment integration
- Phase 2: Add Firebase deployment steps
- Phase 3: Add E2E testing with Playwright
