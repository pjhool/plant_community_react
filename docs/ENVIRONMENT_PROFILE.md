# 🏠 환경 프로필 (Environment Profile)

사용자의 주거 환경 및 식물 재배 수준을 관리하는 기능입니다.

## 데이터 구조

### EnvironmentProfile
| 필드명 | 타입 | 설명 |
|--------|------|------|
| userId | string | 사용자 고유 ID (Firestore Document ID와 동일) |
| residenceType | ResidenceType | 거주 형태 (아파트, 빌라 등) |
| lightDirection | LightDirection | 채광 방향 (남향, 동향 등) |
| experienceLevel | ExperienceLevel | 식물 재배 경험 수준 |
| location | string (optional) | 거주 지역 |
| createdAt | string (ISO) | 생성 일시 |
| updatedAt | string (ISO) | 수정 일시 |

### ResidenceType
- `APARTMENT`: 아파트
- `VILLA`: 빌라/연립
- `HOUSE`: 단독주택
- `OFFICE`: 오피스텔/사무실
- `OTHER`: 기타

### LightDirection
- `SOUTH`, `SOUTH_EAST`, `SOUTH_WEST`, `EAST`, `WEST`, `NORTH`, `NONE`

### ExperienceLevel
- `BEGINNER`: 초보
- `INTERMEDIATE`: 중급
- `EXPERT`: 전문가

## 온보딩 플로우

1. **Setup**: `/onboarding/setup`
   - 거주 환경 -> 채광 방향 -> 경험 수준 순으로 3단계 입력
2. **Summary**: `/onboarding/summary`
   - 입력된 정보를 확인하고 메인 피드로 이동

## 주요 컴포넌트

- `SetupForm`: 단계별 온보딩 폼
- `EnvironmentCard`: 사용자 환경 정보를 요약해서 보여주는 카드

## 서비스 및 훅

- `EnvironmentService`: Firestore CRUD 로직
- `useEnvironment`: 프로필 조회 및 저장 (TanStack Query 연동)
- `useEnvironmentForm`: 온보딩 단계 상태 관리
