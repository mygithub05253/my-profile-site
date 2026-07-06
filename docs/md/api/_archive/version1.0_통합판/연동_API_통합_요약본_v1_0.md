# 연동 API 통합 요약본 v1.0

> 2026-07-04 (KST) · 신규 제정 · 전체본: `연동_API_통합명세서_v1_0.md`

## 한 줄 요약
자체 백엔드 없음 — **velog GraphQL(비공식)·GitHub·Vercel Hook 소비 계약 + 워크플로 이벤트 5종 + profile-admin 라우트 계약(초안)**.

## API 6종
| API | 용도 | 상태 |
|-----|------|------|
| velog GraphQL | 자동 발행·백업 (Cookie 인증, operationName·tags·meta 필수, null=실패, 5분 10개 스로틀) | ✅ |
| GitHub Contents | profile-admin CRUD 저장 (sha 낙관적 잠금) | 🔶 설계 |
| repository_dispatch | README 즉시 갱신 (content-updated) | ✅ |
| Vercel Deploy Hook | 사이트 재빌드 | ✅ |
| velog RSS | README 일일 갱신 백스톱 | ✅ |
| profile-admin Route Handlers | GET/POST/PUT/DELETE `/api/projects` (+auth·drafts·대시보드) | 🔶 초안 |

## 핵심 규칙
- **경로 필터(PR-A)**: velog-publish는 `posts/**`만 — `projects/**` 발행 제외
- **루프 가드**: auto-sync발 커밋은 발행 스킵 (검증 완료)
- **폴백**: velog 발행 실패 시 ready 유지 + velog_ready/ 수동 경로
- **profile-admin**: OAuth allowlist 1인 · slug 불변(PUT에서 변경=400) · sha 충돌 409 → 재시도 1회

## 토큰 캘린더
VELOG_REFRESH_TOKEN **2026-08-02 만료(30일 주기)** · CONTENT_DISPATCH_TOKEN(mygithub05253 스코프 확인됨) · CONTENT_HUB_TOKEN(쓰기)
