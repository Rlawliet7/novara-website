import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    locale: "id_ID",
    siteName: siteConfig.name,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo/favicon.png",
    shortcut: "/logo/favicon.png",
    apple: "/logo/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body>
        {/* Reveal mulai dari keadaan tersembunyi supaya tidak ada kedipan saat
            hydration. Tanpa JavaScript observernya tidak pernah jalan, jadi
            isinya dipaksa tampil di sini. */}
        <noscript>
          <style>{`.reveal,.reveal-stagger>*{opacity:1!important;transform:none!important;transition:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}