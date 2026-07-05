"use client";

import { useEffect, useState } from "react";

// 현재 화면에 적용된 유효 테마를 계산한다 (수동 설정 > 시스템 설정)
function getEffectiveTheme(): "dark" | "light" {
  const manual = document.documentElement.dataset.theme;
  if (manual === "dark" || manual === "light") return manual;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export default function ThemeToggle() {
  // SSR 시점에는 테마를 알 수 없으므로 마운트 후에만 아이콘 결정 (FOUC 방지는 layout 인라인 스크립트 담당)
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    setTheme(getEffectiveTheme());
  }, []);

  const toggle = () => {
    const next = getEffectiveTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage 접근 불가(시크릿 모드 등) — 세션 내 토글만 유지
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "다크 테마로 전환" : "라이트 테마로 전환"}
      className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
    >
      {/* 마운트 전에는 자리만 확보 (hydration 불일치 방지) */}
      {theme === null ? (
        <span className="h-4 w-4" />
      ) : theme === "light" ? (
        // moon — 라이트에서 누르면 다크로
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // sun — 다크에서 누르면 라이트로
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
