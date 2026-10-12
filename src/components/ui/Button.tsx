import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost-light";

const styles: Record<Variant, string> = {
  primary:
    "bg-electric text-white hover:bg-electric-dark shadow-lg shadow-electric/25",
  secondary:
    "bg-white text-navy-900 border border-line hover:border-electric hover:text-electric",
  "ghost-light": "border border-white/25 text-white hover:bg-white/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric ${styles[variant]} ${className}`;

  const isAnchor = href.startsWith("#");
  const isMail = href.startsWith("mailto:");

  if (isAnchor || isMail || external) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
