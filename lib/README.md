# lib/

`#velite`(Velite가 content-hub 콘텐츠를 빌드 시점에 검증·변환해서 만든 타입 있는 컬렉션)를 페이지가 바로 import하지 않도록 감싸는 접근자 계층. 존재 이유는 두 가지다.

1. **필터·정렬 규칙을 한 곳에 모으기** — 예를 들어 "발행된 프로젝트만, Star 우선 정렬" 같은 규칙이 `app/page.tsx`와 `app/projects/page.tsx`에 각각 다르게 구현되면 목록마다 순서가 미묘하게 어긋난다. `lib/projects.ts`의 `getPublishedProjects()` 하나로 통일한다.
2. **Velite 스키마 변경의 영향 범위를 줄이기** — content-hub 스키마가 바뀌어도 이 계층의 함수 시그니처만 유지되면 `app/`·`components/`는 그대로 둘 수 있다.

## 구성

| 파일 | 역할 |
|------|------|
| `projects.ts` | 프로젝트 컬렉션 접근자 — 발행 필터, 정렬(Star 우선 → order), slug 조회, 이전/다음 탐색, 카테고리/scope 필터 |
| `posts.ts` | 블로그 글 컬렉션 접근자 — `visibility: public` + `status: published\|synced`만 노출(draft/ready/private 제외), 최신순 정렬 |
| `profile.ts` | 프로필 정적 데이터(`data/profile.yml`) 재노출. **이 파일에서 값을 고치지 말 것** — 원본은 content-hub에 있고, 여기는 타입 재노출만 한다 |
| `data.ts` | 기술 스택(`data/stacks.yml`)·성장 기록(`data/records.yml`) 접근자 + 카테고리별 라벨/색상 매핑 상수 |
| `og.ts` | OG 이미지 생성(next/og) 공용 헬퍼 — 한글 폰트 서브셋 로드, 표준 이미지 크기 |

## 왜 데이터를 코드로 고치면 안 되나

`profile.ts`·`data.ts`가 감싸는 값들의 원본은 전부 [content-hub](https://github.com/mygithub05253/content-hub)의 `data/*.yml`이다(ADR-11). SSOT를 이 레포와 content-hub 두 곳에 두면 둘이 어긋나는 순간 어느 쪽이 진실인지 알 수 없게 되므로, 이 레포는 항상 읽기 전용으로만 다룬다.
