import Link from 'next/link';
import { Shield, ChevronRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#060913]/80 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="text-lg font-extrabold text-white tracking-tight">SafePredict</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">AI</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">Industrial Safety Intelligence</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          {[
            { label: 'Product', href: '#product' },
            { label: 'Features', href: '#features' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Use Cases', href: '#use-cases' },
            { label: 'Resources', href: '#resources' },
            { label: 'Pricing', href: '#pricing' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-blue-400 transition-colors py-1 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 rounded-full group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href="#login"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg border border-slate-700/80 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-800/80 transition-all"
          >
            Login
          </Link>
          <Link
            href="#trial"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all transform active:scale-[0.98]"
          >
            <span>Get Started</span>
            <ChevronRight className="w-4 h-4 ml-1 opacity-80" />
          </Link>
        </div>
      </div>
    </header>
  );
}
