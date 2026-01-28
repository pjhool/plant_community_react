# Routing & Layout Structure

This project uses the Next.js App Router.

## 1. Directory Structure
```text
src/app/
├── (auth)/             # Route group for authentication
│   ├── login/          # /login
│   └── signup/         # /signup
├── onboarding/         # Onboarding flow
│   └── setup/          # /onboarding/setup
├── (main)/             # Main application area (Logged-in)
│   ├── dashboard/
│   └── profile/
└── layout.tsx          # Root Layout
```

## 2. Layouts
- **Root Layout (`src/app/layout.tsx`)**: Handles global providers (Zustand, Query, Theme), font loading (`Noto Sans KR`), and global styling.
- **Auth Layout**: (To be implemented) Specialized layout for login/signup pages.

## 3. Middleware (`src/middleware.ts`)
The middleware handles:
- **Authentication Redirects**: Redirecting unauthenticated users to `/login`.
- **Onboarding Check**: (Planned) Redirecting new users to `/onboarding` if profile is incomplete.

## 4. Navigation
Use the `next/link` component or `useRouter` hook for navigation.
```tsx
import Link from 'next/link';
<Link href="/dashboard">Go to Dashboard</Link>
```
