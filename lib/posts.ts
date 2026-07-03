import { posts } from "#velite";

export type Post = (typeof posts)[number];

// 공개 + 발행 완료 글만 사이트에 노출한다 (draft/ready/private 제외)
export function getPublishedPosts(): Post[] {
  return posts
    .filter(
      (p) =>
        p.visibility === "public" &&
        (p.status === "published" || p.status === "synced"),
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((p) => p.slug === slug);
}
