import Image from "next/image";
import styles from "./HeroSection.module.css";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Vorteile", href: "#vorteile" },
  { label: "Produkte", href: "#produkte" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function HeroSection() {
  return (
    <section id="home" className={styles.heroSection}>
      <Image
        src="/zdj2-clean3.jpg"
        alt="Flaechenschneeschieber im naechtlichen Wintereinsatz"
        fill
        priority
        className={styles.heroImage}
        sizes="100vw"
      />

      <div className={styles.heroOverlay} />
      <div className={styles.heroTopFade} />
      <div className={styles.heroBottomFade} />

      <div className={styles.heroShell}>
        <header className={styles.heroHeader}>
          <div className={styles.heroHeaderSide}>
            <a href="#home" className={styles.heroBrandLink}>
              <span className={styles.heroLogoWrap}>
                <Image
                  src="/logo.png"
                  alt="Flachenschneeschieber"
                  width={122}
                  height={34}
                  className={styles.heroLogoImage}
                  priority
                />
              </span>
            </a>
          </div>

          <nav className={styles.heroNav}>
            {navigation.map((item) => (
              <a key={item.label} href={item.href} className={styles.heroNavLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={`${styles.heroHeaderSide} ${styles.heroHeaderSideEnd}`}>
            <button type="button" aria-label="Change language" className={styles.heroLangBtn}>
              DE / EN
            </button>
            <button type="button" aria-label="Open navigation" className={styles.heroMenuBtn}>
              <span className={styles.heroMenuLines}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </header>

        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <div className={styles.heroCopyHead}>
              <p className={styles.heroEyebrow}>PROFESSIONELLER WINTERDIENST</p>
              <h1 className={styles.heroHeadline}>
                Grosse Flaechen.
                <br />
                Klare Leistung.
              </h1>
            </div>

            <p className={styles.heroSubtext}>
              Robuste Schneeraeumtechnik fuer professionelle Einsaetze.
            </p>

            <div className={styles.heroCtaRow}>
              <a href="#produkte" className={`${styles.heroCta} ${styles.heroCtaPrimary}`}>
                Produkte ansehen
              </a>
              <a href="#kontakt" className={`${styles.heroCta} ${styles.heroCtaSecondary}`}>
                Anfrage senden
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
