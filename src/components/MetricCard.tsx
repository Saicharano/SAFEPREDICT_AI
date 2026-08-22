import { LucideIcon } from "lucide-react";

export default function MetricCard({ label, value, caption, icon: Icon }: { label: string; value: string | number; caption: string; icon: LucideIcon }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/20 backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-300/30">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">{label}</span>
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-400/10 text-blue-300">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-4 text-3xl font-black tracking-tight">{value}</div>
      <p className="mt-1 text-xs text-slate-500">{caption}</p>
    </div>
  );
}
