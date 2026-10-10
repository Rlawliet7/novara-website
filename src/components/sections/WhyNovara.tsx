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
      title="Mengapa memilih Novara Project"
      description="Didukung proses kerja, portofolio, dan kemampuan teknis yang nyata."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {whyNovara.map((w, i) => (
          <li
            key={w.title}
            // 5 kartu: 3 di baris atas, 2 melebar di baris bawah (desktop)
            className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}
          >
            <Reveal delay={i * 70} className="h-full">
              <article className="h-full rounded-2xl border border-line bg-white p-7">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-navy-900 text-teal">
                  <Icon name={w.icon} size={20} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{w.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{w.desc}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}