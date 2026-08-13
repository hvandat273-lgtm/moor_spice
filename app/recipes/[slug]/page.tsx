import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Clock3, Users } from "lucide-react";
import { notFound } from "next/navigation";

import styles from "@/components/shop/storefront.module.css";
import { getPublicSiteUrl } from "@/lib/server/env";

import { recipes } from "../data";

interface RecipeDetailProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: RecipeDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((item) => item.slug === slug);
  if (!recipe) return { title: "レシピが見つかりません" };
  return {
    title: recipe.title,
    description: recipe.description,
    alternates: { canonical: `/recipes/${recipe.slug}` },
    openGraph: { images: [{ url: recipe.heroImage, alt: recipe.heroAlt }] }
  };
}

export default async function RecipeDetailPage({ params }: RecipeDetailProps) {
  const { slug } = await params;
  const recipe = recipes.find((item) => item.slug === slug);
  if (!recipe) notFound();

  const siteUrl = getPublicSiteUrl();
  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: [new URL(recipe.heroImage, siteUrl).toString()],
    prepTime: `PT${recipe.prepMinutes}M`,
    recipeYield: `${recipe.servings}人分`,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step) => ({ "@type": "HowToStep", text: step }))
  };

  return (
    <article className={styles.recipeDetail}>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link href="/">ホーム</Link>
        <ChevronRight aria-hidden="true" size={13} />
        <Link href="/recipes">レシピ</Link>
        <ChevronRight aria-hidden="true" size={13} />
        <span aria-current="page">{recipe.title}</span>
      </nav>

      <header className={styles.recipeDetailHeader}>
        <p>MOOR SPICE KITCHEN</p>
        <h1>{recipe.title}</h1>
        <span>{recipe.description}</span>
        <div className={styles.recipeMeta}>
          <span>
            <Clock3 aria-hidden="true" size={16} /> {recipe.prepMinutes}分
          </span>
          <span>
            <Users aria-hidden="true" size={16} /> {recipe.servings}人分
          </span>
        </div>
      </header>

      <div className={styles.recipeDetailImage}>
        <Image alt={recipe.heroAlt} fetchPriority="high" fill loading="eager" sizes="(max-width: 767px) 100vw, 1280px" src={recipe.heroImage} style={{ objectPosition: recipe.imagePosition }} />
      </div>

      <div className={styles.recipeBody}>
        <aside>
          <h2>材料</h2>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <Link href="/#pasta-magic">パスタマジックパウダーを見る</Link>
        </aside>
        <section>
          <p className={styles.eyebrow}>STEP BY STEP</p>
          <h2>作り方</h2>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <Link className={styles.backLink} href="/recipes">
        <ArrowLeft aria-hidden="true" size={16} /> すべてのレシピを見る
      </Link>
    </article>
  );
}
