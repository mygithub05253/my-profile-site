# GPT Image 2.0 — README 이미지 생성 프롬프트

> 작성일: 2026-07-04 (KST) · 대상: my-profile-site 루트 README 배너 (`.github/assets/readme-hero.png`)
> 원칙: **설계도(아키텍처)·ERD는 이미지가 아닌 Mermaid 텍스트로 README에 직접 렌더링** (GitHub 네이티브 지원, 코드 변경 시 diff로 함께 관리 — 실무 권장). GPT Image 2.0은 **히어로 배너**처럼 장식·브랜딩 목적에만 사용한다.

## 1. 히어로 배너 (최초 생성용)

- 파일: `.github/assets/readme-hero.png` · 권장 비율 3:1 (예: 1536×512)

```
A wide 3:1 horizontal banner for a GitHub README of a developer portfolio project called "my-profile-site".

Style: minimal, modern developer-tool aesthetic. Dark charcoal background (#0A0C10) with a subtle dot-grid texture. Accent color: signal blue (#5B9DFF). Clean flat vector illustration, no photorealism, no 3D render look.

Composition: on the left, the text "my-profile-site" in a clean geometric sans-serif, white (#E6E8EB), with a small subtitle underneath in muted gray (#9BA3AE) reading "Personal Branding Automation Ecosystem". On the right, an abstract flow diagram motif: four small rounded-rectangle nodes connected by thin glowing blue lines with arrowheads, suggesting content flowing from a writing app through a central hub out to a website, a blog, and a profile page. One node subtly highlighted in signal blue.

Mood: calm, precise, engineered — like a fintech dashboard brand. Generous negative space. No stock icons of people, no laptops, no clichés. Text must be crisp and correctly spelled.
```

## 2. 업데이트 프롬프트 (설계 진행·기능 추가 시)

기존 배너의 톤을 유지하며 요소만 갱신할 때, 위 프롬프트에 아래 문단을 덧붙여 재생성한다:

```
Keep the exact same layout, colors (#0A0C10 background, #5B9DFF accent, #E6E8EB text), typography and composition as the previous banner. Only change: {변경 내용 — 예: "add a fifth node labeled 'admin' joining the flow from below with a dashed line" / "update the subtitle to 'Ecosystem + Serverless CMS'"}.
```

- 예정된 업데이트 시점:
  1. **PR-C/D 병합 후** (사이트 재설계 반영): 서브타이틀 유지, 우측 플로우에 projects 노드 강조 톤 추가
  2. **profile-admin P0 배포 후**: admin 노드를 점선→실선으로 (위 예시 문구 사용)

## 3. (참고) 프로젝트 상세용 대표 썸네일 — 필요 시

프로젝트 MDX 11건 중 대표작에 수동 썸네일을 넣을 경우 (기본은 next/og 자동 생성):

```
A 1200x630 Open Graph card image, same brand system: dark #0A0C10 background, dot grid, signal blue #5B9DFF accent, white geometric sans-serif title "{프로젝트명}", small gray subtitle "{한 줄 요약}". Left-aligned text block, right side an abstract minimal glyph representing {프로젝트 주제 — 예: "a candlestick chart" / "a chat bubble pair" / "a neural network"}. Flat vector, generous margins, no photorealism.
```

## 4. 곰돌이 프로필 아바타 (사이트 Hero — 2026-07-05 추가, ADR-12)

- 기본값: `public/profile-bear.svg` (코드 내장 일러스트). GPT Image 2.0 생성본으로 교체 시 `public/profile-bear.png` 저장 후 `app/page.tsx`의 src 교체
- 권장 규격: 1024×1024, 원형 크롭 전제

```
A cozy, huggable cartoon bear avatar for a developer portfolio profile picture.

Style: soft flat vector illustration with subtle warm shading, like a friendly mascot. NOT photorealistic, NOT 3D render.

Subject: a round-faced chubby brown bear (warm cinnamon brown fur #B98155, cream muzzle), gentle smiling closed eyes (happy arcs), small round ears with lighter inner fur, soft blush on cheeks. The bear wears a tiny open laptop or holds a warm orange coffee mug (choose one, small and subtle). Head and shoulders composition, centered, facing slightly forward.

Background: solid warm cream circle (#FFE9BF) on transparent or white background, so it crops perfectly into a circular avatar.

Mood: warm, comforting, approachable — like a plush toy. Rounded shapes only, no sharp angles. Colors must harmonize with a cream-paper website palette (#FFFAF3 background, #F28A00 orange accent).
```

- 업데이트 프롬프트(톤 유지 요소 교체): `Keep the exact same bear character, colors and style as before. Only change: {변경 내용 — 예: "replace the coffee mug with a small chart going up" }`

> **참고 — README 히어로 배너**: 기존 배너(#0A0C10 다크·Signal Blue)는 v1.0 팔레트 기준. 사이트가 Warm Paper로 전환되었으므로, 다음 배너 재생성 시 §1 프롬프트의 색을 `dark charcoal #0A0C10 → warm cream paper #FFFAF3`, `signal blue #5B9DFF → warm orange #F28A00`, 텍스트 `white → dark brown #332A23`으로 치환해 사용

## 운영 규칙

- 생성 결과는 `.github/assets/`에 커밋 (레포 공개 대상). 원본 프롬프트는 본 문서에서만 관리
- 색상 코드가 DESIGN.md 토큰과 달라지면 안 됨 — 토큰 변경 시 본 문서의 hex도 함께 갱신
