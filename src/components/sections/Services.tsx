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
      <div className="grid gap-6 lg:grid-cols-3">
        {services.map((s, i) => {
          const isFeatured = i === 0; // Website Development as featured
          return (
            <Reveal key={s.title} delay={i * 70}>
              <article
                className={`h-full rounded-2xl border bg-white p-7 transition-all duration-300 ${
                  isFeatured
                    ? "border-electric/40 bg-gradient-to-br from-electric/5 via-white to-white shadow-xl shadow-electric/10 lg:row-span-2 lg:col-span-2"
                    : "border-line hover:-translate-y-1 hover:border-electric/40 hover:shadow-xl hover:shadow-electric/10"
                }`}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-xl transition-colors ${
                  isFeatured
                    ? "bg-electric text-white"
                    : "bg-electric/10 text-electric group-hover:bg-electric group-hover:text-white"
                }`}>
                  <Icon name={s.icon} size={isFeatured ? 26 : 22} />
                </span>
                <h3 className={`mt-5 text-lg font-bold ${isFeatured ? "text-xl text-navy-900" : "text-navy-900"}`}>
                  {s.title}
                </h3>
                <p className={`mt-2 leading-relaxed ${isFeatured ? "text-base text-slate-700" : "text-[15px] text-slate-600"}`}>
                  {s.desc}
                </p>
                {isFeatured && (
                  <ul className="mt-6 space-y-3 border-t border-line pt-6">
                    {supportServices.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}