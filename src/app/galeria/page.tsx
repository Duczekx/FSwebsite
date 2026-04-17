import Link from "next/link";
import styles from "./page.module.css";
import type { SiteLanguage } from "@/types/site-language";

const text = {
  de: {
    backToHome: "Zur\u00FCck zur Startseite",
    title: "Galerie",
    subtitle: "Eins\u00E4tze, Details und Produktaufnahmen",
    description:
      "Hier bauen wir als n\u00E4chsten Schritt die vollwertige Bildgalerie mit Filtern, Lightbox und responsivem Grid f\u00FCr eure echten Einsatzfotos auf.",
    cardTitle: "Galerie-Bereich in Arbeit",
    cardText:
      "Die Struktur ist bereit. Als N\u00E4chstes k\u00F6nnen wir Kategorien hinzuf\u00FCgen und alle Fotos aus euren Eins\u00E4tzen einpflegen.",
  },
  en: {
    backToHome: "Back to home",
    title: "Gallery",
    subtitle: "Operations, details and product shots",
    description:
      "In the next step, we will build the full image gallery with filters, lightbox, and a responsive grid for your real operation photos.",
    cardTitle: "Gallery section in progress",
    cardText:
      "The structure is ready. Next, we can add categories and include all photos from your field operations.",
  },
} as const;

type GalleryPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const language: SiteLanguage = params?.lang === "en" ? "en" : "de";

  const copy = text[language];

  return (
    <main className={styles.galleryPage}>
      <header className={styles.galleryTopBar}>
        <Link href={`/?lang=${language}#home`} className={styles.backLink}>
          {copy.backToHome}
        </Link>

        <div className={styles.langRow}>
          <Link
            href="/galeria?lang=de"
            className={`${styles.langBtn} ${language === "de" ? styles.langBtnActive : ""}`}
          >
            <img src="/icons/flags/de.svg" alt="" width={16} height={11} />
            <span>DEU</span>
          </Link>
          <Link
            href="/galeria?lang=en"
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
      </section>
    </main>
  );
}
