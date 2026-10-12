import { solutions } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function Solutions() {
  return (
    <Section
      id="solutions"
      tone="dark"
      eyebrow="Solusi"
      title="Solusi yang disesuaikan, bukan produk yang dipaksakan"
      description="Lima area solusi yang paling sering dibutuhkan bisnis, organisasi, dan penyelenggara acara."
    >
      <Reveal>
        <div className="grid gap-6 border-l-2 border-electric/40 pl-6 md:grid-cols-2 md:gap-10">
          <p className="text-base leading-relaxed text-white/70">
            Setiap organisasi memiliki konteks yang berbeda — skala, anggaran, maturitas digital,
            dan budaya kerja. Solusi kami tidak pernah “satu ukuran untuk semua”.
          </p>
          <p className="text-base leading-relaxed text-white/70">
            Kami mendesain arsitektur sistem, alur kerja, dan antarmuka yang cocok dengan
            kondisi aktual Anda hari ini, namun siap diskalakan untuk besok.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <ol className="border-t border-white/10">
          {solutions.map((item, i) => (
            <li
              key={item.title}
              className="group relative grid gap-x-6 gap-y-4 border-b border-white/10 px-2 py-7 transition-colors duration-300 hover:bg-white/[0.04] sm:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center"
            >
              {/* Accent rail that fills in on hover. */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-gradient-to-b from-electric to-teal transition-[scale] duration-300 group-hover:scale-y-100"
              />

              <div className="flex items-center gap-4 sm:row-span-2 lg:row-span-1">
                <span className="text-xs font-bold tabular-nums tracking-[0.18em] text-white/35 transition-colors group-hover:text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-electric/15 text-electric transition-colors duration-300 group-hover:bg-electric group-hover:text-white">
                  <Icon name={item.icon} size={21} />
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold leading-snug text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{item.desc}</p>
              </div>

              <div className="lg:border-l lg:border-white/10 lg:pl-6">
                <p className="flex gap-2.5 text-sm leading-relaxed text-white/80">
                  <span aria-hidden="true" className="mt-px shrink-0 font-bold text-teal">→</span>
                  {item.outcome}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2 pl-[22px]">

                  {item.fit.map((audience) => (
                    <li
                      key={audience}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] leading-none text-white/55"
                    >
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
