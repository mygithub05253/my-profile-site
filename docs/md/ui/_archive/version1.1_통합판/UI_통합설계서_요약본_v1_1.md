# UI 통합설계서 요약본 v1.1

> 2026-07-04 (KST) · v1.0 4종 문서를 화면 ID 체계로 통합 승격 · 전체본: `UI_통합설계서_v1_1.md`

## 한 줄 요약
사이트 6화면(S-01~05, 404) + 관리자 5화면(A-01~05) — 토큰은 DESIGN.md(C안 Signal) 참조 전용, 화면·상태·전이는 본 문서가 정본.

## 사이트 화면
- S-01 홈: Hero→강점4→Stack→Featured(3~4)→Records→Blog3→Contact, fade-up 1회
- S-02 목록: 필터 칩 6종(단일, URL 동기화), 상태 4종(기본/필터/빈 결과/hover), private 배지
- S-03 상세: breadcrumb + 메타(mono 기간) + Secondary 버튼(private=GitHub 미렌더) + STAR MDX + 이전/다음(단방향)
- S-04/05 블로그: 재스킨만, MDXComponents는 S-03과 공유
- 푸터에 자동화 서사 1줄 → 자동화 생태계 프로젝트 상세로 링크

## 관리자 화면 (profile-admin, 초안)
A-01 로그인(403 고정 문구) → A-02 목록(삭제=slug 재입력) → A-03 편집(폼+MDX 프리뷰, zod 인라인 에러, 409 diff 패널) → A-04 초안 승격(발행 경고 모달) → A-05 대시보드. **사이트와 동일 토큰.**

## 규칙
AA·포커스 트랩·reduced-motion 전체 비활성 / 본문 72rem / 카드 전체 단일 링크

## PR 분할
PR-A(hub 스키마) → PR-B(토큰·공통·재스킨) → PR-C(projects 화면+OG, A 선행) → PR-D(홈) → MDX 11건 → /qa·/design-review → Phase 7(admin)
