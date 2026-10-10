import { process } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <Section
      id="process"
      eyebrow="Proses Kerja"
      title="Proses kerja terstruktur dalam enam tahap"
      description="Lingkup, jadwal, dan hasil akhir jelas sejak awal, dari konsultasi sampai dukungan lanjutan."
    >
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {process.map((p, i) => (
          <li key={p.step}>
            <Reveal delay={i * 70} className="h-full">
              <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-white p-7">
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-4 select-none text-8xl font-extrabold text-electric/[0.07]"
                >
                  {p.step}
                </span>
                <span className="inline-block rounded-md bg-navy-900 px-2.5 py-1 text-xs font-bold tracking-widest text-teal">
                  {p.step}
                </span>
                <h3 className="relative mt-4 text-lg font-bold text-navy-900">{p.title}</h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-slate-600">{p.desc}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}