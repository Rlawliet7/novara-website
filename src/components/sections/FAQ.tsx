"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      tone="light"
      eyebrow="FAQ"
      title="Pertanyaan yang sering ditanyakan"
      description="Jawaban cepat untuk keputus Anda. Belum ketemu jawabannya? Hubungi kami langsung."
    >
      <Reveal stagger className="max-w-3xl mx-auto">
        <dl className="space-y-3">
          {faq.map((item, i) => (
            <div key={item.q} className="rounded-2xl border border-line bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                aria-expanded={openIndex === i}
              >
                <span className="text-base font-semibold text-navy-900 pr-10">{item.q}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-navy-500 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {openIndex === i && (
                <dd className="border-t border-line px-5 pb-5 text-base leading-relaxed text-slate-600 animate-in fade-in slide-in-from-top-2 duration-200">
                  {item.a}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}