# Features Module

This directory contains feature-specific code organized by domain.

## Structure

Each feature follows this structure:
```
features/[feature-name]/
├── components/     # Feature-specific components
├── hooks/          # Feature-specific hooks
├── services/       # Feature-specific API/service calls
├── types/          # TypeScript types and interfaces
└── README.md       # Feature documentation
```

## Features

- `auth/` - Authentication and authorization
- `environment-profile/` - User environment profile management
- `feed/` - Content feed and filtering
- `post/` - Post creation and management
- `comments/` - Comment system

## Usage

Import from feature modules using absolute imports:

```typescript
import { LoginForm } from '@/features/auth/components/LoginForm';
import { useEnvironment } from '@/features/environment-profile/hooks/useEnvironment';
```
