import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { getSiteSetting } from "@/lib/server/settings";

import { DesktopNavigationLinks } from "./NavigationLinks";
import { MobileNavigation } from "./MobileNavigation";
import { SocialLinks } from "./SocialLinks";
import styles from "./storefront.module.css";

export async function StorefrontHeader() {
  const announcementText = await getSiteSetting("announcement_text");
  const announcement = announcementText || "MOOR SPICE 公式カタログ";

  return (
    <>
      <div className={styles.announcement}>{announcement}</div>
      <header className={styles.siteHeader}>
        <span aria-hidden="true" className={styles.headerProgress} data-scroll-progress />
        <div className={styles.headerInner}>
          <MobileNavigation />

          <Link aria-label="MOOR SPICE — ホーム" className={styles.logoLink} href="/">
            <Image alt="MOOR SPICE" height={60} loading="eager" src="/brand/logo.svg" width={272} />
          </Link>

          <DesktopNavigationLinks />
        </div>
      </header>
    </>
  );
}

export async function StorefrontFooter() {
  const contact = await getSiteSetting("store_contact");

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Image alt="MOOR SPICE" height={56} loading="eager" src="/brand/logo.svg" width={254} />
          <p>パスタのためのひとさじ。香り豊かなパスタ用シーズニングと、基本のレシピをご紹介します。</p>
          {contact.email ? <a href={"mailto:" + contact.email}><Mail aria-hidden="true" size={17} /> {contact.email}</a> : null}
          {contact.phone ? <a href={"tel:" + contact.phone.replace(/[^+\d]/g, "")}><Phone aria-hidden="true" size={17} /> {contact.phone}</a> : null}
          {contact.address ? <span><MapPin aria-hidden="true" size={17} /> {contact.address}</span> : null}
          {!contact.email && !contact.phone && !contact.address ? <Link href="/contact">お問い合わせ先</Link> : null}
          <SocialLinks amazonUrl={contact.amazonUrl} facebookUrl={contact.facebookUrl} instagramUrl={contact.instagramUrl} />
        </div>

        <div>
          <h2>MOOR SPICE</h2>
          <Link href="/">ホーム</Link>
          <Link href="/#ingredients">原材料</Link>
          <Link href="/about">パスタマジックについて</Link>
        </div>

        <div>
          <h2>レシピ</h2>
          <Link href="/recipes">アーリオ・オーリオ</Link>
          <Link href="/faq">よくあるご質問</Link>
          <Link href="/contact">お問い合わせ</Link>
        </div>

        <div>
          <h2>ご利用案内</h2>
          <Link href="/privacy">プライバシーポリシー</Link>
          <Link href="/terms">利用規約</Link>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} MOOR SPICE.</span>
        <span>商品情報とレシピをご案内しています。</span>
      </div>
    </footer>
  );
}
