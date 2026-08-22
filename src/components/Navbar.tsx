import Link from 'next/link';
import { Shield, ChevronRight, LayoutDashboard } from 'lucide-react';

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
          <Link href="#features" className="hover:text-blue-400 transition-colors">Features</Link>
          <Link href="/dashboard" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            <span>Command Center</span>
          </Link>
          <Link href="/analyzer" className="hover:text-blue-400 transition-colors">AI Risk Analyzer</Link>
          <Link href="/sensor-intelligence" className="hover:text-blue-400 transition-colors">Sensors</Link>
          <Link href="/risk-priority" className="hover:text-blue-400 transition-colors">Risk Priority</Link>
          <Link href="/maintenance" className="hover:text-blue-400 transition-colors">Maintenance</Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg border border-slate-700/80 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-800/80 transition-all"
          >
            Launch Platform
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all transform active:scale-[0.98]"
          >
            <span>Open Dashboard</span>
            <ChevronRight className="w-4 h-4 ml-1 opacity-80" />
          </Link>
        </div>
      </div>
    </header>
  );
}
