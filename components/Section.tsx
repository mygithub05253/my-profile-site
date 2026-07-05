// 섹션 리듬 통일: h2 --text-2xl + 수직 패딩 모바일 64/데스크톱 96 (사용자 UI §2)
export default function Section({
  id,
  title,
  subtitle,
  surface = false,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  surface?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`px-4 py-16 md:py-24 ${surface ? "bg-surface" : ""}`}
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-3 text-center text-2xl text-text">{title}</h2>
        {subtitle && (
          <p className="mb-12 text-center text-muted">{subtitle}</p>
        )}
        {!subtitle && <div className="mb-12" />}
        {children}
      </div>
    </section>
  );
}
