# app/

Next.js 15 App Router 루트. 이 사이트는 런타임 API를 두지 않고 전 페이지를 빌드 타임에 정적 생성(SSG)하는 것을 원칙으로 삼는다 — 콘텐츠는 [content-hub](https://github.com/mygithub05253/content-hub)에서 빌드 시점에 가져오고, 이 레포는 화면(코드)만 갖는다는 관심사 분리를 지키기 위해서다.

## 구성

| 경로 | 역할 |
|------|------|
| `layout.tsx` | 전역 레이아웃 — 폰트, 다크/라이트 테마 FOUC 방지 인라인 스크립트, `Header`/`Footer` 배치 |
| `page.tsx` | 홈(`/`) — Hero·About·Featured Projects·Records·Blog·Contact 섹션 조합. 각 섹션 데이터는 `lib/`를 통해 `#velite`(content-hub 콘텐츠)에서 가져온다 |
| `not-found.tsx` | 전역 404 |
| `opengraph-image.tsx` | 사이트 대표 OG 이미지(next/og로 빌드 시 생성) |
| `blog/` | 블로그 목록·상세 라우트 — 상세는 [`app/blog/README.md`](./blog/README.md) 참고 |
| `projects/` | 프로젝트 목록·상세 라우트 — 상세는 [`app/projects/README.md`](./projects/README.md) 참고 |

## 왜 이렇게 나눴나

페이지 컴포넌트는 데이터 조회 로직을 직접 갖지 않는다. `#velite`(Velite가 생성하는 콘텐츠 컬렉션)를 바로 import하면 페이지마다 필터링·정렬 로직이 흩어지기 쉬워서, 그 책임은 전부 `lib/`의 접근자 함수로 위임하고 `app/` 아래 파일들은 레이아웃과 조합에만 집중한다.
