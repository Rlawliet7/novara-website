import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessJourney } from "./ProcessJourney";

export function Process() {
  return (
    <Section
      id="process"
      // Panggung 3D dan rail tahapannya memakai position: sticky.
      chapter={false}
      tone="light"
      eyebrow="Proses Kerja"
      title="Enam tahap, dari ngobrol sampai serah terima"
      description="Kamu tahu persis lagi di tahap mana, apa yang dikerjain, dan kapan selesainya."
    >
      <Reveal>
        <ProcessJourney />
      </Reveal>
    </Section>
  );
}
