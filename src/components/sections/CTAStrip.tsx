import { ArrowRight } from "lucide-react";
import { siteConfig, getWhatsAppUrl, mailtoUrl } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function CTAStrip() {
  const cta = getWhatsAppUrl() ?? mailtoUrl;

  return (
    <Section id="cta-mid" tone="dark" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Siap memulai proyek digital Anda?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-white/70">
            Konsultasi gratis, tanpa komitmen. Kami bantu jelaskan lingkup, jadwal, dan estimasi biaya
            yang transparan sejak awal.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href={cta} external={cta.startsWith("http")} className="px-8 py-4 text-base">
              Konsultasi Gratis <ArrowRight size={16} />
            </Button>
            <Button href="#portfolio" variant="ghost-light" className="px-8 py-4 text-base">
              Lihat Portofolio
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}