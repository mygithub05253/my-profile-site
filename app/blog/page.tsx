import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "블로그",
  description: "content-hub에서 자동 동기화되는 기술 블로그 전체 글 목록",
};

export default function BlogListPage() {
  const posts = getPublishedPosts();

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl text-text">블로그</h1>
        <p className="mb-10 font-mono text-sm font-medium text-muted">
          전체 {posts.length}편
        </p>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.permalink}
                className="block rounded-md border border-border bg-surface p-6 transition-colors duration-150 hover:border-accent"
              >
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-lg font-semibold text-text">
                    {post.title}
                  </span>
                  <time className="font-mono text-sm font-medium text-muted">
                    {post.date.slice(0, 10)}
                  </time>
                </div>
                {post.series && (
                  <p className="mb-2 text-sm text-muted">
                    시리즈: {post.series}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="text-xs text-accent">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
