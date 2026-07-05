import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-accent font-semibold text-bg hover:opacity-90",
  secondary:
    "border border-border font-semibold text-text hover:border-accent hover:text-accent",
  ghost: "font-semibold text-accent hover:underline",
};

// 링크형 버튼 (DESIGN.md 5장) — 내부 라우트는 Link, 외부는 a(새 탭)
export default function Button({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 transition-all duration-150 ${VARIANT_CLASSES[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
