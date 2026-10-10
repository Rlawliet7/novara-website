import { Check } from "lucide-react";
import { collaboration } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Collaboration() {
  return (
    <Section
      id="collaboration"
      eyebrow="Peluang Kolaborasi"
      title="Terbuka untuk berbagai bentuk kerja sama"
      description={collaboration.note}
    >
      <Reveal className="mb-8">
        <p className="mb-3 text-sm font-semibold text-navy-900">Terbuka berkolaborasi dengan</p>
        <ul className="flex flex-wrap gap-2">
          {collaboration.openTo.map((o) => (
            <li
              key={o}
              className="rounded-full border border-electric/30 bg-electric/5 px-4 py-1.5 text-sm font-medium text-electric"
            >
              {o}
            </li>
          ))}
        </ul>
      </Reveal>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collaboration.forms.map((f, i) => (
          <li key={f}>
            <Reveal delay={i * 60} className="h-full">
              <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-mist p-5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-900 text-teal">
                  <Check size={14} strokeWidth={3} aria-hidden="true" />
                </span>
                <p className="text-[15px] font-medium leading-snug text-navy-900">{f}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}