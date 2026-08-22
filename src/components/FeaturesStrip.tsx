import { Zap, ShieldAlert, Cpu, LineChart } from 'lucide-react';

export default function FeaturesStrip() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      title: 'Predictive Risk Intelligence',
      desc: 'Machine learning algorithms continuously analyze sensor telemetry to spot micro-anomalies before equipment failures happen.',
      tag: 'Real-Time AI'
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-amber-400" />,
      title: 'High-Risk Incident Alerts',
      desc: 'Instant alert escalation for critical safety thresholds, giving HSE teams actionable steps before hazard escalation.',
      tag: 'Zero Latency'
    },
    {
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      title: 'IoT Sensor Integration',
      desc: 'Seamless API connectors for SCADA, IIoT sensors, vibration sensors, thermal cameras, and digital inspection logs.',
      tag: 'Universal Plug'
    },
    {
      icon: <LineChart className="w-6 h-6 text-indigo-400" />,
      title: 'Root Cause Analytics',
      desc: 'Deep multi-variable impact mapping explains why risks develop, eliminating guesswork for safety engineers.',
      tag: 'Explainable AI'
    },
  ];

  return (
    <section id="features" className="py-20 bg-[#080d1a] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Capabilities & Core Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for High-Consequence Industrial Environments
          </h2>
          <p className="text-slate-400 text-base">
            From oil refineries and manufacturing plants to chemical facilities, SafePredict AI delivers proactive hazard prevention.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative rounded-2xl bg-[#0d1424]/80 p-6 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/60 group-hover:border-blue-500/30 transition-colors">
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/40">
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Explore Module</span>
                <span className="ml-1">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
