import type Lenis from "lenis";

/**
 * Satu-satunya pemilik scroll halaman ini adalah <SmoothScroll />. Modul kecil
 * ini cuma jembatan supaya kode lain (mis. tombol "Lewati intro") bisa meminta
 * lompatan scroll lewat Lenis, bukan memanggil window.scrollTo sendiri — dua
 * sumber yang menggerakkan scroll bersamaan akan saling tarik dan tersentak.
 */
const bus: { current: Lenis | null } = { current: null };

export function setLenis(instance: Lenis | null) {
  bus.current = instance;
}

/** Lompat ke posisi vertikal tertentu, baik Lenis sedang aktif maupun tidak. */
export function scrollToY(top: number, immediate = false) {
  const lenis = bus.current;
  if (lenis) {
    lenis.scrollTo(top, { immediate, lock: true });
    return;
  }
  window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
}
