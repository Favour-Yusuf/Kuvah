import type { Metadata } from "next";
import { preload } from "react-dom";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/ui/SkipLink";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/data/site";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

// No production domain exists yet — do not add metadataBase or absolute
// canonical/OG URLs until one is chosen.
export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // The hero headline (Fraunces) and body (Inter) render above the fold;
  // preload their latin subsets. Faces are declared in globals.css.
  preload("/fonts/web/Fraunces-latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/web/Inter-latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-paper font-sans text-oxblood">
        <SkipLink />
        <Nav />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Analytics/>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
