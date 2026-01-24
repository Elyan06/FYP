
import { TestDbConnection } from "@/components/TestDbConnection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import SampleComparison from "@/components/SampleComparison";
import UploadSection from "@/components/UploadSection";
import HistorySection from "@/components/HistorySection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

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
        {import.meta.env.DEV && (
          <div className="container-tight mx-auto px-4 py-4">
            <TestDbConnection />
          </div>
        )}
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
