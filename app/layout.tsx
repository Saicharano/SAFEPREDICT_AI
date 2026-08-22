import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'SafePredict AI – AI‑Powered Industrial Safety Platform',
  description: 'Predict risks, prevent accidents, protect lives with AI‑driven safety intelligence.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} bg-navy text-white`}> 
      <head />
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
