# Vercel CLI 배포 가이드

이 문서는 Vercel CLI를 사용해서 Plant Community React 앱을 배포하는 방법을 설명합니다.

## 사전 준비

- Node.js v22.x 이상
- pnpm v10.x
- Vercel 계정 ([vercel.com](https://vercel.com) 에서 무료 가입)

## 1. Vercel CLI 설치

```bash
pnpm add -g vercel
```

설치 확인:

```bash
vercel --version
```

## 2. 로그인

```bash
vercel login
```

GitHub, GitLab, Email 중 선택해서 인증합니다.

## 3. 프로젝트 연결

프로젝트 루트에서 실행합니다:

```bash
vercel link
```

대화형 프롬프트:

```
? Set up "~/plant_community_react"? → Y
? Which scope? → 계정 선택
? Link to existing project? → N (신규) 또는 Y (기존 프로젝트 연결)
? What's your project's name? → plant-community-react
? In which directory is your code located? → ./
```

실행 후 `.vercel/project.json` 파일이 생성됩니다.

> `.vercel/` 폴더는 `.gitignore`에 추가되어 있습니다. `VERCEL_ORG_ID`와 `VERCEL_PROJECT_ID` 값은 이 파일에서 확인할 수 있습니다.

## 4. 환경변수 등록

Firebase 설정값을 Vercel에 등록합니다.

### 방법 A: CLI로 하나씩 등록

```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
```

각 명령 실행 시 값 입력과 환경(Production / Preview / Development) 선택을 요청합니다.

### 방법 B: 대시보드에서 등록

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables에서 일괄 등록합니다.

> **주의**: `DOCKER_BUILD` 환경변수는 Vercel에 등록하지 마세요.  
> 이 값이 없어야 `output: 'standalone'`이 비활성화되어 Vercel 배포가 정상 동작합니다.

## 5. 배포

### Preview 배포 (개발/테스트용)

```bash
vercel
```

고유한 preview URL이 생성됩니다 (예: `plant-community-react-abc123.vercel.app`).

### Production 배포

```bash
vercel --prod
```

프로덕션 도메인으로 배포됩니다.

## 6. GitHub Actions CI/CD 연동 (선택사항)

Vercel CLI 배포를 GitHub Actions에 통합할 수 있습니다.

### 필요한 Secrets

| Secret | 설명 | 확인 방법 |
|---|---|---|
| `VERCEL_TOKEN` | Vercel API 토큰 | 대시보드 → Settings → Tokens → Create |
| `VERCEL_ORG_ID` | 팀/계정 ID | `.vercel/project.json`의 `orgId` |
| `VERCEL_PROJECT_ID` | 프로젝트 ID | `.vercel/project.json`의 `projectId` |

### 워크플로우 스텝 예시

develop 브랜치 push 시 preview 배포:

```yaml
- name: Deploy to Vercel (Preview)
  run: vercel --token=${{ secrets.VERCEL_TOKEN }}
  env:
    VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
    VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

main 브랜치 push 시 production 배포:

```yaml
- name: Deploy to Vercel (Production)
  run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
  env:
    VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
    VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 7. 배포 확인

```bash
# 배포 목록 조회
vercel ls

# 최신 배포 로그 확인
vercel logs
```

## 자주 묻는 질문

**Q. `output: 'standalone'` 설정이 있는데 Vercel 배포가 되나요?**

A. 네. `next.config.mjs`에서 `DOCKER_BUILD=true` 환경변수가 있을 때만 `standalone`이 활성화되도록 설정되어 있습니다. Vercel 환경에는 이 변수가 없으므로 일반 모드로 빌드됩니다.

**Q. `.env.local` 파일을 그냥 올려도 되나요?**

A. `.env.local`은 `.gitignore`에 포함되어 있어 Git에 올라가지 않습니다. 환경변수는 반드시 `vercel env add` 명령 또는 대시보드를 통해 별도로 등록해야 합니다.

**Q. Firebase Auth의 `authDomain` 설정이 필요한가요?**

A. Vercel 배포 후 Firebase Console → Authentication → Settings → Authorized domains에 Vercel 도메인(`your-project.vercel.app`)을 추가해야 Google 로그인 등이 정상 동작합니다.
