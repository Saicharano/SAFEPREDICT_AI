import Link from "next/link";
import { Activity, AlertTriangle, Factory, ShieldCheck, Siren, TrendingUp } from "lucide-react";
import AppShell from "@/components/AppShell";
import MetricCard from "@/components/MetricCard";
import Panel from "@/components/Panel";
import RiskBadge from "@/components/RiskBadge";
import WhyThisRisk from "@/components/WhyThisRisk";
import { FailureTrendChart, MaintenanceBottleneckChart, RiskDistributionChart, RiskTrendChart } from "@/components/Charts";
import { assets, dashboardStats } from "@/data/mock-data";

export default function HomePage() {
  const topAssets = assets.slice(0, 5);
  return (
    <AppShell>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <MetricCard label="Total Assets" value={dashboardStats.totalAssets} caption="Connected across 7 plant zones" icon={Factory} />
        <MetricCard label="High Risk Assets" value={dashboardStats.highRiskAssets} caption="Requires immediate triage" icon={Siren} />
        <MetricCard label="Medium Risk Assets" value={dashboardStats.mediumRiskAssets} caption="Watchlist for 72 hours" icon={AlertTriangle} />
        <MetricCard label="Low Risk Assets" value={dashboardStats.lowRiskAssets} caption="Operating within limits" icon={ShieldCheck} />
        <MetricCard label="Active Alerts" value={dashboardStats.activeAlerts} caption="Escalating now" icon={Activity} />
        <MetricCard label="Avg Safety Score" value={`${dashboardStats.averageSafetyScore}%`} caption="Plant-wide composite" icon={TrendingUp} />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <Panel title="Risk Distribution">
          <RiskDistributionChart />
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <span className="rounded-lg bg-red-500/10 p-2 text-red-200">High {dashboardStats.highRiskAssets}</span>
            <span className="rounded-lg bg-amber-500/10 p-2 text-amber-200">Medium {dashboardStats.mediumRiskAssets}</span>
            <span className="rounded-lg bg-emerald-500/10 p-2 text-emerald-200">Low {dashboardStats.lowRiskAssets}</span>
          </div>
        </Panel>
        <Panel title="Risk Trend">
          <RiskTrendChart />
        </Panel>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Top 5 Highest-Risk Assets" action={<Link className="text-sm font-bold text-blue-200" href="/risk-priority">View all</Link>}>
          <div className="space-y-3">
            {topAssets.map((asset, index) => (
              <Link className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/45 p-3 transition hover:border-blue-300/30" href={`/assets/${asset.id}`} key={asset.id}>
                <div>
                  <p className="font-bold">#{index + 1} {asset.name}</p>
                  <p className="text-sm text-slate-400">{asset.type} · {asset.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">{asset.risk.score}</p>
                  <RiskBadge level={asset.risk.level} />
                </div>
              </Link>
            ))}
          </div>
        </Panel>
        <div className="space-y-5">
          <WhyThisRisk risk={topAssets[0].risk} />
          <Link className="block rounded-lg border border-blue-300/30 bg-blue-500/15 px-5 py-4 text-center font-black text-blue-100 transition hover:bg-blue-500/25" href="/analyzer">
            Analyze Asset
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <Panel title="Failure Trends">
          <FailureTrendChart />
        </Panel>
        <Panel title="Maintenance Bottlenecks">
          <MaintenanceBottleneckChart />
        </Panel>
      </div>
    </AppShell>
  );
}
