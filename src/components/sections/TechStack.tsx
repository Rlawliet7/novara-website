import { techStack } from "@/config/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { brandLogos } from "@/components/ui/brandLogos";
import { Circle, Dog, Sparkles, Webhook, type LucideIcon } from "lucide-react";

// Simple Icons slug per tool. A few entries share a mark (API Routes is still Next.js).
const LOGOS: Record<string, string> = {
  "Next.js": "nextdotjs",
  "Next.js API Routes": "nextdotjs",
  React: "react",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  "Node.js": "nodedotjs",
  PostgreSQL: "postgresql",
  Prisma: "prisma",
  LangChain: "langchain",
  n8n: "n8n",
  Vercel: "vercel",
  Docker: "docker",
  "GitHub Actions": "githubactions",
  Supabase: "supabase",
  Figma: "figma",
  FigJam: "figma",
  Storybook: "storybook",
  Git: "git",
  ESLint: "eslint",
  Prettier: "prettier",
};

// Tools with no official mark in Simple Icons fall back to a plain pictogram.
const FALLBACK: Record<string, LucideIcon> = {
  "OpenAI API": Sparkles,
  Webhooks: Webhook,
  Husky: Dog,
};

function TechMark({ name }: { name: string }) {
  const brand = brandLogos[LOGOS[name]];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" width={23} height={23} fill={brand.color} aria-hidden="true" focusable="false">
        <path d={brand.d} />
      </svg>
    );
  }
  const Fallback = FALLBACK[name] ?? Circle;
  return <Fallback size={23} className="text-electric" aria-hidden="true" />;
}

const tools = [...new Set(techStack.flatMap((group) => group.items))];
const LANES = [tools.filter((_, i) => i % 2 === 0), tools.filter((_, i) => i % 2 === 1)];

export function TechStack() {
  return (
    <Section
      id="tech"
      tone="mist"
      eyebrow="Teknologi"
      title="Tools yang kami pakai tiap hari"
      description="Semuanya teknologi yang stabil dan dipakai banyak perusahaan. Kami pilih yang paling pas buat proyekmu, bukan yang lagi rame."
    >
      <Reveal className="tech-ribbon">
        {LANES.map((lane, index) => (
          <div key={index} className="tech-marquee" data-lane={index}>
            <div className="tech-marquee-track">
              {/* The first pass is the real list; the second only exists to close the loop. */}
              {[false, true].map((duplicate) => (
                <ul key={String(duplicate)} className="tech-marquee-row" aria-hidden={duplicate || undefined}>
                  {lane.map((name) => (
                    <li
                      key={name}
                      className="tech-marquee-item"
                      style={{ "--brand": brandLogos[LOGOS[name]]?.color ?? "#2f6bff" } as React.CSSProperties}
                    >
                      <TechMark name={name} />
                      {name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
