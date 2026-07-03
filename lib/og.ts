// next/og(satori) 기본 폰트에는 한글 글리프가 없어 한국어 텍스트가 깨진다.
// Google Fonts css2 API의 text= 파라미터로 실제 사용할 글자만 담은
// Noto Sans KR 서브셋을 빌드 시점에 내려받아 사용한다 (SSG라 요청당 비용 없음).
// 주의: satori는 woff2를 파싱하지 못함 — 브라우저 UA 없이 요청하면 TTF가 온다.
export async function loadNotoSansKR(
  text: string,
  weight: 400 | 700,
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();

  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) {
    throw new Error(
      "Noto Sans KR 폰트 서브셋 로드 실패: css2 응답에서 TTF src를 찾지 못함",
    );
  }
  const res = await fetch(match[1]);
  if (!res.ok) {
    throw new Error(`Noto Sans KR 폰트 다운로드 실패: HTTP ${res.status}`);
  }
  return res.arrayBuffer();
}

export const OG_SIZE = { width: 1200, height: 630 };
