import type { Metadata } from "next";

import { ContentPage, ProseSection } from "@/components/shop/StaticPage";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "MOOR SPICE 公式カタログにおける情報の取り扱いについて。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="PRIVACY"
      title="プライバシーポリシー"
      intro="本ポリシーは、MOOR SPICE 公式カタログのご利用時に取り扱う情報について定めるものです。"
    >
      <ProseSection title="オンライン販売・注文情報">
        <p>このサイトは商品・レシピの紹介を目的とするカタログです。カート、決済、注文受付を提供していないため、購入に必要な氏名、住所、電話番号、決済情報をこのサイトで取得・保管しません。</p>
      </ProseSection>
      <ProseSection title="お問い合わせ">
        <p>お問い合わせ先のメールリンクを利用する場合、宛先、件名、本文などはお客様のメールソフトまたはメールサービスを通じて送信されます。送信する内容は必要最小限にしてください。</p>
      </ProseSection>
      <ProseSection title="技術情報と運営サービス">
        <p>サイトの安全な運営のため、ホスティング事業者がアクセス日時、IPアドレス、ブラウザ種別、エラー情報などの最小限の技術情報を処理する場合があります。</p>
        <p>商品カタログと画像は、当サイトが利用するホスティング・ストレージサービス上で管理します。個人情報を販売したり、カタログ運営以外の目的で第三者へ提供したりすることはありません。</p>
      </ProseSection>
      <ProseSection title="管理画面">
        <p>管理画面はカタログ編集のために限定公開されています。認証のために安全なセッションCookieを使用する場合があります。このCookieは管理機能の提供以外には利用しません。</p>
      </ProseSection>
      <ProseSection title="お問い合わせ・改定">
        <p>本ポリシーに関するご質問は、お問い合わせページに記載の窓口までご連絡ください。運用内容や法令の変更に応じて、本ポリシーを更新する場合があります。</p>
      </ProseSection>
    </ContentPage>
  );
}
