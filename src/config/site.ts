export const siteConfig = {
  name: "Novara Project",
  tagline: "Your Ideas. Our Technology.",
  descriptor: "IT Services & Digital Solutions",
   copyrightYear: "2026",
  description:
    "Novara Project bantu bisnis, organisasi, dan institusi urusan website, sistem informasi, database, integrasi AI, otomasi kerja, dan dukungan teknis.",
  // Isi setelah domain tersedia, contoh: "https://novaraproject.id"
  url: "https://example.com",
  contact: {
    email: "novaraprojectid.hub@gmail.com",
    instagram: "novaraproject",
    // Format internasional tanpa + dan spasi, contoh: "6281234567890".
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