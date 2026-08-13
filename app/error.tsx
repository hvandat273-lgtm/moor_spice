"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

import styles from "@/components/shop/storefront.module.css";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className={styles.errorState}>
      <span>!</span>
      <p>AN ERROR OCCURRED</p>
      <h1>現在このページを表示できません。</h1>
      <div>
        <button className={styles.primaryButton} onClick={reset} type="button">
          <RefreshCw aria-hidden="true" size={17} /> もう一度試す
        </button>
        <Link className={styles.outlineButton} href="/">
          <ArrowLeft aria-hidden="true" size={17} /> ホームへ戻る
        </Link>
      </div>
    </section>
  );
}
