import { Shield, Zap, Lightbulb, CheckCircle } from 'lucide-react';

export default function FeaturesStrip() {
  const features = [
    { icon: <Zap className="w-6 h-6 text-primary" />, title: 'AI Risk Prediction', desc: 'Detect issues early' },
    { icon: <Lightbulb className="w-6 h-6 text-primary" />, title: 'Smart Prioritization', desc: 'Inspect what matters' },
    { icon: <CheckCircle className="w-6 h-6 text-primary" />, title: 'Actionable Insights', desc: 'Clear reasons and actions' },
    { icon: <Shield className="w-6 h-6 text-primary" />, title: 'Safer Operations', desc: 'Protect people and assets' },
  ];

  return (
    <section className="flex flex-col md:flex-row justify-center items-stretch bg-navy/80 py-12 px-4 space-y-6 md:space-y-0 md:space-x-6">
      {features.map((f, i) => (
        <div key={i} className="flex-1 flex flex-col items-center text-center p-4 bg-glass rounded-lg backdrop-blur-sm border border-primary/10 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/20 rounded-full animate-pulse-slow">
            {f.icon}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
          <p className="text-sm text-gray-300">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}
