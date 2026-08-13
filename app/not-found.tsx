import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import styles from "@/components/shop/storefront.module.css";

export default function NotFound() {
  return (
    <section className={styles.errorState}>
      <span>404</span>
      <p>PAGE NOT FOUND</p>
      <h1>お探しのページが見つかりません。</h1>
      <div>
        <Link className={styles.primaryButton} href="/">
          <ArrowLeft aria-hidden="true" size={17} /> ホームへ戻る
        </Link>
      </div>
    </section>
  );
}
