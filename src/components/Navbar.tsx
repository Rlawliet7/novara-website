"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems } from "@/config/content";
import { getWhatsAppUrl, mailtoUrl } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const surfaces = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
    const updateTheme = () => {
      frame = 0;
      const rect = navRef.current?.getBoundingClientRect();
      const sampleY = rect ? rect.top + rect.height / 2 : 48;
      const surface = surfaces.find((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= sampleY && bounds.bottom > sampleY;
      });
      setTheme(surface?.dataset.navTheme ?? "light");
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTheme);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    surfaces.forEach((surface) => observer.observe(surface));
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.parentElement?.contains(event.target)) {
        setOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const cta = getWhatsAppUrl() ?? mailtoUrl;
  const externalProps = cta.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <header className="island-position">
      <div className="nav-island" data-theme={theme} data-open={open}>
        <nav ref={navRef} className="island-bar" aria-label="Navigasi utama">
          <a href="#home" className="island-brand" aria-label="Novara Project, kembali ke atas" onClick={() => setOpen(false)}>
            <Logo inheritColor />
          </a>
          <ul className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="island-link">{item.label}</a>
              </li>
            ))}
          </ul>
          <a href={cta} {...externalProps} className="island-cta hidden xl:inline-flex">
            Konsultasi Gratis <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="island-toggle xl:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="island-mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </nav>
        <nav id="island-mobile-menu" aria-label="Navigasi mobile" hidden={!open} className="island-mobile xl:hidden">
          <ul className="grid gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="island-link flex items-center justify-between" onClick={() => setOpen(false)}>
                  {item.label} <ArrowUpRight size={14} aria-hidden="true" className="opacity-40" />
                </a>
              </li>
            ))}
          </ul>
          <a href={cta} {...externalProps} className="island-cta mt-3 flex w-full" onClick={() => setOpen(false)}>
            Konsultasi Gratis <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
