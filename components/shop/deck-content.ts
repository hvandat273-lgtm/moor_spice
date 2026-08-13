/**
 * Editorial content transcribed from the Pasta Magic Powder product deck
 * ("Operation Factory", 6 pages). Kept as data so the storefront sections stay
 * presentational and the copy can be reviewed in one place.
 */

export interface DeckSectionMeta {
  /** Numbered kicker, e.g. "02 YUDE THEORY". */
  kicker: string;
  /** Deck page counter kept as an editorial motif, e.g. "03 / 06". */
  page: string;
  title: string;
  /** Italic subtitle, underscored in vermilion. */
  subtitle: string;
}

export const chefProfile = {
  meta: {
    kicker: "01 Chef Profile",
    page: "02 / 06",
    title: "アル・ケッチァーノ 奥田政行シェフ",
    subtitle: "Masayuki Okuda ／ Chef of Al che-cciano",
  } satisfies DeckSectionMeta,
  lead: "“地産地消”の第一人者。山形・庄内から世界へ。",
  biography:
    "1969年、山形県鶴岡市生まれ。高校卒業後に上京し、イタリア料理・フランス料理・菓子製造を修業。26歳で帰郷し、ホテルの料理長などを経て、2000年「アル・ケッチァーノ」を独立開業。在来野菜や旬の地元食材を活かした料理で全国にファンを広げ、庄内地方を“食の都”として全国に知らしめた立役者。",
  portrait: {
    src: "/images/chef-okuda.webp",
    alt: "白いコックコート姿で店内に立つ奥田政行シェフ",
    caption: "山形県鶴岡市「アル・ケッチァーノ」",
  },
  highlightsLabel: "Career Highlights",
  highlights: [
    { year: "2000", text: "山形県鶴岡市にて『アル・ケッチァーノ』を開業" },
    { year: "2016", text: "ミラノ国際野菜料理大会に日本代表として参加" },
    { year: "2017", text: "「グルマン世界料理本大賞」食の遺産部門グランプリ受賞" },
  ],
} as const;

export const yudeTheory = {
  meta: {
    kicker: "02 Yude Theory",
    page: "03 / 06",
    title: "奥田シェフの「茹で論」",
    subtitle: "The Theory of Boiling – 一杯のパスタを決める、その一行。",
  } satisfies DeckSectionMeta,
  quote:
    "通常の倍以上の塩分濃度で茹で、ただのお湯で“ゆすぐ”。口の中で弾ける食感と、麺そのものの香りを引き出す独自理論。",
  /** `fill` drives the salinity meter under each figure (0–1 of the 2.5% peak). */
  columns: [
    {
      id: "general",
      kicker: "General",
      title: "一般的な茹で方",
      value: "1.0",
      unit: "%",
      fill: 0.4,
      caption: "水1Lに塩10gが目安。",
      body: "多くのレシピが推奨する標準的な濃度。塩味は付くが、麺表面の締まりはおだやか。",
      featured: false,
    },
    {
      id: "okuda",
      kicker: "Okuda Style",
      title: "奥田シェフの「茹で」",
      value: "2.5",
      unit: "%",
      fill: 1,
      caption: "水1Lに対し塩25g／表面を“締めて”コシを生む。",
      body: "高濃度の塩湯で麺の表面を引き締め、口に入れた瞬間“ポンッ”と弾けるアルデンテに。",
      featured: true,
    },
    {
      id: "finishing",
      kicker: "Finishing",
      title: "お湯で「ゆすぐ」",
      value: "0",
      unit: "%",
      fill: 0,
      caption: "塩を足さない湯ですすぎ、塩味を調整。",
      body: "“茹で”と“ゆすぎ”で塩味とコシを別工程として最適化。世界でも例のない理論。",
      featured: false,
    },
  ],
  source:
    "※ 出典：『料理王国』、アル・ケッチァーノ公式資料、奥田政行シェフ「茹で論」より構成。",
} as const;

export const italianSouvenir = {
  meta: {
    kicker: "03 Italian Souvenir",
    page: "04 / 06",
    title: "イタリアの名物土産、「乾燥パスタの素」",
    subtitle: "Aglio, Olio e Peperoncino – 現地で愛される、ひとふりの魔法。",
  } satisfies DeckSectionMeta,
  note: "※ 本資料では「乾燥パスタの素」を、イタリアで定番のパスタ用スパイスミックス（乾燥タイプ）の意で使用しています。",
  lead: "本場イタリアで、最も親しまれているお土産。",
  body: "乾燥ニンニク、唐辛子、パセリ、バジル、塩などをイタリア本場の配合でブレンドした乾燥スパイスミックス。茹でたパスタにオリーブオイルとひとふりするだけで、本格的なアーリオ・オーリオ・ペペロンチーノが完成します。",
  image: {
    src: "/images/aglio-peperoncino.webp",
    alt: "イタリアで定番の乾燥スパイスミックス「アーリオ・ペペロンチーノ」のパッケージ",
    caption: "現地で売られている乾燥タイプのパスタ用スパイスミックス（参考商品）。",
  },
  features: [
    { index: "01", kicker: "Simple", title: "水・塩・オイルだけ", body: "特別な材料も、手の込んだソースも必要ありません。" },
    { index: "02", kicker: "Authentic", title: "本場の配合", body: "イタリアの食卓で親しまれてきた、定番のバランス。" },
    { index: "03", kicker: "Quick", title: "約10分で完成", body: "茹でる時間があれば、もう一皿ができあがります。" },
  ],
  proposalLabel: "Our Proposal",
  proposal:
    "この“現地の知恵”に、奥田シェフの「茹で論」を重ねた一本が パスタマジックパウダー です。",
} as const;

export const cookingMethod = {
  meta: {
    kicker: "04 How to Cook",
    page: "05 / 06",
    title: "作り方 — 5ステップで完成",
    subtitle: "Recipe ／ 1人前",
  } satisfies DeckSectionMeta,
  equipmentLabel: "機材",
  equipment: ["茹麺用の鍋", "フライパン"],
  ingredientsLabel: "材料",
  ingredients: [
    { name: "水", amount: "1L", highlight: false },
    { name: "塩", amount: "10g", highlight: false },
    { name: "パスタ", amount: "100g", highlight: false },
    { name: "パスタマジックパウダー", amount: "5g", highlight: true },
    { name: "エクストラバージンオイル", amount: "15g", highlight: false },
  ],
  methodLabel: "Method ／ 作り方",
  steps: [
    { no: "01", text: "麺湯は水1Lに塩10gを入れて沸かす。", english: "Boil 1L of water with 10g of salt." },
    { no: "02", text: "沸いたらパスタ100gを入れる。", english: "Add 100g of pasta to the boiling water." },
    {
      no: "03",
      text: "フライパンにパスタマジックパウダー大さじ1（5g）と、麺湯を大さじ3（45g）を入れる。",
      english: "Combine 1 tbsp (5g) of pasta powder with 3 tbsp (45g) of pasta water in a pan.",
    },
    {
      no: "04",
      text: "パスタが茹で上がったら、フライパンの火をつけて沸かし、パスタを入れる。",
      english: "Bring the pan to a boil, then add the drained pasta.",
    },
    {
      no: "05",
      text: "ソースとパスタを和えたら、火を止めてエクストラバージンオイル大さじ1（15g）を入れて混ぜれば完成。",
      english: "Toss, take the pan off the heat, stir in 1 tbsp (15g) of extra virgin olive oil and serve.",
      final: true,
    },
  ],
  tip: "※ 火を止めてからオイルを加えるのが、香りを最大限に活かすコツです。",
} as const;

/**
 * Ingredient panel. The deck page this comes from is stamped 関係者外秘
 * (internal only) and lists the exact gram-by-gram formulation, so only the
 * ingredient names — ordered by weight, as food labelling requires — are
 * published here. Flip `showFormulation` to true (and fill in `grams`) only if
 * the exact blend is cleared for public release.
 */
export const showFormulation: boolean = false;

export interface IngredientItem {
  name: string;
  /** Dot colour in the composition list. */
  swatch: string;
  /** Unpublished. Only rendered when `showFormulation` is turned on. */
  grams?: number;
}

/** Ordered by weight, as food labelling requires. `grams` is deliberately absent. */
const ingredientItems: IngredientItem[] = [
  { name: "ガーリックフレーク", swatch: "#b08a4e" },
  { name: "ガーリックミンス", swatch: "#d3b478" },
  { name: "唐辛子", swatch: "#b3341f" },
  { name: "パセリ", swatch: "#4f7a3c" },
  { name: "バジル", swatch: "#2e4636" },
  { name: "塩", swatch: "#efe7d6" },
  { name: "チキンコンソメ", swatch: "#a16207" },
];

export const ingredientPanel = {
  meta: {
    kicker: "05 Ingredients",
    page: "06 / 06",
    title: "パスタマジックパウダーの原材料",
    subtitle: "Ingredients ／ 50g（約10人前）",
  } satisfies DeckSectionMeta,
  stats: [
    { value: "50", unit: "g", label: "内容量" },
    { value: "10", unit: "人前", label: "約10人前" },
    { value: "5", unit: "g", label: "1人前あたり" },
  ],
  image: {
    src: "/images/ingredients.webp",
    alt: "ガーリック、唐辛子、バジル、乾燥パスタを並べたまな板",
    caption: "Aromatic herbs & spices, carefully blended.",
  },
  listLabel: "Composition ／ 重量順",
  items: ingredientItems,
  note: "※ 原材料は重量順に表示しています。配合比率は非公開です。実際の製造ロットにより風味に個体差が生じる場合があります。",
};
