# Core Module

This directory contains shared/common code used across the entire application.

## Structure

- `components/` - Reusable UI components (Button, Loading, etc.)
- `styles/` - Global styles, themes, Tailwind configuration
- `utils/` - Utility functions and helpers
- `services/` - External service integrations (Firebase, Storage, etc.)
- `hooks/` - Custom React hooks
- `stores/` - Global state management (Zustand stores)

## Usage

Import from core modules using absolute imports:

```typescript
import { Button } from '@/core/components/Button';
import { useAuth } from '@/core/hooks/useAuth';
import { formatDate } from '@/core/utils/date';
```
