import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-navy/80 backdrop-blur-md">
      <div className="flex items-center space-x-2">
        <Shield className="w-6 h-6 text-primary"/>
        <div className="flex flex-col">
          <span className="text-xl font-semibold">SafePredict AI</span>
          <span className="text-sm text-gray-400">Industrial Safety Intelligence</span>
        </div>
      </div>
      <ul className="flex space-x-6 text-sm font-medium">
        {['Product','Features','How It Works','Use Cases','Resources','Pricing'].map(item=>(
          <li key={item}>
            <Link href={`#${item.toLowerCase().replace(/ /g,'-')}`} className="hover:text-primary transition-colors">{item}</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-3">
        <button className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-800 transition-colors">Login</button>
        <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded hover:opacity-90 transition-opacity animate-pulse-slow">Get Started</button>
      </div>
    </nav>
  );
}
