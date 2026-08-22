import { Activity, AlertTriangle, TrendingUp } from "lucide-react";
import AppShell from "@/components/AppShell";
import Panel from "@/components/Panel";
import RiskBadge from "@/components/RiskBadge";
import { SensorMultiChart } from "@/components/Charts";
import { assets } from "@/data/mock-data";

export default function SensorIntelligencePage() {
  const asset = assets.find((item) => item.name === "Compressor-12") ?? assets[1];
  return (
    <AppShell>
      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <Panel title="Sensor Behavior: Temperature, Pressure, Vibration">
          <SensorMultiChart assetId={asset.id} />
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {["Normal readings", "Warning readings", "Critical readings", "Gradual deterioration"].map((label) => (
              <div className="rounded-lg border border-white/10 bg-slate-950/45 p-3 text-sm text-slate-300" key={label}>{label}</div>
            ))}
          </div>
        </Panel>
        <Panel title="What Changed?">
          <div className="rounded-lg border border-red-300/30 bg-red-500/10 p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-200" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-200">Risk Escalation Detected</span>
            </div>
            <h2 className="mt-4 text-3xl font-black">{asset.name}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-950/50 p-3">
                <p className="text-sm text-slate-400">Yesterday</p>
                <p className="text-xl font-black">Medium · 58</p>
              </div>
              <div className="rounded-lg bg-slate-950/50 p-3">
                <p className="text-sm text-slate-400">Today</p>
                <p className="text-xl font-black">High · {asset.risk.score}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>Vibration increased by 34%.</li>
              <li>Process temperature increased by 12%.</li>
              <li>Maintenance is now overdue.</li>
              <li>A new inspection issue was reported.</li>
            </ul>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/45 p-4">
            <span className="flex items-center gap-2 text-sm text-slate-300"><Activity className="h-4 w-4 text-blue-300" /> Recommended action</span>
            <RiskBadge level="HIGH" />
          </div>
          <p className="mt-3 text-slate-200">Inspect within 24 hours and hold at limited duty until vibration trend stabilizes.</p>
        </Panel>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {[
          ["Temperature threshold", "Warning 78C · Critical 96C", TrendingUp],
          ["Pressure band", "Safe 78-132 PSI", Activity],
          ["Vibration threshold", "Warning 4.2 mm/s · Critical 8.2 mm/s", AlertTriangle],
        ].map(([title, copy, Icon]) => (
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4" key={title as string}>
            <Icon className="h-5 w-5 text-blue-300" />
            <p className="mt-3 font-bold">{title as string}</p>
            <p className="mt-1 text-sm text-slate-400">{copy as string}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
