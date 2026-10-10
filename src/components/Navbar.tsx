"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/config/content";
import { getWhatsAppUrl, mailtoUrl } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cta = getWhatsAppUrl() ?? mailtoUrl;
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-navy-950/95 backdrop-blur border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Navigasi utama">
        <a href="#home" aria-label="Novara Project, kembali ke atas" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-sm font-medium text-white/75 transition-colors hover:text-white">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href={cta} external={cta.startsWith("http")} className="!py-2.5">
            Konsultasi Gratis
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-white lg:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy-950 lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3 text-base font-medium text-white/85"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <Button href={cta} external={cta.startsWith("http")} className="w-full">
                Konsultasi Gratis
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}