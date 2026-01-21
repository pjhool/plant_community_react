# Project Structure Documentation

## Overview

This Next.js application follows a feature-based architecture with clear separation of concerns.

## Directory Structure

```
src/
├── app/                    # Next.js App Router (pages, layouts)
├── core/                   # Shared/common code
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # External services (Firebase, etc.)
│   ├── stores/             # Global state (Zustand)
│   ├── styles/             # Global styles and themes
│   └── utils/              # Utility functions
└── features/               # Feature modules
    ├── auth/               # Authentication
    ├── comments/           # Comment system
    ├── environment-profile/# User environment
    ├── feed/               # Content feed
    └── post/               # Post management
```

## Architecture Principles

### 1. Feature-Based Organization
Each feature is self-contained with its own:
- Components
- Hooks
- Services
- Types

### 2. Separation of Concerns
- `core/` - Shared, reusable code
- `features/` - Domain-specific code
- `app/` - Routing and page composition

### 3. Import Paths
Use absolute imports with `@/` prefix:
```typescript
import { Button } from '@/core/components/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';
```

## Adding New Features

1. Create feature directory: `src/features/[feature-name]/`
2. Add subdirectories: `components/`, `hooks/`, `services/`, `types/`
3. Create `README.md` documenting the feature
4. Export public API from `index.ts`

## Next Steps

- Phase 0.7: Install dependencies
- Phase 1: Setup Firebase and core infrastructure
- Phase 2: Implement authentication
