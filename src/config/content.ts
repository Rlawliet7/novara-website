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
  {
    label: "Identitas Digital",
    problem: "Belum punya website, jadi susah dipercaya calon klien",
    answer: "Kami bikinin company profile yang langsung menjelaskan kamu siapa dan ngerjain apa.",
  },
  {
    label: "Informasi Produk",
    problem: "Produk dan layanan masih dijelasin satu-satu lewat chat",
    answer: "Katalog dan halaman layanan kami susun biar calon klien nemu jawabannya sendiri.",
  },
  {
    label: "Data Manual",
    problem: "Data anggota, stok, atau pelanggan masih numpuk di spreadsheet",
    answer: "Semua catatan yang kececer kami pindahin ke satu database yang rapi dan gampang dicari.",
  },
  {
    label: "Dashboard & Laporan",
    problem: "Mau ambil keputusan, tapi datanya belum kelihatan",
    answer: "Angka pentingnya kami tampilin dalam satu layar, jadi nggak perlu nunggu rekap manual.",
  },
  {
    label: "Proses Berulang",
    problem: "Kerjaan yang itu-itu terus bikin waktu habis",
    answer: "Alur yang berulang kami otomasi, biar waktu tim balik ke kerjaan yang beneran penting.",
  },
  {
    label: "Integrasi Sistem",
    problem: "Antar sistem belum nyambung, jadi input datanya dua kali",
    answer: "Tools yang udah kamu pakai kami hubungkan, biar datanya ngalir sendiri.",
  },
];

export const about = {
  heading: "Kami bukan cuma jualan teknologi.",
  body: [
    "Novara Project bantu urusan website, sistem informasi, database, integrasi AI, otomasi kerja, sampai dukungan teknis.",
    "Intinya: teknologi kami pakai buat bikin kerjaanmu lebih enteng, datamu lebih rapi, dan usahamu lebih gampang tumbuh.",
  ],
};

export const services = [
  {
    icon: "Globe",
    title: "Website Development",
    desc: "Company profile, landing page, toko online, sampai website acara.",
    details: [
      "Company profile dan landing page yang langsung siap dipakai jualan",
      "Toko online lengkap: katalog, keranjang, sampai checkout",
      "Website acara: info, pendaftaran, dan pengumuman buat peserta",
      "Struktur konten dan SEO dasar biar gampang ketemu di Google",
      "Tampilannya ngikut, mau dibuka di HP, tablet, atau laptop",
    ],
  },
  {
    icon: "Database",
    title: "Database & Web Systems",
    desc: "Sistem informasi, dashboard admin, inventaris, dan aset.",
    details: [
      "Sistem buat ngelola data anggota, pelanggan, atau stok barang",
      "Dashboard admin dengan hak akses beda-beda tiap peran",
      "Cari, saring, dan ekspor data ke spreadsheet kapan pun",
      "Riwayat perubahan, jadi kalau ada yang janggal bisa ditelusuri",
      "Data lama di spreadsheet kami pindahin, nggak usah input ulang",
    ],
  },
  {
    icon: "Bot",
    title: "AI & Automation",
    desc: "Chatbot, integrasi AI dan API, otomasi alur kerja dan laporan.",
    details: [
      "Chatbot yang jawab pertanyaan yang itu-itu terus dari pelanggan",
      "Integrasi API dan layanan AI ke alur kerja yang udah jalan",
      "Otomasi hal berulang: rekap, notifikasi, dan penjadwalan",
      "Laporan berkala yang jadi sendiri, tanpa diketik manual",
    ],
  },
  {
    icon: "PenTool",
    title: "UI/UX & Prototype",
    desc: "Wireframe, desain antarmuka, dan prototype interaktif.",
    details: [
      "Wireframe dan alur layar disepakati dulu sebelum mulai dikoding",
      "Desain antarmuka yang nyambung sama identitas brand-mu",
      "Prototype yang bisa diklik-klik sebelum beneran dibangun",
      "Komponen desainnya kami serahkan, biar gampang dilanjutin",
    ],
  },
  {
    icon: "IdCard",
    title: "Digital Profiles",
    desc: "Digital CV, portofolio, profil founder dan organisasi.",
    details: [
      "Digital CV dan portofolio yang rapi buat dibagikan",
      "Profil founder dan tim cukup dalam satu halaman",
      "Profil organisasi dengan semua tautan dan kontak jadi satu",
      "Link pendek yang enak disebar di media sosial",
    ],
  },
];

export const supportServices = {
  title: "Yang Tetap Jalan Setelah Rilis",
  items: ["Maintenance", "Dukungan teknis", "Pengembangan fitur lanjutan"],
};

export const solutions = [
  {
    icon: "Briefcase",
    title: "Business Digital Presence",
    desc: "Website profesional buat identitas digital bisnismu.",
    outcome: "Calon klien udah kenal dan percaya kamu sebelum sempat nanya.",
    fit: ["UMKM", "Perusahaan"],
  },
  {
    icon: "ClipboardList",
    title: "Operational Management Systems",
    desc: "Sistem informasi buat data, inventaris, dan anggota.",
    outcome: "Data operasional ngumpul di satu tempat, bukan kececer di banyak file.",
    fit: ["Perusahaan", "Organisasi"],
  },
  {
    icon: "CalendarCheck",
    title: "Event & Organization Systems",
    desc: "Registrasi, database peserta, dan dashboard admin.",
    outcome: "Pendaftaran jalan sendiri, data peserta langsung kerekap.",
    fit: ["Penyelenggara acara", "Komunitas"],
  },
  {
    icon: "Workflow",
    title: "Reporting & Workflow Automation",
    desc: "Otomasi kerja berulang dan laporan yang tersusun rapi.",
    outcome: "Laporan rutin beres tanpa nyita waktu tim tiap periode.",
    fit: ["Perusahaan", "Organisasi"],
  },
  {
    icon: "Rocket",
    title: "Digital Product Development",
    desc: "Desain, prototype, pengujian, dan implementasi.",
    outcome: "Ide diuji dulu sebelum kamu keluar biaya pengembangan besar.",
    fit: ["Startup", "Perusahaan"],
  },
];

export const process = [
  { step: "01", title: "Konsultasi", desc: "Ngobrol dulu soal kebutuhan dan tujuanmu. Konsultasi awal gratis." },
  { step: "02", title: "Analisis Kebutuhan", desc: "Kami bedah lingkup, fitur, jadwal, dan estimasi biayanya." },
  { step: "03", title: "Proposal & Kesepakatan", desc: "Harga, jadwal, termin, batas revisi, dan ketentuan kerja, semua tertulis." },
  { step: "04", title: "Pengembangan", desc: "Dikerjakan sesuai lingkup, progresnya kami kabarin rutin." },
  { step: "05", title: "Pengujian & QA", desc: "Diuji dulu, yang masih janggal kami benerin sebelum diserahkan." },
  { step: "06", title: "Serah Terima & Dukungan", desc: "Serah terima, dokumentasi, plus maintenance kalau kamu mau." },
];

export const whyNovara = [
  { icon: "Target", title: "Dengerin Dulu", desc: "Kami mulai dari tujuanmu, bukan dari template yang udah ada." },
  { icon: "Puzzle", title: "Pas Sama Ukuranmu", desc: "Dibikin sesuai lingkupmu, bukan satu produk buat semua orang." },
  { icon: "ListChecks", title: "Jelas Sejak Awal", desc: "Lingkup, jadwal, dan hasil akhirnya disepakati bareng di depan." },
  { icon: "TrendingUp", title: "Siap Tumbuh", desc: "Dibangun biar gampang nambah fitur pas kebutuhanmu berkembang." },
  { icon: "Handshake", title: "Nggak Kabur Habis Rilis", desc: "Maintenance dan dukungan teknis tetap jalan setelah serah terima." },
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
    "Latar belakang dan apa yang dibutuhkan",
    "Masalah yang kami selesaikan",
    "Solusi yang kami rancang",
    "Teknologi yang dipakai",
    "Hasil dan dampaknya",
  ],
  categories: [
    "Website company profile",
    "Landing page buat jualan",
    "Sistem pendaftaran acara",
    "Dashboard stok dan inventaris",
    "Otomasi laporan rutin",
  ],
  note: "Yang statusnya demo atau prototype kami tulis apa adanya, biar kamu nggak salah paham.",
  // Tambahkan proyek nyata di sini. status: "Proyek Klien" | "Proyek Demo" | "Prototype"
  items: [
    { title: "Website Novara Project", status: "Proyek Demo", summary: "Website yang lagi kamu buka ini.", tech: ["Next.js", "TypeScript", "Tailwind CSS"] }
  ] as {
    title: string;
    status: "Proyek Klien" | "Proyek Demo" | "Prototype";
    summary: string;
    tech: string[];
    url?: string;
  }[],
};

export const clients = [
  { title: "Perusahaan & Enterprise", desc: "Perusahaan yang butuh website, sistem internal, dashboard, atau otomasi." },
  { title: "UMKM", desc: "UMKM yang mau punya identitas digital, jualan lebih luas, dan kerja lebih ringkas." },
  { title: "Organisasi & Komunitas", desc: "Website profil, database anggota, sistem administrasi, dan wadah informasi." },
  { title: "Penyelenggara Acara", desc: "Penyelenggara acara dan institusi: website pendaftaran dan kelola peserta." },
];
export const clientPriority = "Yang kami prioritaskan: UMKM, organisasi, dan penyelenggara acara yang udah tahu apa yang dibutuhin.";

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
    q: "Berapa lama sih bikin website atau sistemnya?",
    a: "Tergantung lingkupnya. Website company profile 2–4 minggu, sistem informasi custom 1–3 bulan. Jadwal pastinya kami kasih tahu sejak proposal.",
  },
  {
    q: "Nanti ada biaya bulanan nggak?",
    a: "Nggak wajib. Paket maintenance (update keamanan, backup, dukungan teknis) sifatnya opsional — bisa bayar per kejadian atau bulanan.",
  },
  {
    q: "Masih bisa revisi setelah serah terima?",
    a: "Bisa. Revisi minor seperti teks, gambar, dan warna gratis selama 30 hari setelah serah terima. Kalau nambah fitur atau ubah struktur, kami kutip terpisah.",
  },
  {
    q: "Teknologinya pakai apa aja?",
    a: "Utamanya Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, dan Prisma. Buat AI: OpenAI API dan LangChain. Deploy-nya di Vercel atau Docker. Daftar lengkapnya ada di bagian Teknologi.",
  },
  {
    q: "Mulai konsultasinya gimana?",
    a: "Klik tombol “Konsultasi Gratis” di halaman ini, atau langsung sapa kami lewat email dan Instagram di bagian Kontak. Kami balas maksimal 1 hari kerja.",
  },
];

export const collaboration = {
  openTo: ["Perusahaan", "UMKM", "Institusi", "Organisasi dan komunitas", "Penyedia jasa profesional"],
  forms: [
    "Garap website dan sistem per proyek",
    "Solusi digital buat organisasi dan acara",
    "Kolaborasi teknis bareng agensi atau mitra",
    "Sistem khusus sesuai kebutuhan klien",
    "Referral atau subkontrak sesuai kesepakatan",
    "Maintenance dan dukungan teknis jangka panjang",
  ],
  note: "Tanggung jawab, lingkup, biaya, jadwal, dan siapa yang punya hasilnya — semua disepakati bareng di awal.",
};