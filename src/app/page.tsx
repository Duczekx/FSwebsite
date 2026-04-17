"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import type { SiteLanguage } from "@/types/site-language";

export default function Home() {
  const [language, setLanguage] = useState<SiteLanguage>("de");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryLang = params.get("lang");
    const storedLang = window.localStorage.getItem("site-language");

    const normalizedQueryLang =
      queryLang === "de" || queryLang === "en" ? queryLang : null;
    const normalizedStoredLang =
      storedLang === "de" || storedLang === "en" ? storedLang : null;

    const initialLanguage = normalizedQueryLang ?? normalizedStoredLang ?? "de";
    setLanguage(initialLanguage);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("site-language", language);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
  }, [language]);

  return (
    <main className="site-main">
      <HeroSection language={language} onLanguageChange={setLanguage} />
      <ProductsSection language={language} />
      <div id="kontakt" className="contact-anchor" />
    </main>
  );
}
