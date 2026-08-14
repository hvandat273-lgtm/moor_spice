import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, BookOpenCheck, ChefHat, Layers3, Leaf, Sparkles } from "lucide-react";

import { formatWeight } from "@/lib/format";
import type { Product } from "@/types/domain";

import { activeVariants, imageForRole, primaryImage } from "./product-utils";
import styles from "./storefront.module.css";

export function HeroProduct({ product }: { product: Product }) {
  const scene = imageForRole(product, "HERO_BACKGROUND");
  const cutout = imageForRole(product, "HERO_CUTOUT") ?? primaryImage(product);

  return (
    <section aria-labelledby="hero-title" className={styles.hero} id="pasta-magic">
      {scene ? (
        <Image
          alt=""
          aria-hidden="true"
          className={styles.heroScene}
          fetchPriority="high"
          fill
          loading="eager"
          sizes="100vw"
          src={scene.url}
          style={{
            "--hero-focal-x": `${scene.focalX ?? 54}%`,
            "--hero-focal-y": `${scene.focalY ?? 50}%`,
          } as CSSProperties}
        />
      ) : null}
      <div className={styles.heroScrim} />
      <div className={styles.heroContent}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{product.categoryName}</p>
          <h1 id="hero-title">MOOR SPICE</h1>
          <p className={styles.heroProductName}>{product.name}</p>
          <span aria-hidden="true" className={styles.heroRule} />
          <p className={styles.heroDescription}>{product.shortDescription}</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="#ingredients">原材料を見る</Link>
            <Link className={styles.textLink} href="/recipes">
              レシピを見る <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
        <div className={styles.heroPackshot}>
          <Image alt={cutout.alt || product.name} fetchPriority="high" fill loading="eager" quality={82} sizes="(max-width: 767px) 78vw, 1px" src={cutout.url} />
        </div>
      </div>
      <div className={styles.heroAside}>
        <div className={styles.heroSeal}>
          <Sparkles aria-hidden="true" size={22} strokeWidth={1.2} />
          <span>PASTA MAGIC</span>
          <small>パスタのためのひとさじ</small>
        </div>
        <p>{product.name}の原材料と基本の使い方をご紹介します。</p>
      </div>
    </section>
  );
}

const usps = [
  { index: "01", icon: Leaf, title: "香りのブレンド", description: "ガーリック、ハーブ、唐辛子の香りを、パスタのために調和しました。" },
  { index: "02", icon: ChefHat, title: "基本はひとさじ", description: "パスタ100gに対して、パスタマジックパウダー5gが目安です。" },
  { index: "03", icon: Layers3, title: "ゆで汁と合わせる", description: "ゆで汁大さじ3と合わせ、香りをなじませて仕上げます。" },
  { index: "04", icon: BookOpenCheck, title: "レシピで確認", description: "分量と手順を、アーリオ・オーリオのレシピでご案内します。" },
] as const;

export function UspStrip() {
  return (
    <section aria-label="パスタマジックパウダーの特長" className={styles.uspStrip}>
      <div className={`${styles.uspInner} reveal-stage`}>
        {usps.map(({ index, icon: Icon, title, description }, motionIndex) => (
          <div
            className={styles.uspItem}
            data-reveal="tilt"
            key={title}
            style={{ "--i": motionIndex } as CSSProperties}
          >
            <span className={styles.uspIcon}><Icon aria-hidden="true" size={26} strokeWidth={1.3} /></span>
            <div>
              <p className={styles.uspIndex}><span aria-hidden="true">{index}</span></p>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Serving suggestions, laid out as a deck-style plate gallery. The ingredient
 * and seasoning stories that used to sit alongside this card now live in the
 * richer deck sections (IngredientPanelSection / ItalianSouvenirSection).
 */
export function UsageShowcase({ product }: { product: Product }) {
  const suggestions = product.usageSuggestions.slice(0, 4);

  return (
    <section aria-labelledby="usage-title" className="deck-section" id="usage">
      <header className="deck-head">
        <div className="deck-rule" />
        <div className="deck-rule-thin" />
        <div className="deck-meta">
          <span className="deck-kicker">06 Suggested Uses</span>
        </div>
        <h2 className="deck-title" data-reveal="clip" id="usage-title">おすすめの使い方</h2>
        <p className="deck-sub" data-reveal="fade">Serving Suggestions — ひとさじで広がる、いつもの一皿。</p>
      </header>

      {suggestions.length > 0 ? (
        <div className={`${styles.usageGrid} reveal-stage`}>
          {suggestions.map((suggestion, index) => (
            <figure data-reveal="tilt" key={suggestion.id} style={{ "--i": index } as CSSProperties}>
              <Image
                alt={suggestion.image.alt || suggestion.title}
                fill
                quality={82}
                sizes="(max-width: 767px) 44vw, (max-width: 1119px) 46vw, 260px"
                src={suggestion.image.url}
                style={{ objectPosition: [suggestion.image.focalX ?? 50, suggestion.image.focalY ?? 50].join("% ") + "%" }}
              />
              <figcaption>{suggestion.title}</figcaption>
            </figure>
          ))}
        </div>
      ) : <p className={styles.usageFallback}>{product.usage || "おすすめの使い方は現在準備中です。"}</p>}

      <Link className={styles.sectionLink} data-reveal href="/recipes">基本のレシピを見る <ArrowRight aria-hidden="true" size={15} /></Link>
    </section>
  );
}

export function FeaturedProductBanner({ product }: { product: Product }) {
  const scene = imageForRole(product, "FEATURED_BACKGROUND");
  const firstVariant = activeVariants(product)[0];
  return (
    <section aria-labelledby="featured-title" className={styles.featuredBanner}>
      {scene ? <Image alt="" aria-hidden="true" className={styles.featuredScene} data-kenburns fill sizes="1280px" src={scene.url} /> : null}
      <div className={styles.featuredCopy}>
        <p className={styles.eyebrow} data-reveal="fade">毎日のパスタに、ひとさじの魔法を。</p>
        <h2 data-reveal="clip" id="featured-title">{product.name}</h2>
        <p data-reveal>{product.shortDescription}</p>
        {firstVariant ? <p className={styles.featuredIntroPrice}>内容量 {formatWeight(firstVariant.weightGrams)}</p> : null}
        <Link className={styles.primaryButton} href="/recipes">基本のレシピを見る</Link>
      </div>
    </section>
  );
}
