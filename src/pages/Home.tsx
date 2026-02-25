import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import FeatureCards from "@/components/FeatureCards";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const Home = () => {
  return (
    <div className="bg-background">
      <main>
        <HeroSection />
        <ProductsSection />
        <FeatureCards />
        <WhyChooseUs />
        <StatsSection />
        <HowItWorks />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <WhatsAppButton />
    </div>
  );
};

export default Home;
