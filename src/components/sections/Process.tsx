import { process } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <Section
      id="process"
      tone="light"
      eyebrow="Proses Kerja"
      title="Proses kerja terstruktur dalam enam tahap"
      description="Lingkup, jadwal, dan hasil akhir jelas sejak awal, dari konsultasi sampai dukungan lanjutan."
    >
      <Reveal>
        <ol className="space-y-6 max-w-3xl mx-auto">
          {process.map((p, i) => (
            <li key={p.step} className="relative">
              <div
                className="absolute left-6 top-12 bottom-0 w-0.5 bg-line"
                aria-hidden="true"
                style={{ display: i === process.length - 1 ? "none" : "block" }}
              />
              <div className="relative pl-16">
                <div className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full bg-white border-4 border-navy-900 z-10">
                  <span className="text-2xl font-extrabold text-electric">{p.step}</span>
                </div>
                <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
                  <h3 className="text-xl font-bold text-navy-900">{p.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{p.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}