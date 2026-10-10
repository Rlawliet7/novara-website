export const navItems = [
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Solusi", href: "#solutions" },
  { label: "Proses", href: "#process" },
  { label: "Portofolio", href: "#portfolio" },
  { label: "Kolaborasi", href: "#collaboration" },
  { label: "Kontak", href: "#contact" },
];

export const challenges = [
  "Belum memiliki website atau identitas digital profesional",
  "Informasi produk dan layanan belum tersaji terstruktur",
  "Data anggota, inventaris, atau pelanggan masih manual",
  "Butuh dashboard dan pelaporan untuk mengambil keputusan",
  "Proses kerja berulang yang berpotensi diotomasi",
  "Sistem belum terintegrasi untuk mendukung operasional",
];

export const about = {
  heading: "Bukan sekadar produk teknologi.",
  body: [
    "Novara Project adalah penyedia layanan teknologi informasi dan solusi digital: website, sistem informasi, database, integrasi AI, otomasi proses kerja, dan dukungan teknis.",
    "Kami membantu bisnis dan organisasi memanfaatkan teknologi untuk efisiensi, akses informasi, pengelolaan data, dan pengembangan usaha.",
  ],
  stats: [
    { value: "5", label: "Kategori layanan" },
    { value: "6", label: "Tahap kerja terstruktur" },
    { value: "4", label: "Segmen klien utama" },
  ],
};

export const services = [
  { icon: "Globe", title: "Website Development", desc: "Company profile, landing page, e-commerce, dan website acara." },
  { icon: "Database", title: "Database & Web Systems", desc: "Sistem informasi, dashboard admin, inventaris dan aset." },
  { icon: "Bot", title: "AI & Automation", desc: "Chatbot, integrasi AI dan API, otomasi alur kerja dan laporan." },
  { icon: "PenTool", title: "UI/UX & Prototype", desc: "Wireframe, desain antarmuka, dan prototype interaktif." },
  { icon: "IdCard", title: "Digital Profiles", desc: "Digital CV, portofolio, profil founder dan organisasi." },
];

export const supportServices = {
  title: "Layanan Pendukung",
  items: ["Maintenance", "Dukungan teknis", "Pengembangan fitur lanjutan"],
};

export const solutions = [
  { icon: "Briefcase", title: "Business Digital Presence", desc: "Website profesional untuk identitas digital bisnis." },
  { icon: "ClipboardList", title: "Operational Management Systems", desc: "Sistem informasi untuk data, inventaris, dan anggota." },
  { icon: "CalendarCheck", title: "Event & Organization Systems", desc: "Registrasi, database peserta, dan dashboard admin." },
  { icon: "Workflow", title: "Reporting & Workflow Automation", desc: "Otomasi kerja berulang dan pelaporan terstruktur." },
  { icon: "Rocket", title: "Digital Product Development", desc: "Desain, prototype, pengujian, dan implementasi." },
];

export const process = [
  { step: "01", title: "Consultation", desc: "Diskusi kebutuhan dan tujuan. Konsultasi awal gratis." },
  { step: "02", title: "Requirement Analysis", desc: "Analisis lingkup, fitur, jadwal, dan estimasi biaya." },
  { step: "03", title: "Proposal & Agreement", desc: "Harga, jadwal, termin, batas revisi, dan ketentuan kerja." },
  { step: "04", title: "Development", desc: "Pengembangan sesuai lingkup, komunikasi rutin." },
  { step: "05", title: "Testing & QA", desc: "Uji fungsi dan perbaikan berdasarkan hasil pengujian." },
  { step: "06", title: "Delivery & Support", desc: "Serah terima, dokumentasi, dan maintenance lanjutan." },
];

export const whyNovara = [
  { icon: "Target", title: "Client-Oriented", desc: "Setiap proyek dimulai dari memahami tujuan klien." },
  { icon: "Puzzle", title: "Tailored Solutions", desc: "Sesuai lingkup, bukan satu produk untuk semua." },
  { icon: "ListChecks", title: "Structured Execution", desc: "Lingkup, jadwal, dan hasil akhir disepakati bersama." },
  { icon: "TrendingUp", title: "Scalable Development", desc: "Siap dikembangkan seiring pertumbuhan kebutuhan." },
  { icon: "Handshake", title: "Long-Term Partnership", desc: "Maintenance dan dukungan teknis berkelanjutan." },
];

// Portofolio: JANGAN isi klien/hasil rekaan. Isi hanya proyek nyata/demo, dengan status jelas.
export const portfolio = {
  caseFormat: [
    "Latar belakang dan kebutuhan proyek",
    "Permasalahan yang diselesaikan",
    "Solusi yang dirancang",
    "Teknologi yang digunakan",
    "Hasil dan manfaat",
  ],
  categories: [
    "Website company profile",
    "Landing page bisnis",
    "Sistem registrasi acara",
    "Dashboard inventaris",
    "Otomasi pelaporan",
  ],
  note: "Proyek demonstrasi dan prototype diberi keterangan yang jelas.",
  // Tambahkan proyek nyata di sini. status: "Proyek Klien" | "Proyek Demo" | "Prototype"
  items: [
    { title: "Website Novara Project", status: "Proyek Demo", summary: "Website company profile ini sendiri.", tech: ["Next.js", "TypeScript", "Tailwind CSS"] }
  ] as {
    title: string;
    status: "Proyek Klien" | "Proyek Demo" | "Prototype";
    summary: string;
    tech: string[];
    url?: string;
  }[],
};

export const clients = [
  { title: "Businesses & Enterprises", desc: "Perusahaan yang butuh website, sistem informasi, dashboard, integrasi, atau otomasi." },
  { title: "Small & Medium Enterprises", desc: "UMKM yang ingin membangun identitas digital, memasarkan produk, dan lebih efisien." },
  { title: "Organizations & Communities", desc: "Website profil, database anggota, sistem administrasi, dan platform informasi." },
  { title: "Event Organizers", desc: "Penyelenggara acara dan institusi: website registrasi dan pengelolaan peserta." },
];
export const clientPriority = "Prioritas awal: UMKM, organisasi, dan penyelenggara kegiatan dengan kebutuhan yang jelas.";

export const vision =
  "To become a trusted and adaptive digital solutions partner that empowers businesses and organizations through accessible, effective, and sustainable technology.";

export const mission = [
  "Solusi digital sesuai kebutuhan dan tujuan setiap klien",
  "Efisiensi operasional lewat teknologi, integrasi, dan otomasi",
  "Produk digital terstruktur, andal, dan dapat dikembangkan",
  "Kerja sama jangka panjang dengan komunikasi transparan",
  "Pemanfaatan teknologi digital yang lebih efektif",
];

export const collaboration = {
  openTo: ["Perusahaan", "UMKM", "Institusi", "Organisasi dan komunitas", "Penyedia jasa profesional"],
  forms: [
    "Pengembangan website dan sistem berbasis proyek",
    "Solusi digital untuk organisasi dan acara",
    "Kolaborasi teknis dengan agensi atau mitra",
    "Sistem sesuai kebutuhan khusus klien",
    "Referral atau subkontrak sesuai kesepakatan",
    "Maintenance dan dukungan teknis berkelanjutan",
  ],
  note: "Tanggung jawab, lingkup, biaya, jadwal, dan kepemilikan hasil disepakati bersama.",
};