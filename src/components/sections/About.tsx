import { about } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section id="about" eyebrow="Tentang Novara">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
            {about.heading}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <dl className="grid grid-cols-3 overflow-hidden rounded-2xl bg-navy-900 text-white">
            {about.stats.map((s, i) => (
              <div
                key={s.label}
                className={`p-6 text-center sm:p-8 ${i > 0 ? "border-l border-white/10" : ""}`}
              >
                <dt className="order-2 mt-2 text-xs leading-snug text-white/65 sm:text-sm">{s.label}</dt>
                <dd className="text-4xl font-extrabold text-electric sm:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}