# components/

페이지 여러 곳에서 재사용하는 화면 단위 컴포넌트. 디자인 시스템의 최소 단위(버튼·칩 같은 원자적 요소)는 여기 두지 않고 [`components/ui/`](./ui/README.md)로 따로 뺐다 — 이 폴더는 그 원자들을 조합한, 페이지 조각 단위의 컴포넌트를 담는다.

## 구성

| 파일 | 역할 |
|------|------|
| `Header.tsx` | 전역 상단 내비게이션. 데스크톱은 떠 있는 pill 형태, 모바일은 풀스크린 오버레이 메뉴 — 두 레이아웃이 같은 `NAV_ITEMS`를 공유한다 |
| `Footer.tsx` | 전역 하단 영역 |
| `Section.tsx` | 홈 화면의 각 섹션(Hero 제외)이 공유하는 레이아웃 뼈대 — eyebrow/title/subtitle 배치와 배경(`surface`)·폭(`wide`) 옵션을 표준화해서, 섹션마다 여백·타이포 규칙이 미묘하게 어긋나는 것을 방지한다 |
| `ThemeToggle.tsx` | 라이트/다크 테마 전환 버튼. `document.documentElement.dataset.theme` + `localStorage`로 상태를 저장하고, SSR 시점엔 테마를 알 수 없어 마운트 전에는 자리만 확보한다(hydration 불일치 방지) |
| `ProjectCard.tsx` | 프로젝트 목록·홈 Featured 섹션이 공유하는 카드. 썸네일이 없으면 slug 해시로 파스텔 색을 고정 배정해 빈 자리를 채운다 |
| `ProjectsExplorer.tsx` | `/projects` 목록의 필터(카테고리·scope) 상태를 URL 쿼리(`?filter=`)와 동기화하는 클라이언트 컴포넌트. 서버 컴포넌트인 `app/projects/page.tsx`가 데이터만 넘기고, 상호작용은 전부 여기서 처리한다 |

## 왜 이렇게 나눴나

`app/` 아래 페이지 파일들은 되도록 서버 컴포넌트로 유지하고 싶어서, `"use client"`가 필요한 상호작용(테마 토글, 필터 상태, 모바일 메뉴 열림/닫힘)은 전부 이 폴더의 컴포넌트 경계 안으로 격리했다.
