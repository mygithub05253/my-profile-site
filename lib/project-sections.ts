import type { Project } from "@/lib/projects";

export type StructuredSections = {
  problem: string;
  build: string[];
  result: string[];
};

// content-hub 프로젝트 11건이 전부 통일해서 쓰는 5개 소제목 (템플릿 고정 순서)
const HEADING_ORDER = ["문제 정의", "구현", "성과", "트러블슈팅", "배운 점"] as const;

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// project.html(마크다운→HTML 변환 결과)에서 <h2>소제목</h2> 5개를 순서대로 잘라낸다.
// 5개 중 하나라도 못 찾으면(예외적 콘텐츠 구조) 전부-아니면-폴백 원칙에 따라 null —
// 어중간하게 일부 카드만 채우지 않고, 호출부는 기존 전체 HTML 렌더로 되돌아간다.
function parseHeadingSections(html: string): Record<(typeof HEADING_ORDER)[number], string> | null {
  const positions = HEADING_ORDER.map((heading) => {
    const match = html.match(new RegExp(`<h2[^>]*>\\s*${heading}\\s*</h2>`));
    return match ? { heading, index: match.index ?? -1, length: match[0].length } : null;
  });

  if (positions.some((p) => p === null)) return null;
  const found = positions as { heading: (typeof HEADING_ORDER)[number]; index: number; length: number }[];

  const sections = {} as Record<(typeof HEADING_ORDER)[number], string>;
  found.forEach((current, i) => {
    const start = current.index + current.length;
    const end = i + 1 < found.length ? found[i + 1].index : html.length;
    const text = stripTags(html.slice(start, end));
    sections[current.heading] = text;
  });
  return sections;
}

function toBullets(text: string): string[] {
  // 문장 단위로 대충 쪼개서 불릿처럼 보이게 — 원문에 명시적 리스트가 없어도 카드에 자연스럽게 들어가도록.
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// frontmatter 명시 필드 우선, 없으면 heading 자동 파싱 폴백. 둘 다 실패하면 null —
// 호출부(app/projects/[slug]/page.tsx)는 이 경우 카드 섹션을 렌더하지 않고 기존 html 전체만 보여준다.
// 명시 필드는 problem/build/result 셋 다 있을 때만 채택(전부-아니면-폴백) — 일부만 채워진
// 어중간한 상태로는 절반은 직접 쓴 문구, 절반은 자동 파싱된 결과가 섞여 어색해지는 것을 방지.
export function getStructuredSections(project: Project): StructuredSections | null {
  if (project.problem && project.build?.length && project.result?.length) {
    return {
      problem: project.problem,
      build: project.build,
      result: project.result,
    };
  }

  const parsed = parseHeadingSections(project.html);
  if (!parsed) return null;

  return {
    problem: parsed["문제 정의"],
    build: toBullets(parsed["구현"]),
    result: [...toBullets(parsed["성과"]), ...toBullets(parsed["트러블슈팅"]), ...toBullets(parsed["배운 점"])],
  };
}
