# ui/ — UI 설계서 · 디자인 시스템

## 이 폴더에 있는 것

화면 설계(와이어프레임·컴포넌트 인벤토리·상태 정의)와 디자인 토큰 정본.

| 경로 | 내용 |
|------|------|
| `user/version1.1/` | 사용자 UI 설계서 — 화면 S-01~90 (현행 정본) |
| `admin/version1.0/` | 관리자 UI 설계서 — profile-admin 화면 A-01~05 (현행 정본) |
| `version1.0/DESIGN.md` | **디자인 토큰 정본** (C안 Signal — 듀얼 테마·Signal Blue·Pretendard·JetBrains Mono). 구현 시 레포 루트로 복사, 레포 분리 후에는 npm 패키지 `@mygithub05253/profile-tokens`로 배포 (ADR-10) |
| `version1.0/프로필사이트_재설계_요구사항_초안.md` | 요구사항 정의서 v1.0 (유효) — 페르소나·유스케이스·게재 프로젝트 선정 |
| `version1.0/UI_명세서.md` · `디자인시스템_검토서.md` | 승계됨 (user/admin 분리판으로 이관) — 이력 |
| `_archive/version1.1_통합판/` | 사용자/관리자 분리(2026-07-04) 전 통합판 — 이력 |

## 버전 관리 방식

- `{user|admin}/versionX.Y/` 폴더 + 3종 세트(설계서 · 요약본 · 변경사항). CN 누적 → 마일스톤 후 일괄 버전업
- 화면 ID(S-*, A-*)는 재사용하지 않는다 — 화면이 사라져도 ID는 결번 처리
- **DESIGN.md 토큰 변경은 semver** — 색·타이포 변경은 사이트/admin 양쪽 영향이므로 변경 시 두 레포 반영 여부를 변경사항에 기록
