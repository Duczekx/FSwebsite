'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import type { SiteLanguage } from "@/types/site-language";

type HeroSectionProps = {
  language: SiteLanguage;
  onLanguageChange: (language: SiteLanguage) => void;
};

type LanguageOption = {
  value: SiteLanguage;
  code: "DEU" | "ENG";
  flagSrc: string;
  labelDe: string;
  labelEn: string;
};

const languageOptions: LanguageOption[] = [
  { value: "de", code: "DEU", flagSrc: "/icons/flags/de.svg", labelDe: "Deutsch", labelEn: "German" },
  { value: "en", code: "ENG", flagSrc: "/icons/flags/gb.svg", labelDe: "Englisch", labelEn: "English" },
];

const text = {
  de: {
    navHome: "Home",
    navBenefits: "Vorteile",
    navProducts: "Produkte",
    navContact: "Kontakt",
    navGallery: "Galerie",
    navConfigurator: "Konfigurator",
    menuTitle: "Men\u00FC",
    eyebrow: "PROFESSIONELLER WINTERDIENST",
    headlineTop: "Gro\u00DFe Fl\u00E4chen.",
    headlineBottom: "Klare Leistung.",
    subtext: "Robuste Schneer\u00E4umtechnik f\u00FCr professionelle Eins\u00E4tze.",
    ctaPrimary: "Produkte ansehen",
    ctaSecondary: "Anfrage senden",
    logoAlt: "Fl\u00E4chenschneeschieber",
    imageAlt: "Fl\u00E4chenschneeschieber im n\u00E4chtlichen Wintereinsatz",
    mobileLocaleTitle: "Sprache",
  },
  en: {
    navHome: "Home",
    navBenefits: "Benefits",
    navProducts: "Products",
    navContact: "Contact",
    navGallery: "Gallery",
    navConfigurator: "Configurator",
    menuTitle: "Menu",
    eyebrow: "PROFESSIONAL WINTER SERVICE",
    headlineTop: "Large Areas.",
    headlineBottom: "Clear Performance.",
    subtext: "Robust snow-clearing technology for professional operations.",
    ctaPrimary: "View products",
    ctaSecondary: "Send inquiry",
    logoAlt: "Fl\u00E4chenschneeschieber",
    imageAlt: "Fl\u00E4chenschneeschieber in night winter operation",
    mobileLocaleTitle: "Language",
  },
} as const;

export default function HeroSection({ language, onLanguageChange }: HeroSectionProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [isStickyNavVisible, setIsStickyNavVisible] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false);

  const copy = text[language];
  const configuratorHref = `/konfigurator?lang=${language}`;
  const navigation = useMemo(
    () => [
      { label: copy.navHome, href: "#home" },
      { label: copy.navProducts, href: "#produkte" },
      { label: copy.navBenefits, href: "#vorteile" },
      { label: copy.navContact, href: "#kontakt" },
      { label: copy.navGallery, href: `/galeria?lang=${language}` },
    ],
    [copy.navBenefits, copy.navContact, copy.navGallery, copy.navHome, copy.navProducts, language]
  );

  const currentLanguage = useMemo(
    () => languageOptions.find((option) => option.value === language) ?? languageOptions[0],
    [language]
  );

  useEffect(() => {
    const syncActiveFromHash = () => {
      const currentHash = window.location.hash || "#home";
      const isKnownHash = navigation.some(
        (item) => item.href.startsWith("#") && item.href === currentHash
      );
      setActiveHref(isKnownHash ? currentHash : "#home");
    };

    syncActiveFromHash();
    window.addEventListener("hashchange", syncActiveFromHash);

    return () => {
      window.removeEventListener("hashchange", syncActiveFromHash);
    };
  }, [navigation]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      setIsMobileLangMenuOpen(false);
    }
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

  useEffect(() => {
    const closeDesktopLangMenuOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!(target instanceof Element)) {
        return;
      }
      if (!target.closest(`.${styles.heroLangWrap}`)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDesktopLangMenuOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeDesktopLangMenuOnOutsideClick);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setActiveHref(href);
    setIsMenuOpen(false);
  };

  const handleLanguageSelect = (nextLanguage: SiteLanguage) => {
    onLanguageChange(nextLanguage);
    setIsLangMenuOpen(false);
    setIsMobileLangMenuOpen(false);
  };

  const renderLanguageSelector = () => (
    <div className={styles.heroLangWrap}>
      <button
        type="button"
        aria-label="Change language"
        className={styles.heroLangBtn}
        onClick={() => setIsLangMenuOpen((prev) => !prev)}
      >
        <img src={currentLanguage.flagSrc} alt="" width={16} height={11} className={styles.heroFlagIcon} />
        <span className={styles.heroLangDot} />
        <span>{currentLanguage.code}</span>
      </button>

      {isLangMenuOpen ? (
        <div className={styles.heroLangMenu} role="menu">
          {languageOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitem"
              className={`${styles.heroLangOption} ${
                option.value === language ? styles.heroLangOptionActive : ""
              }`}
              onClick={() => handleLanguageSelect(option.value)}
            >
              <img src={option.flagSrc} alt="" width={16} height={11} className={styles.heroFlagIcon} />
              <span className={styles.heroLangOptionCode}>{option.code}</span>
              <span className={styles.heroLangOptionLabel}>
                {language === "de" ? option.labelDe : option.labelEn}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <section id="home" className={styles.heroSection}>
      <div className={`${styles.stickyNav} ${isStickyNavVisible ? styles.stickyNavVisible : ""}`}>
        <div className={styles.stickyNavInner}>
          <div className={styles.heroHeaderSide}>
            <a href="#home" className={styles.heroBrandLink} onClick={() => handleNavClick("#home")}>
              <span className={styles.heroLogoWrap}>
                <Image
                  src="/logo.png"
                  alt={copy.logoAlt}
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
            <a href={configuratorHref} className={styles.heroConfiguratorLink}>
              {copy.navConfigurator}
            </a>
            {renderLanguageSelector()}
            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              className={styles.heroMenuBtn}
              onClick={() => setIsMenuOpen(true)}
              onTouchStart={() => setIsMenuOpen(true)}
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

      {isMenuOpen ? (
        <div id="mobile-nav" className={styles.heroMobileNav} role="dialog" aria-modal="true">
          <div className={styles.heroMobileNavTop}>
            <span className={styles.heroMobileNavTopLabel}>{copy.menuTitle}</span>
            <button
              type="button"
              aria-label="Close navigation overlay"
              className={styles.heroMobileNavClose}
              onClick={() => setIsMenuOpen(false)}
            >
              {"\u00D7"}
            </button>
          </div>

          <nav className={styles.heroMobileNavPanel}>
            {navigation.map((item) => (
              <a
                key={`mobile-${item.label}`}
                href={item.href}
                className={`${styles.heroMobileNavLink} ${activeHref === item.href ? styles.heroMobileNavLinkActive : ""}`}
                aria-current={activeHref === item.href ? "page" : undefined}
                onClick={() => handleNavClick(item.href)}
              >
                <span>{item.label}</span>
                <span className={styles.heroMobileNavArrow}>{"\u203A"}</span>
              </a>
            ))}
          </nav>

          <a href={configuratorHref} className={styles.heroMobileConfiguratorLink} onClick={() => setIsMenuOpen(false)}>
            <span>{copy.navConfigurator}</span>
            <span className={styles.heroMobileNavArrow}>{"\u203A"}</span>
          </a>

          <div className={styles.heroMobileLocaleBlock}>
            <button
              type="button"
              className={styles.heroMobileLocaleBtn}
              onClick={() => setIsMobileLangMenuOpen((prev) => !prev)}
            >
              <img
                src={currentLanguage.flagSrc}
                alt=""
                width={18}
                height={12}
                className={styles.heroMobileLocaleFlagIcon}
              />
              <span className={styles.heroMobileLocaleText}>
                <span className={styles.heroMobileLocaleTitle}>{copy.mobileLocaleTitle}</span>
                <span className={styles.heroMobileLocaleValue}>{currentLanguage.code}</span>
              </span>
              <span className={styles.heroMobileNavArrow}>
                {isMobileLangMenuOpen ? "\u2212" : "\u203A"}
              </span>
            </button>

            {isMobileLangMenuOpen ? (
              <div className={styles.heroMobileLocaleList}>
                {languageOptions.map((option) => (
                  <button
                    key={`mobile-lang-${option.value}`}
                    type="button"
                    className={`${styles.heroMobileLocaleOption} ${
                      option.value === language ? styles.heroMobileLocaleOptionActive : ""
                    }`}
                    onClick={() => handleLanguageSelect(option.value)}
                  >
                    <img src={option.flagSrc} alt="" width={18} height={12} className={styles.heroFlagIcon} />
                    <span>{option.code}</span>
                    <span className={styles.heroMobileLocaleOptionLabel}>
                      {language === "de" ? option.labelDe : option.labelEn}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <Image
        src="/zdj2-clean3.jpg"
        alt={copy.imageAlt}
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
                  alt={copy.logoAlt}
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
            <a href={configuratorHref} className={styles.heroConfiguratorLink}>
              {copy.navConfigurator}
            </a>
            {renderLanguageSelector()}
            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              className={styles.heroMenuBtn}
              onClick={() => setIsMenuOpen(true)}
              onTouchStart={() => setIsMenuOpen(true)}
            >
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
              <p className={styles.heroEyebrow}>{copy.eyebrow}</p>
              <h1 className={styles.heroHeadline}>
                {copy.headlineTop}
                <br />
                {copy.headlineBottom}
              </h1>
            </div>

            <p className={styles.heroSubtext}>{copy.subtext}</p>

            <div className={styles.heroCtaRow}>
              <a href="#produkte" className={`${styles.heroCta} ${styles.heroCtaPrimary}`}>
                {copy.ctaPrimary}
              </a>
              <a href="#kontakt" className={`${styles.heroCta} ${styles.heroCtaSecondary}`}>
                {copy.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
