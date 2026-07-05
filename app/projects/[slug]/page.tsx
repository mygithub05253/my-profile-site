import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getPublishedProjects,
} from "@/lib/projects";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_LABEL: Record<string, string> = {
  "ai-data": "AI·Data",
  finance: "Finance",
  fullstack: "Fullstack",
};

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(decodeURIComponent(slug));
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

// S-03 프로젝트 상세 (사용자 UI §5)
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(decodeURIComponent(slug));
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);
  const isPrivate = project.repoVisibility === "private";

  return (
    <article className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        {/* breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6">
          <Link
            href="/projects"
            className="text-sm font-semibold text-muted transition-colors duration-150 hover:text-accent"
          >
            ← Projects
          </Link>
        </nav>

        <header className="mb-10 border-b border-border pb-8">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl text-text md:text-3xl">{project.title}</h1>
            {isPrivate && <Chip variant="warning">비공개</Chip>}
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
            {project.category.map((c) => (
              <Chip key={c} variant="accent" className="text-xs">
                {CATEGORY_LABEL[c]}
              </Chip>
            ))}
            <Chip className="text-xs">
              {project.scope === "team" ? "Team" : "Personal"}
            </Chip>
            <span className="font-mono text-sm font-medium text-muted">
              {project.period}
            </span>
            {project.role && <span className="text-muted">· {project.role}</span>}
          </div>

          <div className="flex flex-wrap gap-3">
            {/* P-3: private 레포는 GitHub 버튼 미렌더 (스키마 §4) */}
            {project.github && !isPrivate && (
              <Button href={project.github} variant="secondary" external>
                GitHub에서 보기
              </Button>
            )}
            {project.demo && (
              <Button href={project.demo} variant="secondary" external>
                Live Demo
              </Button>
            )}
          </div>
        </header>

        <div
          className="prose-post"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Chip key={tech} mono className="text-xs">
              {tech}
            </Chip>
          ))}
        </div>

        {/* 이전/다음 — 전역 정렬 기준, 목록 필터와 무관 (F-8) */}
        <nav
          aria-label="이전/다음 프로젝트"
          className="mt-12 flex justify-between gap-4 border-t border-border pt-8"
        >
          {prev ? (
            <Link
              href={prev.permalink}
              className="text-sm font-semibold text-accent transition-colors duration-150 hover:underline"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={next.permalink}
              className="text-right text-sm font-semibold text-accent transition-colors duration-150 hover:underline"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}
