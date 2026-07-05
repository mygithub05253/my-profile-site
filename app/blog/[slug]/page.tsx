import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(decodeURIComponent(slug));
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(decodeURIComponent(slug));
  if (!post) notFound();

  return (
    <article className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 border-b border-border pb-8">
          <h1 className="mb-4 text-2xl text-text md:text-3xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <time className="font-mono font-medium">{post.date.slice(0, 10)}</time>
            {post.series && <span>시리즈: {post.series}</span>}
            {post.velog_url && (
              <a
                href={post.velog_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                velog에서 보기 ↗
              </a>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-accent">
                #{tag}
              </span>
            ))}
          </div>
        </header>
        <div
          className="prose-post"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <footer className="mt-12 border-t border-border pt-8">
          <Link
            href="/blog"
            className="text-accent transition-colors duration-150 hover:underline"
          >
            ← 목록으로
          </Link>
        </footer>
      </div>
    </article>
  );
}
