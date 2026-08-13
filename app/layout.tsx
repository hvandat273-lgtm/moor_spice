import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { StorefrontFooter, StorefrontHeader } from "@/components/shop/StorefrontShell";
import { isSiteIndexingEnabled } from "@/lib/server/env";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap"
});

// Public shell/settings are refreshed even if an invalidation webhook is temporarily unavailable.
export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MOOR SPICE｜毎日の料理に、イタリアの風を。",
    template: "%s | MOOR SPICE"
  },
  description: "ハーブとガーリックを丁寧にブレンドした、毎日の料理に使いやすいイタリアンスパイス。",
  applicationName: "MOOR SPICE",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "MOOR SPICE",
    title: "MOOR SPICE｜毎日の料理に、イタリアの風を。",
    description: "香り豊かなハーブスパイスと、毎日の食卓を楽しむためのレシピをご紹介します。",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "MOOR SPICE" }]
  },
  robots: isSiteIndexingEnabled() ? { index: true, follow: true } : { index: false, follow: false }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f3ea",
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          メインコンテンツへ移動
        </a>
        <StorefrontHeader />
        <main id="main-content">{children}</main>
        <StorefrontFooter />
      </body>
    </html>
  );
}
