import Link from "next/link";
import {
  activities,
  education,
  profile,
  projects,
  skills,
} from "@/lib/profile";
import { getPublishedPosts } from "@/lib/posts";

// 섹션 순서: Hero → 기술 스택 → 핵심 프로젝트 → 활동 → 블로그 → 교육/자격 → 연락처 (설계서 10.3)
export default function HomePage() {
  const recentPosts = getPublishedPosts().slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold text-cyan-400 md:text-7xl">
            {profile.name}
          </h1>
          <p className="mb-6 text-xl text-gray-300 md:text-2xl">{profile.role}</p>
          <p className="mx-auto mb-8 max-w-2xl text-gray-400">{profile.intro}</p>
          <div className="flex justify-center gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-cyan-400"
            >
              프로젝트 보기
            </a>
            <a
              href="#contact"
              className="rounded-lg border-2 border-cyan-400 px-6 py-3 font-semibold text-cyan-400 transition-colors hover:bg-cyan-400 hover:text-gray-900"
            >
              연락하기
            </a>
          </div>
        </div>
      </section>

      {/* 기술 스택 */}
      <section id="skills" className="bg-gray-800/50 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-cyan-400">
            기술 스택
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {skills.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-gray-700 bg-gray-900 p-6"
              >
                <h3 className="mb-4 text-xl font-bold text-cyan-300">
                  {group.category}
                </h3>
                <div className="mb-3 flex flex-wrap gap-2">
                  {group.main.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.learning.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            <span className="text-cyan-300">■</span> 주력 ·{" "}
            <span className="text-gray-400">■</span> 학습 중
          </p>
        </div>
      </section>

      {/* 핵심 프로젝트 */}
      <section id="projects" className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-cyan-400">
            핵심 프로젝트
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="flex flex-col rounded-xl border border-gray-700 bg-gray-900 p-8 transition-colors hover:border-cyan-400"
              >
                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-bold text-cyan-400">
                    {project.title}
                  </h3>
                  <span className="shrink-0 text-sm text-gray-500">
                    {project.period}
                  </span>
                </div>
                <p className="mb-4 text-sm text-gray-500">{project.contribution}</p>
                <dl className="mb-4 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="font-semibold text-gray-400">문제</dt>
                    <dd className="text-gray-300">{project.situation}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-400">구현</dt>
                    <dd className="text-gray-300">{project.action}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-400">결과</dt>
                    <dd className="text-gray-300">{project.result}</dd>
                  </div>
                </dl>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-700 px-3 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  자세히 보기 →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 활동 */}
      <section id="activities" className="bg-gray-800/50 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-cyan-400">
            활동
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="rounded-xl border border-gray-700 bg-gray-900 p-6"
              >
                <h3 className="mb-2 text-xl font-bold text-cyan-300">
                  {activity.title}
                </h3>
                <p className="text-gray-300">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 블로그 — content-hub 자동 연동 */}
      <section id="blog" className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-cyan-400">
            블로그
          </h2>
          <p className="mb-12 text-center text-gray-400">
            content-hub에서 빌드 시 자동 동기화되는 최신 글
          </p>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={post.permalink}
                  className="block rounded-lg border border-gray-700 bg-gray-900 p-6 transition-colors hover:border-cyan-400"
                >
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-lg font-semibold text-gray-100">
                      {post.title}
                    </span>
                    <time className="text-sm text-gray-500">
                      {post.date.slice(0, 10)}
                    </time>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs text-cyan-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
              전체 글 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* 교육/자격 */}
      <section id="education" className="bg-gray-800/50 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-cyan-400">
            교육 · 자격
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {education.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-700 bg-gray-900 p-6"
              >
                <h3 className="mb-2 text-xl font-bold text-cyan-300">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-cyan-400">
            연락처
          </h2>
          <div className="mb-10 grid gap-6 md:grid-cols-3">
            {profile.emails.map((email) => (
              <a
                key={email.address}
                href={`mailto:${email.address}`}
                className="rounded-lg border border-gray-700 bg-gray-900 p-6 text-center transition-colors hover:border-cyan-400"
              >
                <p className="mb-2 text-gray-400">{email.label}</p>
                <p className="break-all text-sm text-cyan-400">{email.address}</p>
              </a>
            ))}
          </div>
          <div className="flex justify-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-700 bg-gray-900 px-8 py-4 font-semibold text-cyan-400 transition-colors hover:border-cyan-400"
            >
              GitHub
            </a>
            <a
              href={profile.velog}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-700 bg-gray-900 px-8 py-4 font-semibold text-cyan-400 transition-colors hover:border-cyan-400"
            >
              velog
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
