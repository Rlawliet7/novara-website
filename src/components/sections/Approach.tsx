import { about, challenges } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ApproachVisual } from "./ApproachVisual";

export function Approach() {
  return (
    <Section
      id="about"
      eyebrow="Tantangan & Pendekatan"
      title="Tantangan yang menghambat pertumbuhan digital"
      description="Novara menerjemahkan kebutuhan ini menjadi solusi yang praktis dan terukur."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <Reveal>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-600">
              Banyak bisnis dan organisasi tahu mereka butuh teknologi, tapi tidak tahu
              dari mana memulai. Kami mengidentifikasi akar masalahnya terlebih dahulu.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Pendekatan kami: diagnostik dulu, resep lalu. Tanpa diagnosa yang tepat,
              solusi teknologi justru menambah kompleksitas dan biaya.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ApproachVisual />
        </Reveal>
      </div>

      <Reveal className="mt-14" stagger>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((text, i) => (
            <li
              key={text}
              className="card-hover rounded-2xl border border-line bg-white p-6"
            >
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-base leading-relaxed text-navy-900">{text}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-20">
        <div className="border-t border-line pt-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-electric">
            Novara menjawabnya
          </p>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end">
            <div>
              <h3 className="text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
                {about.heading}
              </h3>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
                {about.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <dl className="grid grid-cols-3 overflow-hidden rounded-2xl bg-navy-900 text-white">
              {about.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center justify-center p-6 text-center sm:p-7 ${i > 0 ? "border-l border-white/10" : ""}`}
                >
                  <dd className="order-1 text-4xl font-extrabold text-electric sm:text-5xl">{stat.value}</dd>
                  <dt className="order-2 mt-2 text-xs leading-snug text-white/65">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
