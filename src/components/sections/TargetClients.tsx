import { Building2, Store, Users, CalendarDays } from "lucide-react";
import { clients, clientPriority } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Building2, Store, Users, CalendarDays];

export function TargetClients() {
  return (
    <Section
      id="clients"
      eyebrow="Target Klien"
      title="Siapa yang kami layani"
      description={clientPriority}
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {clients.map((c, i) => {
          const Cmp = icons[i];
          return (
            <li key={c.title}>
              <Reveal delay={i * 70} className="h-full">
                <article className="h-full rounded-2xl border border-line p-7 transition-colors hover:border-electric/40">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-electric/10 text-electric">
                    <Cmp size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-navy-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}