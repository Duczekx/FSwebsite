'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Vorteile", href: "#vorteile" },
  { label: "Produkte", href: "#produkte" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [isStickyNavVisible, setIsStickyNavVisible] = useState(false);

  useEffect(() => {
    const syncActiveFromHash = () => {
      const currentHash = window.location.hash || "#home";
      const isKnownHash = navigation.some((item) => item.href === currentHash);
      setActiveHref(isKnownHash ? currentHash : "#home");
    };

    syncActiveFromHash();
    window.addEventListener("hashchange", syncActiveFromHash);

    return () => {
      window.removeEventListener("hashchange", syncActiveFromHash);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const syncStickyNav = () => {
      setIsStickyNavVisible(window.scrollY > 40);
    };

    syncStickyNav();
    window.addEventListener("scroll", syncStickyNav, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncStickyNav);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setActiveHref(href);
    setIsMenuOpen(false);
  };

  return (
    <section id="home" className={styles.heroSection}>
      <div className={`${styles.stickyNav} ${isStickyNavVisible ? styles.stickyNavVisible : ""}`}>
        <div className={styles.stickyNavInner}>
          <div className={styles.heroHeaderSide}>
            <a href="#home" className={styles.heroBrandLink} onClick={() => handleNavClick("#home")}>
              <span className={styles.heroLogoWrap}>
                <Image
                  src="/logo.png"
                  alt="Flächenschneeschieber"
                  width={122}
                  height={34}
                  className={styles.heroLogoImage}
                />
              </span>
            </a>
          </div>

          <nav className={styles.heroNav}>
            {navigation.map((item) => (
              <a
                key={`sticky-${item.label}`}
                href={item.href}
                className={`${styles.heroNavLink} ${activeHref === item.href ? styles.heroNavLinkActive : ""}`}
                aria-current={activeHref === item.href ? "page" : undefined}
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={`${styles.heroHeaderSide} ${styles.heroHeaderSideEnd}`}>
            <button type="button" aria-label="Change language" className={styles.heroLangBtn}>
              DE / EN
            </button>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              className={styles.heroMenuBtn}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className={styles.heroMenuLines}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </div>

      <Image
        src="/zdj2-clean3.jpg"
        alt="Flächenschneeschieber im nächtlichen Wintereinsatz"
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
                  alt="Flächenschneeschieber"
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
              <a
                key={item.label}
                href={item.href}
                className={`${styles.heroNavLink} ${activeHref === item.href ? styles.heroNavLinkActive : ""}`}
                aria-current={activeHref === item.href ? "page" : undefined}
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={`${styles.heroHeaderSide} ${styles.heroHeaderSideEnd}`}>
            <button type="button" aria-label="Change language" className={styles.heroLangBtn}>
              DE / EN
            </button>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              className={styles.heroMenuBtn}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className={styles.heroMenuLines}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </header>

        <div className={`${styles.heroMobileNav} ${isMenuOpen ? styles.heroMobileNavOpen : ""}`}>
          <button
            type="button"
            aria-label="Close navigation overlay"
            className={styles.heroMobileNavBackdrop}
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className={styles.heroMobileNavPanel}>
            {navigation.map((item) => (
              <a
                key={`mobile-${item.label}`}
                href={item.href}
                className={`${styles.heroMobileNavLink} ${activeHref === item.href ? styles.heroMobileNavLinkActive : ""}`}
                aria-current={activeHref === item.href ? "page" : undefined}
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <div className={styles.heroCopyHead}>
              <p className={styles.heroEyebrow}>PROFESSIONELLER WINTERDIENST</p>
              <h1 className={styles.heroHeadline}>
                Große Flächen.
                <br />
                Klare Leistung.
              </h1>
            </div>

            <p className={styles.heroSubtext}>
              Robuste Schneeräumtechnik für professionelle Einsätze.
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
