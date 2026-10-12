import { navItems } from "@/config/content";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer data-nav-theme="dark" className="border-t border-white/10 bg-navy-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo light={true} />
            <p className="mt-3 text-sm font-medium text-electric">{siteConfig.tagline}</p>
            <p className="mt-1 text-sm text-white/70">{siteConfig.descriptor}</p>
          </div>
          <nav aria-label="Navigasi footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
          © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
