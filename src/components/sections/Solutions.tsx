import { solutions } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function Solutions() {
  return (
    <Section
      id="solutions"
      tone="dark"
      eyebrow="Solusi"
      title="Solusi sesuai kebutuhan"
      description="Lima area solusi yang paling sering dibutuhkan bisnis, organisasi, dan penyelenggara acara."
    >
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((s, i) => (
          <li key={s.title} className={i === 0 ? "lg:col-span-1" : ""}>
            <Reveal delay={i * 70} className="h-full">
              <article className="flex h-full gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-electric/50 hover:bg-white/[0.07]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-electric/15 text-electric">
                  <Icon name={s.icon} size={20} />
                </span>
                <div>
                  <h3 className="text-base font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">{s.desc}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}