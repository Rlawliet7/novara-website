"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { faq } from "@/config/content";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  const [active, setActive] = useState(0);
  const [typing, setTyping] = useState(false);
  const timer = useRef<number | null>(null);

  // No typing pause on first paint — only when the visitor picks another question.
  const ask = (index: number) => {
    if (index === active) return;
    setActive(index);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setTyping(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setTyping(false), 750);
  };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const item = faq[active];

  return (
    <Section
      id="faq"
      tone="light"
      eyebrow="FAQ"
      title="Yang paling sering ditanyain"
      description="Jawaban singkat biar kamu nggak penasaran. Belum kejawab? Tanya kami langsung aja."
    >
      <Reveal>
        <div className="faq-layout">
          <ul className="faq-list">
            {faq.map((entry, i) => (
              <li key={entry.q}>
                <button
                  type="button"
                  className="faq-q"
                  data-active={i === active}
                  aria-pressed={i === active}
                  aria-controls="faq-chat"
                  onClick={() => ask(i)}
                >
                  <span className="faq-q-no">{String(i + 1).padStart(2, "0")}</span>
                  {entry.q}
                  <ArrowUpRight size={16} className="faq-q-mark" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          {/* A phone drawn in plain HTML: the text stays sharp, selectable and
              readable by screen readers — a texture on a 3D screen would not be. */}
          <div className="phone" aria-hidden="true">
            <div className="phone-glass">
              <span className="phone-notch" />
              <header className="phone-head">
                {/* Lambangnya saja: komponen Logo ikut membawa tulisan "NOVARA". */}
                <img src="/logo/logo.png" alt="" width={30} height={30} className="phone-avatar" />
                <span>
                  <strong>{siteConfig.name}</strong>
                  <small>Balas maksimal 1 hari kerja</small>
                </span>
              </header>

              <div className="phone-chat">
                <p className="bubble-out">{item.q}</p>
                {typing ? (
                  <p className="bubble-in typing"><i /><i /><i /></p>
                ) : (
                  <p className="bubble-in">{item.a}</p>
                )}
              </div>

              <div className="phone-input">
                <span>Tulis pertanyaan…</span>
                <i />
              </div>
            </div>
          </div>

          {/* The live answer for assistive tech, plus every pair for search engines. */}
          <div id="faq-chat" className="sr-only" aria-live="polite">{item.q} — {item.a}</div>
          <dl className="sr-only">
            {faq.map((entry) => (
              <div key={entry.q}>
                <dt>{entry.q}</dt>
                <dd>{entry.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
