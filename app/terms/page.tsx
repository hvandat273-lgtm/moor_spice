import type { Metadata } from "next";

import { ContentPage, ProseSection } from "@/components/shop/StaticPage";

export const metadata: Metadata = {
  title: "利用規約",
  description: "MOOR SPICE 公式カタログの閲覧・利用に適用される規約です。",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="TERMS"
      title="利用規約"
      intro="本規約は、MOOR SPICE 公式カタログの閲覧および掲載コンテンツの利用に適用されます。現在、このサイトではオンライン販売・決済・注文受付を行っていません。"
    >
      <ProseSection title="適用範囲">
        <p>本規約は、商品情報、原材料、レシピ、写真、その他の掲載コンテンツを閲覧・利用するすべての方に適用されます。</p>
        <p>サービスへの不正な干渉、運営を妨げる行為、または掲載内容の目的外利用はお控えください。</p>
      </ProseSection>
      <ProseSection title="商品情報について">
        <p>商品名、原材料、内容量、使用方法、画像などは、分かりやすく正確にお伝えできるよう努めています。パッケージ表示や実際の見え方は、掲載内容と異なる場合があります。</p>
        <p>掲載情報は医療上の助言ではありません。アレルギーや特別な食事制限がある場合は、必ず実際のパッケージ表示をご確認ください。</p>
      </ProseSection>
      <ProseSection title="オンライン販売について">
        <p>このサイトは商品とレシピを紹介する公式カタログです。カート、決済、配送、返品受付などのオンライン販売機能は提供していません。</p>
      </ProseSection>
      <ProseSection title="著作権・知的財産">
        <p>ロゴ、写真、レシピ、編集コンテンツ、画面デザインは、MOOR SPICE に帰属するか、適切な権利に基づいて使用されています。許可なく複製・転載・商用利用することはできません。</p>
      </ProseSection>
      <ProseSection title="変更・お問い合わせ">
        <p>サービス内容や法令上の要件に応じて、本規約を更新する場合があります。更新後の規約は本ページに掲載した時点から適用されます。</p>
        <p>ご不明な点は、お問い合わせページに記載の窓口までご連絡ください。</p>
      </ProseSection>
    </ContentPage>
  );
}
