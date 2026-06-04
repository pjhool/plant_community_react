# 반려식물 초보집사 커뮤니티 앱 (Plant Community React)

반려식물을 처음 키우는 초보 집사들을 위한 정보 공유 및 커뮤니티 플랫폼입니다. Next.js App Router 기반으로 구축되었으며, Firebase를 백엔드로 사용합니다.

## 🚀 기술 스택

| 분류 | 기술 |
|---|---|
| Framework | [Next.js 15 (App Router)](https://nextjs.org/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI & Styling | [Tailwind CSS](https://tailwindcss.com/) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/), [React Query](https://tanstack.com/query/latest) |
| Backend | [Firebase](https://firebase.google.com/) (Auth, Firestore, Storage) |
| Testing | [Vitest 4](https://vitest.dev/), [React Testing Library](https://testing-library.com/) |
| Linting | [ESLint 9](https://eslint.org/) (Flat Config), [Prettier](https://prettier.io/) |
| Package Manager | [pnpm 10](https://pnpm.io/) |

## 🛠️ 개발 환경 설정

### 필수 도구

- Node.js **v22.x** 이상
- pnpm **v10.x**

### 시작하기

```bash
# 1. 저장소 클론
git clone https://github.com/pjhool/plant_community_react.git
cd plant_community_react

# 2. 의존성 설치
pnpm install

# 3. 환경변수 설정
cp .env.local.example .env.local
# .env.local에 Firebase 프로젝트 설정값 입력

# 4. 로컬 개발 서버 실행
pnpm dev
```

### 환경변수

`.env.local.example`을 참고해서 `.env.local` 파일을 생성하세요.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 📂 프로젝트 구조

```
src/
├── app/                    # Next.js App Router (페이지 & 레이아웃)
│   ├── (auth)/             # 인증 라우트 그룹 (login, signup)
│   ├── feed/               # 피드 페이지
│   ├── onboarding/         # 온보딩 플로우 (setup, summary)
│   └── posts/              # 게시물 (상세, 작성)
├── core/                   # 공통 모듈
│   ├── components/         # 공통 UI 컴포넌트 (Button, Input 등)
│   ├── services/           # Firebase 초기화
│   ├── stores/             # Zustand 전역 상태
│   └── utils/              # 유틸리티 함수
└── features/               # 도메인별 기능 모듈
    ├── auth/               # 인증 & 사용자 관리
    ├── comments/           # 댓글 시스템
    ├── comparison/         # 식물 비교
    ├── environment-profile/ # 사용자 환경 프로필
    ├── feed/               # 피드 & 필터링
    └── post/               # 게시물 생성 & 관리
```

## 🧪 테스트

```bash
# 전체 테스트 실행 (watch 모드)
pnpm test

# 단일 실행 + 커버리지
pnpm test:coverage

# 특정 파일 테스트
pnpm test auth-service
```

## � 주요 명령어

```bash
pnpm dev            # 개발 서버 실행
pnpm build          # 프로덕션 빌드
pnpm start          # 프로덕션 서버 실행
pnpm lint           # ESLint 실행
pnpm type-check     # TypeScript 타입 검사
```

## 🐳 Docker

```bash
# 로컬에서 Docker 빌드 & 실행 (.env.local 필요)
docker compose up --build

# 직접 빌드
docker build \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=xxx \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx \
  -t plant-community-react .
```

> **Windows 주의사항**: `output: 'standalone'` 빌드 시 symlink 생성에 관리자 권한이 필요합니다.  
> 설정 → 개인정보 및 보안 → 개발자용 → **개발자 모드**를 활성화하거나, 터미널을 관리자 권한으로 실행하세요.

## 🚦 CI/CD

GitHub Actions 워크플로우 3개로 구성됩니다.

### `pr-check.yml` — PR 품질 게이트

**트리거**: PR open/update → `main`, `develop` / push → `main`, `develop`

| 단계 | 내용 |
|---|---|
| Install | `pnpm install --frozen-lockfile` |
| Lint | `pnpm lint` |
| Type Check | `pnpm type-check` |
| Security Audit | `pnpm audit` |
| Test & Coverage | `pnpm test:coverage` |
| Upload Coverage | coverage 리포트를 Artifact로 업로드 |

---

### `develop.yml` — develop 브랜치 CI + Docker push

**트리거**: push → `develop`

| 단계 | 내용 |
|---|---|
| Install | `pnpm install --frozen-lockfile` |
| Lint | `pnpm lint` |
| Type Check | `pnpm type-check` |
| Test & Coverage | `pnpm test:coverage` |
| Build | `pnpm build` |
| Docker Build & Push | `ghcr.io/<owner>/<repo>:develop`, `ghcr.io/<owner>/<repo>:develop-<sha>` |

---

### `ci.yml` — main/develop 통합 CI

**트리거**: push/PR → `main`, `develop`

| 단계 | 내용 |
|---|---|
| Install | `pnpm install --frozen-lockfile` |
| Lint | `pnpm lint` |
| Type Check | `pnpm type-check` |
| Test & Coverage | `pnpm test:coverage` (Codecov 업로드) |
| Build | `pnpm build` |

---

### Docker 이미지

이미지는 [GitHub Container Registry (ghcr.io)](https://ghcr.io) 에 push됩니다.

```
ghcr.io/pjhool/plant_community_react:develop        # develop 브랜치 최신
ghcr.io/pjhool/plant_community_react:develop-a1b2c3 # 커밋 SHA
```

push에는 별도 secrets 불필요 — `GITHUB_TOKEN`으로 자동 인증됩니다.  
단, 저장소 **Settings → Actions → General → Workflow permissions**에서 `Read and write permissions`로 설정 필요.

### 필요한 GitHub Secrets

| Secret | 용도 |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase 설정 (develop.yml, pr-check.yml) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase 설정 |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase 설정 |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase 설정 |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase 설정 |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase 설정 |
| `CODECOV_TOKEN` | 커버리지 업로드 (ci.yml) |

## 📄 라이선스

This project is licensed under the MIT License.
