export const siteConfig = {
  name: "Novara Project",
  tagline: "Your Ideas. Our Technology.",
  descriptor: "IT Services & Digital Solutions",
   copyrightYear: "2026",
  description:
    "Novara Project menyediakan layanan teknologi informasi dan solusi digital: website, sistem informasi, database, integrasi AI, otomasi proses kerja, dan dukungan teknis untuk bisnis, organisasi, dan institusi.",
  // Isi setelah domain tersedia, contoh: "https://novaraproject.id"
  url: "https://example.com",
  contact: {
    email: "novaraprojectid.hub@gmail.com",
    instagram: "novaraproject",
    // Format internasional tanpa + dan spasi, contoh: "6281234567890". Kosong = tombol WA disembunyikan.
    whatsapp: "",
    website: "",
  },
} as const;

export function getWhatsAppUrl(message = "Halo Novara Project, saya ingin berkonsultasi.") {
  const n = siteConfig.contact.whatsapp;
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : null;
}

export const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
  "Konsultasi Proyek Digital"
)}`;

export const instagramUrl = `https://instagram.com/${siteConfig.contact.instagram}`;