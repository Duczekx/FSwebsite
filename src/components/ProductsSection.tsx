import styles from "./ProductsSection.module.css";

const productModels = ["FL 540", "FL 470", "FL 400", "FL 340", "FL 260"];

const productFacts = [
  { label: "Modell", value: "FL 540" },
  { label: "Einsatz", value: "Grosse Park- und Industrieflaechen" },
  { label: "Aufnahme", value: "Traktor oder Fronthydraulik" },
  { label: "Verstellung", value: "Hydraulisch steuerbar" },
  { label: "Schuerfleiste", value: "Austauschbar und verschleissarm" },
];

export default function ProductsSection() {
  return (
    <section id="produkte" className={styles.productsSection}>
      <div className={styles.productsShell}>
        <div className={styles.productsPanel}>
          <div className={styles.productsTop}>
            <div className={styles.productsTopCopy}>
              <p className={styles.productsKicker}>Unsere Modelle</p>
              <h2 className={styles.productsTitle}>
                Produktshowcase mit klarer technischer Hierarchie.
              </h2>
            </div>
            <p className={styles.productsTopText}>
              Der Bereich ist bereits auf die spaetere Blender-Praesentation
              ausgelegt: links die Modellwahl, mittig die grosse Buehne fuer den
              aktiven Pflug, rechts die wichtigsten Daten.
            </p>
          </div>

          <div className={styles.productsGrid}>
            <div className={styles.productsModelList}>
              {productModels.map((model, index) => (
                <button
                  key={model}
                  type="button"
                  className={`${styles.productsModelBtn} ${
                    index === 0 ? styles.isActive : ""
                  }`}
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
                  <span>Active Model</span>
                  <span>FL 540</span>
                </div>

                <div className={styles.productsRenderArea}>
                  <div className={styles.productsRenderCard}>
                    <div className={styles.productsRenderShadow} />
                    <div className={styles.productsRenderInner}>
                      <p className={styles.productsRenderKicker}>Blender Render Slot</p>
                      <p className={styles.productsRenderText}>
                        Buehne fuer den freigestellten Pflug im finalen Produktlook.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`${styles.productsShowcaseMeta} ${styles.productsShowcaseMetaBottom}`}>
                  <span>Responsive Showcase</span>
                  <span>Mobile First</span>
                </div>
              </div>
            </div>

            <div className={styles.productsFacts}>
              <div className={styles.productsFactsHead}>
                <p className={styles.productsFactsKicker}>FL 540</p>
                <h3 className={styles.productsFactsTitle}>
                  Fuer grosse Flaechen mit maximaler Praesenz.
                </h3>
              </div>

              <div className={styles.productsFactsList}>
                {productFacts.map((fact) => (
                  <div key={fact.label} className={styles.productsFactRow}>
                    <span className={styles.productsFactLabel}>{fact.label}</span>
                    <span className={styles.productsFactValue}>{fact.value}</span>
                  </div>
                ))}
              </div>

              <a href="#kontakt" className={styles.productsCta}>
                Angebot anfragen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
