"use client";

import { useState } from "react";
import { pastelFor } from "@/lib/projects";

// 상세화면 이미지 영역. 2장 이상 = 캐러셀(이전/다음+점 인디케이터+키보드),
// 정확히 1장 = 컨트롤 없는 정적 이미지 1장(죽은 버튼 방지), 0장은 호출부에서 아예 렌더하지 않는다.
export default function ProjectGallery({
  images,
  slug,
  title,
}: {
  images: string[];
  slug: string;
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState<Record<number, boolean>>({});

  if (images.length === 0) return null;

  const showControls = images.length > 1;
  const goTo = (next: number) => setIndex((next + images.length) % images.length);

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-border bg-surface"
      onKeyDown={(e) => {
        if (!showControls) return;
        if (e.key === "ArrowLeft") goTo(index - 1);
        if (e.key === "ArrowRight") goTo(index + 1);
      }}
      tabIndex={showControls ? 0 : -1}
      role={showControls ? "region" : undefined}
      aria-label={showControls ? `${title} 스크린샷 캐러셀` : undefined}
    >
      <div className="flex aspect-video items-center justify-center">
        {broken[index] ? (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ backgroundColor: pastelFor(`${slug}-${index}`) }}
          >
            <span className="font-display text-4xl font-extrabold text-[#332a23]/30">
              {title.slice(0, 1)}
            </span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- content-hub 상대 경로 정적 서빙
          <img
            src={images[index]}
            alt={`${title} 스크린샷 ${index + 1}/${images.length}`}
            className="h-full w-full object-cover"
            onError={() => setBroken((prev) => ({ ...prev, [index]: true }))}
          />
        )}
      </div>

      <span aria-live="polite" className="sr-only">
        {index + 1}번째 이미지 표시 중, 총 {images.length}장
      </span>

      {showControls && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="이전 이미지"
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-text shadow-card hover:bg-surface"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="다음 이미지"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-text shadow-card hover:bg-surface"
          >
            →
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${i + 1}번째 이미지로 이동`}
                aria-current={i === index}
                className={`h-2 w-2 rounded-full transition-colors duration-150 ${
                  i === index ? "bg-accent" : "bg-surface/70 hover:bg-surface"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
