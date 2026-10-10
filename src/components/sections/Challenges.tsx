import { AlertCircle } from "lucide-react";
import { challenges } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Challenges() {
  return (
    <Section
      id="challenges"
      tone="mist"
      eyebrow="Tantangan"
      title="Tantangan yang sering dihadapi bisnis dan organisasi"
      description="Novara menerjemahkan kebutuhan ini menjadi solusi yang praktis dan terukur."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((text, i) => (
          <li key={text}>
            <Reveal delay={i * 60} className="h-full">
              <div className="flex h-full gap-4 rounded-xl border border-line bg-white p-5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-900 text-teal">
                  <AlertCircle size={18} aria-hidden="true" />
                </span>
                <p className="text-[15px] font-medium leading-snug text-navy-900">{text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}