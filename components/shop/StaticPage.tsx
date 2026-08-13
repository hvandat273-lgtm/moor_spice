import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "./storefront.module.css";

interface ContentPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}

export function ContentPage({ eyebrow, title, intro, children }: ContentPageProps) {
  return (
    <div className={styles.contentPage}>
      <header className={styles.contentHero}>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <span>{intro}</span>
      </header>
      <div className={styles.proseLayout}>{children}</div>
    </div>
  );
}

export function ProseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.proseSection}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export function ExploreCta({ title = "あなたにぴったりの香りを" }: { title?: string }) {
  return (
    <aside className={styles.exploreCta}>
      <p>MOOR SPICE</p>
      <h2>{title}</h2>
      <Link href="/">
        ホームへ戻る <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </aside>
  );
}
