# App Directory (Next.js App Router)

This directory contains the Next.js App Router pages and layouts.

## Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── (auth)/                 # Auth route group
│   ├── login/
│   └── signup/
├── onboarding/             # Onboarding flow
│   ├── setup/
│   └── summary/
└── posts/                  # Post routes
    ├── [id]/
    └── create/
```

## Routing

Next.js App Router uses file-system based routing:
- `page.tsx` - Defines a route
- `layout.tsx` - Shared UI for a segment
- `loading.tsx` - Loading UI
- `error.tsx` - Error UI
- `not-found.tsx` - 404 UI

## Usage

Pages are automatically routed based on folder structure.
Use `Link` component for navigation:

```typescript
import Link from 'next/link';

<Link href="/posts/123">View Post</Link>
```
