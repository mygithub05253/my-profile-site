import { projects } from "#velite";

export type Project = (typeof projects)[number];

export type ProjectFilter =
  | "all"
  | "ai-data"
  | "finance"
  | "fullstack"
  | "personal"
  | "team";

export type ProjectSort = "recommended" | "latest" | "title";

// 썸네일 없는 카드/갤러리용 파스텔 톤 순환 (lova-clover 벤치마킹 — 웜 파스텔 블록)
const PASTELS = ["#FFE9BF", "#FFDFD1", "#E4F0DC", "#E8E3F7", "#DFEDF7"];

export function pastelFor(slug: string): string {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return PASTELS[Math.abs(hash) % PASTELS.length];
}

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

// period 문자열("2025-04 ~ 진행 중" 등) 선행 YYYY-MM만 추출 — 실패 시 빈 문자열(안정 정렬로 맨 뒤 배치, throw 없음)
function periodStartKey(period: string): string {
  return period.match(/^\d{4}-\d{2}/)?.[0] ?? "";
}

// /projects 정렬 — 필터링된 목록에 이어서 적용 (필터 → 정렬 순서 고정)
export function sortProjects(list: Project[], sort: ProjectSort): Project[] {
  const copy = [...list];
  if (sort === "latest") {
    return copy.sort((a, b) =>
      periodStartKey(b.period).localeCompare(periodStartKey(a.period)),
    );
  }
  if (sort === "title") {
    return copy.sort((a, b) =>
      a.title.localeCompare(b.title, "ko", { sensitivity: "base" }),
    );
  }
  // recommended(기본) = getPublishedProjects()가 이미 적용한 순서(featured desc → order asc) 유지
  return copy;
}

export function isProjectSort(v: string | null): v is ProjectSort {
  return v === "recommended" || v === "latest" || v === "title";
}
