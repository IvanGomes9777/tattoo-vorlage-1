import type { Metadata } from "next";
import { Bricolage_Grotesque, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { STUDIO } from "@/lib/studio";

// Display/Body: Bricolage Grotesque – editorial-grotesk mit eigenem Charakter
// (bewusst nicht Space Grotesk; das stand auf der Reflex-Reject-Liste).
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
});

// Labels/Meta: Spline Sans Mono – hält die Grotesk+Mono-Kontrastachse.
const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono-src",
  display: "swap",
});

export const metadata: Metadata = {
  // Beispieldaten aus @/lib/studio – später durch echtes Branding ersetzen.
  title: `${STUDIO.name} — Bespoke Tattoo Atelier`,
  description: `${STUDIO.name}: zeitgenössisches Tattoo-Atelier in ${STUDIO.city}. Custom Work, kuratiert und ohne Kompromisse.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${display.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        {/* Cinematic-Film-Grain über der ganzen Seite (rein dekorativ). */}
        <div className="grain" aria-hidden />
        {/* Cookie-Consent (DSGVO/TTDSG) – global, über allen Sektionen. */}
        <CookieConsent />
      </body>
    </html>
  );
}
