import { whyNovara } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function WhyNovara() {
  return (
    <Section
      id="why"
      tone="mist"
      eyebrow="Mengapa Novara"
      title="Mengapa organisasi memilih Novara Project"
      description="Didukung proses kerja, portofolio, dan kemampuan teknis yang nyata."
    >
      <div className="space-y-8">
        {whyNovara.map((w, i) => (
          <Reveal key={w.title} delay={i * 80}>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              {i % 2 === 1 && <div />}
              <div className="flex items-center gap-4 lg:order-2 lg:justify-end">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-navy-900 text-teal">
                  <Icon name={w.icon} size={24} />
                </span>
                <div className="text-right lg:text-left">
                  <h3 className="text-xl font-bold text-navy-900">{w.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-slate-600">{w.desc}</p>
                </div>
              </div>
              <div className="lg:order-1">
                <span className="text-7xl font-extrabold text-electric/[0.08] tracking-tight">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {i % 2 === 0 && <div />}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}