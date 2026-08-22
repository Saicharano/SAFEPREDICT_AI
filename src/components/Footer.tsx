import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#060913] border-t border-slate-800/60 py-12 px-6 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-wide">SafePredict AI</span>
            <p className="text-xs text-gray-500">Industrial Safety Command Center Platform</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <Link href="#product" className="hover:text-blue-400 transition-colors">Product</Link>
          <Link href="#features" className="hover:text-blue-400 transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</Link>
          <Link href="#use-cases" className="hover:text-blue-400 transition-colors">Use Cases</Link>
          <Link href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
          <Link href="#terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Systems Operational</span>
          <span className="mx-2">•</span>
          <span>© {new Date().getFullYear()} SafePredict AI</span>
        </div>
      </div>
    </footer>
  );
}
