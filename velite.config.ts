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
  },
});
