# 관리자 API 통합명세서 v1.0

> **작성일:** 2026-07-04 (KST) | 상태: ■ **확정** (§2~§5 as-built / §6 profile-admin — D-2 확정 + R-1·R-2 반영, 2026-07-04)
> 정의 범위: 관리자(운영자) 권한·토큰이 필요한 전 API — velog GraphQL, GitHub, Vercel Hook, 워크플로 이벤트, profile-admin 내부 라우트
> 방문자 퍼블릭 서피스는 `api/user/version1.0/` 참조. **profile-admin은 별도 레포 (ADR-9)**

## 목차

1. [API 지형도](#1-api-지형도)
2. [velog GraphQL API (비공식)](#2-velog-graphql-api-비공식)
3. [GitHub API](#3-github-api)
4. [Vercel Deploy Hook](#4-vercel-deploy-hook)
5. [워크플로 이벤트 계약](#5-워크플로-이벤트-계약)
6. [profile-admin 내부 API 계약 (초안)](#6-profile-admin-내부-api-계약-초안)
7. [인증·토큰 관리 총괄](#7-인증토큰-관리-총괄)
8. [공통 에러 처리 정책](#8-공통-에러-처리-정책)

---

## 1. API 지형도

| # | API | 방향 | 호출자 | 인증 | 상태 |
|---|-----|------|--------|------|------|
| A-1 | velog GraphQL | 소비 | velog-publish / velog-backup | Cookie (refresh→access) | ✅ 운영 |
| A-2 | GitHub Contents/Git API | 소비 | velog-backup 역방향, sync-blog.ps1, (예정) profile-admin | PAT / OAuth | ✅ 운영 |
| A-3 | GitHub repository_dispatch | 발신 | content-hub deploy-site → mygithub05253 | CONTENT_DISPATCH_TOKEN | ✅ 운영 |
| A-4 | Vercel Deploy Hook | 발신 | content-hub deploy-site | URL 자체가 비밀 | ✅ 운영 |
| A-5 | GitHub Actions API | 소비 | (예정) profile-admin 대시보드 | OAuth/PAT | 🔶 P2 |
| A-6 | profile-admin Route Handlers | 제공 | 관리자 브라우저 | GitHub OAuth (1인) | 🔶 설계 |

## 2. velog GraphQL API (비공식)

> Endpoint: `https://v3.velog.io/graphql` · **비공식 — 파손 리스크 상존** (§8 폴백 필수)

### 2.1 인증 시퀀스
1. `VELOG_REFRESH_TOKEN`(30일, 만료 2026-08-02)으로 access_token 자동 재발급
2. 헤더: `Cookie: access_token=...; refresh_token=...` — **Cookie 인증만** (Bearer 불가)
3. 재발급 실패: 워크플로 실패 + 수동 갱신 안내

### 2.2 발행 (write_post mutation)
| 항목 | 값 |
|------|-----|
| operationName | **필수** (누락 시 실패) |
| 필수 변수 | `title`·`body`·`tags`(배열, 생략·문자열 금지)·`is_private`·`url_slug`·`meta`(필수 객체) |
| 응답 판정 | `data.writePost == null` ⇒ 실패 (HTTP 200이어도) |
| 성공 후처리 | velog_url을 frontmatter에 기입 → auto-sync 브랜치 커밋 → PR |

### 2.3 제약·스로틀
- **5분 내 공개 글 10개 초과 시 자동 비공개** → 대량 발행은 간격 발행 필수
- url_slug 원문 보존 (대소문자·점 유지)

### 2.4 발행 대상 경로 필터 (PR-A 요건)
- 트리거 경로 `posts/**`만. **`projects/**` 제외** (프로젝트는 velog 대상 아님)
- auto-sync발 병합 커밋은 발행 스킵 (루프 가드 — 검증 완료)

### 2.5 백업 조회 (velog-backup)
- 일일: 사용자 글 전량 백업. 주간 역방향: **diff 대상 posts/ 한정** (projects 오염 방지 — 검토 F-7)

## 3. GitHub API

### 3.1 repository_dispatch (README 즉시 갱신)
| 항목 | 값 |
|------|-----|
| 요청 | `POST /repos/mygithub05253/mygithub05253/dispatches` · Body `{ "event_type": "content-updated" }` |
| 인증 | CONTENT_DISPATCH_TOKEN (fine-grained, mygithub05253 스코프 — 403 결함 이력 해결됨) |
| 수신 | blog-post.yml `repository_dispatch` + 일일 스케줄 백스톱 |

### 3.2 Contents API (profile-admin 저장 계약)

| 작업 | 엔드포인트 | 비고 |
|------|-----------|------|
| 조회 | `GET /repos/{owner}/content-hub/contents/{path}` | `sha` 확보 (수정·삭제 필수) |
| 생성/수정 | `PUT .../contents/{path}` | base64 content + message + (수정 시) sha |
| 삭제 | `DELETE .../contents/{path}` | sha 필수 |
| 목록 | `GET .../contents/projects` | 디렉터리 리스팅 |

- **동시성 (R-1 확정)**: sha 불일치 409 ⇒ 최신 sha 재조회 + **지수 백오프(200/400/800ms) 최대 3회** 자동 재시도 → 실패 시 diff 수동 해소 (FR-M21). sha는 항상 직전 GET에서 취득
- **저장 흐름 (D-2 확정: (b) PR + auto-merge)**: `admin/{slug}-{ts}` 브랜치 커밋 → PR 생성 → auto-merge 활성화 → CI(L1) 통과 시 자동 병합. CI 실패 시 PR 잔존 → 대시보드 표시 (검토 F-5)

#### 3.2.1 제약 (R-1 확정)

| 항목 | 값 |
|------|-----|
| 파일 크기 | 읽기·쓰기 공통 **100MB 상한** (공식). 1MB 초과 GET은 `Accept: application/vnd.github.raw+json` 필수 (미포함 시 content 빈 문자열). **실용 임계값 50MB 보수 운영** |
| Rate limit | 1차 5,000 req/h(인증) · 2차 콘텐츠 생성 80/min·500/h — 관리자 1인 수십 회/시간은 전 기준 무해. `x-ratelimit-remaining` 헤더 모니터링 |
| 다중 파일 원자 커밋 | Contents API PUT 반복은 **원자성 없음**(각각 독립 커밋 + 병렬 충돌) → **Git Database API 4단계 필수**: `POST /git/blobs` → `POST /git/trees`(**base_tree 지정 필수** — 생략 시 기존 파일 전삭제) → `POST /git/commits` → `PATCH /git/refs`(force:false, 422 시 재시도) |

#### 3.2.2 auto-merge 배선 (D-2 확정, R-1 확정)

| 단계 | API | 비고 |
|------|-----|------|
| 레포 설정 (1회) | `PATCH /repos/{owner}/content-hub` `{"allow_auto_merge": true}` | REST |
| 브랜치 보호 (1회) | main에 L1 검증(validate)을 **required status check로 등록** | 요건 0개면 auto-merge 미적용 |
| PR별 활성화 | GraphQL `enablePullRequestAutoMerge` (mergeMethod: SQUASH) | **REST 불가** — PR node_id 조회 후 mutation |
| 토큰 권한 | `contents: write` + `pull-requests: write` | 2024-05 이후 둘 다 필수 |

### 3.3 blog-post.yml (README 갱신)
- RSS 파싱 → `BLOG-POST-LIST` 마커 치환 → push. **`permissions: contents: write` 명시 필수** (403 결함 이력)

### 3.4 Actions API (P2 대시보드)
- `GET /repos/{owner}/{repo}/actions/runs?per_page=N` — velog-publish·deploy-site·blog-post 실행 이력

## 4. Vercel Deploy Hook

| 항목 | 값 |
|------|-----|
| 요청 | `POST {VERCEL_DEPLOY_HOOK_URL}` (body 불요) |
| 트리거 경로 | **`posts/**` + `projects/**` 병합 시 (drafts 제외)** — PR-A 요건 (검토 F-6) |
| 효과 | my-profile-site 재빌드 → 최신 content-hub 반영 |
| 실패 정책 | 2xx 아니면 잡 실패 표시 (사이트는 이전 배포 유지) |

## 5. 워크플로 이벤트 계약

| 이벤트 | 발신 → 수신 | 트리거 | 루프 가드/백스톱 |
|--------|-------------|--------|------------------|
| E-1 push(콘텐츠) | 로컬/admin → content-hub | posts/·projects/ 변경 | — |
| E-2 velog 발행 | content-hub 내부 | E-1 병합, **posts/** 한정** | auto-sync발 스킵 |
| E-3 재빌드 | content-hub → Vercel | E-1 병합 (**posts+projects, drafts 제외** — F-6) | — |
| E-4 dispatch | content-hub → mygithub05253 | E-1 병합 | 일일 스케줄 백스톱 |
| E-5 역방향 백업 | velog-backup → content-hub | 주간 월 09:00 KST | **posts/ 한정** (F-7), 브랜치 평면명 |

(시퀀스 다이어그램: 아키텍처 설계서 §3)

## 6. profile-admin 내부 API 계약 (초안)

> Next.js Route Handlers (별도 레포). 전 라우트 인증 미들웨어 필수. 화면: 관리자 UI 설계서 v1.0.

### 6.1 인증 (R-2 확정)
| 라우트 | 설명 |
|--------|------|
| `/api/auth/*` | Auth.js v5 GitHub OAuth. allowlist = **숫자 ID**(`profile.id`) 1건 — `signIn` 콜백 false + `authorized` 미들웨어 재확인. 거부 시 `pages.error` → 403 고정 |

- GitHub OAuth App 콜백 URL: `https://{admin-도메인}/api/auth/callback/github`
- JWT 세션(`maxAge` 단축). DB 어댑터 미사용 — Next.js 15 미들웨어는 Edge 런타임(Node 전용 라이브러리 금지)

### 6.2 프로젝트 CRUD (P0)
| 라우트 | 메서드 | 요청 | 응답 | 에러 |
|--------|--------|------|------|------|
| `/api/projects` | GET | — | `ProjectMeta[]` | 502 |
| `/api/projects` | POST | `{ frontmatter, body, assets?: {path, base64}[] }` | `{ slug, prUrl }` | 400(스키마)·409(slug 중복)·413(이미지 5MB 초과) |
| `/api/projects/[slug]` | GET | — | `{ frontmatter, body, sha }` | 404 |
| `/api/projects/[slug]` | PUT | `{ frontmatter, body, sha, assets?: {path, base64}[] }` | `{ prUrl }` | 409(sha)·400·413 |
| `/api/projects/[slug]` | DELETE | `{ sha }` | `{ prUrl }` | 409·404 |

- 서버 검증: zod = 스키마 §4 (P-1·P-2·**P-5** 포함) — CI(L1)와 이중화
- slug 불변: PUT의 slug 변경 = 400 (rename은 삭제+생성+aliases)
- 응답 `prUrl`: D-2 확정안(auto-merge PR) 기준
- `assets` 동반 시: 본문+이미지 **Git Database API 단일 원자 커밋** (§3.2.1). 이미지는 클라이언트에서 WebP 압축 후 전송 (FR-M22)

### 6.3 초안 관리 (P1) / 대시보드 (P2) / 정적 데이터 (P3)
- P1: `/api/drafts` 목록·편집 + `/api/drafts/[slug]/promote` (drafts→posts 이동 = ready 승격, 발행 경고 필수)
- P2: `/api/dashboard/runs` (Actions API 프록시) + `/api/dashboard/posts-status` (상태 매트릭스)
- P3 (D-1 (c)): `/api/data/[file]` GET·PUT — records/stacks/profile YAML (FR-M23, 저장 흐름 §6.2 재사용)

## 7. 인증·토큰 관리 총괄

| Secret | 위치 | 스코프 | 수명 |
|--------|------|--------|------|
| VELOG_REFRESH_TOKEN | content-hub·velog-backup | velog 계정 | **30일, 2026-08-02 만료** |
| CONTENT_DISPATCH_TOKEN | content-hub | fine-grained: mygithub05253(+hub) | 사용자 관리 |
| CONTENT_HUB_TOKEN | velog-backup | content-hub 쓰기 | 사용자 관리 |
| VERCEL_DEPLOY_HOOK_URL | content-hub | — | 회전 가능 |
| AUTH_SECRET | profile-admin Vercel env | JWT 서명·암호화 (`npx auth secret`) | 회전 시 전 세션 무효화 |
| AUTH_GITHUB_ID / AUTH_GITHUB_SECRET | profile-admin Vercel env | GitHub OAuth App (로그인 전용) | — |
| ALLOWED_GITHUB_ID | profile-admin Vercel env | 본인 GitHub **숫자 ID** (allowlist) | 불변 |
| GITHUB_PAT (admin 서버) | profile-admin Vercel env | fine-grained: content-hub `contents:write`+`pull-requests:write` | **클라이언트 미노출** |

- Vercel은 `AUTH_URL`·`AUTH_TRUST_HOST` 자동 감지 — 커스텀 도메인 이슈 시에만 명시 (R-2)

원칙: 최소 스코프 · 평문 노출 시 즉시 회전 · Secrets/env 외 저장 금지

## 8. 공통 에러 처리 정책

1. velog 파손: 상태 ready 유지 → velog_ready/ 수동 폴백. 타 채널 무영향
2. GitHub 403: 토큰 스코프/permissions 우선 확인 (실패 로그에 필요 스코프 명시)
3. 부분 실패 허용: deploy-site의 Hook/dispatch 잡 독립 실행
4. 재시도: 네트워크성 1회만. 스키마·인증 실패는 즉시 실패
