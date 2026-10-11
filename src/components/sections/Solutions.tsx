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
      title="Solusi yang disesuaikan, bukan produk yang dipaksakan"
      description="Lima area solusi yang paling sering dibutuhkan bisnis, organisasi, dan penyelenggara acara."
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Reveal>
          <p className="text-lg leading-relaxed text-white/70">
            Setiap organisasi memiliki konteks yang berbeda — skala, anggaran, maturitas digital,
            dan budaya kerja. Solusi kami tidak pernah "satu ukuran untuk semua".
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Kami mendesain arsitektur sistem, alur kerja, dan antarmuka yang cocok dengan
            kondisi aktual Anda hari ini, namun siap diskalakan untuk besok.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-5">
            {solutions.map((s, i) => (
              <article
                key={s.title}
                className="group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-electric/50 hover:bg-white/[0.07]"
              >
                <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-electric/15 text-electric group-hover:bg-electric group-hover:text-white transition-colors">
                  <Icon name={s.icon} size={20} />
                </span>
                <div>
                  <h3 className="font-bold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}