/**
 * Isi halaman dirender di dalam boundary yang hidrasinya menyusul setelah
 * layout. Kalau Lenis atau GSAP sudah menulis atribut/style sebelum itu, React
 * akan melihatnya sebagai beda antara server dan klien saat menghidrasi.
 *
 * Jadi semua yang menyentuh DOM di luar React menunggu event `load` dulu —
 * yang kebetulan juga saat paling tepat untuk mengukur tata letak, karena font
 * dan gambar sudah selesai.
 *
 * Mengembalikan fungsi pembatal untuk dipakai di cleanup effect.
 */
export function afterHydration(run: () => void): () => void {
  let frame = 0;
  let cancelled = false;

  const go = () => {
    if (cancelled) return;
    // Satu frame ekstra: `load` menyala tepat sebelum React sempat menuntaskan
    // pekerjaan hidrasi yang tersisa di frame yang sama.
    frame = requestAnimationFrame(() => {
      if (!cancelled) run();
    });
  };

  if (document.readyState === "complete") {
    go();
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }

  addEventListener("load", go, { once: true });
  return () => {
    cancelled = true;
    cancelAnimationFrame(frame);
    removeEventListener("load", go);
  };
}
