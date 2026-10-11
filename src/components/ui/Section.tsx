import { Reveal } from "./Reveal";

type Tone = "light" | "mist" | "dark";

const tones: Record<Tone, string> = {
  light: "bg-white text-ink",
  mist: "bg-mist text-ink",
  dark: "bg-navy-900 text-white",
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  tone = "light",
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <section id={id} className={`${tones[tone]} py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {(eyebrow || title) && (
          <Reveal className="mb-12 max-w-2xl">
            {eyebrow && (
              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-teal" : "text-electric"}`}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className={`mt-4 text-base leading-relaxed ${dark ? "text-white/70" : "text-slate-600"}`}>
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}