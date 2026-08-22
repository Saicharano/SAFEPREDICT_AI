import { BrainCircuit } from "lucide-react";
import { RiskResult } from "@/types";

export default function WhyThisRisk({ risk }: { risk: RiskResult }) {
  return (
    <section className="rounded-lg border border-blue-300/20 bg-blue-500/10 p-5 shadow-2xl shadow-blue-950/20">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-400/15 text-blue-200">
          <BrainCircuit className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-200">Why This Risk?</p>
          <h2 className="text-lg font-bold text-white">Plain-language AI insight</h2>
        </div>
      </div>
      <p className="mt-4 leading-7 text-slate-200">{risk.why}</p>
      {risk.confidence < 60 && (
        <p className="mt-3 rounded-lg border border-amber-300/30 bg-amber-500/10 p-3 text-sm text-amber-100">
          AI recommendation should be manually verified due to incomplete data.
        </p>
      )}
    </section>
  );
}
