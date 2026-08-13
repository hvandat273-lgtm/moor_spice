"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

import styles from "./storefront.module.css";

export const storefrontNavigation = [
  { href: "/", label: "ホーム" },
  { href: "/about", label: "パスタマジックについて" },
  { href: "/recipes", label: "レシピ" },
  { href: "/faq", label: "よくあるご質問" },
] as const;

export function scrollToPageTop(event: MouseEvent<HTMLAnchorElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

export function DesktopNavigationLinks() {
  return (
    <nav aria-label="メインナビゲーション" className={styles.desktopNav}>
      {storefrontNavigation.map((item) => (
        <Link href={item.href} key={item.href} onClick={scrollToPageTop}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
