"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { afterHydration } from "./afterHydration";

/**
 * Koreografi antarseksi. Semuanya digerakkan oleh atribut di markup supaya
 * tidak ada pembungkus baru di pohon komponen dan tidak ada risiko hydration.
 *
 * Pembagian tugas yang disengaja, supaya satu properti tidak pernah punya dua
 * pemilik: <Reveal> memegang animasi MASUK (CSS, sudah jalan sejak server), dan
 * berkas ini hanya memegang animasi KELUAR serta gerakan yang harus menempel
 * pada posisi scroll. Keduanya tidak menyentuh elemen yang sama.
 */
export function Choreography() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let context: gsap.Context | undefined;
    const splits: SplitText[] = [];

    const cancel = afterHydration(() => {
      context = gsap.context(() => {
        // 1. Bab yang mundur. Saat sebuah seksi beranjak keluar lewat atas,
        //    isinya meredup, jadi seksi berikutnya terasa ditumpuk di atasnya
        //    alih-alih dipotong mendadak. Ini yang bikin perpindahan
        //    antarbagian terasa menyambung.
        //
        //    Sengaja peredupan saja, tanpa menggeser posisi: kotak seksinya
        //    tidak ikut bergeser, jadi setiap pergeseran isi hanya menyisakan
        //    celah kosong di bawahnya. Tanpa transform, pembungkus ini juga
        //    tidak menjadi containing block bagi keturunan position: fixed.
        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
          gsap.to(chapter, {
            opacity: .45,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "bottom 62%",
              end: "bottom 6%",
              scrub: .5,
            },
          });
        });

        // 2. Foto bergerak lebih lambat dari bingkainya dan mengendap dari
        //    sedikit membesar — kedalaman ala kamera, bukan sekadar geser.
        gsap.utils.toArray<HTMLElement>("[data-cine-photo]").forEach((frame) => {
          const image = frame.querySelector<HTMLElement>("img");
          if (!image) return;
          gsap.fromTo(
            image,
            { scale: 1.16, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: .5,
              },
            },
          );
        });

        // 3. Kalimat visi muncul kata per kata, naik dari balik garis barisnya.
        //    `mask: "lines"` memberi tiap baris pembungkus yang memotong, jadi
        //    kata-katanya seolah terbit dari bawah baris itu.
        gsap.utils.toArray<HTMLElement>("[data-cine-split]").forEach((target) => {
          splits.push(SplitText.create(target, {
            type: "lines,words",
            mask: "lines",
            // Menaruh aria-label di paragrafnya dan menyembunyikan pecahan kata
            // dari pembaca layar, jadi kalimatnya tetap terbaca utuh.
            aria: "auto",
            // Memecah ulang setelah font selesai dimuat dan saat lebar berubah,
            // supaya batas barisnya tidak pernah salah.
            autoSplit: true,
            // Docs SplitText: kalau autoSplit menyala, animasinya WAJIB dibuat
            // di sini. Tween yang dikembalikan membuat progresnya ikut terbawa
            // saat pecah ulang, jadi teks tidak pernah tertinggal tersembunyi.
            onSplit: (self) => gsap.from(self.words, {
              yPercent: 115,
              duration: .8,
              ease: "power3.out",
              stagger: .022,
              scrollTrigger: { trigger: target, start: "top 82%", once: true },
            }),
          }));
        });
      });
    });

    return () => {
      cancel();
      splits.forEach((split) => split.revert());
      context?.revert();
    };
  }, []);

  return null;
}
