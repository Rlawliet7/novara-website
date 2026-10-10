import { LifeBuoy } from "lucide-react";
import { services, supportServices } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function Services() {
  return (
    <Section
      id="services"
      tone="mist"
      eyebrow="Layanan"
      title="Lima layanan utama untuk kebutuhan digital Anda"
      description="Dari identitas digital hingga sistem dan otomasi, dirancang sesuai lingkup dan tujuan proyek."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <li key={s.title}>
            <Reveal delay={i * 70} className="h-full">
              <article className="group h-full rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-xl hover:shadow-electric/10">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-electric/10 text-electric transition-colors group-hover:bg-electric group-hover:text-white">
                  <Icon name={s.icon} size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.desc}</p>
              </article>
            </Reveal>
          </li>
        ))}

        {/* Layanan pendukung mengisi kartu keenam */}
        <li>
          <Reveal delay={5 * 70} className="h-full">
            <article className="h-full rounded-2xl bg-navy-900 p-7 text-white">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal/15 text-teal">
                <LifeBuoy size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{supportServices.title}</h3>
              <ul className="mt-3 space-y-2 text-[15px] text-white/75">
                {supportServices.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </li>
      </ul>
    </Section>
  );
}