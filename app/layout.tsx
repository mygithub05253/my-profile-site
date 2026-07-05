import type { Metadata } from "next";
import { JetBrains_Mono, Nunito } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { profile } from "@/lib/profile";
import "./globals.css";

// 수치·기간·스택용 모노 폰트 (DESIGN.md 3장) — CSS 변수로 주입해 토큰이 소비
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// 디스플레이(제목) 폰트 — 라틴은 Nunito, 한글은 Pretendard 폴백 (DESIGN.md v1.1)
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

// OG 이미지 등 메타데이터 절대 URL의 기준 — Vercel이 주입하는 프로덕션 도메인 사용
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "이동원 — 풀스택 개발자",
    template: "%s | 이동원",
  },
  description: profile.intro,
};

// FOUC 방지: 첫 페인트 전에 저장된 수동 테마를 html에 적용 (없으면 시스템 설정 CSS가 처리)
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${nunito.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* Pretendard Variable — 한글 가변 폰트 (dynamic subset) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main" className="pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
