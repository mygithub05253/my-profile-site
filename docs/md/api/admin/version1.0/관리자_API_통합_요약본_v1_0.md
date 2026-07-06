# 관리자 API 통합 요약본 v1.0

> 2026-07-04 (KST) · 전체본: `관리자_API_통합명세서_v1_0.md`

## 한 줄 요약
관리자 권한 API 6종 — velog GraphQL(비공식)·GitHub(Contents/dispatch/Actions)·Vercel Hook·워크플로 이벤트 5종·profile-admin 라우트(초안).

## 핵심 계약
- **velog**: Cookie 전용, operationName·tags·meta 필수, null=실패, 5분 10개 스로틀, `posts/**`만 발행(projects 제외 — PR-A)
- **재빌드(F-6)**: 트리거 = posts+projects, drafts 제외
- **역방향 백업(F-7)**: diff 대상 posts 한정
- **admin 저장 (D-2 확정)**: `admin/*` 브랜치 → 원자 커밋(다중 파일 = **Git Database API**, base_tree 필수) → PR → **auto-merge**(GraphQL, SQUASH) — CI(L1) 게이트 유지 + 무개입. 사전 요건: allow_auto_merge·required status check·토큰 2권한
- **Contents API 제약 (R-1)**: 100MB 상한(실용 50MB), 1MB 초과 GET은 raw 헤더 필수, rate limit 1인 무해. 409 = sha 재조회 + 지수 백오프 3회
- **admin CRUD**: 5라우트 + `assets[]` 동반 원자 커밋(413 가드), zod 이중 검증(P-5 포함), slug 변경=400. P3: `/api/data/[file]` (D-1 (c))
- **admin 인증 (R-2)**: Auth.js v5, **숫자 ID** allowlist, 콜백 `/api/auth/callback/github`. env 5종(AUTH_SECRET·AUTH_GITHUB_ID/SECRET·ALLOWED_GITHUB_ID·GITHUB_PAT)
- **admin PAT**: 서버 env 전용, 클라이언트 미노출

## 토큰 캘린더
VELOG_REFRESH_TOKEN **2026-08-02 만료** · 이외 fine-grained PAT 최소 스코프

## 리서치 대기
없음 — R-1·R-2 반영 완료 (2026-07-04)
