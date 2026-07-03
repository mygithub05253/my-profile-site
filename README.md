# my-profile-site

이동원 프로필 사이트 v2 — 개인 브랜딩 자동화 생태계의 퍼블릭 얼굴.

## 기술 스택

- **Next.js 15** (App Router, Server Component 우선)
- **TypeScript** (Strict Mode)
- **Tailwind CSS v4**
- **Velite** — content-hub 콘텐츠 계층 (Turbopack 비호환 → `velite build && next build` 순서 고정)

## 콘텐츠 파이프라인

콘텐츠의 SSOT는 [content-hub](https://github.com/mygithub05253/content-hub) 레포이며, 이 레포에는 글을 두지 않는다.

```
npm run build
  ① scripts/sync-content.mjs  → content-hub를 .content-hub/로 shallow clone/pull
  ② velite build              → posts/*.md frontmatter 검증 + HTML 변환 (.velite/)
  ③ next build                → 블로그 목록/상세 SSG (전 글 정적 생성)
```

- 노출 조건: `visibility: public` + `status: published|synced`
- content-hub에 새 글이 병합되면 Vercel Deploy Hook으로 자동 재빌드 (설계서 8장 결정 1)

## 명령어

| 명령 | 설명 |
|------|------|
| `npm run dev` | 콘텐츠 동기화 + 개발 서버 |
| `npm run build` | 프로덕션 빌드 (위 3단계) |
| `npm run start` | 빌드 결과 서빙 |

## 섹션 구성 (설계서 10.3 — 채용담당자 30~60초 스캔 기준)

Hero → 기술 스택(주력/학습 중 구분) → 핵심 프로젝트(STAR + 기여도) → 활동 → 블로그(content-hub 자동 연동) → 교육·자격 → 연락처

## 배포 (Vercel)

- Build Command: `npm run build`
- content-hub → Vercel **Deploy Hook** URL 호출로 재빌드 트리거
