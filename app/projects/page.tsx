import type { Metadata } from "next";
import { Suspense } from "react";
import { getPublishedProjects } from "@/lib/projects";
import ProjectsExplorer from "@/components/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI·데이터, 금융, 풀스택 프로젝트 포트폴리오",
};

// S-02 프로젝트 목록 — SSG + 클라이언트 필터 (사용자 UI §4)
export default function ProjectsPage() {
  const projects = getPublishedProjects();

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl text-text">Projects</h1>
        <p className="mb-10 font-mono text-sm font-medium text-muted">
          총 {projects.length}개
        </p>
        {/* useSearchParams는 Suspense 경계 필수 (SSG) */}
        <Suspense fallback={null}>
          <ProjectsExplorer projects={projects} />
        </Suspense>
      </div>
    </section>
  );
}
