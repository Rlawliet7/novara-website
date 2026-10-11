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
  { step: "01", title: "Konsultasi", desc: "Diskusi kebutuhan dan tujuan. Konsultasi awal gratis." },
  { step: "02", title: "Analisis Kebutuhan", desc: "Analisis lingkup, fitur, jadwal, dan estimasi biaya." },
  { step: "03", title: "Proposal & Kesepakatan", desc: "Harga, jadwal, termin, batas revisi, dan ketentuan kerja." },
  { step: "04", title: "Pengembangan", desc: "Pengembangan sesuai lingkup, komunikasi rutin." },
  { step: "05", title: "Pengujian & QA", desc: "Uji fungsi dan perbaikan berdasarkan hasil pengujian." },
  { step: "06", title: "Serah Terima & Dukungan", desc: "Serah terima, dokumentasi, dan maintenance lanjutan." },
];

export const whyNovara = [
  { icon: "Target", title: "Fokus pada Klien", desc: "Setiap proyek dimulai dari memahami tujuan klien." },
  { icon: "Puzzle", title: "Solusi Sesuai Ukuran", desc: "Sesuai lingkup, bukan satu produk untuk semua." },
  { icon: "ListChecks", title: "Eksekusi Terstruktur", desc: "Lingkup, jadwal, dan hasil akhir disepakati bersama." },
  { icon: "TrendingUp", title: "Pengembangan Terkembang", desc: "Siap dikembangkan seiring pertumbuhan kebutuhan." },
  { icon: "Handshake", title: "Kemitraan Jangka Panjang", desc: "Maintenance dan dukungan teknis berkelanjutan." },
];

export const techStack = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Next.js API Routes", "PostgreSQL", "Prisma"] },
  { category: "AI & Automation", items: ["OpenAI API", "LangChain", "n8n", "Webhooks"] },
  { category: "Infrastruktur", items: ["Vercel", "Docker", "GitHub Actions", "Supabase"] },
  { category: "Desain & Prototipe", items: ["Figma", "FigJam", "Storybook"] },
  { category: "Lainnya", items: ["Git", "ESLint", "Prettier", "Husky"] },
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
  { title: "Perusahaan & Enterprise", desc: "Perusahaan yang butuh website, sistem informasi, dashboard, integrasi, atau otomasi." },
  { title: "UMKM", desc: "UMKM yang ingin membangun identitas digital, memasarkan produk, dan lebih efisien." },
  { title: "Organisasi & Komunitas", desc: "Website profil, database anggota, sistem administrasi, dan platform informasi." },
  { title: "Penyelenggara Acara", desc: "Penyelenggara acara dan institusi: website registrasi dan pengelolaan peserta." },
];
export const clientPriority = "Prioritas awal: UMKM, organisasi, dan penyelenggara kegiatan dengan kebutuhan yang jelas.";

export const vision =
  "Menjadi mitra solusi digital terpercaya dan adaptif yang memberdayakan bisnis dan organisasi melalui teknologi yang aksesibel, efektif, dan berkelanjutan.";

export const mission = [
  "Solusi digital sesuai kebutuhan dan tujuan setiap klien",
  "Efisiensi operasional lewat teknologi, integrasi, dan otomasi",
  "Produk digital terstruktur, andal, dan dapat dikembangkan",
  "Kerja sama jangka panjang dengan komunikasi transparan",
  "Pemanfaatan teknologi digital yang lebih efektif",
];

export const faq = [
  {
    q: "Berapa lama proses pembuatan website/sistem?",
    a: "Tergantung lingkup. Website company profile: 2–4 minggu. Sistem informasi custom: 1–3 bulan. Kami komunikasi jadwal pasti sejak proposal.",
  },
  {
    q: "Apakah ada biaya bulanan setelah selesai?",
    a: "Tidak wajib. Kami tawarkan paket maintenance opsional (update keamanan, backup, dukungan teknis). Bisa dibayar per incident atau bulanan.",
  },
  {
    q: "Bisa request revisi setelah serah terima?",
    a: "Ya. Revisi minor (teks, gambar, warna) gratis selama 30 hari pasca-serah-terima. Revisi fitur/struktur baru dikutip terpisah.",
  },
  {
    q: "Teknologi apa yang dipakai Novara?",
    a: "Utama: Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Prisma. AI: OpenAI API, LangChain. Deploy: Vercel, Docker. Detail di bagian Teknologi.",
  },
  {
    q: "Apakah Novara bantu hosting & domain?",
    b: "Bisa bantu beli/konfigurasi domain dan setup hosting (Vercel, VPS, atau shared hosting). Biaya domain/hosting ditanggung klien.",
  },
  {
    q: "Bagaimana cara memulai konsultasi?",
    a: "Klik tombol “Konsultasi Gratis” di halaman ini, isi formulir singkat, atau hubungi via WhatsApp/Email. Kami balas maksimal 1 hari kerja.",
  },
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