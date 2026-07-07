# Footer 반응형 여백 보완 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `components/Footer.tsx`의 링크 그룹 간격을 화면 크기별로 세분화한다.

**Architecture:** 단일 파일의 Tailwind 클래스 하나만 바꾸는 최소 변경.

**Tech Stack:** Next.js 15, Tailwind v4

**배경:** profile-admin 피드백 #3 브레인스토밍 중 "사용자/관리자 모두 반응형" 요청에 따라 my-profile-site 전체를 재조사한 결과, 대부분 이미 Mobile First로 구현되어 있었고 `Footer.tsx`의 링크 그룹 간격(`gap-6` 고정)만 화면 크기별 조정 여지가 있었다.

**검증한 결과 계획에서 제외한 항목:** 설계 문서(profile-admin 레포 `docs/superpowers/specs/2026-07-07-admin-theme-toggle-responsive-design.md`)에는 `app/blog/page.tsx` 목록 메타 영역에 `flex-wrap` 보완이 필요하다고 적혀 있었으나, 실제 코드(`app/blog/page.tsx:27`)를 직접 확인한 결과 이미 `flex flex-wrap items-baseline justify-between gap-2`로 처리되어 있어 추가 변경이 필요 없다. 조사를 위임했던 서브에이전트의 보고가 부정확했던 부분이라 이 플랜에서는 제외한다.

---

### Task 1: Footer 링크 그룹 간격 반응형화

**Files:**
- Modify: `components/Footer.tsx:6`

- [ ] **Step 1: 클래스 수정**

Before:
```tsx
      <div className="mb-3 flex justify-center gap-6">
```
After:
```tsx
      <div className="mb-3 flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6">
```

`flex-wrap`을 추가하는 이유: 매우 좁은 화면(≤320px)에서 GitHub·velog·Email 세 링크가 한 줄에 안 들어갈 경우 가로 스크롤 대신 다음 줄로 자연스럽게 넘어가게 한다.

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 성공

- [ ] **Step 3: 브라우저로 반응형 확인 (로그인 불필요 — 직접 확인 가능)**

`npm run dev` 실행 후 홈페이지 하단 Footer를 375px/768px/1280px 뷰포트에서 확인 — 링크 간격이 화면 크기에 따라 좁아지는지, 320px에서 줄바꿈이 자연스러운지 확인.

- [ ] **Step 4: 커밋**

```bash
git add components/Footer.tsx
git commit -m "fix: Footer 링크 그룹 간격을 화면 크기별로 세분화"
```

---

## 최종 확인

- [ ] `npm run build` 통과 확인
- [ ] 브라우저에서 모바일/태블릿/데스크톱 뷰포트로 Footer 확인 (my-profile-site는 로그인 불필요라 Claude도 preview 도구로 직접 확인 가능)
