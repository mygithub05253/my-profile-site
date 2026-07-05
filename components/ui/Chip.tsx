type Variant = "default" | "accent" | "warning";

const VARIANT_CLASSES: Record<Variant, string> = {
  default: "bg-surface-2 text-muted",
  accent: "bg-accent-soft text-accent",
  warning: "border border-warning/40 text-warning",
};

// 칩/배지 (DESIGN.md 5장) — accent=활성·주력, warning=비공개 배지
export default function Chip({
  variant = "default",
  mono = false,
  className = "",
  children,
}: {
  variant?: Variant;
  mono?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-3 py-1 text-sm ${
        mono ? "font-mono font-medium" : ""
      } ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
