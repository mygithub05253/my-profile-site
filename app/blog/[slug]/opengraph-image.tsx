import { ImageResponse } from "next/og";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { loadNotoSansKR, OG_SIZE } from "@/lib/og";

// 블로그 글 OG 썸네일 (설계서 10장 하이브리드 썸네일의 기본 next/og 템플릿).
// SSG로 빌드 시점에 글마다 1장씩 생성된다.
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({
    slug: post.slug,
  }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(decodeURIComponent(slug));

  const title = post?.title ?? "이동원 — 개발 블로그";
  const date = post?.date.slice(0, 10) ?? "";
  const tags = (post?.tags ?? []).slice(0, 4);

  // 폰트 서브셋에 실제 렌더링할 글자를 모두 포함시킨다
  const subsetText = `${title}${date}${tags.join("")}이동원 개발 블로그#DW·`;
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
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0b1220",
          backgroundImage:
            "linear-gradient(135deg, #0b1220 0%, #111827 60%, #0e2230 100%)",
          fontFamily: "NotoSansKR",
          color: "#e5e7eb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 44,
              backgroundColor: "#22d3ee",
              borderRadius: 4,
            }}
          />
          <div style={{ display: "flex", fontSize: 30, color: "#22d3ee", fontWeight: 700 }}>
            이동원 · 개발 블로그
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 40 ? 56 : 68,
            fontWeight: 700,
            lineHeight: 1.25,
            color: "#f9fafb",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            fontWeight: 400,
            color: "#9ca3af",
          }}
        >
          <div style={{ display: "flex", gap: 20 }}>
            {tags.map((tag) => (
              <div key={tag} style={{ display: "flex", color: "#22d3ee" }}>
                #{tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>{date}</div>
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
