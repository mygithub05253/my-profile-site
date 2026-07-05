import { defineConfig, s } from "velite";

// content-hub frontmatter 스키마 (설계서 4장) 기준.
// 소스는 sync-content.mjs가 받아온 .content-hub/posts — 사이트 레포에는 콘텐츠를 두지 않는다.
export default defineConfig({
  root: ".content-hub",
  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.md",
      schema: s
        .object({
          title: s.string(),
          slug: s.string(),
          type: s.enum(["post", "retrospective", "project"]),
          date: s.isodate(),
          tags: s.array(s.string()).default([]),
          series: s.string().optional(),
          source: s.enum(["obsidian", "notion", "velog"]),
          status: s.enum(["draft", "ready", "published", "synced"]),
          velog_url: s.string().optional(),
          visibility: s.enum(["public", "private"]),
          html: s.markdown(),
          excerpt: s.excerpt(),
        })
        .transform((data) => ({
          ...data,
          permalink: `/blog/${encodeURIComponent(data.slug)}`,
        })),
    },
    // projects 컬렉션 (콘텐츠 스키마 명세서 §4 — PR-C, L2 검증)
    projects: {
      name: "Project",
      pattern: "projects/*.mdx",
      schema: s
        .object({
          title: s.string(),
          slug: s.string(),
          type: s.literal("project"),
          category: s.array(s.enum(["ai-data", "finance", "fullstack"])).min(1),
          scope: s.enum(["personal", "team"]),
          role: s.string().optional(),
          period: s.string(),
          stack: s.array(s.string()).min(1),
          summary: s.string(),
          thumbnail: s.string().optional(),
          github: s.string().optional(),
          repoVisibility: s.enum(["public", "private"]),
          demo: s.string().optional(),
          featured: s.boolean(),
          order: s.number(),
          status: s.enum(["draft", "published"]),
          html: s.markdown(),
        })
        .transform((data) => ({
          ...data,
          permalink: `/projects/${encodeURIComponent(data.slug)}`,
        })),
    },
  },
});
