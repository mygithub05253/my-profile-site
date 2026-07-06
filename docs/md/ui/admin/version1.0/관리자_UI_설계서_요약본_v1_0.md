# 관리자 UI 설계서 요약본 v1.0

> 2026-07-04 (KST) · **확정** (D·R 반영 완료) · 전체본: `관리자_UI_설계서_v1_0.md`

profile-admin(별도 레포) 화면 5종 — A-01 로그인(403 고정 문구, Auth.js v5 숫자 ID allowlist) / A-02 목록(삭제=slug 재입력, auto-merge PR 상태 배지) / A-03 편집(폼+MDX 프리뷰, zod 인라인, **이미지 드롭존: 압축·WebP·5MB 가드·단일 커밋**, 409 diff 패널, 502 localStorage 보존) / A-04 초안 승격(발행 경고 모달) / A-05 대시보드(+PR CI 상태). P3 후보 A-06 `/data` 정적 데이터 편집.
토큰 공유 = **npm 패키지** `@mygithub05253/profile-tokens` (ADR-10). 미결 없음 (2026-07-04 전건 해소).
