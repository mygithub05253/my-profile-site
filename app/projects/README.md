# app/projects/

프로젝트 목록·상세 라우트. "무엇을 만들었는지"를 나열하는 게 아니라 "어떤 문제에서 시작해 무엇을 구현했고 어떤 결과를 남겼는지"를 보여주는 게 목적이라, 콘텐츠 자체(content-hub의 `projects/*.mdx`)도 문제 정의/구현/성과/트러블슈팅/배운 점 5단 구조로 통일되어 있다.

## 구성

- `page.tsx` — 목록. 실제 필터/정렬 UI와 상태 관리는 클라이언트 컴포넌트인 `components/ProjectsExplorer.tsx`에 위임한다(서버 컴포넌트인 이 파일은 데이터만 내려준다).
- `[slug]/page.tsx` — 상세. 카테고리·기간·스택 정보와 함께 프로젝트 본문(README 대응 콘텐츠)을 렌더링하고, 이전/다음 프로젝트 내비게이션을 제공한다.
- `[slug]/opengraph-image.tsx` — 프로젝트별 OG 썸네일.

## 왜 이렇게 나눴나

- `getPublishedProjects()`(`lib/projects.ts`) 하나로 정렬 기준(Star 우선 → order)을 통일해서, 목록·홈의 Featured 섹션·이전/다음 내비게이션이 서로 다른 기준으로 따로 노는 것을 막았다. 이전/다음은 목록의 필터/정렬과 무관하게 이 전역 기준을 그대로 따른다.
- 상세 화면은 `dangerouslySetInnerHTML`로 content-hub에서 이미 markdown→HTML 변환된 결과를 그대로 렌더링한다 — 사이트 쪽에서 마크다운을 다시 파싱하지 않기 위해서다.
