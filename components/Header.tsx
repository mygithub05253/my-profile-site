"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/lib/profile";

// IA(사용자 UI §1): Projects · Blog · Contact — Records는 PR-D(홈 섹션)에서 추가
const NAV_ITEMS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

// lova-clover 벤치마킹: 떠 있는 알약(pill) 헤더 (DESIGN.md v1.1 / ADR-12)
export default function Header() {
  const [open, setOpen] = useState(false);

  // 모바일 오버레이: 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed top-0 z-50 flex w-full justify-center px-4 pt-4">
      <div className="flex w-full max-w-3xl items-center justify-between rounded-full border border-border bg-surface/80 px-5 py-2.5 shadow-card backdrop-blur-md">
        <Link
          href="/"
          className="font-display text-lg font-extrabold text-accent"
        >
          dongwon<span className="text-muted">.</span>
        </Link>

        {/* 데스크톱 내비 */}
        <nav aria-label="주 메뉴" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-muted transition-colors duration-150 hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <span aria-hidden className="h-4 w-px bg-border" />
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-muted transition-colors duration-150 hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={profile.velog}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-muted transition-colors duration-150 hover:text-accent"
          >
            velog
          </a>
          <ThemeToggle />
        </nav>

        {/* 모바일: 토글 + 햄버거 */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 풀스크린 오버레이 */}
      {open && (
        <nav
          aria-label="모바일 메뉴"
          className="fixed inset-0 top-20 z-40 flex flex-col gap-2 bg-bg px-6 py-8 md:hidden"
        >
          {[...NAV_ITEMS, { href: profile.github, label: "GitHub" }, { href: profile.velog, label: "velog" }].map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-lg font-bold text-text transition-colors duration-150 hover:bg-surface-2 hover:text-accent"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
