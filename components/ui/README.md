# components/ui/

디자인 시스템의 원자 단위 컴포넌트. `DESIGN.md`에 정의된 토큰(색상·타이포·간격)을 코드로 옮겨놓은 것이 이 폴더의 역할이라, 여기 있는 컴포넌트는 특정 페이지나 도메인 지식을 몰라야 한다(프로젝트가 뭔지, 블로그가 뭔지 몰라도 동작해야 정상).

## 구성

- `Button.tsx` — `primary`/`secondary`/`ghost` variant. 내부 링크(Next `Link`)와 외부 링크(`external` prop, `target="_blank"` + `rel="noopener noreferrer"` 자동 처리)를 한 컴포넌트로 통일해서, 페이지마다 외부 링크 보안 속성을 빠뜨리는 실수를 막는다.
- `Chip.tsx` — `default`/`accent`/`warning` variant. `accent`는 활성·주력 항목(카테고리, Star 등), `warning`은 비공개 배지처럼 주의를 끌어야 하는 상태 전용이다.

## 왜 이렇게 나눴나

`components/`(페이지 조각)와 분리한 이유는, 이 폴더의 컴포넌트가 바뀌면 사이트 전체의 시각적 일관성에 영향을 준다는 걸 명확히 하기 위해서다 — 변경 전에는 항상 `DESIGN.md`의 토큰 정의와 어긋나지 않는지부터 확인한다.
