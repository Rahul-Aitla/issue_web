import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { getLabMode } from "@/lib/lab";
import { MarketplaceProvider } from "@/components/marketplace";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const dmSans = localFont({
  src: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  variable: "--font-dm",
  display: "swap",
  weight: "100 1000",
});

export const metadata: Metadata = {
  title: { default: "CampusCart | Good finds. Better prices.", template: "%s | CampusCart" },
  description: "A fictional student marketplace and localhost-only security demonstration for Sentinel.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const mode = await getLabMode();
  const currentPath = (await headers()).get("x-campuscart-path") || "/";
  return (
    <html lang="en">
      <body className={dmSans.variable}>
        <a href="#main" className="skip-link">Skip to content</a>
        <MarketplaceProvider>
          <SiteHeader mode={mode} currentPath={currentPath} />
          <main id="main">{children}</main>
          <SiteFooter />
        </MarketplaceProvider>
      </body>
    </html>
  );
}
