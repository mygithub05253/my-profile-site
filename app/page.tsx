import Link from "next/link";
import { profile } from "@/lib/profile";
import {
  getFeaturedStacks,
  HIGHLIGHT_COLOR,
  RECORD_CATEGORY_META,
  records,
  stacks,
} from "@/lib/data";
import { getPublishedProjects } from "@/lib/projects";
import { getPublishedPosts } from "@/lib/posts";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";

// S-01 홈 재구성 (PR-D): Hero → About(강점 카드+Core Stack) → Featured Projects
// → History & Records 타임라인 → Blog → Contact — 데이터는 content-hub data/*.yml (ADR-11)
export default function HomePage() {
  const featuredProjects = getPublishedProjects().slice(0, 6);
  const recentPosts = getPublishedPosts().slice(0, 3);

  return (
    <>
      {/* Hero — lova-clover 벤치마킹: 배지 + 2줄 헤드라인 + 곰돌이 아바타 (DESIGN.md v1.1) */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
          <div className="text-center md:max-w-xl md:text-left">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-bold tracking-wide text-accent shadow-card">
              🐻 {profile.nameEn} · FINANCE × DATA × AI
            </span>
            <h1 className="mb-6 text-3xl leading-tight md:text-4xl">
              <span className="block text-text">한 번 쓰면,</span>
              <span className="block text-accent">모든 곳에 반영된다.</span>
            </h1>
            <p className="mb-8 text-muted">{profile.intro}</p>
            <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
              {getFeaturedStacks().map((item) => (
                <Chip key={item.name} variant="accent" mono className="text-xs">
                  {item.name}
                </Chip>
              ))}
            </div>
            <div className="flex justify-center gap-4 md:justify-start">
              <Button href="/projects">프로젝트 보기</Button>
              <Button href="/#contact" variant="secondary">
                연락하기
              </Button>
            </div>
          </div>

          {/* 곰돌이 아바타 — GPT Image 생성본 (public/profile-bear.png) */}
          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- 정적 아바타 이미지 */}
            <img
              src="/profile-bear.png"
              alt="이동원 프로필 — 커피를 든 푸근한 곰돌이 아바타"
              width={224}
              height={224}
              className="h-44 w-44 rounded-full border-4 border-surface-2 shadow-card md:h-56 md:w-56"
            />
          </div>
        </div>
      </section>

      {/* About — 강점 카드 5종 + Core Stack 바 (data/profile.yml·stacks.yml) */}
      <Section
        id="about"
        eyebrow="About Me"
        title="데이터로 검증하고, 도구로 만들고, 기록으로 남깁니다."
        subtitle="금융 도메인의 문제를 데이터 분석과 AI 에이전트, 풀스택 구현으로 직접 풀어냅니다."
        surface
        wide
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {profile.highlights.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center rounded-md border border-border bg-bg p-6 text-center"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-2xl">
                {item.icon}
              </span>
              <h3
                className="font-display text-lg font-extrabold"
                style={{ color: HIGHLIGHT_COLOR[item.color] }}
              >
                {item.title}
              </h3>
              <p className="mb-3 text-sm font-bold text-text">{item.subtitle}</p>
              <p className="text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Core Stack 바 — 아이콘 필은 라이트 고정색 (다크에서도 브랜드 아이콘 가독 유지) */}
        <div className="mt-6 flex flex-col items-start gap-4 rounded-md border border-border bg-bg p-6 md:flex-row md:items-center">
          <div className="shrink-0 md:pr-2">
            <p className="font-display text-base font-extrabold text-text">
              🧰 Core Stack
            </p>
            <p className="text-xs text-muted">주요 기술 스택</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {stacks.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-2 rounded-full border border-[#ecdcc7] bg-[#fffdf8] px-3.5 py-1.5 text-sm font-semibold text-[#5c5247] shadow-card"
              >
                {item.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element -- simple-icons CDN 브랜드 아이콘
                  <img
                    src={`https://cdn.simpleicons.org/${item.icon}`}
                    alt=""
                    width={16}
                    height={16}
                    loading="lazy"
                    className="h-4 w-4"
                  />
                ) : (
                  <span aria-hidden className="text-sm leading-none">
                    {item.emoji}
                  </span>
                )}
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Featured Projects — content-hub projects/ 컬렉션 (썸네일은 frontmatter로 관리) */}
      <Section
        id="projects"
        eyebrow="Projects"
        title="아이디어를 동작하는 결과물로 만든 프로젝트"
        subtitle="어떤 문제에서 시작했고, 무엇을 구현했으며, 어떤 결과를 남겼는지 정리했습니다."
        wide
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/projects" variant="ghost">
            모든 프로젝트 보기 →
          </Button>
        </div>
      </Section>

      {/* History & Records — 성장 로드맵 타임라인 (data/records.yml) */}
      <Section
        id="records"
        eyebrow="History & Records"
        title="배움이 다음 도전으로 이어진 기록"
        subtitle="학업, 동아리, 부트캠프, 대회, 프로젝트를 시간순으로 묶어 성장 흐름을 남깁니다."
        surface
        wide
      >
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Growth Map 인트로 카드 */}
          <div className="flex h-fit flex-col rounded-md border border-border bg-bg p-6 lg:sticky lg:top-28">
            <span className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-3.5 py-1.5 font-display text-xs font-extrabold text-accent">
              🐾 {records.intro.badge}
            </span>
            <h3 className="mb-3 text-lg font-bold leading-snug text-text">
              {records.intro.title}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              {records.intro.description}
            </p>
            <dl className="mt-auto space-y-2">
              {records.intro.loop.map((step) => (
                <div
                  key={step.label}
                  className="flex items-baseline gap-3 rounded-sm border border-border px-4 py-2.5"
                >
                  <dt className="w-20 shrink-0 font-display text-sm font-extrabold text-accent">
                    {step.label}
                  </dt>
                  <dd className="text-xs text-muted">{step.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 타임라인 카드 그리드 — 시간순(과거 → 현재), 상단 컬러 바 = 카테고리 */}
          <ul className="grid h-fit gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {records.items.map((item) => {
              const meta = RECORD_CATEGORY_META[item.category];
              const card = (
                <div
                  className={`flex h-full flex-col rounded-md border border-border bg-bg p-5 transition-colors duration-150 ${item.link ? "hover:border-accent" : ""}`}
                  style={{ borderTop: `3px solid ${meta.color}` }}
                >
                  <div className="mb-2 flex items-baseline justify-between gap-2">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: meta.color }}
                    >
                      {item.date}
                    </span>
                    <span className="text-xs font-semibold text-muted">
                      {meta.label}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-bold leading-snug text-text">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              );
              return (
                <li key={`${item.date}-${item.title}`}>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* Blog — content-hub 자동 연동 최신 3편 */}
      <Section
        id="blog"
        eyebrow="Blog"
        title="과정을 기록으로 남깁니다"
        subtitle="content-hub에서 빌드 시 자동 동기화되는 최신 글"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={post.permalink}
              className="flex flex-col rounded-md border border-border bg-surface p-6 transition-colors duration-150 hover:border-accent"
            >
              <time className="mb-2 font-mono text-xs font-medium text-muted">
                {post.date.slice(0, 10)}
              </time>
              <span className="mb-3 line-clamp-2 text-base font-semibold leading-snug text-text">
                {post.title}
              </span>
              <div className="mt-auto flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-accent">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/blog" variant="ghost">
            전체 글 보기 →
          </Button>
        </div>
      </Section>

      {/* Contact — 채널 3종 액션 카드 (사용자 피드백: velog 글 나열 대신 채널 안내) */}
      <Section
        id="contact"
        eyebrow="Contact"
        title="이렇게 연락할 수 있어요"
        surface
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "🐙",
              title: "GitHub에서 코드 보기",
              description: "프로젝트 소스와 커밋 기록을 확인할 수 있습니다.",
              href: profile.github,
              external: true,
            },
            {
              icon: "✍️",
              title: "Velog에서 회고·기록 보기",
              description: "구축기, 학습 노트, 회고를 연재하고 있습니다.",
              href: profile.velog,
              external: true,
            },
            {
              icon: "📮",
              title: "Email로 연락하기",
              description: profile.emails[0].address,
              href: `mailto:${profile.emails[0].address}`,
              external: false,
            },
          ].map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex flex-col items-center rounded-md border border-border bg-bg p-8 text-center transition-all duration-150 hover:-translate-y-0.5 hover:border-accent"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-2xl">
                {channel.icon}
              </span>
              <h3 className="mb-2 text-base font-bold text-text">
                {channel.title}
              </h3>
              <p className="break-all text-sm text-muted">
                {channel.description}
              </p>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
