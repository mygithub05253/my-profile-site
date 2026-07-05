"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Project, ProjectFilter } from "@/lib/projects";
import { filterProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

const FILTERS: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ai-data", label: "AI·Data" },
  { value: "finance", label: "Finance" },
  { value: "fullstack", label: "Fullstack" },
  { value: "personal", label: "Personal" },
  { value: "team", label: "Team" },
];

function isFilter(v: string | null): v is ProjectFilter {
  return FILTERS.some((f) => f.value === v);
}

// S-02 필터 + 그리드 — 필터 상태는 ?filter= URL 쿼리와 동기화 (사용자 UI §4)
export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.get("filter");
  const active: ProjectFilter = isFilter(raw) ? raw : "all";
  const filtered = filterProjects(projects, active);

  const setFilter = (value: ProjectFilter) => {
    const qs = value === "all" ? "" : `?filter=${value}`;
    router.replace(`/projects${qs}`, { scroll: false });
  };

  return (
    <>
      <div
        role="group"
        aria-label="프로젝트 필터"
        className="mb-10 flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={active === f.value}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-150 ${
              active === f.value
                ? "bg-accent-soft text-accent"
                : "border border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-border bg-surface p-12 text-center text-muted">
          해당 카테고리 프로젝트 준비 중
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </>
  );
}
