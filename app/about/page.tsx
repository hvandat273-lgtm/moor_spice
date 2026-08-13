import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Layers3, UtensilsCrossed } from "lucide-react";

import styles from "@/components/shop/storefront.module.css";

export const metadata: Metadata = {
  title: "MOOR SPICEについて",
  description: "パスタマジックパウダーと、毎日のパスタを豊かにするMOOR SPICEの考え方。",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Layers3, title: "ひとさじの調和", text: "ガーリック、ハーブ、唐辛子の香りが、パスタのために心地よく重なるブレンドです。" },
  { icon: UtensilsCrossed, title: "家庭のキッチンから", text: "水・塩・パスタにひとさじ。いつもの台所で、イタリアの厨房を思わせる一皿を提案します。" },
  { icon: BookOpenCheck, title: "わかりやすく", text: "原材料、基本の使い方、保存方法を、カタログとレシピで丁寧にお伝えします。" },
] as const;

export default function AboutPage() {
  return (
    <div className={styles.aboutPage} id="story">
      <section className={styles.aboutHero}>
        <div className={styles.aboutHeroCopy}>
          <p>OUR STORY</p>
          <h1>パスタのための、ひとさじの魔法。</h1>
          <span>水・塩・パスタ、ひとさじの「パスタマジック」。家庭のキッチンから、イタリアの厨房へ。</span>
          <Link href="/#pasta-magic">パスタマジックパウダーを見る <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
        <div className={styles.aboutHeroImage}>
          <Image alt="ハーブ、ガーリック、胡椒、唐辛子" fetchPriority="high" fill loading="eager" sizes="(max-width: 767px) 100vw, 50vw" src="/images/ingredients.webp" />
        </div>
      </section>

      <section className={styles.aboutStatement}>
        <p>PASTA MAGIC POWDER</p>
        <h2>いつものアーリオ・オーリオを、香り高く仕上げるために。</h2>
        <span>パスタマジックパウダーは、乾燥パスタのための調味料です。茹で汁と合わせて乳化させ、オリーブオイルで仕上げるだけで、香りと旨みのある一皿へ導きます。</span>
      </section>

      <section aria-label="MOOR SPICEが大切にしていること" className={styles.valueGrid}>
        {values.map(({ icon: Icon, title, text }) => (
          <article key={title}><Icon aria-hidden="true" size={29} strokeWidth={1.3} /><h2>{title}</h2><p>{text}</p></article>
        ))}
      </section>

      <section className={styles.aboutKitchen}>
        <div className={styles.aboutKitchenImage}>
          <Image alt="明るいキッチンのハーブパスタ" fill sizes="(max-width: 767px) 100vw, 55vw" src="/images/hero-pasta.webp" />
        </div>
        <div>
          <p>FROM OUR KITCHEN</p>
          <h2>レシピから、ひと皿を始めましょう。</h2>
          <span>基本のアーリオ・オーリオから、パスタマジックパウダーの香りを楽しめます。分量と手順を確認して、ご家庭の味に仕上げてください。</span>
          <Link href="/recipes">レシピを見る <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
