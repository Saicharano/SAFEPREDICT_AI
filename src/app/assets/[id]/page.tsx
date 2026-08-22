import { CheckCircle2, Clock, Gauge, Wrench } from "lucide-react";
import AppShell from "@/components/AppShell";
import Panel from "@/components/Panel";
import RiskBadge from "@/components/RiskBadge";
import WhyThisRisk from "@/components/WhyThisRisk";
import { ContributionChart, SensorMultiChart } from "@/components/Charts";
import { getAsset } from "@/data/mock-data";

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = getAsset(id);
  return (
    <AppShell>
      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Panel title={`${asset.name} AI Risk Profile`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Asset ID", asset.id],
              ["Asset Type", asset.type],
              ["Location", asset.location],
              ["Installation Year", asset.installationYear],
              ["Criticality", asset.criticality],
              ["Operational Status", asset.status],
            ].map(([label, value]) => (
              <div className="rounded-lg border border-white/10 bg-slate-950/45 p-3" key={label}>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
                <p className="mt-1 font-bold">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid place-items-center rounded-lg border border-white/10 bg-slate-950/45 p-6">
            <div className="grid h-48 w-48 place-items-center rounded-full border-[14px] border-red-400/70 bg-red-500/10 text-center shadow-2xl shadow-red-950/30">
              <div>
                <p className="text-5xl font-black">{asset.risk.score}</p>
                <p className="text-sm font-bold text-red-200">/ 100</p>
                <RiskBadge level={asset.risk.level} />
              </div>
            </div>
            <div className="mt-5 grid w-full gap-3 text-sm sm:grid-cols-3">
              <span className="rounded-lg bg-white/[0.04] p-3">Trend: <b className="capitalize">{asset.risk.trend}</b></span>
              <span className="rounded-lg bg-white/[0.04] p-3">Confidence: <b>{asset.risk.confidence}%</b></span>
              <span className="rounded-lg bg-white/[0.04] p-3">Analyzed: <b>2026-08-23 01:40 IST</b></span>
            </div>
          </div>
        </Panel>
        <div className="space-y-5">
          <WhyThisRisk risk={asset.risk} />
          <Panel title="Why Is This Asset Risky?">
            <div className="grid gap-3 md:grid-cols-2">
              {asset.risk.factors.map((factor) => (
                <div className="rounded-lg border border-white/10 bg-slate-950/45 p-4" key={factor.label}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold">{factor.label}</h3>
                    <RiskBadge level={factor.severity} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{factor.detail}</p>
                  <p className="mt-3 text-sm font-bold text-blue-200">Contribution: {factor.contribution}%</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Panel title="Sensor Trace">
          <SensorMultiChart assetId={asset.id} />
        </Panel>
        <Panel title="Recommended Actions">
          <ol className="space-y-3">
            {asset.risk.recommendations.map((item, index) => (
              <li className="flex gap-3 rounded-lg border border-white/10 bg-slate-950/45 p-3 text-sm text-slate-200" key={item}>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-blue-500/20 text-xs font-black text-blue-100">{index + 1}</span>
                {item}
              </li>
            ))}
          </ol>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              [Gauge, "Monitor every 30 min"],
              [Wrench, "Maintenance within 24h"],
              [Clock, "Escalate if threshold exceeded"],
            ].map(([Icon, label]) => (
              <div className="rounded-lg border border-white/10 bg-blue-500/10 p-3 text-sm" key={label as string}>
                <Icon className="mb-2 h-4 w-4 text-blue-200" />
                {label as string}
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div className="mt-5">
        <Panel title="Risk Contribution Breakdown">
          <ContributionChart data={asset.risk.factors.map((factor) => ({ name: factor.label, value: factor.contribution }))} />
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            Audit snapshot saved with model version SPX-RiskEngine-0.9.4.
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
