import { ExternalLink, FolderOpen } from "lucide-react";
import { portfolio } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const statusStyle = {
  "Proyek Klien": "bg-teal/15 text-teal-800",
  "Proyek Demo": "bg-electric/10 text-electric",
  Prototype: "bg-amber-100 text-amber-800",
} as const;

export function Portfolio() {
  const hasItems = portfolio.items.length > 0;

  return (
    <Section
      id="portfolio"
      tone="mist"
      eyebrow="Portofolio & Studi Kasus"
      title="Portofolio dan studi kasus"
      description={portfolio.note}
    >
      {hasItems ? (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 70} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
                  <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[item.status]}`}>
                    {item.status}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{item.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <li key={t} className="rounded-md bg-mist px-2.5 py-1 text-xs font-medium text-navy-700">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-electric hover:underline"
                    >
                      Lihat proyek <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-electric/40 bg-white p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-electric/10 text-electric">
                <FolderOpen size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy-900">Studi kasus sedang disiapkan</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                Setiap proyek yang dipublikasikan akan dilengkapi label yang jelas: proyek klien,
                proyek demonstrasi, atau prototype. Hubungi kami untuk melihat contoh pekerjaan yang relevan.
              </p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Kategori portofolio
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {portfolio.categories.map((c) => (
                  <li key={c} className="rounded-full border border-line bg-mist px-3.5 py-1.5 text-sm text-navy-800">
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-navy-900 p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                Format setiap studi kasus
              </p>
              <ol className="mt-5 space-y-4">
                {portfolio.caseFormat.map((f, i) => (
                  <li key={f} className="flex items-center gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-electric text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-[15px] text-white/85">{f}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      )}
    </Section>
  );
}