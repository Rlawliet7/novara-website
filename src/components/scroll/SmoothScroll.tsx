"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis } from "./lenisBus";
import { afterHydration } from "./afterHydration";

/**
 * Pemilik tunggal scroll halaman: Lenis menghaluskan gerakannya, GSAP ticker
 * jadi satu-satunya loop rAF yang menjalankannya, dan ScrollTrigger ikut
 * diperbarui dari sumber yang sama. Tidak ada mesin smooth-scroll kedua.
 *
 * Lenis tetap memakai posisi scroll asli window, jadi semua yang sudah ada —
 * intro 3D, puzzle, perjalanan proses, tema navbar — terus membaca
 * getBoundingClientRect seperti biasa tanpa perlu diubah.
 */

export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = matchMedia("(pointer: coarse)");

    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;

    const onScroll = () => ScrollTrigger.update();

    /**
     * Anchor dalam halaman saat Lenis aktif. Browser dihentikan lebih dulu
     * supaya tidak ada dua gerakan menuju dua posisi berbeda; riwayat tetap
     * diisi agar tombol back dan tautan yang dibagikan tetap bekerja.
     */
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || (link.target && link.target !== "_self")) return;

      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;

      let target: HTMLElement | null = null;
      try { target = document.querySelector<HTMLElement>(url.hash); } catch { return; }
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", url.hash);
      // Tanpa offset tambahan: scrollTo Lenis sudah membaca `scroll-margin-top`
      // dari elemen tujuan, jadi `section[id] { scroll-margin-top: 6.5rem }` di
      // globals.css tetap satu-satunya tempat jarak navbar ditentukan — sama
      // seperti jalur native yang dipakai di layar sentuh.
      lenis?.scrollTo(target);
    };

    const stop = () => {
      if (!lenis) return;
      if (tick) gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      lenis = undefined;
      tick = undefined;
      setLenis(null);
      delete document.documentElement.dataset.lenis;
    };

    const sync = () => {
      // Layar sentuh: scroll bawaan sistem sudah terasa lebih pas dan jauh lebih
      // hemat baterai, jadi Lenis tidak dipakai. Reduced motion: tidak sama sekali.
      if (reduced.matches || coarse.matches) {
        stop();
        return;
      }
      if (lenis) return;

      lenis = new Lenis({
        lerp: .1,
        smoothWheel: true,
        // `anchors` bawaan Lenis tidak memanggil preventDefault, jadi lompatan
        // hash bawaan browser tetap jalan dan offsetnya bertumpuk dengan
        // scroll-margin-top. Ditangani sendiri di bawah supaya pemiliknya satu.
        anchors: false,
        // allowNestedScroll dibiarkan pada nilai bawaannya (mati). Satu-satunya
        // wadah yang bergulir sendiri di sini adalah rail klien, dan itu sudah
        // ditandai `data-lenis-prevent` langsung di markupnya.
      });
      lenis.on("scroll", onScroll);
      document.addEventListener("click", onAnchorClick);
      const instance = lenis;
      tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      setLenis(lenis);
      document.documentElement.dataset.lenis = "on";
      ScrollTrigger.refresh();
    };

    // Lag smoothing melompati frame yang tertinggal. Untuk animasi yang di-scrub
    // ke posisi scroll, lompatan itu justru yang terlihat sebagai patah-patah.
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();

    // ScrollTrigger hanya mengukur ulang sendiri saat window di-resize. Padahal
    // tinggi halaman ini masih tumbuh lama setelah `load`: kanvas 3D dimuat
    // belakangan dan gambar di bawah baru diambil saat didekati. Tanpa ini,
    // posisi start/end tiap animasi meleset ribuan piksel.
    let pending = 0;
    const scheduleRefresh = () => {
      clearTimeout(pending);
      pending = window.setTimeout(refresh, 180);
    };
    const sizeObserver = new ResizeObserver(scheduleRefresh);

    const cancel = afterHydration(() => {
      sync();
      reduced.addEventListener("change", sync);
      coarse.addEventListener("change", sync);
      sizeObserver.observe(document.body);
      document.fonts?.ready.then(refresh).catch(() => { /* ukur ulang saja tidak jadi */ });
    });

    return () => {
      cancel();
      clearTimeout(pending);
      sizeObserver.disconnect();
      reduced.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
      gsap.ticker.lagSmoothing(500, 33);
      stop();
    };
  }, []);

  return null;
}
