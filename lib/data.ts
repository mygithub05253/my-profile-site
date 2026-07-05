import { recordsData, stacksData } from "#velite";

// 기술 스택·성장 기록 — content-hub data/*.yml (ADR-11)
export const stacks = stacksData.items;
export const records = recordsData;

export type StackItem = (typeof stacksData.items)[number];
export type RecordItem = (typeof recordsData.items)[number];
export type RecordCategory = RecordItem["category"];

// Hero 칩 노출용
export function getFeaturedStacks(): StackItem[] {
  return stacks.filter((item) => item.featured);
}

// 타임라인 카드 상단 컬러 바 + 라벨 (웜 파스텔 — DESIGN.md v1.1 팔레트 계열)
export const RECORD_CATEGORY_META: Record<
  RecordCategory,
  { label: string; color: string }
> = {
  education: { label: "Education", color: "#f2a007" },
  certification: { label: "Certification", color: "#5c8fd6" },
  activity: { label: "Activity", color: "#7fa65a" },
  bootcamp: { label: "Bootcamp", color: "#9b7fd6" },
  competition: { label: "Competition", color: "#d67f9b" },
  project: { label: "Project", color: "#f28a00" },
};

// About 강점 카드 타이틀 컬러 (profile.highlights[].color)
export const HIGHLIGHT_COLOR: Record<string, string> = {
  gold: "#f2a007",
  blue: "#5c8fd6",
  green: "#7fa65a",
  purple: "#9b7fd6",
  pink: "#d67f9b",
};
