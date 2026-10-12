import { Mail, MessageCircle, MapPin } from "lucide-react";
import { navItems } from "@/config/content";
import { siteConfig, getWhatsAppUrl, mailtoUrl, instagramUrl } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const waUrl = getWhatsAppUrl();
  return (
    <footer data-nav-theme="dark" className="border-t border-white/10 bg-navy-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <Logo light={true} />
            <p className="text-sm font-medium text-electric">{siteConfig.tagline}</p>
            <p className="text-sm text-white/70">{siteConfig.descriptor}</p>
            <address className="not-italic text-sm text-white/60 flex items-center gap-2">
              <MapPin size={14} aria-hidden="true" />
              <span>Menara Jakarta, Kemayoran, Jakarta Pusat</span>
            </address>
          </div>
          <nav aria-label="Navigasi footer" className="md:order-1">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/80">
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
        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-white/60">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4" aria-label="Media sosial">
            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            )}
            <a
              href={mailtoUrl}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
