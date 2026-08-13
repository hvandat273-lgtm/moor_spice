import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, Mail } from "lucide-react";

import styles from "@/components/shop/storefront.module.css";

export const metadata: Metadata = {
  title: "よくあるご質問",
  description: "パスタマジックパウダーの原材料、使い方、保存方法についてのよくあるご質問。",
  alternates: { canonical: "/faq" }
};

const faqGroups = [
  {
    title: "パスタマジックパウダーについて",
    items: [
      ["どのような商品ですか？", "乾燥ガーリック、唐辛子、パセリ、バジルなどを合わせた、アーリオ・オーリオのためのパスタ用シーズニングです。"],
      ["原材料を教えてください。", "ガーリックフレーク、ガーリックミンチ、唐辛子、パセリ、バジル、食塩、チキンコンソメを使用しています。ご使用前には必ずパッケージの表示をご確認ください。"],
      ["使用量の目安はありますか？", "1人前のパスタ100gに対して、パスタマジックパウダー5gが目安です。お好みに合わせて調整してください。"]
    ]
  },
  {
    title: "作り方・保存について",
    items: [
      ["基本の作り方を教えてください。", "水1Lに塩10gを入れてパスタ100gをゆで、パスタマジックパウダー5gとゆで汁大さじ3をフライパンで合わせます。最後にエキストラバージンオリーブオイル15gを加えて仕上げます。"],
      ["塩加減を変えてもよいですか？", "お好みで調整できます。商品資料では、ゆで湯は水1Lに塩10gを基本としてご案内しています。"],
      ["保存方法を教えてください。", "使用後は袋をしっかり密閉し、直射日光・高温多湿を避けて保存してください。賞味期限などはパッケージ表示を優先してください。"]
    ]
  }
] as const;

export default function FaqPage() {
  return (
    <div className={styles.contentPage}>
      <header className={styles.contentHero}>
        <p>NEED A HAND?</p>
        <h1>よくあるご質問</h1>
        <span>商品の特徴から使い方、保存方法まで、よくいただくご質問にお答えします。</span>
      </header>
      <div className={styles.faqLayout}>
        <div>
          {faqGroups.map((group) => (
            <section className={styles.faqGroup} key={group.title}>
              <h2>{group.title}</h2>
              <div>{group.items.map(([question, answer]) => <details key={question}><summary>{question} <ChevronDown aria-hidden="true" size={19} /></summary><p>{answer}</p></details>)}</div>
            </section>
          ))}
        </div>
        <aside className={styles.faqAside}>
          <Mail aria-hidden="true" size={28} strokeWidth={1.3} />
          <h2>解決しない場合</h2>
          <p>商品名とご質問を添えて、MOOR SPICEまでお問い合わせください。</p>
          <Link href="/contact">お問い合わせ</Link>
        </aside>
      </div>
    </div>
  );
}
