
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import SampleComparison from "@/components/sections/SampleComparison";
import UploadSection from "@/components/sections/UploadSection";
import HistorySection from "@/components/sections/HistorySection";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/common/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen text-foreground font-sans">
      <Header />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <Features />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Sample Comparison Section */}
        <SampleComparison />

        {/* Upload & Detection Section */}
        <UploadSection />

        {/* History Section */}
        <HistorySection />

        {/* FAQ Section */}
        <FAQ />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
