import { about, clients, process, services } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ApproachVisual } from "./ApproachVisual";
import { ArrowUpRight } from "lucide-react";

// The counts come from the data itself, so the headline numbers cannot drift from it.
const proof = [
  {
    label: "Kategori layanan",
    href: "#services",
    cta: "Lihat layanan",
    items: services.map((item) => item.title),
  },
  {
    label: "Tahap kerja terstruktur",
    href: "#process",
    cta: "Lihat proses kerja",
    items: process.map((item) => item.title),
  },
  {
    label: "Segmen klien utama",
    href: "#clients",
    cta: "Lihat segmen klien",
    items: clients.map((item) => item.title),
  },
];

export function Approach() {
  return (
    <Section
      id="about"
      eyebrow="Tantangan & Pendekatan"
      title="Tantangan yang menghambat pertumbuhan digital"
      description="Novara menerjemahkan kebutuhan ini menjadi solusi yang praktis dan terukur."
    >
      <Reveal>
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
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

      <Reveal className="mt-12" delay={120}>
        <ApproachVisual />
      </Reveal>

      <Reveal className="mt-20">
        <div className="border-t border-line pt-14">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-electric">
                Novara menjawabnya
              </p>
              <h3 className="text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
                {about.heading}
              </h3>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-slate-600">
              {about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <dl className="mt-10 grid overflow-hidden rounded-2xl bg-navy-900 text-white sm:grid-cols-3">
            {proof.map((column, i) => (
              <div
                key={column.label}
                className={`flex flex-col p-7 sm:p-8 ${i > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}
              >
                <div className="flex items-baseline gap-3">
                  <dd className="text-5xl font-extrabold leading-none text-electric">{column.items.length}</dd>
                  <dt className="text-sm font-semibold leading-snug text-white">{column.label}</dt>
                </div>

                <ul className="mt-6 flex flex-1 flex-wrap content-start gap-2">
                  {column.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs leading-none text-white/75"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={column.href}
                  className="group mt-7 inline-flex items-center gap-1.5 text-xs font-semibold text-teal transition-colors hover:text-white"
                >
                  {column.cta}
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
