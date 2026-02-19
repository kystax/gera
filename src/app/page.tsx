import ProductHero from "@/components/ProductHero";
import ModelShowcase from "@/components/ModelShowcase";
import AnimatedCatalog from "@/components/AnimatedCatalog";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section (Grid from Image 1) */}
      <ModelShowcase />

      {/* Animated Product Catalog (Small to Big Animation) */}
      <AnimatedCatalog />

      {/* Product Detail Section (Middle Section from Image 2) */}
      <ProductHero />

      {/* About Section */}
      <AboutSection />

      {/* Optional: Add a footer or more sections here if needed */}
      <footer className="bg-brand-charcoal text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-4xl font-display tracking-[0.3em] font-light">GERA</div>
          <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400">
            <span className="cursor-pointer hover:text-white transition-colors">Instagram</span>
            <span className="cursor-pointer hover:text-white transition-colors">Facebook</span>
            <span className="cursor-pointer hover:text-white transition-colors">Pinterest</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
            © 2026 GERA. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
