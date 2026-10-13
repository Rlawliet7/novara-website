"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    gsap.registerPlugin(ScrollTrigger);

    let context: gsap.Context | undefined;

    const cancel = afterHydration(() => {
      context = gsap.context(() => {
        // 1. Bab yang mundur. Saat sebuah seksi beranjak keluar lewat atas,
        //    isinya meredup dan menjauh sedikit, jadi seksi berikutnya terasa
        //    ditumpuk di atasnya alih-alih dipotong mendadak. Ini yang bikin
        //    perpindahan antarbagian terasa menyambung.
        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
          gsap.to(chapter, {
            opacity: .45,
            y: -40,
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
      });
    });

    return () => {
      cancel();
      context?.revert();
    };
  }, []);

  return null;
}
