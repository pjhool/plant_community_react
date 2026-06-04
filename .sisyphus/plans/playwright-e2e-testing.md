# Playwright E2E 테스트 진행계획

## TL;DR

> **Quick Summary**: Playwright E2E 테스트 인프라 확장 - 메인, 인증, 온보딩 화면 테스트 추가 및 게시글 작성 플로우 상세화
>
> **Deliverables**:
> - `tests/e2e/home.spec.ts` - 메인 페이지 테스트
> - `tests/e2e/login.spec.ts` - 로그인 플로우 테스트
> - `tests/e2e/signup.spec.ts` - 회원가입 플로우 테스트
> - `tests/e2e/onboarding.spec.ts` - 온보딩 플로우 테스트
> - `tests/e2e/post-creation.spec.ts` - 게시글 작성 6단계 플로우 확장
> - `tests/e2e/fixtures/seed.json` - 시드 데이터 JSON
> - `playwright.config.ts` - 모바일 테스트 제거 및 설정 최적화
>
> **Estimated Effort**: Medium
> **Parallel Execution**: NO - sequential (각 테스트 파일 순차 작성)
> **Critical Path**: playwright.config.ts 수정 → 시드 데이터 생성 → 테스트 파일들 작성

---

## Context

### Original Request
Playwright를 사용하여 화면 별로 E2E 테스트 진행계획 작성

### Interview Summary
**Key Discussions**:
- **테스트 범위**: 게시글 작성 확장 + 핵심 플로우 (메인, 로그인, 회원가입, 온보딩)
- **테스트 깊이**: Happy path + 에러 케이스 포함
- **데이터 초기화**: 시드 데이터 사용 (JSON 파일)
- **CI/CD**: 테스트 파일만 생성 (CI/CD 파이프라인 설정 제외)
- **Firebase 환경**: 개발용 프로젝트 재사용
- **기존 테스트 처리**: 그대로 유지
- **모바일 테스트**: 데스크톱만 (Pixel 5 제거)

**Research Findings**:
- Playwright v1.58.0이 이미 설치되어 있음
- `playwright.config.ts`가 이미 설정됨 (Desktop Chrome + Pixel 5)
- `tests/e2e/` 디렉토리에 5개의 기존 테스트 파일이 존재
  - comments.spec.ts
  - comparison.spec.ts
  - feed.spec.ts
  - post-creation.spec.ts (일부만)
  - survival.spec.ts

### Metis Review
Skipped due to session creation issue. Proceeded with direct plan generation based on comprehensive interview.

---

## Work Objectives

### Core Objective
메인, 인증, 온보딩 화면의 E2E 테스트를 추가하고 게시글 작성 플로우를 상세화하여, 핵심 사용자 경로에 대한 안정적인 테스트 커버리지 확보

### Concrete Deliverables
1. **playwright.config.ts 수정** - Pixel 5 (모바일) 테스트 제거
2. **tests/e2e/fixtures/seed.json 생성** - 테스트용 시드 데이터 구조
3. **tests/e2e/home.spec.ts** - 메인 페이지 테스트
4. **tests/e2e/login.spec.ts** - 로그인 플로우 테스트 (성공 + 에러)
5. **tests/e2e/signup.spec.ts** - 회원가입 플로우 테스트 (성공 + 유효성 검사)
6. **tests/e2e/onboarding.spec.ts** - 온보딩 플로우 테스트 (setup → summary)
7. **tests/e2e/post-creation.spec.ts 확장** - 6단계 게시글 작성 플로우 상세화

### Definition of Done
- [ ] `pnpm exec playwright test` 실행 시 모든 테스트가 PASS
- [ ] `pnpm exec playwright test --ui`로 테스트 UI에서 결과 확인 가능
- [ ] 각 테스트 파일이 happy path + 최소 1개 이상의 에러 케이스 포함
- [ ] 시드 데이터 JSON 파일이 존재하고 테스트에서 사용됨

### Must Have
- 메인 페이지 렌더링 테스트
- 로그인 (성공 + 실패 케이스)
- 회원가입 (성공 + 유효성 검사 실패)
- 온보딩 플로우 (setup → summary)
- 게시글 작성 6단계 플로우

### Must NOT Have (Guardrails)
- **기존 테스트 수정 금지**: comments.spec.ts, comparison.spec.ts, feed.spec.ts, survival.spec.ts는 건드리지 않음
- **CI/CD 파이프라인 추가 금지**: GitHub Actions 등 CI/CD 설정 추가 없음
- **새로운 브라우저/디바이스 추가 금지**: Desktop Chrome만 유지
- **Firebase 테스트 프로젝트 분리 금지**: 개발 프로젝트 그대로 사용

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: YES
- **User wants tests**: YES (E2E 테스트 작성)
- **Framework**: Playwright (@playwright/test)

### Automated Verification (E2E Testing)

Since this IS an E2E testing plan, each TODO includes acceptance criteria that verify tests run successfully:

**Test Execution Commands**:
```bash
# Run all E2E tests
pnpm exec playwright test

# Run specific test file
pnpm exec playwright test tests/e2e/home.spec.ts

# Run with UI mode (for interactive verification)
pnpm exec playwright test --ui

# Run in headed mode (show browser)
pnpm exec playwright test --headed
```

**Each Test File Acceptance Criteria**:
- [ ] Test file created at `tests/e2e/{name}.spec.ts`
- [ ] Test includes happy path (success case)
- [ ] Test includes at least 1 error case (validation, error message, etc.)
- [ ] Test uses playwright page object and assertions correctly
- [ ] `pnpm exec playwright test tests/e2e/{name}.spec.ts` → PASS
- [ ] Tests clean up after themselves (using test.each or proper teardown)

---

## Execution Strategy

### Parallel Execution Waves

NO - Sequential execution recommended.

**Rationale**: Each test file is independent and can be written in any order. However, since these are new test files, it's more efficient to write them sequentially to:
1. Build consistency in test patterns
2. Reuse common test utilities as they're developed
3. Gradually build up the test suite

**Suggested Order**:
```
Wave 1: Infrastructure Setup
├── Task 1: playwright.config.ts (remove mobile)
└── Task 2: seed.json (create seed data structure)

Wave 2: Simple Page Tests
├── Task 3: home.spec.ts (simplest)
└── Task 4: onboarding.spec.ts (simple flow)

Wave 3: Auth Flows
├── Task 5: login.spec.ts
└── Task 6: signup.spec.ts

Wave 4: Complex Multi-Step Flow
└── Task 7: post-creation.spec.ts (expand existing)
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 (config) | None | 2, 3, 4, 5, 6, 7 | None (must start first) |
| 2 (seed) | 1 | 5, 6, 7 | None |
| 3 (home) | 1 | None | 4 |
| 4 (onboarding) | 1 | None | 3 |
| 5 (login) | 1, 2 | None | 6 |
| 6 (signup) | 1, 2 | None | 5 |
| 7 (post-creation) | 1, 2 | None | None (can be anytime after 1, 2) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1, 2 | delegate_task(category="quick", load_skills=["playwright"]) |
| 2 | 3, 4 | delegate_task(category="quick", load_skills=["playwright"]) |
| 3 | 5, 6 | delegate_task(category="quick", load_skills=["playwright"]) |
| 4 | 7 | delegate_task(category="quick", load_skills=["playwright"]) |

---

## TODOs

- [x] 1. Playwright 설정 최적화 (모바일 테스트 제거)
...
- [x] 2. 시드 데이터 JSON 파일 생성
...
- [x] 3. 메인 페이지 E2E 테스트 작성
...
- [x] 4. 온보딩 플로우 E2E 테스트 작성
...
- [x] 5. 로그인 플로우 E2E 테스트 작성
...
- [x] 6. 회원가입 플로우 E2E 테스트 작성
...
- [x] 7. 게시글 작성 플로우 E2E 테스트 확장

  **What to do**:
  - `tests/e2e/post-creation.spec.ts` 확장 (기존 파일에 추가)
  - 6단계 게시글 작성 플로우 상세 테스트:
    1. `/posts/create/type` - 식물 유형 선택
    2. `/posts/create/plant-info` - 식물 정보 입력
    3. `/posts/create/description` - 설명 입력
    4. `/posts/create/env-lock` - 환경 정보 설정
    5. `/posts/create/summary` - 작성 요약 확인
    6. `/posts/create/success` - 작성 완료
  - 각 단계에서의 happy path 테스트
  - 에러 케이스: 필수 입력 누락, 유효성 검사 실패

  **Must NOT do**:
  - 기존 테스트 케이스 삭제 금지 (추가만)
  - 기존 테스트 로직 변경 금지

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Complex multi-step flow test - requires understanding of 6-page flow
  - **Skills**: `["playwright"]`
    - `playwright`: Complex navigation, state preservation across pages, multi-form testing
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed - no UI design, just test implementation

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (can be anytime after Wave 3)
  - **Blocks**: None
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Page References** (all 6 pages):
  - `src/app/posts/create/type/page.tsx` - Plant type selection
  - `src/app/posts/create/plant-info/page.tsx` - Plant info input
  - `src/app/posts/create/description/page.tsx` - Description input
  - `src/app/posts/create/env-lock/page.tsx` - Environment settings
  - `src/app/posts/create/summary/page.tsx` - Summary review
  - `src/app/posts/create/success/page.tsx` - Success page

  **Existing Test Reference**:
  - `tests/e2e/post-creation.spec.ts:1-100` - Existing test patterns and structure

  **Seed Data References**:
  - `tests/e2e/fixtures/seed.json:posts` - Sample post data for 6-step flow

  **Documentation References**:
  - `docs/PROJECT_STRUCTURE.md:19-24` - Feature structure

  **WHY Each Reference Matters**:
  - All 6 page files - Understand each step's form fields, navigation buttons, validation rules
  - `tests/e2e/post-creation.spec.ts:1-100` - Follow existing test conventions, add new tests without breaking existing ones
  - `tests/e2e/fixtures/seed.json:posts` - Use sample data for consistent test input across 6 steps

  **Acceptance Criteria**:

  **For Test Execution** (using Bash):
  \`\`\`bash
  pnpm exec playwright test tests/e2e/post-creation.spec.ts
  # Assert: Exit code 0

  pnpm exec playwright test tests/e2e/post-creation.spec.ts --reporter=json | jq '.stats'
  # Assert: tests >= 7 (existing + 6 steps + error case), failed = 0
  \`\`\`

  **Evidence to Capture**:
  - [ ] Terminal output from test execution
  - [ ] Test stats showing total tests >= 7

  **Commit**: YES
  - Message: `test(e2e): expand post-creation flow with 6-step e2e tests`
  - Files: `tests/e2e/post-creation.spec.ts`
  - Pre-commit: `pnpm exec playwright test tests/e2e/post-creation.spec.ts`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1, 2 | `config(test): optimize playwright config and add seed data` | playwright.config.ts, tests/e2e/fixtures/seed.json | `pnpm exec playwright test --list` |
| 3 | `test(e2e): add home page e2e test` | tests/e2e/home.spec.ts | `pnpm exec playwright test tests/e2e/home.spec.ts` |
| 4 | `test(e2e): add onboarding flow e2e test` | tests/e2e/onboarding.spec.ts | `pnpm exec playwright test tests/e2e/onboarding.spec.ts` |
| 5, 6 | `test(e2e): add auth flow e2e tests (login + signup)` | tests/e2e/login.spec.ts, tests/e2e/signup.spec.ts | `pnpm exec playwright test tests/e2e/login.spec.ts tests/e2e/signup.spec.ts` |
| 7 | `test(e2e): expand post-creation flow with 6-step e2e tests` | tests/e2e/post-creation.spec.ts | `pnpm exec playwright test tests/e2e/post-creation.spec.ts` |

---

## Success Criteria

### Verification Commands
```bash
# Run all E2E tests
pnpm exec playwright test
# Expected: All tests pass

# Run specific test file
pnpm exec playwright test tests/e2e/home.spec.ts
# Expected: Pass

# Run with coverage (verify all test files work)
pnpm exec playwright test --reporter=json | jq '.stats.total'
# Expected: Total tests >= 15 (home + onboarding + login + signup + post-creation)

# Verify no mobile tests
pnpm exec playwright test --list
# Expected: Shows 1 project (chromium), not 2
```

### Final Checklist
- [ ] Task 1 completed: Playwright config has only Desktop Chrome (no Pixel 5)
- [ ] Task 2 completed: tests/e2e/fixtures/seed.json exists with valid JSON structure
- [ ] Task 3 completed: home.spec.ts tests pass (>= 1 test)
- [ ] Task 4 completed: onboarding.spec.ts tests pass (>= 2 tests: happy path + error)
- [ ] Task 5 completed: login.spec.ts tests pass (>= 2 tests: success + error)
- [ ] Task 6 completed: signup.spec.ts tests pass (>= 4 tests: success + 3 validation errors)
- [ ] Task 7 completed: post-creation.spec.ts tests pass (>= 7 tests: existing + 6 steps expanded)
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent (existing tests untouched, no CI/CD changes, no Firebase project changes)
- [ ] All E2E tests pass with `pnpm exec playwright test`
