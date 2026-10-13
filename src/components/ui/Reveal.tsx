"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades its children in once they scroll into view.
 *
 * The hidden state is the default on the server too. An earlier version rendered
 * the content visible first and only hid it after hydration, so every element on
 * the page flashed in, snapped out, then faded back — that is what made scrolling
 * feel choppy. `globals.css` keeps the content visible when JavaScript is off.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      // Browser tanpa IntersectionObserver: tampilkan saja. Dijadwalkan ke frame
      // berikutnya supaya bukan setState sinkron di dalam efek.
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      // Starts a touch before the element is fully in view, so the motion has
      // finished by the time the reader's eye reaches it.
      { threshold: .08, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const base = stagger ? "reveal-stagger" : "reveal";

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${base} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
