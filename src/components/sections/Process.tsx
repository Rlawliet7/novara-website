import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessJourney } from "./ProcessJourney";

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
        <ProcessJourney />
      </Reveal>
    </Section>
  );
}
