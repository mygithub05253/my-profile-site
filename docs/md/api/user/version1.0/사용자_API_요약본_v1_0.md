# 사용자 API 요약본 v1.0

> 2026-07-04 (KST) · 전체본: `사용자_API_명세서_v1_0.md`

**런타임 API 서버 없음** — 퍼블릭 서피스 5종(SSG HTML·OG png·sitemap(projects 11 포함)·robots·velog RSS)이 전부.
데이터는 빌드 타임 Velite 계약(노출 필터: posts=public+published/synced, projects=published)으로만 공급.
에러 표면은 404뿐(정적 서빙, 빌드 실패 시 이전 배포 유지). OG는 SNS 캐시 지연 가능.
