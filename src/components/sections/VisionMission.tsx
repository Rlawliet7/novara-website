import { Quote } from "lucide-react";
import { vision, mission } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function VisionMission() {
  return (
    <Section id="vision" tone="dark">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal">Visi</p>
            <Quote size={32} className="mb-4 text-electric" aria-hidden="true" />
          </Reveal>

          {/* Sengaja di luar <Reveal>: kemunculannya dipegang SplitText di
              Choreography, dan satu elemen tidak boleh punya dua pemilik
              animasi. Tanpa JavaScript atau saat reduced motion, paragraf ini
              tampil apa adanya. */}
          <p
            data-cine-split
            className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl"
          >
            {vision}
          </p>
        </div>

        <Reveal delay={120}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal">Misi</p>
          <ol className="space-y-3">
            {mission.map((m, i) => (
              <li
                key={m}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-electric text-sm font-bold">
                  {i + 1}
                </span>
                <span className="pt-1 text-[15px] leading-snug text-white/85">{m}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}