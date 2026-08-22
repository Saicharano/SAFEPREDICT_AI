import { ShieldCheck, Award } from 'lucide-react';

export default function TrustSection() {
  const compliance = [
    { label: 'OSHA Compliant', desc: 'Meets 1910 General Industry Standards' },
    { label: 'ISO 45001 Certified', desc: 'Occupational Health & Safety Systems' },
    { label: 'NFPA Standards', desc: 'Fire & Chemical Hazard Risk Protocols' },
    { label: 'SOC 2 Type II', desc: 'Enterprise Grade Data Security' },
  ];

  return (
    <section className="py-16 bg-[#060913] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-blue-950/40 border border-blue-500/20 p-8 lg:p-12 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center space-x-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise Trust & Compliance</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Built to Meet Global Industrial Safety Requirements
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Trusted by EHS directors, plant managers, and safety engineers across heavy industry worldwide.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {compliance.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.label}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
