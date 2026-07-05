import { profile } from "@/lib/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 text-center text-sm text-muted">
      <div className="mb-3 flex justify-center gap-6">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-150 hover:text-accent"
        >
          GitHub
        </a>
        <a
          href={profile.velog}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-150 hover:text-accent"
        >
          velog
        </a>
        <a
          href={`mailto:${profile.emails[0].address}`}
          className="transition-colors duration-150 hover:text-accent"
        >
          Email
        </a>
      </div>
      <p>© 2026 이동원. All rights reserved.</p>
      <p className="mt-2">
        이 사이트는{" "}
        <a
          href="https://github.com/mygithub05253/content-hub"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          content-hub
        </a>{" "}
        기반으로 자동 배포됩니다.
      </p>
    </footer>
  );
}
