import { techStack } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function TechStack() {
  return (
    <Section
      id="tech"
      tone="mist"
      eyebrow="Teknologi"
      title="Teknologi & tools yang kami pakai"
      description="Stack modern, stabil, dan banyak dipakai industri. Kami pilih yang tepat untuk tiap proyek, bukan yang paling hype."
    >
      <Reveal stagger delay={100} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {techStack.map((group, i) => (
          <article key={group.category} className="rounded-2xl border border-line bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-electric">
              {group.category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-md bg-mist px-3 py-1.5 text-sm font-medium text-navy-800">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}