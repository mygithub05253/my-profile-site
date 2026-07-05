import { ImageResponse } from "next/og";
import { loadNotoSansKR, OG_SIZE } from "@/lib/og";

// 사이트 기본 OG 썸네일 (홈·블로그 목록 등 글 상세 외 페이지 공용)
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OgImage() {
  const title = "이동원 — 풀스택 개발자";
  const subtitle = "자동화 생태계 · Next.js · Spring Boot";
  const subsetText = `${title}${subtitle}dongwon.`;
  const [bold, regular] = await Promise.all([
    loadNotoSansKR(subsetText, 700),
    loadNotoSansKR(subsetText, 400),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 28,
          backgroundColor: "#fffaf3",
          backgroundImage:
            "linear-gradient(135deg, #fffaf3 0%, #fff6e6 60%, #fff2cf 100%)",
          fontFamily: "NotoSansKR",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 700,
            color: "#f28a00",
          }}
        >
          dongwon.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#332a23",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 400,
            color: "#6d5f52",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "NotoSansKR", data: bold, weight: 700, style: "normal" },
        { name: "NotoSansKR", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
