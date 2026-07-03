// 프로필 정적 데이터 — 섹션 순서는 설계서 10.3 (채용담당자 30~60초 스캔 기준)

export const profile = {
  name: "이동원",
  role: "풀스택 개발자 지망 · 가천대학교 컴퓨터공학과",
  intro:
    "가천대학교 컴퓨터공학과 재학 중이며, 풀스택 개발과 금융권 취업을 준비하고 있습니다. 한 번 쓰면 모든 곳에 반영되는 콘텐츠 자동화 생태계를 직접 설계·운영합니다.",
  github: "https://github.com/mygithub05253",
  velog: "https://velog.io/@kik328288",
  emails: [
    { label: "개인", address: "kik328288@gmail.com" },
    { label: "학교", address: "kik328288@gachon.ac.kr" },
    { label: "네이버", address: "dongwon0525@naver.com" },
  ],
};

// 숙련도 구분 (설계서 10.3): main = 주력, learning = 학습 중
export const skills = [
  {
    category: "Backend",
    main: ["Java", "Spring Boot", "JPA"],
    learning: ["Node.js", "Express"],
  },
  {
    category: "Frontend",
    main: ["TypeScript", "React"],
    learning: ["Next.js", "Tailwind CSS"],
  },
  {
    category: "Data / Infra",
    main: ["MySQL", "GitHub Actions"],
    learning: ["Supabase", "Redis", "Python"],
  },
];

// 핵심 프로젝트 (STAR + 기여도 수치 — 설계서 10.3)
export const projects = [
  {
    title: "개인 브랜딩 자동화 생태계",
    period: "2026",
    contribution: "개인 프로젝트 (기여도 100%)",
    situation: "블로그·프로필 사이트·GitHub README에 같은 글을 중복 게시하는 비효율",
    action:
      "content-hub 레포를 SSOT로 두고 GitHub Actions로 velog 자동 발행(비공식 GraphQL + 폴백), 주간 역방향 백업, Vercel 재빌드까지 연결한 파이프라인 구축",
    result: "글 1회 작성으로 4개 채널 동시 반영, 기존 velog 글 48건 백필 자동 수집",
    tags: ["GitHub Actions", "Python", "Next.js", "Velite"],
    link: "https://github.com/mygithub05253/content-hub",
  },
  {
    title: "금융 뉴스 큐레이터",
    period: "2026",
    contribution: "개인 프로젝트 (기여도 100%)",
    situation: "개인 투자자가 매일 흩어진 금융 뉴스를 수동으로 수집·선별하는 문제",
    action:
      "Spring Boot 모노레포 CRUD + Supabase/Flyway 스키마 관리, Perplexity·Claude·Redis 기반 AI 요약 파이프라인 구현",
    result: "뉴스 수집→AI 요약→개인화 큐레이션 자동화 파이프라인 완성 (구축기 3편 연재)",
    tags: ["Spring Boot", "Supabase", "Redis", "Claude API"],
    link: "https://velog.io/@kik328288/series/금융-뉴스-큐레이터",
  },
];

export const activities = [
  {
    title: "BDAI 12기",
    description: "빅데이터·AI 학회 활동 — 데이터 분석 프로젝트 수행",
  },
  {
    title: "기술 블로그 운영",
    description: "velog에 스프링 핵심 원리·자료구조·프로젝트 구축기 등 49편 연재",
  },
];

export const education = [
  {
    title: "가천대학교",
    detail: "컴퓨터공학과 주전공 · 응용통계학과 복수전공 · 금융빅데이터학부 부전공",
  },
  {
    title: "정보처리기사",
    detail: "필기·실기 전 과목 정리 및 준비 (학습 노트 블로그 공개)",
  },
];
