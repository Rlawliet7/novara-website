"use client";

import { services, supportServices } from "@/config/content";
import { Icon } from "@/components/ui/Icon";
import { ServiceArt } from "./ServiceArt";
import { ArrowUpRight, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { setScrollLocked } from "@/components/scroll/lenisBus";

const MIDDLE = (services.length - 1) / 2;
const CYCLE_MS = 2800;

// A tint per service so the pile reads as five distinct cards, not one repeated card.
const TINTS = [
  { from: "#1d3f91", accent: "#7fb2ff" },
  { from: "#10505a", accent: "#49ded0" },
  { from: "#272a7d", accent: "#9d9bff" },
  { from: "#0f466f", accent: "#6cc8ff" },
  { from: "#3b2a6d", accent: "#c79bff" },
];

export function ServiceDeck() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [front, setFront] = useState(0);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDivElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<number | null>(null);
  const held = useRef(false);
  const onScreen = useRef(true);

  const close = useCallback(() => setSelected(null), []);

  // While stacked, bring each service to the front in turn so the pile is not
  // permanently showing the same card.
  useEffect(() => {
    if (opened || selected !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = deck.current;
    const observer = element
      ? new IntersectionObserver(([entry]) => { onScreen.current = entry.isIntersecting; }, { threshold: .25 })
      : null;
    if (element && observer) observer.observe(element);
    const timer = window.setInterval(() => {
      if (held.current || document.hidden || !onScreen.current) return;
      setFront((current) => (current + 1) % services.length);
    }, CYCLE_MS);
    return () => {
      observer?.disconnect();
      clearInterval(timer);
    };
  }, [opened, selected]);

  // Move focus into the dialog, keep Tab inside it, and hand focus back on close.
  useEffect(() => {
    if (selected === null) {
      const index = restoreTo.current;
      restoreTo.current = null;
      if (index !== null) cards.current[index]?.focus();
      return;
    }
    const node = dialog.current;
    if (!node) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setScrollLocked(true);
    node.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = node.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      setScrollLocked(false);
      document.body.style.overflow = previousOverflow;
    };
  }, [close, selected]);

  const service = selected === null ? null : services[selected];

  return (
    <div className="service-deck-wrap">
      <div
        ref={deck}
        className="service-deck"
        data-opened={opened}
        onMouseEnter={() => { held.current = true; }}
        onMouseLeave={() => { held.current = false; }}
        onFocusCapture={() => { held.current = true; }}
        onBlurCapture={() => { held.current = false; }}
      >
        <ul className="service-deck-list">
          {services.map((item, i) => {
            const offset = i - MIDDLE;
            // Depth within the pile, counted from whichever card is currently in front.
            const rank = (i - front + services.length) % services.length;
            const sideways = rank === 0 ? 0 : (rank % 2 ? 1 : -1) * Math.ceil(rank / 2);
            const tint = TINTS[i % TINTS.length];
            const reachable = opened || rank === 0;
            return (
              <li
                key={item.title}
                className="service-slot"
                // Each card is overlapped from the side it leans away from, so its
                // content hugs the edge that stays visible in the fan.
                data-side={offset < 0 ? "left" : offset > 0 ? "right" : "center"}
                data-front={rank === 0}
                style={{
                  "--o": offset,
                  "--a": Math.abs(offset),
                  "--r": rank,
                  "--sx": sideways,
                  "--from": tint.from,
                  "--accent": tint.accent,
                  zIndex: opened ? services.length - Math.abs(offset) : services.length - rank,
                } as CSSProperties}
              >
                <button
                  type="button"
                  ref={(element) => { cards.current[i] = element; }}
                  className="service-card"
                  tabIndex={reachable ? undefined : -1}
                  aria-hidden={!reachable}
                  aria-label={opened ? `${item.title} — lihat detail` : `Buka ${services.length} layanan`}
                  onClick={() => {
                    if (!opened) {
                      setOpened(true);
                      return;
                    }
                    restoreTo.current = i;
                    setSelected(i);
                  }}
                >
                  <span className="service-card-icon"><Icon name={item.icon} size={22} /></span>
                  <ServiceArt index={i} />
                  <span className="service-card-title">{item.title}</span>
                  <span className="service-card-more">Lihat detail <ArrowUpRight size={13} aria-hidden="true" /></span>
                </button>
              </li>
            );
          })}
        </ul>

        {!opened && (
          <p className="service-deck-hint" aria-hidden="true">
            Klik tumpukan untuk membuka {services.length} layanan
          </p>
        )}
      </div>

      {opened && (
        <button type="button" className="service-deck-reset" onClick={() => setOpened(false)}>
          Tutup tumpukan
        </button>
      )}

      <p className="service-support">
        <span className="service-support-label">{supportServices.title}</span>
        {supportServices.items.join(" · ")}
      </p>

      {service && createPortal(
        <div className="service-modal" role="presentation" onClick={close}>
          <div
            ref={dialog}
            className="service-modal-panel"
            style={{ "--from": TINTS[selected! % TINTS.length].from, "--accent": TINTS[selected! % TINTS.length].accent } as CSSProperties}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="service-modal-close" onClick={close} aria-label="Tutup" data-autofocus>
              <X size={18} aria-hidden="true" />
            </button>

            <span className="service-modal-icon"><Icon name={service.icon} size={26} /></span>
            <h3 id="service-modal-title" className="service-modal-title">{service.title}</h3>
            <p className="service-modal-desc">{service.desc}</p>

            <ul className="service-modal-list">
              {service.details.map((detail) => (
                <li key={detail}><span aria-hidden="true" />{detail}</li>
              ))}
            </ul>

            <a href="#contact" className="service-modal-cta btn-primary" onClick={close}>
              Konsultasikan kebutuhan ini
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
