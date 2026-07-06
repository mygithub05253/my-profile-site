# scripts/

빌드 파이프라인에서만 실행되는 Node 스크립트. 이 폴더가 있는 이유는 "이 레포에는 콘텐츠를 한 글자도 두지 않는다"는 원칙(README 참고) 때문 — 콘텐츠는 항상 [content-hub](https://github.com/mygithub05253/content-hub)에만 존재하므로, 사이트를 빌드하려면 그 콘텐츠를 빌드 시점에 가져오는 단계가 필요하다.

## 구성

- `sync-content.mjs` — `npm run build`/`npm run dev`의 첫 단계. content-hub를 `.content-hub/`로 shallow clone(이미 있으면 `fetch`+`reset --hard`로 갱신)하고, 관리자가 올린 이미지(`assets/`)를 `public/assets/`로 복사해 Next.js가 정적 파일로 서빙하게 만든다.

## 왜 인증 없이 clone하나

content-hub는 public 레포라 별도 토큰 없이 clone할 수 있다. 덕분에 Vercel 빌드 환경에서도 로컬 개발 환경과 완전히 동일한 방식으로 동작하고, 이 레포의 CI/배포 설정에 content-hub 접근 권한(PAT 등)을 추가로 심을 필요가 없다.

## 실패 시 동작

git 동기화가 실패하면(`err`) 즉시 `process.exit(1)`로 빌드를 중단시킨다 — 콘텐츠 없이 빈 사이트가 배포되는 것보다, 빌드 자체가 실패해서 이전 배포가 유지되는 쪽이 안전하다는 판단이다(README의 NFR: "빌드 실패 = 이전 배포 유지").
