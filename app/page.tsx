import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesStrip from '../components/FeaturesStrip';
import TrustSection from '../components/TrustSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center bg-navy text-white">
        <HeroSection />
        <FeaturesStrip />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}
