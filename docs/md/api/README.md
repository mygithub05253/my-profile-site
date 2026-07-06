# api/ — API 명세서

## 이 폴더에 있는 것

이 생태계가 소비·제공하는 전체 API 계약. 자체 백엔드 서버가 없으므로 외부 API(velog GraphQL·GitHub·Vercel)와 워크플로 이벤트 계약, profile-admin Route Handlers가 대상이다.

| 경로 | 내용 |
|------|------|
| `user/version1.0/` | 사용자(방문자) 퍼블릭 서피스 — 사이트 페이지·RSS·OG 등 5종 (현행 정본) |
| `admin/version1.0/` | 관리자 권한 API — velog GraphQL(비공식), GitHub Contents/Git Database/dispatch/Actions, Vercel Deploy Hook, 워크플로 이벤트 E-1~E-5, profile-admin 내부 라우트, 토큰 캘린더 (현행 정본) |
| `_archive/version1.0_통합판/` | 사용자/관리자 분리(2026-07-04) 전 통합판 — 이력 |

## 버전 관리 방식

- `{user|admin}/versionX.Y/` 폴더 + 3종 세트(명세서 · 요약본 · 변경사항). CN 누적 → 마일스톤 후 일괄 버전업
- **토큰·Secret 값은 절대 기재하지 않는다** — 이름·위치·스코프·만료일만 기록 (만료 캘린더는 admin 명세서 §7)
- velog GraphQL은 **비공식 API** — 파손 리스크·폴백 정책이 계약의 일부이므로 함께 갱신할 것
