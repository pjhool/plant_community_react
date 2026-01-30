# Phase 4-5 Execution: Environment Feed & Failure Posts

## TL;DR
> **Objective**: Implement **Environment-based Feed** (Phase 4) and **Failure Post Creation** (Phase 5).
> **Key Deliverables**:
> - Playwright E2E Setup & AGENTS.md
> - Feed UI with Filtering & Infinite Scroll
> - Multi-step Post Creation Wizard with Image Upload
> **Estimated Effort**: Medium-Large
> **Parallel Execution**: Sequential Waves (Phase 4 -> Phase 5)

---

## Context
- **Status**: Phases 0-3 complete.
- **Constraints**: 
  - All tasks must have GitHub Issues created (`gh issue create`).
  - Strict Feature Branch workflow (`feature/*`).
  - TDD + E2E verification required.
  - `AGENTS.md` to be established as first step.

## Work Objectives

### Phase 4: Environment Feed
- **Core**: Users can see posts matching their environment (or all posts).
- **Features**: Filtering (Light, Skill), Pagination (Cursor-based), Post Cards.
- **Data**: Firestore `posts` collection query optimization.

### Phase 5: Failure Post
- **Core**: Users can document plant failures to get help/compare.
- **Features**: 5-step wizard, Image compression/upload, Environment snapshotting.
- **Data**: `posts` document creation with `type: 'failure'`.

---

## Verification Strategy

### Test Infrastructure
- **Unit**: Vitest (Existing)
- **E2E**: **Playwright (New Setup Required)**
  - Config: `playwright.config.ts`
  - Dir: `tests/e2e/`

### Acceptance Criteria (Agent-Executable)
- **UI**: Playwright navigates, interacts, asserts visibility/text.
- **Logic**: Vitest imports service/hook, asserts return values.
- **API/Firebase**: Vitest mocks or integration tests against emulator (if avail) or mock service.

---

## Execution Strategy

### Wave 0: Workflow & Setup (Daily)
- **Git Sync Rule**: Before starting any feature, `git checkout develop && git pull origin develop`.
- **Branching**: Create feature branch `feature/phase-X-name` from updated develop.

### Wave 1: Setup (Critical Path)
- Task 1: Setup E2E & Agents Doc

### Wave 2: Phase 4 Implementation
- **Git Sync**: Pull develop -> `feature/phase-4-feed`.
- Task 2: Feed Service & Types
- Task 3: Feed UI Components
- Task 4: Integration & E2E

### Wave 3: Phase 5 Implementation
- **Git Sync**: Pull develop -> `feature/phase-5-failure-post`.
- Task 5: Storage & Form Store
- Task 6: Post Creation Steps
- Task 7: Integration & E2E

---

## TODOs

- [ ] 0. **Git Sync & Branching (Phase 4)**
  - **What to do**:
    - `git checkout develop`
    - `git pull origin develop`
    - `git checkout -b feature/phase-4-feed`
  - **Verification**:
    - `git branch --show-current` returns `feature/phase-4-feed`.
  - **Agent**: `git-master`

- [x] 1. **Setup E2E & Agents Doc**
  - **What to do**:
    - Install `@playwright/test`.
    - Initialize `playwright.config.ts`.
    - Move `.sisyphus/drafts/AGENTS.md` to `./AGENTS.md`.
    - Create `gh` issue: "Setup Playwright and Agents Doc".
  - **Verification**:
    - `pnpm exec playwright test --version` returns version.
    - `ls AGENTS.md` exists.
  - **Agent**: `quick` (Skills: `playwright`, `git-master`)

- [ ] 2. **Implement Feed Service & Types**
  - **What to do**:
    - Define `Post`, `PostFilter` types in `src/features/feed/types`.
    - Implement `feed-service.ts`: `getFeed(filter, limit, cursor)`.
    - Create `gh` issue: "Implement Feed Service and Types".
  - **Verification**:
    - `vitest src/features/feed/services/feed-service.test.ts` PASS.
  - **Agent**: `quick` (Skills: `git-master`)

- [ ] 3. **Implement Feed UI Components**
  - **What to do**:
    - Create `PostCard` (display env tags, author, image).
    - Create `FeedList` (handle loading state, empty state).
    - Create `FilterBar` (UI for filtering).
    - Create `gh` issue: "Implement Feed UI Components".
  - **Verification**:
    - `vitest src/features/feed/components` PASS.
  - **Agent**: `visual-engineering` (Skills: `frontend-ui-ux`, `git-master`)

- [ ] 4. **Phase 4 Integration & E2E**
  - **What to do**:
    - Integrate Feed into `src/app/page.tsx` (or `/feed`).
    - Write E2E test: `tests/e2e/feed.spec.ts`.
    - Create `gh` issue: "Phase 4 Integration and E2E".
  - **Verification**:
    - `pnpm exec playwright test tests/e2e/feed.spec.ts` PASS.
  - **Agent**: `quick` (Skills: `playwright`, `git-master`)

- [ ] 5. **Setup Storage & Post Form Store**
  - **What to do**:
    - Implement `storage.ts` with compression.
    - Implement `usePostFormStore.ts` (Zustand) with persistence.
    - Create `gh` issue: "Setup Storage and Post Form Store".
  - **Verification**:
    - `vitest src/core/services/storage.test.ts` PASS.
  - **Agent**: `quick` (Skills: `git-master`)

- [ ] 6. **Implement Post Creation Steps**
  - **What to do**:
    - Implement Wizard Layout.
    - Implement Steps 1-5 (Type, Env, Plant, Failure, Summary).
    - Connect to `usePostFormStore`.
    - Create `gh` issue: "Implement Post Creation Steps".
  - **Verification**:
    - `vitest src/features/post/components` PASS.
  - **Agent**: `visual-engineering` (Skills: `frontend-ui-ux`, `git-master`)

- [ ] 7. **Phase 5 Integration & E2E**
  - **What to do**:
    - Connect Form Submit to `post-service.ts`.
    - Write E2E test: `tests/e2e/post-creation.spec.ts`.
    - Create `gh` issue: "Phase 5 Integration and E2E".
  - **Verification**:
    - `pnpm exec playwright test tests/e2e/post-creation.spec.ts` PASS.
  - **Agent**: `quick` (Skills: `playwright`, `git-master`)

---

## Success Criteria
- [ ] `AGENTS.md` exists in root.
- [ ] Playwright configured and running.
- [ ] Feed page loads posts from Firestore.
- [ ] Can create a 'Failure' post with image.
- [ ] All tests pass.
