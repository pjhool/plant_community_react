# 반려식물 초보집사 커뮤니티 앱 (Plant Community React)

본 프로젝트는 반려식물을 처음 키우는 초보 집사들을 위한 정보 공유 및 커뮤니티 플랫폼입니다. Next.js App Router 아키텍처를 기반으로 구축되었습니다.

## 🚀 기술 스택

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/), [React Query](https://tanstack.com/query/latest)
- **Backend/Service**: [Firebase](https://firebase.google.com/)
- **Testing**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Linting & Formatting**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

## 🛠️ 개발 환경 설정

상세한 개발 환경 설정 방법은 [docs/DEV_SETUP.md](./docs/DEV_SETUP.md)를 참고하세요.

### 필수 도구
- Node.js v18.x 이상 (현재 v22.16.0 권장)
- pnpm v9.x

### 시작하기
```bash
# 1. 저장소 클론
git clone https://github.com/pjhool/plant_community_react.git

# 2. 의존성 설치
pnpm install

# 3. 로컬 개발 서버 실행
pnpm dev
```

## 📂 프로젝트 구조

애플리케이션 아키텍처에 대한 상세 설명은 [docs/PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md)를 참고하세요.

- `src/app/`: Next.js App Router (페이지 및 레이아웃)
- `src/core/`: 공통 컴포넌트, 훅, 서비스, 스타일 등 공유 모듈
- `src/features/`: 도메인별 기능 모듈 (Auth, Post, Feed 등)
- `docs/`: 프로젝트 및 CI/CD 문서

## 🧪 테스트

```bash
# 전체 테스트 실행
pnpm test

# 테스트 커버리지 확인
pnpm test:coverage
```

## 🛡️ CI/CD

프로젝트의 CI/CD 워크플로우에 대한 설명은 [docs/CI_CD_PIPELINE.md](./docs/CI_CD_PIPELINE.md)를 참고하세요.
모든 Pull Request는 Lint, Type Check, Test 및 Security Audit을 통과해야 합니다.

## 📄 라이선스

This project is licensed under the MIT License.
