import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "이동원 — 풀스택 개발자",
    template: "%s | 이동원",
  },
  description: profile.intro,
};

const NAV_ITEMS = [
  { href: "/#skills", label: "기술" },
  { href: "/#projects", label: "프로젝트" },
  { href: "/blog", label: "블로그" },
  { href: "/#contact", label: "연락처" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        <nav className="fixed top-0 z-50 w-full border-b border-gray-700 bg-gray-900/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-2xl font-bold text-cyan-400">
              DW
            </Link>
            <ul className="flex items-center gap-4 text-sm sm:gap-8 sm:text-base">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-cyan-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
        <footer className="border-t border-gray-700 bg-gray-950 px-4 py-8 text-center text-sm text-gray-400">
          <p>© 2026 이동원. All rights reserved.</p>
          <p className="mt-2">
            콘텐츠는{" "}
            <a
              href="https://github.com/mygithub05253/content-hub"
              className="text-cyan-400 hover:underline"
            >
              content-hub
            </a>
            에서 자동 동기화됩니다.
          </p>
        </footer>
      </body>
    </html>
  );
}
