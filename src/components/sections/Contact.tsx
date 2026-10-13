import { Mail, MessageCircle, AtSign, Globe } from "lucide-react";
import { siteConfig, getWhatsAppUrl, mailtoUrl, instagramUrl } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const wa = getWhatsAppUrl();
  const { email, instagram, whatsapp, website } = siteConfig.contact;

  const rows = [
    { icon: Mail, label: "Email", text: email, href: mailtoUrl, show: !!email },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      text: `+${whatsapp}`,
      href: wa ?? "",
      show: !!wa,
    },
    { icon: AtSign, label: "Instagram", text: `@${instagram}`, href: instagramUrl, show: !!instagram },
    {
      icon: Globe,
      label: "Website",
      text: website.replace(/^https?:\/\//, ""),
      href: website,
      show: !!website,
    },
  ].filter((r) => r.show);

  return (
    <Section id="contact" tone="dark">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal">Kontak</p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Ngobrol dulu, yuk.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Cerita aja dulu soal rencanamu. Konsultasi awalnya gratis, dan kami balas
            maksimal 1 hari kerja.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={wa ?? mailtoUrl} external={!!wa}>
              Mulai Konsultasi
            </Button>
            {wa && (
              <Button href={mailtoUrl} variant="ghost-light">
                Kirim Email
              </Button>
            )}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="space-y-3">
            {rows.map(({ icon: Cmp, label, text, href }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-electric/50 hover:bg-white/[0.07]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-electric/15 text-electric">
                    <Cmp size={20} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-white/70">{label}</span>
                    <span className="block truncate text-[15px] font-medium">{text}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}