import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceDeck } from "./ServiceDeck";

export function Services() {
  return (
    <Section
      id="services"
      tone="mist"
      eyebrow="Layanan"
      title="Lima layanan utama untuk kebutuhan digital Anda"
      description="Dari identitas digital hingga sistem dan otomasi, dirancang sesuai lingkup dan tujuan proyek."
    >
      <Reveal>
        <ServiceDeck />
      </Reveal>
    </Section>
  );
}
