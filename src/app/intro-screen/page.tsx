import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// A lightweight view of the real hero, embedded only inside the 3D monitor.
export default function IntroScreen() {
  return (
    <div className="monitor-preview" aria-hidden="true">
      <div className="monitor-preview-nav">
        <Logo />
        <span>Tentang &nbsp;&nbsp; Layanan &nbsp;&nbsp; Solusi &nbsp;&nbsp; Portofolio</span>
        <span className="monitor-preview-cta">Konsultasi Gratis ↗</span>
      </div>
      <Hero />
    </div>
  );
}
