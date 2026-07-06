# DESIGN.md — 프로필 사이트 디자인 시스템 v1.1 (확정)

> v1.1 확정일: 2026-07-05 (KST) · 방향: **Warm Paper** (웜 크림 페이퍼 + 오렌지 포인트, 라이트 기본 + 다크 듀얼)
> 벤치마킹: lova-clover.github.io (사용자 지정, 2026-07-05) — 푸근한 곰돌이 마스코트 아바타 포함
> v1.0(C안 Signal)은 ADR-12로 대체됨. 토큰 이름 체계는 유지 — 값만 교체 (컴포넌트 무수정 전환)

## 1. 원칙

1. **듀얼 테마**: 시스템 `prefers-color-scheme` 자동 + 수동 토글. **라이트(Warm Paper)가 기본값**
2. **웜 뉴트럴 베이스 + 오렌지 포인트**: 종이 질감의 크림 배경, 색은 의미가 있을 때만
3. **푸근함**: 큰 라운드, 부드러운 그림자, 곰돌이 마스코트 — 차갑지 않은 개발자 포트폴리오
4. **토큰 우선**: 모든 색·간격·타이포는 CSS 변수 → Tailwind v4 `@theme inline` 매핑. 하드코딩 금지
5. **관리자 웹(profile-admin)도 동일 토큰 재사용** (npm 패키지 — ADR-10)

## 2. 컬러 토큰

| 토큰 | Light (기본) | Dark | 용도 |
|------|-------------|------|------|
| `--bg` | `#FFFAF3` | `#211A13` | 페이지 배경 (paper) |
| `--surface` | `#FFFDF8` | `#2A2119` | 카드/패널 |
| `--surface-2` | `#FFF2CF` | `#362A1E` | 강조 표면, 코드 블록 |
| `--border` | `#ECDCC7` | `#4A3B2A` | 경계선 |
| `--text` | `#332A23` | `#F2EAE0` | 본문 (ink) |
| `--text-muted` | `#6D5F52` | `#B3A493` | 보조 텍스트 |
| `--accent` | `#F28A00` | `#FFA02E` | 링크, CTA, 활성 칩 (sun) |
| `--accent-soft` | `#FF9F1C26` | `#FFA02E26` | 칩 배경, 하이라이트 |
| `--success` | `#2E7D5B` | `#5BD3A4` | 성과 수치 |
| `--warning` | `#B45309` | `#FBBF24` | 배지(비공개 프로젝트 등) |
| `--shadow-card` | `0 10px 24px rgba(104,70,25,.06)` | `none` | 카드 그림자 (다크는 보더 단차) |

- OG 템플릿: **Warm Paper 라이트 고정** (테마 무관 일관 썸네일)

## 3. 타이포그래피

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--font-body` | **Pretendard Variable**, system-ui fallback | 본문 |
| `--font-display` | **Nunito**(라틴) → Pretendard(한글 폴백) | 제목·브랜드 — 둥근 영문이 푸근함 담당 |
| `--font-mono` | **JetBrains Mono** | 수치·기간·스택·코드 |

스케일(1.25): `--text-xs 12` ~ `4xl 49`. 제목 weight 800(display), 본문 400 `line-height 1.7`

## 4. 간격·형태·모션

- 간격: 4px 그리드. 섹션 수직 패딩: 모바일 64, 데스크톱 96
- 라운드(푸근하게 확대): `--radius-sm 10` (칩·버튼) / `md 16` (카드) / `lg 24` (썸네일·모달). 헤더·필터 칩은 `rounded-full`
- 그림자: 라이트 `--shadow-card`(웜 브라운 저투명). 다크는 보더 단차
- 모션: `--motion-fast 150ms` / `--motion-base 250ms`. `prefers-reduced-motion` 존중

## 5. 핵심 컴포넌트 규격

- **헤더**: 상단 떠 있는 **알약(pill) 컨테이너** (rounded-full, blur+저투명 surface, 그림자) — 브랜드 `dongwon.` + Projects·Blog·Contact + GitHub·velog + 테마 토글
- **Hero**: 좌 텍스트(배지 pill → 2줄 헤드라인[2행 accent] → 소개 → 스택 칩 → 버튼 2개) + 우 **곰돌이 아바타**(원형, surface-2 보더)
- **곰돌이 아바타**: `public/profile-bear.svg` 기본 제공 — GPT Image 2.0 생성본(png)으로 교체 가능
- **프로젝트 카드**: 썸네일 16:9(없으면 웜 파스텔 블록+이니셜) / 카테고리·scope 칩 / 제목 / 요약 / 스택 mono ×3+N / Private `--warning` 배지. hover: 살짝 떠오름(-2px)+accent 보더
- **필터 칩**: rounded-full, 활성 = `--accent-soft`+`--accent`
- **버튼**: Primary(accent 채움) / Secondary(보더) / Ghost. 상세의 GitHub/Demo는 Secondary
- **성과 수치**: `--font-mono` + `--success`

## 6. 반응형

| 브레이크포인트 | 규칙 |
|----------------|------|
| < 768 (기본) | 단일 컬럼, 카드 1열, 헤더 햄버거, Hero 세로 스택(아바타 위) |
| ≥ 768 md | 카드 2열, 헤더 인라인 내비 |
| ≥ 1024 lg | 카드 3열, 본문 최대폭 `72rem` |

## 변경 이력

- v1.1 (2026-07-05): **Warm Paper 전환** (ADR-12) — lova-clover 벤치마킹, 라이트 기본, Nunito 디스플레이, 라운드 확대, 곰돌이 아바타. 토큰 이름 유지·값 교체
- v1.0 (2026-07-04): C안 Signal 확정 (대체됨)
