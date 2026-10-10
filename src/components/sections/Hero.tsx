import { ArrowRight } from "lucide-react";
import { siteConfig, getWhatsAppUrl, mailtoUrl } from "@/config/site";
import { services } from "@/config/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  const cta = getWhatsAppUrl() ?? mailtoUrl;

  return (
    <section id="home" className="relative overflow-hidden bg-navy-950 pt-32 pb-20 text-white md:pt-40 md:pb-28">
      {/* grid tipis + glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 30% 20%, #000 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 30% 20%, #000 20%, transparent 70%)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-electric/25 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            {siteConfig.descriptor}
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            NOVARA PROJECT
          </h1>
          <p className="mt-4 text-2xl font-semibold text-electric sm:text-3xl">
            {siteConfig.tagline}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Kami menyediakan layanan teknologi informasi dan solusi digital untuk bisnis,
            organisasi, dan institusi: dari website dan sistem informasi hingga integrasi AI
            dan otomasi proses kerja.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={cta} external={cta.startsWith("http")}>
              Konsultasi Gratis <ArrowRight size={16} />
            </Button>
            <Button href="#services" variant="ghost-light">
              Lihat Layanan
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150} className="hidden lg:block">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
              Lima layanan utama
            </p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.title} className="flex items-center gap-3 rounded-lg border border-white/5 bg-navy-900/60 px-4 py-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-electric/15 text-electric">
                    <Icon name={s.icon} size={18} />
                  </span>
                  <span className="text-sm font-medium text-white/90">{s.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}