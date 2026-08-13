import type { Metadata } from "next";
import { HelpCircle, Mail, MapPin, Phone } from "lucide-react";

import styles from "@/components/shop/storefront.module.css";
import { SocialLinks } from "@/components/shop/SocialLinks";
import { getSiteSetting } from "@/lib/server/settings";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "MOOR SPICEの商品情報、原材料、使い方についてのお問い合わせ。",
  alternates: { canonical: "/contact" }
};

export default async function ContactPage() {
  const contact = await getSiteSetting("store_contact");
  const hasContact = Boolean(contact.email || contact.phone || contact.address || contact.facebookUrl || contact.instagramUrl || contact.amazonUrl);

  return (
    <div className={styles.contentPage}>
      <header className={styles.contentHero}>
        <p>LET&apos;S TALK</p>
        <h1>お問い合わせ</h1>
        <span>商品情報、原材料、使い方について、お気軽にご連絡ください。</span>
      </header>
      <section className={styles.contactGrid}>
        <article>
          <Mail aria-hidden="true" size={28} strokeWidth={1.3} />
          <h2>お問い合わせ窓口</h2>
          <p>商品についてのご質問は、以下の連絡先または公式SNSへお寄せください。</p>
          {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : null}
          {contact.phone ? <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}><Phone aria-hidden="true" size={15} /> {contact.phone}</a> : null}
          {contact.address ? <span><MapPin aria-hidden="true" size={15} /> {contact.address}</span> : null}
          <SocialLinks amazonUrl={contact.amazonUrl} facebookUrl={contact.facebookUrl} instagramUrl={contact.instagramUrl} tone="dark" />
          {!hasContact ? <span>連絡先情報は現在準備中です。</span> : null}
        </article>
        <article>
          <HelpCircle aria-hidden="true" size={28} strokeWidth={1.3} />
          <h2>よくあるご質問</h2>
          <p>パスタマジックパウダーの使い方、原材料、保存方法をFAQでご案内しています。</p>
          <a href="/faq">よくあるご質問を見る</a>
        </article>
      </section>
    </div>
  );
}
