import type { Metadata } from "next";

import {
  ChefProfileSection,
  CookingMethodSection,
  IngredientPanelSection,
  ItalianSouvenirSection,
  YudeTheorySection
} from "@/components/shop/DeckSections";
import {
  FeaturedProductBanner,
  HeroProduct,
  UsageShowcase,
  UspStrip
} from "@/components/shop/HomeSections";
import { getHomepageCatalog } from "@/lib/server/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "毎日の料理に、イタリアの風を。",
  description: "MOOR SPICEの香り豊かなイタリアンスパイスと、毎日の食卓を楽しむレシピをご紹介します。",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const { heroProduct, featuredProduct } = await getHomepageCatalog();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MOOR SPICE",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/brand/logo.svg`
  };

  const hasCatalogContent = Boolean(heroProduct || featuredProduct);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      {heroProduct ? <HeroProduct product={heroProduct} /> : null}
      {heroProduct ? <UspStrip /> : null}
      {heroProduct ? (
        <>
          {/* Deck narrative: origin -> technique -> chef -> composition -> method. */}
          <ItalianSouvenirSection />
          <YudeTheorySection />
          <ChefProfileSection />
          <IngredientPanelSection />
          <CookingMethodSection />
          <UsageShowcase product={heroProduct} />
          <FeaturedProductBanner product={featuredProduct ?? heroProduct} />
        </>
      ) : null}
      {!hasCatalogContent ? (
        <section className="site-container flex min-h-[58vh] flex-col items-center justify-center py-20 text-center">
          <p className="eyebrow">MOOR SPICE OFFICIAL CATALOG</p>
          <h1 className="section-title mt-3">商品情報を準備しています</h1>
          <p className="muted mt-4 max-w-xl">公開準備が整った商品から、こちらの公式カタログでご案内します。最新情報についてはお問い合わせください。</p>
          <a className="button-primary mt-7" href="/contact">お問い合わせ</a>
        </section>
      ) : null}
    </>
  );
}
