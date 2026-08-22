import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Settings2, Sparkles, ShieldAlert, LayoutDashboard } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-grid-pattern">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Industrial Hero Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060913]/60 via-[#060913]/80 to-[#060913] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-8 text-left z-10">
            
            {/* AI Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide backdrop-blur-md shadow-lg shadow-blue-500/10">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>AI-Powered Industrial Safety Intelligence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Predict Risks.<br />
              Prevent Accidents.<br />
              <span className="text-gradient">Protect Lives.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              SafePredict AI analyzes maintenance records, inspection reports, incident history, and sensor data to identify potential industrial safety risks before they become accidents. Detect risks early, understand why they occur, and take action before failure.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <LayoutDashboard className="mr-2 w-4 h-4" />
                <span>Open Command Center</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>

              <Link
                href="/analyzer"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-blue-500/40 rounded-xl transition-all backdrop-blur-md"
              >
                <Settings2 className="mr-2 w-4 h-4 text-blue-400" />
                <span>Run AI Risk Analyzer</span>
              </Link>
            </div>

            {/* Quick Proof Pills */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">99.4%</span>
                <span className="text-xs text-slate-400">Risk Accuracy</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-400">&lt; 100ms</span>
                <span className="text-xs text-slate-400">Sensor Stream</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-emerald-400">Zero</span>
                <span className="text-xs text-slate-400">Fatal Incidents</span>
              </div>
            </div>

          </div>

          {/* Right Dashboard Column */}
          <div className="lg:col-span-6 relative z-10">
            <Link href="/dashboard" className="block relative mx-auto max-w-lg lg:max-w-none group cursor-pointer">
              
              {/* Subtle Blue Glow Behind Image */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
              
              {/* Dashboard Container */}
              <div className="relative rounded-2xl bg-slate-950/90 border border-slate-700/60 p-2 sm:p-3 shadow-2xl backdrop-blur-2xl">
                
                {/* Window Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-slate-400 ml-2">INDUSTRIAL SAFETY COMMAND CENTER</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    <span>CLICK TO OPEN LIVE APP</span>
                  </div>
                </div>

                {/* Main Dashboard Image Preview */}
                <div className="relative overflow-hidden rounded-xl border border-slate-800">
                  <Image
                    src="/dashboard.png"
                    alt="SafePredict AI Industrial Safety Command Center Dashboard Preview"
                    width={800}
                    height={550}
                    priority
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {/* Floating Glassmorphic Alert Pill Badge Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#0d1322]/90 backdrop-blur-md border border-blue-500/30 p-3 rounded-xl shadow-xl flex items-center space-x-3">
                    <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/40">
                      <ShieldAlert className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white">High-Risk Alert Prevented</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-mono">Boiler #4 Pressure</span>
                      </div>
                      <p className="text-[11px] text-slate-300">Preventative maintenance order issued automatically.</p>
                    </div>
                  </div>

                </div>

              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
