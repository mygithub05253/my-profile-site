import Link from "next/link";
import {
  activities,
  education,
  profile,
  projects,
  skills,
} from "@/lib/profile";
import { getPublishedPosts } from "@/lib/posts";
import Section from "@/components/Section";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";

// 섹션 순서: Hero → 기술 스택 → 핵심 프로젝트 → 활동 → 블로그 → 교육/자격 → 연락처 (설계서 10.3)
// PR-B: 토큰 재스킨만 수행 — 섹션 재구성(S-01)은 PR-D
export default function HomePage() {
  const recentPosts = getPublishedPosts().slice(0, 5);

  return (
    <>
      {/* Hero — lova-clover 벤치마킹: 배지 + 2줄 헤드라인 + 곰돌이 아바타 (DESIGN.md v1.1) */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
          <div className="text-center md:max-w-xl md:text-left">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-bold tracking-wide text-accent shadow-card">
              🐻 LEE DONGWON · FULLSTACK &amp; FINANCE
            </span>
            <h1 className="mb-6 text-3xl leading-tight md:text-4xl">
              <span className="block text-text">한 번 쓰면,</span>
              <span className="block text-accent">모든 곳에 반영된다.</span>
            </h1>
            <p className="mb-8 text-muted">{profile.intro}</p>
            <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
              {["Next.js", "Spring Boot", "GitHub Actions", "Python"].map(
                (tech) => (
                  <Chip key={tech} variant="accent" mono className="text-xs">
                    {tech}
                  </Chip>
                ),
              )}
            </div>
            <div className="flex justify-center gap-4 md:justify-start">
              <Button href="/projects">프로젝트 보기</Button>
              <Button href="/#contact" variant="secondary">
                연락하기
              </Button>
            </div>
          </div>

          {/* 곰돌이 아바타 — public/profile-bear.svg (GPT Image 2.0 생성본으로 교체 가능) */}
          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- 정적 SVG 아바타 */}
            <img
              src="/profile-bear.svg"
              alt="이동원 프로필 — 푸근한 곰돌이 아바타"
              width={224}
              height={224}
              className="h-44 w-44 rounded-full border-4 border-surface-2 shadow-card md:h-56 md:w-56"
            />
          </div>
        </div>
      </section>

      {/* 기술 스택 */}
      <Section id="skills" title="기술 스택" surface>
        <div className="grid gap-6 md:grid-cols-3">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-md border border-border bg-bg p-6"
            >
              <h3 className="mb-4 text-lg text-text">{group.category}</h3>
              <div className="mb-3 flex flex-wrap gap-2">
                {group.main.map((tech) => (
                  <Chip key={tech} variant="accent" mono>
                    {tech}
                  </Chip>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.learning.map((tech) => (
                  <Chip key={tech} mono>
                    {tech}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          <span className="text-accent">■</span> 주력 ·{" "}
          <span>■</span> 학습 중
        </p>
      </Section>

      {/* 핵심 프로젝트 */}
      <Section id="projects" title="핵심 프로젝트">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex flex-col rounded-md border border-border bg-surface p-8 transition-colors duration-150 hover:border-accent"
            >
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <h3 className="text-xl text-text">{project.title}</h3>
                <span className="shrink-0 font-mono text-sm font-medium text-muted">
                  {project.period}
                </span>
              </div>
              <p className="mb-4 text-sm text-muted">{project.contribution}</p>
              <dl className="mb-4 space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="font-semibold text-muted">문제</dt>
                  <dd className="text-text">{project.situation}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">구현</dt>
                  <dd className="text-text">{project.action}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">결과</dt>
                  <dd className="font-mono text-success">{project.result}</dd>
                </div>
              </dl>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Chip key={tag} mono className="text-xs">
                    {tag}
                  </Chip>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-sm font-semibold text-accent transition-colors duration-150 hover:underline"
              >
                자세히 보기 →
              </a>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/projects" variant="ghost">
            모든 프로젝트 보기 →
          </Button>
        </div>
      </Section>

      {/* 활동 */}
      <Section id="activities" title="활동" surface>
        <div className="grid gap-6 md:grid-cols-2">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="rounded-md border border-border bg-bg p-6"
            >
              <h3 className="mb-2 text-lg text-text">{activity.title}</h3>
              <p className="text-muted">{activity.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 블로그 — content-hub 자동 연동 */}
      <Section
        id="blog"
        title="블로그"
        subtitle="content-hub에서 빌드 시 자동 동기화되는 최신 글"
      >
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.permalink}
                className="block rounded-md border border-border bg-surface p-6 transition-colors duration-150 hover:border-accent"
              >
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-lg font-semibold text-text">
                    {post.title}
                  </span>
                  <time className="font-mono text-sm font-medium text-muted">
                    {post.date.slice(0, 10)}
                  </time>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-xs text-accent">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Button href="/blog" variant="ghost">
            전체 글 보기 →
          </Button>
        </div>
      </Section>

      {/* 교육/자격 */}
      <Section id="education" title="교육 · 자격" surface>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-border bg-bg p-6"
            >
              <h3 className="mb-2 text-lg text-text">{item.title}</h3>
              <p className="text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 연락처 */}
      <Section id="contact" title="연락처">
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {profile.emails.map((email) => (
            <a
              key={email.address}
              href={`mailto:${email.address}`}
              className="rounded-md border border-border bg-surface p-6 text-center transition-colors duration-150 hover:border-accent"
            >
              <p className="mb-2 text-muted">{email.label}</p>
              <p className="break-all font-mono text-sm font-medium text-accent">
                {email.address}
              </p>
            </a>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <Button href={profile.github} variant="secondary" external>
            GitHub
          </Button>
          <Button href={profile.velog} variant="secondary" external>
            velog
          </Button>
        </div>
      </Section>
    </>
  );
}
