# 프로필 사이트 UI 명세서 v1.0

> 작성일: 2026-07-04 (KST) · 상태: 초안 (구현 착수 기준 문서)
> 상위 문서: 요구사항 정의서 v1.0(확정) · DESIGN.md(확정, C안 Signal) · 대상: my-profile-site 재설계

## 1. 공통 레이아웃

### 1.1 헤더 (고정, 스크롤 시 배경 블러)
```
[DW.] ──────────── Projects · Blog · Records · Contact ── [🌓]
```
- 로고: 이니셜 워드마크(텍스트), 클릭 → `/`
- 내비: 홈 섹션 앵커(홈에서) / 라우트 이동(서브 페이지에서). 모바일: 햄버거 → 풀스크린 오버레이
- 우측: 테마 토글 (DESIGN.md 5장)

### 1.2 푸터
GitHub · velog · 이메일 링크 + "이 사이트는 content-hub 기반으로 자동 배포됩니다" 한 줄 (자동화 생태계 서사 노출)

## 2. 홈 `/` — 섹션 와이어프레임

```
┌─ Hero ────────────────────────────────────┐
│ 이동원                                     │  h1 4xl
│ 금융을 향하는 풀스택 개발자                  │  accent 강조 태그라인
│ "한 번 쓰면 모든 곳에 반영된다" — 자동화     │  muted 1줄
│ 생태계를 직접 설계·운영합니다               │
│ [프로젝트 보기]  [연락하기]                 │  Primary / Secondary
└───────────────────────────────────────────┘
┌─ About: 강점 4카드 (md 2×2, 모바일 1열) ───┐
│ 자동화 설계·운영 / 금융 도메인 학습          │
│ 팀 협업(부트캠프·동아리) / 기록(블로그 49+) │
└───────────────────────────────────────────┘
┌─ Stack ── 주력/학습 2그룹, 아이콘+라벨 칩 ──┐
┌─ Featured Projects ── featured:true 3~4건 ─┐
│ [카드] [카드] [카드]     [전체 보기 →]      │
┌─ Records ── 타임라인 (활동·수상·교육·자격) ─┐
┌─ Blog ── 최신 3건 (제목·날짜·태그) [더보기] ┐
┌─ Contact ── 이메일 CTA + 소셜 링크 ─────────┐
```

- Hero 문구는 초안 — 콘텐츠 작성 단계에서 확정
- 스크롤 진입 fade-up 1회 (DESIGN.md 4장)

## 3. 프로젝트 목록 `/projects`

```
h1 Projects + 부제(총 N개)
[All] [AI·Data] [Finance] [Fullstack] [Personal] [Team]   ← 필터 칩(단일 선택)
┌────────┐ ┌────────┐ ┌────────┐
│썸네일16:9│ │        │ │        │   lg 3열 / md 2열 / 모바일 1열
│칩·칩    │ │        │ │        │
│제목     │ │        │ │        │
│한줄요약  │ │        │ │        │
│⚙stack×3│ │        │ │        │
└────────┘ └────────┘ └────────┘
```

- 필터: URL 쿼리 `?filter=` 동기화 (뒤로가기·공유 대응). All 기본
- 매핑: AI·Data/Finance/Fullstack → `category` 포함 여부, Personal/Team → `scope` 일치
- 정렬: `featured` 우선 → `order` 오름차순
- 카드 전체가 링크. Private 레포는 우상단 `--warning` "비공개" 배지
- 빈 필터 결과: "해당 카테고리 프로젝트 준비 중" 안내

## 4. 프로젝트 상세 `/projects/[slug]`

```
← Projects 로 (breadcrumb)
h1 제목            [비공개 배지?]
칩: category·scope | 기간(mono) | 역할
[GitHub에서 보기] [Live Demo]     ← Secondary 버튼, repoVisibility=private면 GitHub 버튼 비노출
─────────────────────────────
썸네일/대표 이미지 (있으면)
본문 (MDX 렌더링):
  문제 정의 → 구현(다이어그램) → 성과(수치=mono+success) → 트러블슈팅 → 배운 점
─────────────────────────────
이전/다음 프로젝트 내비
```

- SSG (`generateStaticParams`), 글별 OG 이미지 (`opengraph-image.tsx` — 기존 블로그 패턴 재사용)
- MDX 컴포넌트: 제목 앵커, 코드 하이라이트, 콜아웃, 이미지 캡션 — 블로그와 공유

## 5. 블로그 `/blog`, `/blog/[slug]` — 기존 유지 + 신규 토큰 재스킨만

## 6. 컴포넌트 인벤토리 (구현 단위)

| 컴포넌트 | 재사용처 | 비고 |
|----------|----------|------|
| `ThemeToggle` + `ThemeProvider` | 전역 | FOUC 방지 인라인 스크립트 |
| `Header` / `Footer` / `Section` | 전역 | Section: 제목+수직 리듬 표준화 |
| `ProjectCard` / `FilterChips` | 홈·목록 | |
| `Badge` (private/카테고리/scope) | 카드·상세 | |
| `StackIcon` | Stack·카드 | simple-icons 기반 |
| `Timeline` / `TimelineItem` | Records | 기간 mono |
| `MDXComponents` | 블로그·프로젝트 상세 공유 | |
| `PostCard` | 홈·블로그 목록 | 기존 재스킨 |

## 7. 데이터 연동 (B안)

- content-hub에 `projects/*.mdx` 신설 → 기존 `scripts/sync-content.mjs`가 함께 clone → Velite `projects` 컬렉션 추가 (frontmatter 스키마 = 요구사항 정의서 6장)
- content-hub 측 선행 작업: `projects/` 디렉터리 + validate_frontmatter.py에 project 타입 검증 추가 + **velog-publish가 `projects/`를 무시**하도록 경로 필터 (프로젝트는 velog 발행 대상 아님)

## 8. 구현 순서 (PR 분할)

1. **PR-A (content-hub)**: `projects/` 스키마·검증·velog-publish 경로 필터 + 샘플 1건
2. **PR-B (my-profile-site)**: 디자인 토큰·테마 토글·공통 컴포넌트 (DESIGN.md 구현) — 레포 루트에 DESIGN.md 복사 포함
3. **PR-C**: `/projects` 목록+필터+상세+OG
4. **PR-D**: 홈 재구성 (Hero·About·Records 등)
5. 프로젝트 MDX 11건: 초안 생성 → 사용자 검수 → content-hub 커밋 (자동 반영)
6. QA (/qa) + 디자인 리뷰 (/design-review) → 배포
```
