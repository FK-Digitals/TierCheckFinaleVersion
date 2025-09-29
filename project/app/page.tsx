import ParallaxHero from './components/ParallaxHero';
import FeaturesSection from './components/FeaturesSection';
import ProductOfTheWeek from './components/ProductOfTheWeek';
import AffiliateSection from './components/AffiliateSection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ParallaxHero />
      <FeaturesSection />
      <ProductOfTheWeek />
      <BlogSection />
      <AffiliateSection />
      <Footer />
    </main>
  );
}