"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { href: "/#skills", label: "기술" },
  { href: "/#projects", label: "프로젝트" },
  { href: "/blog", label: "블로그" },
  { href: "/#contact", label: "연락처" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 스크롤 시 하단선+블러 강조 (사용자 UI §2)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed top-0 z-50 w-full backdrop-blur-sm transition-colors duration-150 ${
        scrolled ? "border-b border-border bg-bg/90" : "bg-bg/70"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-accent">
          DW<span className="text-muted">.</span>
        </Link>

        {/* 데스크톱 내비 */}
        <nav aria-label="주 메뉴" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors duration-150 hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
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
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
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
          className="fixed inset-0 top-16 z-40 flex flex-col gap-2 bg-bg px-6 py-8 md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-3 text-lg font-semibold text-text transition-colors duration-150 hover:bg-surface hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
