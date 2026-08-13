import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CookingPot, Quote, UtensilsCrossed } from "lucide-react";

import {
  chefProfile,
  cookingMethod,
  ingredientPanel,
  italianSouvenir,
  showFormulation,
  yudeTheory,
  type DeckSectionMeta,
} from "./deck-content";
import styles from "./deck.module.css";

function DeckHeader({ meta, titleId }: { meta: DeckSectionMeta; titleId: string }) {
  return (
    <header className="deck-head">
      <div className="deck-rule" />
      <div className="deck-rule-thin" />
      <div className="deck-meta">
        <span className="deck-kicker">{meta.kicker}</span>
        <span aria-hidden="true" className="deck-page">
          {meta.page}
        </span>
      </div>
      <h2 className="deck-title" id={titleId}>
        {meta.title}
      </h2>
      <p className="deck-sub">{meta.subtitle}</p>
    </header>
  );
}

/** 01 — Chef profile: portrait, biography and a dated career ladder. */
export function ChefProfileSection() {
  const { meta, lead, biography, portrait, highlightsLabel, highlights } = chefProfile;

  return (
    <section aria-labelledby="chef-title" className="deck-section" id="chef">
      <DeckHeader meta={meta} titleId="chef-title" />
      <div className={styles.chefLayout}>
        <figure className={styles.chefPortrait}>
          <Image
            alt={portrait.alt}
            height={963}
            sizes="(max-width: 47.99rem) 62vw, 340px"
            src={portrait.src}
            width={640}
          />
          <figcaption>{portrait.caption}</figcaption>
        </figure>

        <div className={styles.chefBody}>
          <p className={styles.chefLead}>{lead}</p>
          <p className={styles.chefBio}>{biography}</p>

          <div className={styles.timeline}>
            <h3>{highlightsLabel}</h3>
            <ol>
              {highlights.map((item) => (
                <li key={item.year}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 02 — The boiling theory, as a three-way salinity comparison. */
export function YudeTheorySection() {
  const { meta, quote, columns, source } = yudeTheory;

  return (
    <section aria-labelledby="yude-title" className="deck-section" id="yude-theory">
      <DeckHeader meta={meta} titleId="yude-title" />

      <blockquote className={styles.theoryQuote}>
        <Quote aria-hidden="true" size={26} strokeWidth={1.6} />
        <p>{quote}</p>
      </blockquote>

      <div className={styles.theoryGrid}>
        {columns.map((column) => (
          <article
            className={column.featured ? `${styles.theoryCard} ${styles.theoryCardFeatured}` : styles.theoryCard}
            key={column.id}
          >
            <p className={styles.theoryKicker}>{column.kicker}</p>
            <h3>{column.title}</h3>
            <p className={styles.theoryValue}>
              <span>{column.value}</span>
              <small>{column.unit}</small>
            </p>
            <div aria-hidden="true" className={styles.theoryMeter}>
              <span style={{ width: `${Math.round(column.fill * 100)}%` }} />
            </div>
            <p className={styles.theoryCaption}>{column.caption}</p>
            <p className={styles.theoryBody}>{column.body}</p>
          </article>
        ))}
      </div>

      <p className="deck-note">{source}</p>
    </section>
  );
}

/** 03 — Where the format comes from: the Italian dried-pasta seasoning souvenir. */
export function ItalianSouvenirSection() {
  const { meta, note, lead, body, image, features, proposalLabel, proposal } = italianSouvenir;

  return (
    <section aria-labelledby="souvenir-title" className="deck-section" id="souvenir">
      <DeckHeader meta={meta} titleId="souvenir-title" />
      <p className={`deck-note ${styles.souvenirNote}`}>{note}</p>

      <div className={styles.souvenirLayout}>
        <figure className={styles.souvenirPack}>
          <Image
            alt={image.alt}
            height={1128}
            sizes="(max-width: 47.99rem) 58vw, 300px"
            src={image.src}
            width={720}
          />
          <figcaption>{image.caption}</figcaption>
        </figure>

        <div className={styles.souvenirBody}>
          <p className={styles.souvenirLead}>{lead}</p>
          <p className={styles.souvenirText}>{body}</p>

          <ul className={styles.featureRow}>
            {features.map((feature) => (
              <li key={feature.index}>
                <p className={styles.featureKicker}>
                  <span aria-hidden="true">{feature.index}</span> {feature.kicker}
                </p>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </li>
            ))}
          </ul>

          <aside className={`deck-panel ${styles.proposal}`}>
            <p className={styles.proposalLabel}>{proposalLabel}</p>
            <p className={styles.proposalText}>{proposal}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/** 04 — Five-step method with the equipment and per-serving quantities alongside. */
export function CookingMethodSection() {
  const { meta, equipmentLabel, equipment, ingredientsLabel, ingredients, methodLabel, steps, tip } =
    cookingMethod;

  return (
    <section aria-labelledby="method-title" className="deck-section" id="how-to-cook">
      <DeckHeader meta={meta} titleId="method-title" />

      <div className={styles.methodLayout}>
        <aside className={styles.methodAside}>
          <section className={styles.methodBlock}>
            <h3>
              <CookingPot aria-hidden="true" size={17} strokeWidth={1.5} /> {equipmentLabel}
            </h3>
            <ul className={styles.equipmentList}>
              {equipment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.methodBlock}>
            <h3>
              <UtensilsCrossed aria-hidden="true" size={17} strokeWidth={1.5} /> {ingredientsLabel}
            </h3>
            <dl className={styles.quantityList}>
              {ingredients.map((item) => (
                <div className={item.highlight ? styles.quantityHighlight : undefined} key={item.name}>
                  <dt>{item.name}</dt>
                  <dd>{item.amount}</dd>
                </div>
              ))}
            </dl>
          </section>

          <Link className={styles.methodLink} href="/recipes">
            レシピページで詳しく見る <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </aside>

        <div className={styles.methodSteps}>
          <p className={styles.methodStepsLabel}>{methodLabel}</p>
          <ol>
            {steps.map((step) => (
              <li className={"final" in step && step.final ? styles.stepFinal : undefined} key={step.no}>
                <span aria-hidden="true" className={styles.stepNumber}>
                  {step.no}
                </span>
                <div>
                  <p className={styles.stepText}>{step.text}</p>
                  <p className={styles.stepEnglish}>{step.english}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="deck-note">{tip}</p>
        </div>
      </div>
    </section>
  );
}

/** 05 — What is in the jar: net weight stats and the weight-ordered ingredient list. */
export function IngredientPanelSection() {
  const { meta, stats, image, listLabel, items, note } = ingredientPanel;

  return (
    <section aria-labelledby="ingredients-title" className="deck-section" id="ingredients">
      <DeckHeader meta={meta} titleId="ingredients-title" />

      <div className={styles.ingredientLayout}>
        <figure className={styles.ingredientFigure}>
          <Image
            alt={image.alt}
            fill
            sizes="(max-width: 47.99rem) 92vw, 46vw"
            src={image.src}
            style={{ objectFit: "cover" }}
          />
          <figcaption>{image.caption}</figcaption>
        </figure>

        <div className={styles.ingredientBody}>
          <dl className={styles.statRow}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>
                  <span>{stat.value}</span>
                  <small>{stat.unit}</small>
                </dd>
              </div>
            ))}
          </dl>

          <p className={styles.ingredientListLabel}>{listLabel}</p>
          <ul className={styles.ingredientList}>
            {items.map((item) => (
              <li key={item.name}>
                <span aria-hidden="true" className={styles.swatch} style={{ background: item.swatch }} />
                <span className={styles.ingredientName}>{item.name}</span>
                {showFormulation && item.grams ? (
                  <span className={styles.ingredientAmount}>{item.grams}g</span>
                ) : null}
              </li>
            ))}
          </ul>

          <p className="deck-note">{note}</p>
        </div>
      </div>
    </section>
  );
}
