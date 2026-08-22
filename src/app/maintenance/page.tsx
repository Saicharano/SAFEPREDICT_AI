import { CalendarClock, CheckCircle2, CircleAlert, Wrench } from "lucide-react";
import AppShell from "@/components/AppShell";
import MetricCard from "@/components/MetricCard";
import Panel from "@/components/Panel";
import { MaintenanceBottleneckChart } from "@/components/Charts";
import { assets, maintenanceTimeline } from "@/data/mock-data";

export default function MaintenancePage() {
  const overdue = assets.filter((asset) => asset.lastMaintenanceDays > 90);
  return (
    <AppShell>
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Avg Days Since Service" value={74} caption="Across monitored assets" icon={CalendarClock} />
        <MetricCard label="Overdue Assets" value={overdue.length} caption="Past 90-day control window" icon={CircleAlert} />
        <MetricCard label="Preventive Events" value={38} caption="Next 30 days" icon={CheckCircle2} />
        <MetricCard label="Corrective Events" value={14} caption="Failure-driven work orders" icon={Wrench} />
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel title="Maintenance Timeline">
          <div className="space-y-4">
            {maintenanceTimeline.map((event) => (
              <div className="flex gap-4 rounded-lg border border-white/10 bg-slate-950/45 p-4" key={event.title}>
                <div className="w-16 shrink-0 text-sm font-bold text-blue-200">{event.date}</div>
                <div>
                  <p className="font-bold">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{event.status} priority maintenance event</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Preventive vs Corrective Bottlenecks">
          <MaintenanceBottleneckChart />
        </Panel>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {overdue.slice(0, 8).map((asset) => (
          <div className="rounded-lg border border-red-300/20 bg-red-500/[0.07] p-4" key={asset.id}>
            <p className="font-bold">{asset.name}</p>
            <p className="mt-1 text-sm text-slate-300">{asset.lastMaintenanceDays} days since last maintenance · {asset.recommendedAction}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
