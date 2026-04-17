import styles from "./ProductsSection.module.css";
import type { SiteLanguage } from "@/types/site-language";

type ProductsSectionProps = {
  language: SiteLanguage;
};

const productModels = ["FL 540", "FL 470", "FL 400", "FL 340", "FL 260"];

const content = {
  de: {
    kicker: "Unsere Modelle",
    title: "Produktshowcase mit klarer technischer Hierarchie.",
    topText:
      "Der Bereich ist bereits auf die sp\u00E4tere Blender-Pr\u00E4sentation ausgelegt: links die Modellwahl, mittig die gro\u00DFe B\u00FChne f\u00FCr den aktiven Pflug, rechts die wichtigsten Daten.",
    activeModel: "Aktives Modell",
    renderSlot: "Blender-Render-Slot",
    renderText: "B\u00FChne f\u00FCr den freigestellten Pflug im finalen Produktlook.",
    responsive: "Responsives Showcase",
    mobileFirst: "Mobile First",
    factsTitle: "F\u00FCr gro\u00DFe Fl\u00E4chen mit maximaler Pr\u00E4senz.",
    cta: "Angebot anfragen",
    facts: [
      { label: "Modell", value: "FL 540" },
      { label: "Einsatz", value: "Gro\u00DFe Park- und Industriefl\u00E4chen" },
      { label: "Aufnahme", value: "Traktor oder Fronthydraulik" },
      { label: "Verstellung", value: "Hydraulisch steuerbar" },
      { label: "Sch\u00FCrfleiste", value: "Austauschbar und verschlei\u00DFarm" },
    ],
  },
  en: {
    kicker: "Our models",
    title: "Product showcase with clear technical hierarchy.",
    topText:
      "This area is already prepared for the later Blender presentation: model selection on the left, a large stage for the active plow in the center, and key data on the right.",
    activeModel: "Active model",
    renderSlot: "Blender render slot",
    renderText: "Stage for the cut-out plow in the final product look.",
    responsive: "Responsive showcase",
    mobileFirst: "Mobile first",
    factsTitle: "For large areas with maximum presence.",
    cta: "Request an offer",
    facts: [
      { label: "Model", value: "FL 540" },
      { label: "Use case", value: "Large parking and industrial areas" },
      { label: "Mounting", value: "Tractor or front hydraulics" },
      { label: "Adjustment", value: "Hydraulically controlled" },
      { label: "Cutting edge", value: "Replaceable and wear-resistant" },
    ],
  },
} as const;

export default function ProductsSection({ language }: ProductsSectionProps) {
  const copy = content[language];

  return (
    <section id="produkte" className={styles.productsSection}>
      <div className={styles.productsShell}>
        <div className={styles.productsPanel}>
          <div className={styles.productsTop}>
            <div className={styles.productsTopCopy}>
              <p className={styles.productsKicker}>{copy.kicker}</p>
              <h2 className={styles.productsTitle}>{copy.title}</h2>
            </div>
            <p className={styles.productsTopText}>{copy.topText}</p>
          </div>

          <div className={styles.productsGrid}>
            <div className={styles.productsModelList}>
              {productModels.map((model, index) => (
                <button
                  key={model}
                  type="button"
                  className={`${styles.productsModelBtn} ${index === 0 ? styles.isActive : ""}`}
                >
                  <span className={styles.productsModelName}>{model}</span>
                  <span className={styles.productsModelIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.productsShowcase}>
              <div className={styles.productsShowcaseOverlay} />
              <div className={styles.productsShowcaseInner}>
                <div className={styles.productsShowcaseMeta}>
                  <span>{copy.activeModel}</span>
                  <span>FL 540</span>
                </div>

                <div className={styles.productsRenderArea}>
                  <div className={styles.productsRenderCard}>
                    <div className={styles.productsRenderShadow} />
                    <div className={styles.productsRenderInner}>
                      <p className={styles.productsRenderKicker}>{copy.renderSlot}</p>
                      <p className={styles.productsRenderText}>{copy.renderText}</p>
                    </div>
                  </div>
                </div>

                <div className={`${styles.productsShowcaseMeta} ${styles.productsShowcaseMetaBottom}`}>
                  <span>{copy.responsive}</span>
                  <span>{copy.mobileFirst}</span>
                </div>
              </div>
            </div>

            <div className={styles.productsFacts}>
              <div className={styles.productsFactsHead}>
                <p className={styles.productsFactsKicker}>FL 540</p>
                <h3 className={styles.productsFactsTitle}>{copy.factsTitle}</h3>
              </div>

              <div className={styles.productsFactsList}>
                {copy.facts.map((fact) => (
                  <div key={fact.label} className={styles.productsFactRow}>
                    <span className={styles.productsFactLabel}>{fact.label}</span>
                    <span className={styles.productsFactValue}>{fact.value}</span>
                  </div>
                ))}
              </div>

              <a href="#kontakt" className={styles.productsCta}>
                {copy.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
