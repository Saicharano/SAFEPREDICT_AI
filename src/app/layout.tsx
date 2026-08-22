import "./globals.css";

export const metadata = {
  title: "SafePredict AI - Industrial Safety Intelligence Platform",
  description: "Predict risks, prevent accidents, and protect lives with explainable AI safety intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#060913] text-slate-100 antialiased selection:bg-blue-500/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
