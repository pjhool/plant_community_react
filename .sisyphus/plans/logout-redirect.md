# Logout Implementation and Redirection Plan

## TL;DR

> **Quick Summary**: Implement logout redirection to the `/login` page in the home page component and create a corresponding GitHub issue.
> 
> **Deliverables**:
> - Updated `src/app/page.tsx` with redirection logic.
> - New test file `src/app/page.test.tsx` for unit testing the redirection.
> - GitHub issue created via `gh` CLI.
> 
> **Estimated Effort**: Short
> **Parallel Execution**: NO - sequential
> **Critical Path**: Update code → Create test → Create GitHub issue

---

## Context

### Original Request
Sign Out 클릭 시 로그아웃 수행하고, /login Page로 이동하게 수정 검토 및 GitHub 이슈 생성.

### Interview Summary
**Key Discussions**:
- Action: Click "Sign Out" button in `src/app/page.tsx`.
- Behavior: Call `signOut()` and redirect to `/login`.
- GitHub: Create issue with `bug` label.
- Testing: Include TDD/Unit tests.

### Metis Review (Self-Correction)
**Identified Gaps** (addressed):
- **Error Handling**: If `signOut` fails, the error is caught by the hook, but the component should ideally handle it (e.g., console.error or UI feedback).
- **Navigation Method**: `router.push('/login')` is appropriate for client-side navigation.
- **Test Mocking**: Need to mock `useAuth` and `useRouter` from `next/navigation`.

---

## Work Objectives

### Core Objective
Ensure that clicking "Sign Out" performs a logout operation and navigates the user to the login page, while documenting the task as a GitHub issue.

### Concrete Deliverables
- `src/app/page.tsx` (modified)
- `src/app/page.test.tsx` (new)
- GitHub Issue (created)

### Definition of Done
- [x] User is redirected to `/login` after clicking "Sign Out".
- [x] Unit tests for `HomePage` pass.
- [x] GitHub issue is visible in the repository.

### Must Have
- Navigation to `/login`.
- Unit tests for the homepage component.
- GitHub issue with `bug` label.

### Must NOT Have (Guardrails)
- Do not modify `useAuth` hook logic (it's already working).
- Do not add external toast libraries if not already present.

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES (Vitest)
- **User wants tests**: YES (TDD)
- **Framework**: Vitest + React Testing Library

### TDD Workflow

**Task Structure:**
1. **RED**: Create `src/app/page.test.tsx` with a test case checking for `router.push('/login')` call after button click.
   - Command: `pnpm vitest run src/app/page.test.tsx`
2. **GREEN**: Modify `src/app/page.tsx` to include `useRouter` and navigation logic.
   - Command: `pnpm vitest run src/app/page.test.tsx`
3. **REFACTOR**: Ensure clean imports and proper error handling.
   - Command: `pnpm vitest run src/app/page.test.tsx`

---

## Execution Strategy

### Parallel Execution Waves
Sequential execution is recommended due to the small scope and dependency on file changes for tests.

---

## TODOs

- [x] 1. Create Unit Test for HomePage (RED)

  **What to do**:
  - Create `tests/unit/app/page.test.tsx`.
  - Mock `@/features/auth/hooks/use-auth`.
  - Mock `next/navigation` for `useRouter`.
  - Write test: "should call signOut and redirect to /login when Sign Out button is clicked".

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
  - **Skills**: [`vitest`, `react-testing-library`]
  - **Reason**: Simple test setup.

  **References**:
  - `tests/unit/features/auth/components/LoginForm.test.tsx` - Reference for component testing and mocking.
  - `src/app/page.tsx` - Target component.

  **Acceptance Criteria**:
  - [x] `tests/unit/app/page.test.tsx` exists.
  - [x] `pnpm vitest run tests/unit/app/page.test.tsx` fails (as logic is not yet implemented).

- [x] 2. Implement Logout Redirection (GREEN)

  **What to do**:
  - Import `useRouter` from `next/navigation` in `src/app/page.tsx`.
  - Define `handleSignOut` function:
    ```typescript
    const handleSignOut = async () => {
        await signOut();
        router.push("/login");
    };
    ```
  - Update button `onClick` to use `handleSignOut`.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`next.js`, `react`]
  - **Reason**: Minor functional change.

  **Acceptance Criteria**:
  - [x] `pnpm vitest run tests/unit/app/page.test.tsx` passes.

- [x] 3. Create GitHub Issue

  **What to do**:
  - Verify `gh` authentication: `gh auth status`.
  - Run `gh issue create` with the following parameters:
    - Title: `fix(auth): Sign Out button should redirect to login page`
    - Body: `현재 Sign Out 버튼 클릭 시 로그아웃은 수행되나 페이지 이동이 없습니다. 로그아웃 후 /login 페이지로 리다이렉트되도록 수정합니다.`
    - Label: `bug`

  **Must NOT do**:
  - Do not create the issue if `gh auth status` fails (report error instead).

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`git-master`]
  - **Reason**: Command line operation.

  **Acceptance Criteria**:
  - [x] Command output shows issue URL.
  - [x] `gh issue list --label bug` shows the new issue.


---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `test: add unit test for home page logout redirection` | `src/app/page.test.tsx` | N/A |
| 2 | `fix(auth): redirect to login page after sign out` | `src/app/page.tsx` | `pnpm vitest` |

---

## Success Criteria

### Verification Commands
```bash
pnpm vitest run src/app/page.test.tsx
gh issue list --label bug --limit 1
```

### Final Checklist
- [x] User is redirected to `/login` upon logout.
- [x] Test coverage for the homepage component redirection.
- [x] GitHub issue successfully created and labeled.
