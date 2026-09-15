import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/ui/SkipLink";
import { SITE_DESCRIPTION } from "@/lib/data/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// No production domain exists yet — do not add metadataBase or absolute
// canonical/OG URLs until one is chosen.
export const metadata: Metadata = {
  title: {
    default: "Kuvah Technologies",
    template: "%s — Kuvah Technologies",
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/kuvah-icon-black.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <SkipLink />
        <Nav />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
