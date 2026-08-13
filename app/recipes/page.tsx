import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Users } from "lucide-react";

import styles from "@/components/shop/storefront.module.css";

import { recipes } from "./data";

export const metadata: Metadata = {
  title: "レシピ",
  description: "MOOR SPICEで手軽に作れる、おいしいレシピをご紹介します。",
  alternates: { canonical: "/recipes" },
};

export default function RecipesPage() {
  return (
    <div className={styles.recipePage}>
      <section className={styles.pageHero}>
        <p>MOOR SPICE KITCHEN</p>
        <h1>キッチンから広がるインスピレーション</h1>
        <span>毎日の食卓に小さな発見を添える、作りやすいレシピ。</span>
      </section>
      <section className={styles.recipeListing}>
        {recipes.map((recipe, index) => (
          <article className={styles.recipeCard} key={recipe.slug}>
            <Link className={styles.recipeCardImage} href={`/recipes/${recipe.slug}`}>
              <Image
                alt={recipe.heroAlt}
                fill
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 767px) 100vw, 50vw"
                src={recipe.heroImage}
                style={{ objectPosition: recipe.imagePosition }}
              />
            </Link>
            <div className={styles.recipeCardBody}>
              <div className={styles.recipeMeta}>
                <span>
                  <Clock3 aria-hidden="true" size={15} /> {recipe.prepMinutes}分
                </span>
                <span>
                  <Users aria-hidden="true" size={15} /> {recipe.servings}人分
                </span>
              </div>
              <h2>
                <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
              </h2>
              <p>{recipe.description}</p>
              <Link className={styles.cardTextLink} href={`/recipes/${recipe.slug}`}>
                レシピを見る <ArrowRight aria-hidden="true" size={15} />
              </Link>
            </div>
          </article>
        ))}
        {recipes.length === 0 ? (
          <div className={styles.noResults}>
            <h2>レシピを準備しています</h2>
            <p>確認済みのレシピから順次公開します。</p>
            <Link className={styles.outlineButton} href="/">ホームへ戻る</Link>
          </div>
        ) : null}
      </section>
    </div>
  );
}
