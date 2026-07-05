import { projects } from "#velite";

export type Project = (typeof projects)[number];

export type ProjectFilter =
  | "all"
  | "ai-data"
  | "finance"
  | "fullstack"
  | "personal"
  | "team";

// 발행된 프로젝트만 노출, 정렬 = featured 우선 → order ASC (스키마 §4)
export function getPublishedProjects(): Project[] {
  return projects
    .filter((p) => p.status === "published")
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.order - b.order;
    });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

// 이전/다음 = 전역 정렬 기준, 목록 필터와 무관 (검토 F-8 비목표 확정)
export function getAdjacentProjects(slug: string): {
  prev: Project | undefined;
  next: Project | undefined;
} {
  const list = getPublishedProjects();
  const idx = list.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? list[idx - 1] : undefined,
    next: idx >= 0 && idx < list.length - 1 ? list[idx + 1] : undefined,
  };
}

// 필터 매핑: 카테고리 축(category[]) + 참여 축(scope) 2축 (요구사항 §6)
export function filterProjects(
  list: Project[],
  filter: ProjectFilter,
): Project[] {
  if (filter === "all") return list;
  if (filter === "personal" || filter === "team") {
    return list.filter((p) => p.scope === filter);
  }
  return list.filter((p) => p.category.includes(filter));
}
