# erd/ — 콘텐츠 스키마 명세서 (ERD 대응)

## 이 폴더에 있는 것

이 프로젝트는 RDB가 없는 **파일 기반 SSOT**(content-hub 레포의 Markdown/MDX frontmatter)이므로, 전통적 ERD 대신 **컬렉션=테이블, frontmatter 필드=컬럼, slug=PK**로 대응시킨 스키마 명세를 둔다.

| 경로 | 내용 |
|------|------|
| `version1.0/` | 콘텐츠 스키마 명세서 v1.0 (현행 정본) — 컬렉션 6종(posts·drafts·projects·records·stacks·profile), CHECK 제약 C-1~3·P-1~7, 상태 전이 모델, slug 규칙, 검증 3계층(L1 CI → L2 Velite → L3 발행) |

## 버전 관리 방식

- `versionX.Y/` 폴더 + 3종 세트(전체 · 요약본 · 변경사항). 변경은 CN 번호로 변경사항 파일에 누적, 마일스톤 후 일괄 버전업
- **as-built 원칙**: posts 스키마는 실제 검증 코드(`content-hub/scripts/validate_frontmatter.py` + `my-profile-site/velite.config.ts`)와 대조해 작성한다. 코드와 문서가 다르면 문서를 코드에 맞추고 결함이면 검토보고서(F 번호)로 기록
- 스키마 변경은 반드시 **L1(validate_frontmatter.py) → L2(velite.config.ts) 순서로 반영** — L1 없는 콘텐츠가 먼저 들어오면 사이트 빌드가 실패한다
