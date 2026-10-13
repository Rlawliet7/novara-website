import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceDeck } from "./ServiceDeck";

export function Services() {
  return (
    <Section
      id="services"
      tone="mist"
      eyebrow="Layanan"
      title="Lima hal yang bisa kami kerjakan buat kamu"
      description="Dari bikin identitas digital sampai sistem dan otomasi. Semuanya disesuaikan sama lingkup dan tujuan proyekmu."
    >
      <Reveal>
        <ServiceDeck />
      </Reveal>
    </Section>
  );
}
