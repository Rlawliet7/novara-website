import { challenges } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Challenges() {
  return (
    <Section
      id="challenges"
      tone="mist"
      eyebrow="Tantangan"
      title="Tantangan yang menghambat pertumbuhan digital"
      description="Novara menerjemahkan kebutuhan ini menjadi solusi yang praktis dan terukur."
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
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
          <ol className="space-y-4">
            {challenges.map((text, i) => (
              <li key={text} className="relative pl-12">
                <span className="absolute left-0 top-0.5 w-8 h-8 flex items-center justify-center rounded-full bg-navy-900 text-teal font-bold text-lg">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-relaxed text-navy-900">{text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}