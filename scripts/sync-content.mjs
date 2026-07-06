// content-hub(SSOT) 콘텐츠를 빌드 전에 로컬로 동기화한다 (설계서 6장).
// Public 레포이므로 인증 없이 clone 가능 — Vercel 빌드 환경에서도 동일하게 동작.
import { execSync } from "node:child_process";
import { cpSync, existsSync, rmSync } from "node:fs";
import path from "node:path";

const CONTENT_HUB_URL = "https://github.com/mygithub05253/content-hub.git";
const DEST = path.resolve(process.cwd(), ".content-hub");
// FR-M22: 관리자에서 올린 assets/를 public/ 아래로 복사해 Next.js가 정적 서빙하도록 한다
// (raw.githubusercontent.com 핫링크 금지, R-3 — sync 시점의 로컬 파일을 그대로 번들).
const ASSETS_SRC = path.join(DEST, "assets");
const ASSETS_DEST = path.resolve(process.cwd(), "public", "assets");

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: "inherit" });
}

try {
  if (existsSync(path.join(DEST, ".git"))) {
    run("git fetch --depth 1 origin main && git reset --hard origin/main", DEST);
  } else {
    rmSync(DEST, { recursive: true, force: true });
    run(`git clone --depth 1 ${CONTENT_HUB_URL} "${DEST}"`);
  }
  console.log("[sync-content] content-hub 동기화 완료:", DEST);

  rmSync(ASSETS_DEST, { recursive: true, force: true });
  if (existsSync(ASSETS_SRC)) {
    cpSync(ASSETS_SRC, ASSETS_DEST, { recursive: true });
  }
  console.log("[sync-content] assets → public/assets 복사 완료:", ASSETS_DEST);
} catch (err) {
  console.error("[sync-content] content-hub 동기화 실패:", err.message);
  process.exit(1);
}
