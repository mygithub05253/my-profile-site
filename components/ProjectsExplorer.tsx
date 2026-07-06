"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Project, ProjectFilter, ProjectSort } from "@/lib/projects";
import { filterProjects, isProjectSort, sortProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

const FILTERS: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ai-data", label: "AI·Data" },
  { value: "finance", label: "Finance" },
  { value: "fullstack", label: "Fullstack" },
  { value: "personal", label: "Personal" },
  { value: "team", label: "Team" },
];

const SORTS: { value: ProjectSort; label: string }[] = [
  { value: "recommended", label: "추천순" },
  { value: "latest", label: "최신순" },
  { value: "title", label: "가나다순" },
];

function isFilter(v: string | null): v is ProjectFilter {
  return FILTERS.some((f) => f.value === v);
}

// S-02 필터 + 그리드 — 필터·정렬 상태는 ?filter=·?sort= URL 쿼리와 동기화 (사용자 UI §4)
export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter: ProjectFilter = isFilter(searchParams.get("filter"))
    ? (searchParams.get("filter") as ProjectFilter)
    : "all";
  // 알 수 없는/누락된 값은 throw 없이 "recommended"로 폴백
  const activeSort: ProjectSort = isProjectSort(searchParams.get("sort"))
    ? (searchParams.get("sort") as ProjectSort)
    : "recommended";
  const filtered = sortProjects(filterProjects(projects, activeFilter), activeSort);

  const updateQuery = (next: { filter?: ProjectFilter; sort?: ProjectSort }) => {
    const params = new URLSearchParams(searchParams.toString());
    const filter = next.filter ?? activeFilter;
    const sort = next.sort ?? activeSort;
    filter === "all" ? params.delete("filter") : params.set("filter", filter);
    sort === "recommended" ? params.delete("sort") : params.set("sort", sort);
    const qs = params.toString();
    router.replace(`/projects${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="프로젝트 필터"
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => updateQuery({ filter: f.value })}
              aria-pressed={activeFilter === f.value}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-150 ${
                activeFilter === f.value
                  ? "bg-accent-soft text-accent"
                  : "border border-border text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="sr-only">정렬 기준</span>
          <select
            aria-label="정렬 기준"
            value={activeSort}
            onChange={(e) => updateQuery({ sort: e.target.value as ProjectSort })}
            className="rounded-sm border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-text"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
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
