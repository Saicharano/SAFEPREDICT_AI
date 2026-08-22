import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesStrip from "@/components/FeaturesStrip";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060913] text-white">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <FeaturesStrip />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}
