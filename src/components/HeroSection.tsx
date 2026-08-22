import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-8 py-20 bg-navy/90 bg-grid" style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="md:w-1/2 text-white z-10">
        <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm mb-4">✦ AI-Powered Safety Intelligence</span>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Predict Risks.<br/>Prevent Accidents.<br/>
          <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Protect Lives.</span>
        </h1>
        <p className="mb-8 text-gray-300 max-w-md">
          SafePredict AI analyzes maintenance records, inspection reports, incident history, and sensor data to identify potential industrial safety risks before they become accidents. Detect risks early, understand why they occur, and take action before failure.
        </p>
        <div className="flex space-x-4">
          <Link href="#" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded hover:opacity-90 transition-opacity">
            Start Free Trial
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link href="#" className="inline-flex items-center px-6 py-3 border border-primary/30 text-primary rounded hover:bg-primary/10 transition-colors">
            Book a Demo
            <Calendar className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center animate-float">
        <Image src="/dashboard.png" alt="Dashboard mockup" width={500} height={400} className="rounded-xl shadow-xl border border-primary/20" />
      </div>
    </section>
  );
}
