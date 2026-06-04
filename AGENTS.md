# Agent Operational Guide (Plant Community React)

This file guides AI agents in this repository. Follow these rules strictly to maintain consistency.

## 1. Environment & Commands

- **Package Manager**: `pnpm`
- **Node Version**: v18.x or higher
- **Framework**: Next.js 14 (App Router)

### Key Commands
- **Install**: `pnpm install`
- **Dev Server**: `pnpm dev`
- **Build**: `pnpm build`
- **Lint**: `pnpm lint` (Runs ESLint)
- **Type Check**: `pnpm type-check` (Runs `tsc --noEmit`)
- **Test**: `pnpm test` (Runs Vitest)
- **Test Coverage**: `pnpm test:coverage`
- **Run Single Test**: `pnpm test [filename]` (e.g., `pnpm test auth-service`)

## 2. Project Structure

The project follows a **Feature-Based Architecture**.

```
src/
├── app/                    # Next.js App Router (Pages & Layouts)
├── core/                   # Shared modules (Components, Hooks, Utils)
│   ├── components/         # Atomic/Molecule UI components (Button, Input)
│   ├── services/           # External integrations (Firebase, Storage)
│   ├── stores/             # Global state (Zustand)
│   └── utils/              # Helper functions (cn, date, storage)
└── features/               # Domain-specific modules
    ├── [feature]/
    │   ├── components/     # Feature-specific UI
    │   ├── hooks/          # Feature-specific Logic
    │   ├── services/       # Domain Services
    │   └── types/          # Domain Types
```

- **DO NOT** put business logic in `src/app`. Keep pages thin.
- **DO NOT** cross-import between features if possible. Use `core` for shared code.

## 3. Code Style & Conventions

### Naming
- **Files**:
  - Components: `PascalCase.tsx` (e.g., `LoginForm.tsx`)
  - Hooks: `kebab-case.ts` (e.g., `use-auth.ts`, `use-environment.ts`)
  - Services: `kebab-case.ts` (e.g., `auth-service.ts`)
  - Stores: `camelCase.ts` (e.g., `useAppStore.ts`, `useEnvironmentStore.ts`)
  - Utils: `camelCase.ts` (e.g., `cn.ts`, `storage.ts`)
- **Variables/Functions**: `camelCase`
- **Components**: `PascalCase`
- **Types/Interfaces**: `PascalCase` (Prefix `I` is NOT used)

### Imports
- **ALWAYS** use absolute imports with `@/`.
  - ✅ `import { Button } from "@/core/components/Button"`
  - ❌ `import { Button } from "../../core/components/Button"`

### Components
- Use **Functional Components** with named exports.
- Use `interface` for props.
- Use `cn()` utility for Tailwind class merging.

```tsx
import { cn } from "@/core/utils/cn"

interface MyComponentProps {
  className?: string
  active?: boolean
}

export const MyComponent = ({ className, active }: MyComponentProps) => {
  return (
    <div className={cn("bg-white p-4", active && "bg-blue-500", className)}>
      Content
    </div>
  )
}
```

### State Management
- **Server State**: Use `React Query` (@tanstack/react-query).
- **Client Global State**: Use `Zustand`.
- **Form State**: Use `react-hook-form` + `zod`.

### Services & Async
- Encapsulate external API calls in `services/`.
- Use `async/await` with `try/catch`.
- Return typed responses.

### Testing
- Use **Vitest** + **React Testing Library**.
- Test files should be co-located or in `tests/` folder (current pattern uses `src/**/*.test.ts` or `tests/`).
- Verify existing patterns before adding new tests.

## 4. Documentation
- Update `README.md` inside `src/features/[feature]/` when adding new features.
- Keep `docs/` folder updated if architecture changes.
