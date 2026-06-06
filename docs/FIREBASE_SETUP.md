# Firebase 설정 및 초기화 가이드

이 문서는 Plant Community React 앱의 Firebase 프로젝트 설정, Firestore 스키마, 초기화 절차를 설명합니다.

---

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에서 **프로젝트 추가**
2. 프로젝트 이름 입력 (예: `plant-community-react`)
3. Google Analytics 활성화 (권장)

---

## 2. 웹 앱 등록 및 환경변수 설정

1. Firebase 프로젝트 → **프로젝트 설정** → **앱 추가** → Web(`</>`) 선택
2. 앱 이름 입력 후 등록
3. 표시되는 `firebaseConfig` 값을 `.env.local`에 저장

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

---

## 3. Firebase 서비스 활성화

### Authentication
Firebase Console → Authentication → **시작하기**
- **이메일/비밀번호** 로그인 활성화
- **Google** 소셜 로그인 활성화

Vercel 배포 시 → Authentication → Settings → **Authorized domains**에 Vercel 도메인 추가 필요

### Firestore Database
Firebase Console → Firestore Database → **데이터베이스 만들기**
- 모드 선택: **프로덕션 모드** (보안 규칙은 아래에서 배포)
- 리전 선택: `asia-northeast3` (서울) 권장

### Storage
Firebase Console → Storage → **시작하기**
- 기본 보안 규칙 사용 또는 직접 설정

---

## 4. Firebase CLI 설치 및 프로젝트 연결

```bash
# Firebase CLI 설치
pnpm add -g firebase-tools

# 로그인
firebase login

# 프로젝트 연결 (처음 1회)
firebase use --add
# 목록에서 생성한 프로젝트 선택 → 별칭 입력 (예: default)
```

---

## 5. Firestore 보안 규칙 배포

`firestore.rules` 파일이 프로젝트 루트에 있습니다.

```bash
firebase deploy --only firestore:rules
```

### 규칙 요약

| 컬렉션 | 읽기 | 쓰기 |
|---|---|---|
| `users` | 로그인 사용자 | 본인만 |
| `environments` | 로그인 사용자 | 본인만 |
| `posts` | 로그인 사용자 | 생성: 로그인 사용자, 수정: 작성자 또는 특정 필드, 삭제: 작성자 |
| `comments` | 로그인 사용자 | 생성: 본인 authorId, 수정/삭제: 작성자 |

---

## 6. Firestore 복합 인덱스 배포

`firestore.indexes.json` 파일이 프로젝트 루트에 있습니다.

```bash
firebase deploy --only firestore:indexes
```

### 인덱스 목록

피드 필터링에 필요한 복합 인덱스입니다. `posts` 컬렉션의 `environment` 필드가 중첩 객체이므로 반드시 배포해야 합니다.

| 컬렉션 | 필드 | 용도 |
|---|---|---|
| `posts` | `status` ↑, `createdAt` ↓ | 전체 피드 |
| `posts` | `status` ↑, `type` ↑, `createdAt` ↓ | 타입별 필터 |
| `posts` | `status` ↑, `environment.residenceType` ↑, `createdAt` ↓ | 주거 형태 필터 |
| `posts` | `status` ↑, `environment.lightDirection` ↑, `createdAt` ↓ | 채광 방향 필터 |
| `posts` | `status` ↑, `environment.experienceLevel` ↑, `createdAt` ↓ | 경험 수준 필터 |
| `posts` | `status` ↑, `authorId` ↑, `createdAt` ↓ | 사용자별 게시물 |
| `posts` | `status`↑, `residenceType`↑, `lightDirection`↑, `experienceLevel`↑, `createdAt`↓ | 환경 조합 필터 |
| `comments` | `postId` ↑, `createdAt` ↑ | 게시물 댓글 목록 |

### 한 번에 배포

```bash
firebase deploy --only firestore
```

규칙과 인덱스를 동시에 배포합니다.

---

## 7. Firestore 컬렉션 스키마

### `users/{uid}`

Firebase Auth의 `uid`가 문서 ID입니다. 회원가입 시 자동 생성됩니다.

| 필드 | 타입 | 설명 |
|---|---|---|
| `uid` | string | Firebase Auth UID |
| `email` | string | 이메일 |
| `displayName` | string | 닉네임 |
| `photoURL` | string \| null | 프로필 이미지 URL |
| `bio` | string | 자기소개 |
| `isOnboarded` | boolean | 환경 프로필 설정 완료 여부 |
| `createdAt` | Timestamp | 가입일 |
| `updatedAt` | Timestamp | 프로필 수정일 |

---

### `environments/{uid}`

사용자 환경 프로필. 문서 ID = 사용자 `uid`. 온보딩 완료 시 `users/{uid}.isOnboarded = true`와 batch write로 동시 저장됩니다.

| 필드 | 타입 | 설명 |
|---|---|---|
| `userId` | string | 사용자 UID |
| `residenceType` | string | `APARTMENT` \| `VILLA` \| `HOUSE` \| `OFFICE` \| `OTHER` |
| `lightDirection` | string | `SOUTH` \| `SOUTH_EAST` \| `SOUTH_WEST` \| `EAST` \| `WEST` \| `NORTH` \| `NONE` |
| `experienceLevel` | string | `BEGINNER` \| `INTERMEDIATE` \| `EXPERT` |
| `location` | string? | 위치 (선택) |
| `createdAt` | string | ISO 날짜 문자열 |
| `updatedAt` | string | ISO 날짜 문자열 |

---

### `posts/{postId}`

`addDoc`으로 자동 생성되는 ID를 사용합니다.

| 필드 | 타입 | 설명 |
|---|---|---|
| `authorId` | string | 작성자 UID |
| `type` | string | `FAILURE` \| `COMPARISON` \| `SURVIVAL` |
| `status` | string | `PUBLISHED` \| `HIDDEN` \| `DRAFT` |
| `title` | string | 제목 |
| `content` | string | 본문 |
| `images` | string[] | Firebase Storage URL 배열 |
| `plant` | object | 식물 정보 (아래 참고) |
| `environment` | object | 작성 시점 환경 스냅샷 (아래 참고) |
| `views` | number | 조회수 |
| `likes` | number | 좋아요 수 |
| `commentsCount` | number | 댓글 수 |
| `createdAt` | Timestamp | 작성일 |
| `updatedAt` | Timestamp | 수정일 |
| `failureStatus`? | string | `DEAD` \| `RECOVER_IMPOSSIBLE` (FAILURE 타입) |
| `failureDuration`? | number | 사망까지 기간 (FAILURE 타입) |
| `failureCauses`? | string[] | 원인 목록 (FAILURE 타입) |
| `causeAnalysis`? | string | 원인 분석 (FAILURE 타입) |
| `learnedLesson`? | string | 배운 점 (FAILURE 타입) |
| `comparisonTarget`? | string | `ENVIRONMENT` \| `MANAGEMENT` \| `RESULT` (COMPARISON 타입) |

**`plant` 중첩 객체**

| 필드 | 타입 | 설명 |
|---|---|---|
| `name` | string | 식물 이름 |
| `species` | string? | 식물 종 |
| `adoptionDate` | Timestamp? | 입양일 |
| `imageUrls` | string[] | 식물 사진 URL |
| `duration` | number? | 키운 기간 (일) |
| `status` | string? | 현재 상태 |

**`environment` 중첩 객체** (작성 시점의 환경 프로필 스냅샷)

| 필드 | 타입 | 설명 |
|---|---|---|
| `userId` | string | 사용자 UID |
| `residenceType` | string | 주거 형태 |
| `lightDirection` | string | 채광 방향 |
| `experienceLevel` | string | 경험 수준 |
| `snapshotAt` | Timestamp | 스냅샷 시각 |
| `createdAt` | string | 환경 프로필 생성일 |
| `updatedAt` | string | 환경 프로필 수정일 |

---

### `comments/{commentId}`

| 필드 | 타입 | 설명 |
|---|---|---|
| `postId` | string | 부모 게시물 ID |
| `authorId` | string | 작성자 UID |
| `author` | object | 작성자 정보 스냅샷 |
| `author.displayName` | string | 닉네임 |
| `author.photoURL` | string? | 프로필 이미지 |
| `author.profileSnapshot` | object? | 환경 프로필 일부 |
| `content` | string | 댓글 내용 |
| `type` | string | `NORMAL` \| `CASE_SHARING` |
| `likes` | number | 좋아요 수 |
| `createdAt` | Timestamp | 작성일 |
| `updatedAt` | Timestamp | 수정일 |

---

## 8. SDK 초기화 코드

Firebase SDK는 `src/core/services/firebase.ts`에서 싱글톤 패턴으로 초기화됩니다.

```typescript
import { app, auth, db, storage } from "@/core/services/firebase";
```

**주요 동작**: `typeof window === 'undefined'` 체크로 서버 사이드(Vercel SSR/SSG) 실행 시 초기화를 건너뜁니다. Firebase SDK는 브라우저 전용이기 때문입니다.
