import { Building2, Store, Users, CalendarDays } from "lucide-react";
import { clients, clientPriority } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Building2, Store, Users, CalendarDays];

export function TargetClients() {
  return (
    <Section
      id="clients"
      tone="light"
      eyebrow="Target Klien"
      title="Siapa yang kami layani"
      description={clientPriority}
    >
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-600">
              Kami tidak mencoba melayani semua orang. Fokus kami pada segmen yang kebutuhannya
              jelas, di mana teknologi memberikan dampak nyata dan terukur.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Dari UMKM yang mulai membangun identitas digital, hingga institusi yang butuh
              sistem terintegrasi — kami menyesuaikan lingkup, jadwal, dan biaya dengan realitas Anda.
            </p>
          </div>
          <div className="space-y-5">
            {clients.map((c, i) => {
              const Cmp = icons[i];
              return (
                <article
                  key={c.title}
                  className="group flex gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-electric/40 hover:shadow-xl hover:shadow-electric/10"
                >
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-electric/10 text-electric group-hover:bg-electric group-hover:text-white transition-colors">
                    <Cmp size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-navy-900">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}