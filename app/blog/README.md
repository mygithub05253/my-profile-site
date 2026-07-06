# app/blog/

velog에 올린 글을 이 사이트에서도 볼 수 있게 재스킨(re-skin)해서 보여주는 라우트. 글쓰기·편집 기능은 없다 — 원문은 항상 velog가 원본이고, 이 폴더는 content-hub가 빌드 시 넘겨주는 콘텐츠를 사이트 디자인에 맞춰 렌더링만 한다.

## 구성

- `page.tsx` — 발행된 글 목록
- `[slug]/page.tsx` — 글 상세 (content-hub의 `posts/*.md` frontmatter + 본문 HTML)
- `[slug]/opengraph-image.tsx` — 글별 OG 썸네일 (next/og, 빌드 시 생성)

## 왜 만들었나

velog는 검색·구독 등 커뮤니티 기능이 강하지만, 포트폴리오 방문자에게는 사이트 전체 디자인 톤을 벗어난 외부 페이지로 튕겨나가는 경험이 어색하다. 그래서 글 원문은 velog에 맡기고, 사이트 안에서도 같은 콘텐츠를 일관된 디자인으로 읽을 수 있는 창구를 하나 더 둔 것이다. 홈 화면의 Blog 섹션은 제거하기로 했지만(Velog 링크가 이미 있어 중복이라는 피드백), 이 라우트 자체는 velog-backup과 함께 콘텐츠 아카이브 역할을 계속한다.
