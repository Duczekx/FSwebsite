import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";

export default function Home() {
  return (
    <main className="site-main">
      <HeroSection />
      <ProductsSection />
      <div id="kontakt" className="contact-anchor" />
    </main>
  );
}
