import styles from "@/components/shop/storefront.module.css";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="コンテンツを読み込み中" className={styles.loadingState} role="status">
      <div className={styles.loadingHero} />
      <div className={styles.loadingGrid}>
        {Array.from({ length: 4 }, (_, index) => (
          <div className={styles.loadingCard} key={index} />
        ))}
      </div>
      <span className={styles.srOnly}>読み込み中...</span>
    </div>
  );
}
