# Perplexity 리서치 프롬프트 패키지 v2 (profile-admin 설계 검증)

> 작성일: 2026-07-04 (KST) · 대상 스페이스: **"자동화 생태계 구축"**
> 출처: 문서검토보고서 2026-07-04 §3 (R-1~R-4) — 결과는 관리자 기능명세서·관리자 API·관리자 UI 문서에 반영 예정
> v1 패키지(리서치 1~4, velog/Velite 관련)는 `features/version1.0/Perplexity_리서치_프롬프트_패키지.md` — 완료됨

---

## 리서치 R-1: GitHub Contents API 실운영 제약

- **스레드**: 새 스레드
- **모델/모드**: 심층 리서치(Deep Research) 권장
- **첨부**: 없음
- **프롬프트**:

```
GitHub REST API의 Contents API(PUT /repos/{owner}/{repo}/contents/{path})를 사용해
웹 관리자 도구에서 Markdown/MDX 파일과 이미지를 저장소에 커밋하는 시스템을 설계 중입니다.
2026년 현재 기준으로 다음을 공식 문서·실사용 사례 근거와 함께 정리해 주세요.

1. Contents API의 파일 크기 제한 (생성/수정/조회 각각 — 1MB, 100MB 경계 동작 포함)
2. 인증된 요청의 rate limit과, 관리자 1인이 시간당 수십 회 커밋하는 수준에서 문제가 되는지
3. 여러 파일(예: MDX 본문 + 썸네일 이미지)을 하나의 원자적 커밋으로 만들려면
   Git Database API(blobs/trees/commits/refs)를 써야 하는지, 그 표준 패턴과 코드 예시
4. Contents API로 커밋 시 브랜치 지정 + PR 생성 + auto-merge 활성화까지의 API 조합
5. sha 기반 낙관적 잠금(409 처리)의 모범 사례
```

## 리서치 R-2: Auth.js v5 GitHub OAuth 1인 allowlist

- **스레드**: 새 스레드
- **모델/모드**: 일반 검색으로 충분 (심층 불필요)
- **첨부**: 없음
- **프롬프트**:

```
Next.js 15 App Router + Auth.js(NextAuth) v5로 관리자 1인 전용 웹을 만듭니다.
GitHub OAuth Provider를 쓰되, 특정 GitHub 계정(사용자명 또는 numeric id) 1개만
로그인을 허용하고 나머지는 전부 거부하려 합니다. 2026년 현재 기준으로:

1. signIn 콜백에서 allowlist를 검사하는 권장 패턴 (username vs numeric id 중 안전한 쪽)
2. 거부 시 사용자에게 403 페이지를 보여주는 라우팅 처리
3. Vercel 배포 시 필요한 환경 변수(AUTH_SECRET 등)와 OAuth App 콜백 URL 구성
4. 미들웨어(middleware.ts)로 전 라우트를 보호하는 표준 구성
5. JWT 세션 전략에서 주의점 (세션 만료, 토큰 회전)
```

## 리서치 R-3: 이미지 업로드 → git 커밋 방식의 한계와 대안

- **스레드**: R-1과 같은 스레드 이어서 (Contents API 맥락 공유)
- **모델/모드**: 일반 검색
- **첨부**: 없음
- **프롬프트**:

```
콘텐츠(블로그·프로젝트)용 이미지를 DB 없이 GitHub Public 저장소의 assets/ 폴더에
커밋해서 관리하고, Next.js 정적 사이트가 빌드 시 함께 가져가는 구조입니다.

1. 이 방식의 실질적 한계 — 저장소 용량 권장치(1GB/5GB 경계), git 히스토리 비대화
2. raw.githubusercontent.com을 이미지 CDN처럼 쓰는 경우의 캐시·rate limit·안정성
3. 웹 관리자에서 업로드한 이미지를 리사이즈/압축해서 커밋하는 게 나은지, 원본 커밋 후
   Next.js image 최적화에 맡기는 게 나은지
4. 대안 비교: 그대로 git 유지 vs Cloudinary/R2 등 외부 호스팅 — 개인 포트폴리오
   규모(이미지 수백 장 이하)에서의 권장안과 마이그레이션 용이성
```

## 리서치 R-4: 레포 분리 시 디자인 토큰 공유 전략

- **스레드**: 새 스레드
- **모델/모드**: 일반 검색
- **첨부**: DESIGN.md (ui/version1.0/DESIGN.md 내용 붙여넣기)
- **프롬프트**:

```
개인 프로젝트에서 사용자 사이트(my-profile-site)와 관리자 웹(profile-admin)을
별도 GitHub 레포로 운영합니다 (같은 개인 계정, Organization 없음).
두 앱 모두 Next.js + Tailwind CSS v4이고, 첨부한 DESIGN.md의 CSS 변수 토큰
(컬러·타이포·간격·모션)을 공유해야 합니다.

1. 1인 유지보수 규모에서의 토큰 공유 전략 비교:
   (a) 파일 복사 + 수동 동기화 (b) npm 패키지(GitHub Packages 포함)
   (c) git submodule (d) 모노레포 전환(turborepo)
2. 각 방식의 초기 비용/변경 전파/버전 관리 트레이드오프와, 토큰 변경 빈도가 낮은
   경우(분기 1회 미만)의 권장안
3. Tailwind v4 @theme + CSS 변수 구조에서 토큰만 패키지로 뽑는 표준 패턴이 있는지
```

---

## 결과 반영 매핑

| 리서치 | 반영 대상 문서 | 반영 항목 |
|--------|----------------|-----------|
| R-1 | 관리자 API §3.2 / 관리자 기능명세 §17 | 저장 흐름·원자 커밋·이미지 동시 저장 여부 |
| R-2 | 관리자 기능명세 §16 / 관리자 UI A-01 | 인증 구현 상세 |
| R-3 | 관리자 기능명세 (FR-M22 신설 여부) / 관리자 UI A-03 | 이미지 업로드 위젯 |
| R-4 | 아키텍처 §6 / 관리자 UI 디자인 절 | 토큰 공유 방식 확정 (잠정: 복사) |
