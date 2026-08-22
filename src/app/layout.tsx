import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'SafePredict AI – AI-Powered Industrial Safety Platform',
  description: 'Predict risks, prevent accidents, and protect lives with real-time AI safety intelligence.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="bg-[#060913] text-slate-100 antialiased min-h-screen flex flex-col selection:bg-blue-500/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
