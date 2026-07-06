import Link from "next/link";
import { pastelFor, type Project } from "@/lib/projects";
import Chip from "@/components/ui/Chip";

const CATEGORY_LABEL: Record<string, string> = {
  "ai-data": "AI·Data",
  finance: "Finance",
  fullstack: "Fullstack",
};

// 프로젝트 카드 (사용자 UI §4) — 카드 전체 단일 링크, 중첩 링크 금지
export default function ProjectCard({ project }: { project: Project }) {
  const isPrivate = project.repoVisibility === "private";

  return (
    <Link
      href={project.permalink}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:border-accent"
    >
      {/* 썸네일 16:9 — 없으면 파스텔 블록 + 이니셜 */}
      <div
        className="relative flex aspect-video items-center justify-center overflow-hidden"
        style={
          project.thumbnail
            ? undefined
            : { backgroundColor: pastelFor(project.slug) }
        }
      >
        {project.featured && (
          <span
            aria-label="대표 프로젝트"
            title="대표 프로젝트"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface/90 text-base shadow-card"
          >
            ⭐
          </span>
        )}
        {project.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element -- content-hub 상대 경로 정적 서빙
          <img
            src={project.thumbnail}
            alt=""
            className="h-full w-full object-cover transition-transform duration-150 group-hover:scale-[1.02]"
          />
        ) : (
          <span className="font-display text-4xl font-extrabold text-[#332a23]/30 transition-transform duration-150 group-hover:scale-[1.05]">
            {project.title.slice(0, 1)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.category.map((c) => (
            <Chip key={c} variant="accent" className="text-xs">
              {CATEGORY_LABEL[c]}
            </Chip>
          ))}
          <Chip className="text-xs">
            {project.scope === "team" ? "Team" : "Personal"}
          </Chip>
          {isPrivate && (
            <Chip variant="warning" className="text-xs">
              비공개
            </Chip>
          )}
        </div>

        <h3 className="text-lg text-text">{project.title}</h3>
        <p className="line-clamp-2 text-sm text-muted">{project.summary}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="font-mono text-xs font-medium text-muted">
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="font-mono text-xs font-medium text-muted">
              +{project.stack.length - 3}
            </span>
          )}
          <span className="ml-auto font-mono text-xs font-medium text-muted">
            {project.period}
          </span>
        </div>
      </div>
    </Link>
  );
}
