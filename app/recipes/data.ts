export interface Recipe {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  imagePosition: string;
  prepMinutes: number;
  servings: number;
  spiceSlug: string;
  ingredients: string[];
  steps: string[];
}

/** Confirmed preparation guidance supplied with Pasta Magic Powder. */
export const recipes: Recipe[] = [
  {
    slug: "pasta-magic-aglio-olio",
    title: "パスタマジックパウダーで作るアーリオ・オーリオ",
    description: "水・塩・パスタと、ひとさじのパスタマジックパウダーで仕上げる、シンプルな一皿です。",
    heroImage: "/images/moor-spice-hero-v2.webp",
    heroAlt: "パスタマジックパウダーを使ったアーリオ・オーリオのイメージ",
    imagePosition: "center",
    prepMinutes: 10,
    servings: 1,
    spiceSlug: "pasta-magic-powder",
    ingredients: [
      "水 1L",
      "塩 10g",
      "パスタ 100g",
      "パスタマジックパウダー 5g",
      "エキストラバージンオリーブオイル 15g"
    ],
    steps: [
      "鍋に水1Lと塩10gを入れて沸騰させます。",
      "沸騰したらパスタ100gを入れ、表示時間を目安にゆでます。",
      "フライパンにパスタマジックパウダー5gと、ゆで汁大さじ3（約45g）を入れます。",
      "パスタがゆで上がったらフライパンを火にかけ、パスタを加えて全体をからめます。",
      "火を止めてエキストラバージンオリーブオイル15gを加え、なめらかになるまで混ぜて完成です。"
    ]
  }
];
