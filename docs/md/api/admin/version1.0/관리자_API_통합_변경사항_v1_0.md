# 관리자 API 통합명세서 v1.0 변경사항

> 2026-07-04 (KST) · 연동 API 통합명세서 v1.0에서 **사용자/관리자 분리** + 검토 반영

## 변경 내역

| CN | 내용 |
|----|------|
| CN-1 | 통합명세서에서 관리자 권한 API 전체를 분리 (gc-dating `api/admin/` 체계). 퍼블릭 서피스는 `api/user/`로 |
| CN-2 | 검토 F-5 반영: admin 저장 흐름을 **PR+auto-merge 권장안** 기준으로 재작성, 응답 `commitUrl`→`prUrl` (D-2 확정 시 재조정) |
| CN-3 | 검토 F-6 반영: Deploy Hook·E-3 트리거 경로 = posts+projects, drafts 제외 (PR-A 요건) |
| CN-4 | 검토 F-7 반영: E-5 역방향 diff 대상 posts/ 한정 명문화 |
| CN-5 | Actions API(A-5)·admin P1/P2 라우트(promote·dashboard) 추가 |
| CN-6 | GITHUB_PAT(admin 서버용) 토큰표 추가 — 클라이언트 미노출 원칙 |
| CN-7 | R-1 미확정 표기 — Contents API 제약 리서치 전 이미지 동시 업로드 확정 보류 |

## 2026-07-04 (후속): D-2 확정 + R-1·R-2 반영

| CN | 내용 |
|----|------|
| CN-8 | **D-2 확정 (b)**: §3.2.2 auto-merge 배선 신설 — allow_auto_merge(REST 1회)·required status check·GraphQL enablePullRequestAutoMerge(SQUASH)·토큰 2권한 |
| CN-9 | **R-1 반영**: §3.2.1 제약 확정 — 100MB/실용 50MB·1MB 초과 raw 헤더·rate limit 무해·**다중 파일 = Git Database API 4단계(base_tree 필수)**. 409 = sha 재조회+지수 백오프 3회 |
| CN-10 | **R-2 반영**: §6.1 Auth.js v5 숫자 ID allowlist·콜백 URL·Edge 런타임 주의. §7 admin env 5종 확정(AUTH_SECRET·AUTH_GITHUB_ID/SECRET·ALLOWED_GITHUB_ID·GITHUB_PAT) |
| CN-11 | §6.2 요청에 `assets[]` 추가(단일 원자 커밋, 413 에러) + §6.3에 P3 `/api/data/[file]` 신설 (D-1 (c)) |

## 미결 (v1.1 후보)
P1/P2 요청·응답 스키마 상세화 (구현 시점)
