import Image from "next/image";
import { clients, clientPriority } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Foto ilustratif berlisensi bebas (Unsplash License) yang disimpan lokal di
 * public/clients, bukan dokumentasi klien Novara. Alt-nya menggambarkan isi
 * fotonya saja supaya tidak terbaca sebagai klaim.
 */
const PHOTOS = [
  { src: "/clients/enterprise.jpg", alt: "Deretan gedung perkantoran bertingkat", accent: "#2f6bff" },
  { src: "/clients/umkm.jpg", alt: "Interior toko ritel kecil dengan rak produk", accent: "#12b083" },
  { src: "/clients/komunitas.jpg", alt: "Empat orang berdiskusi mengelilingi meja", accent: "#4a44d6" },
  { src: "/clients/acara.jpg", alt: "Peserta duduk menghadap panggung di sebuah acara", accent: "#1b9df0" },
];

export function TargetClients() {
  return (
    <Section
      id="clients"
      tone="light"
      eyebrow="Target Klien"
      title="Biasanya kami kerja bareng siapa"
      description={clientPriority}
    >
      <Reveal>
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <p className="text-lg leading-relaxed text-slate-600">
            Kami nggak berusaha ngelayanin semua orang. Fokusnya ke mereka yang
            kebutuhannya udah jelas, di mana teknologi beneran kelihatan dampaknya.
          </p>
          <p className="text-lg leading-relaxed text-slate-600">
            Dari UMKM yang baru mau punya identitas digital, sampai institusi yang butuh
            sistem terhubung — lingkup, jadwal, dan biayanya kami sesuaikan sama kondisimu.
          </p>
        </div>
      </Reveal>

      {/* Di layar sempit daftar ini bergulir mendatar; di desktop jadi empat kolom. */}
      <Reveal className="mt-12" stagger>
        <ul className="client-rail" data-lenis-prevent>
          {clients.map((item, i) => {
            const photo = PHOTOS[i];
            return (
              <li
                key={item.title}
                className="client-card"
                style={{ "--art": photo.accent } as React.CSSProperties}
              >
                <div className="client-frame" data-cine-photo>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1023px) 90vw, 24vw"
                    className="client-photo"
                  />
                  <span className="client-tint" aria-hidden="true" />
                </div>
                <h3 className="client-title">{item.title}</h3>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
