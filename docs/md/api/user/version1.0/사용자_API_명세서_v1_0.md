# 사용자(방문자) API 명세서 v1.0

> **작성일:** 2026-07-04 (KST) | 상태: ■ 확정
> 정의 범위: 방문자에게 노출되는 **퍼블릭 서피스** — 사이트는 런타임 API 서버가 없으므로, 본 문서는 정적 엔드포인트 계약과 빌드 타임 데이터 계약을 정본화한다.
> 관리자·운영 API(velog GraphQL·GitHub·Vercel·profile-admin 라우트)는 `api/admin/version1.0/` 참조.

## 1. 퍼블릭 서피스 목록

| # | 엔드포인트 | 형식 | 생성 시점 | 비고 |
|---|-----------|------|-----------|------|
| U-1 | `/`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]` | HTML (SSG) | 빌드 | 한글 slug는 `encodeURIComponent` |
| U-2 | `/opengraph-image` 및 글·프로젝트별 OG | image/png | 빌드(next/og) | 다크 토큰 고정, E2E 200 확인 |
| U-3 | `/sitemap.xml` | XML | 빌드 | blog 49 + **projects 11 포함** (검토 F-9) |
| U-4 | `/robots.txt` | text | 정적 | |
| U-5 | (외부) velog RSS `https://v2.velog.io/rss/@kik328288` | RSS | velog 제공 | README 갱신의 소스 — 방문자도 구독 가능 |

## 2. 빌드 타임 데이터 계약 (런타임 API 대체)

- 소스: content-hub shallow clone(`sync-content.mjs`) → Velite 컬렉션 2종(posts·projects — 스키마 명세서 §7)
- **노출 필터**: posts는 `visibility=public AND status ∈ {published, synced}` / projects는 `status=published`
- 방문자 브라우저에서 발생하는 네트워크 요청: 정적 자산 + (선택) 폰트뿐 — 서드파티 API 호출 0건

## 3. 에러 계약

| 상황 | 응답 |
|------|------|
| 미존재 slug | 404 페이지 (S-90) |
| draft/비공개 콘텐츠 접근 | 애초에 SSG 미생성 → 404 |
| 서버 오류 | 해당 없음 (정적 서빙, 빌드 실패 시 이전 배포 유지) |

## 4. 캐싱·SEO 계약

- 정적 자산은 Vercel CDN 캐시. 재배포 시 무효화 자동
- OG 이미지는 SNS 크롤러가 캐시 — 갱신 지연 가능 (운영 노트, 검토 F-10)
- 메타데이터: 페이지별 `generateMetadata` (title·description·OG·twitter)
