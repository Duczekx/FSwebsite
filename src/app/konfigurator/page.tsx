import Link from "next/link";
import styles from "./page.module.css";
import type { SiteLanguage } from "@/types/site-language";

const text = {
  de: {
    backToHome: "Zur\u00FCck zur Startseite",
    title: "Konfigurator",
    subtitle: "Digitale Konfiguration in Vorbereitung",
    description:
      "Hier entsteht der sp\u00E4tere Produktkonfigurator, \u00FCber den Kunden ihren Pflug mit allen relevanten Optionen zusammenstellen und direkt eine Anfrage senden k\u00F6nnen.",
    cardTitle: "Konfigurator im Aufbau",
    cardText:
      "Aktuell planen wir die Struktur f\u00FCr Auswahl, Optionen, technische Abfragen und den Formularversand an eure Zieladresse.",
    cta: "Kontakt aufnehmen",
  },
  en: {
    backToHome: "Back to home",
    title: "Configurator",
    subtitle: "Digital configurator in preparation",
    description:
      "This is where the future product configurator will be built so customers can assemble their plow with all relevant options and send an inquiry directly.",
    cardTitle: "Configurator in progress",
    cardText:
      "We are currently defining the structure for selection, options, technical inputs, and form delivery to your target email address.",
    cta: "Contact us",
  },
} as const;

type ConfiguratorPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function ConfiguratorPage({ searchParams }: ConfiguratorPageProps) {
  const params = await searchParams;
  const language: SiteLanguage = params?.lang === "en" ? "en" : "de";
  const copy = text[language];

  return (
    <main className={styles.configuratorPage}>
      <header className={styles.configuratorTopBar}>
        <Link href={`/?lang=${language}#home`} className={styles.backLink}>
          {copy.backToHome}
        </Link>

        <div className={styles.langRow}>
          <Link
            href="/konfigurator?lang=de"
            className={`${styles.langBtn} ${language === "de" ? styles.langBtnActive : ""}`}
          >
            <img src="/icons/flags/de.svg" alt="" width={16} height={11} />
            <span>DEU</span>
          </Link>
          <Link
            href="/konfigurator?lang=en"
            className={`${styles.langBtn} ${language === "en" ? styles.langBtnActive : ""}`}
          >
            <img src="/icons/flags/gb.svg" alt="" width={16} height={11} />
            <span>ENG</span>
          </Link>
        </div>
      </header>

      <section className={styles.heroBlock}>
        <p className={styles.kicker}>{copy.subtitle}</p>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.description}>{copy.description}</p>
      </section>

      <section className={styles.placeholderCard}>
        <h2>{copy.cardTitle}</h2>
        <p>{copy.cardText}</p>
        <Link href={`/?lang=${language}#kontakt`} className={styles.contactLink}>
          {copy.cta}
        </Link>
      </section>
    </main>
  );
}
