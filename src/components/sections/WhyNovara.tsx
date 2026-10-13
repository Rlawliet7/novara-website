import { whyNovara } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

// Satu aksen per kartu, memakai keluarga warna yang sama dengan section lain.
const ACCENTS = ["#2f6bff", "#14c8b4", "#1b9df0", "#4a44d6", "#12b083"];

export function WhyNovara() {
  return (
    <Section
      id="why"
      tone="mist"
      eyebrow="Mengapa Novara"
      title="Kenapa banyak yang akhirnya pilih Novara"
      description="Bukan janji manis — ini cara kami kerja setiap proyek."
    >
      {/* 3 + 2 kolom: seluruh sel terisi, tidak ada pengisi kosong. */}
      <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {whyNovara.map((item, i) => (
          <article
            key={item.title}
            className={`why-card group ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
            style={{ "--accent": ACCENTS[i % ACCENTS.length] } as React.CSSProperties}
          >
            <span className="why-card-rail" aria-hidden="true" />
            <span className="why-card-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className="why-card-icon"><Icon name={item.icon} size={23} /></span>
            <h3 className="why-card-title">{item.title}</h3>
            <p className="why-card-desc">{item.desc}</p>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
