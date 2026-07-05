import { ImageResponse } from "next/og";
import { getProjectBySlug, getPublishedProjects } from "@/lib/projects";
import { loadNotoSansKR, OG_SIZE } from "@/lib/og";

// 프로젝트 OG 썸네일 — Warm Paper 팔레트 고정 (테마 무관 일관, DESIGN.md v1.1)
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_LABEL: Record<string, string> = {
  "ai-data": "AI·Data",
  finance: "Finance",
  fullstack: "Fullstack",
};

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(decodeURIComponent(slug));

  const title = project?.title ?? "이동원 — Projects";
  const summary = project?.summary ?? "";
  const cats = (project?.category ?? []).map((c) => CATEGORY_LABEL[c]);
  const period = project?.period ?? "";

  const subsetText = `${title}${summary}${cats.join("")}${period}이동원 Projects·`;
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
          backgroundColor: "#fffaf3",
          backgroundImage:
            "linear-gradient(135deg, #fffaf3 0%, #fff6e6 60%, #fff2cf 100%)",
          fontFamily: "NotoSansKR",
          color: "#332a23",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 44,
              backgroundColor: "#f28a00",
              borderRadius: 7,
            }}
          />
          <div style={{ display: "flex", fontSize: 30, color: "#f28a00", fontWeight: 700 }}>
            이동원 · Projects
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 24 ? 56 : 68,
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#332a23",
            }}
          >
            {title}
          </div>
          {summary && (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 400,
                color: "#6d5f52",
              }}
            >
              {summary.length > 50 ? `${summary.slice(0, 50)}…` : summary}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            fontWeight: 400,
            color: "#6d5f52",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            {cats.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  padding: "6px 18px",
                  borderRadius: 999,
                  backgroundColor: "#ff9f1c26",
                  color: "#f28a00",
                  fontWeight: 700,
                }}
              >
                {c}
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>{period}</div>
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
