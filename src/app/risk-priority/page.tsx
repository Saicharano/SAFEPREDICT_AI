import AppShell from "@/components/AppShell";
import AssetPriorityTable from "@/components/AssetPriorityTable";
import Panel from "@/components/Panel";

export default function RiskPriorityPage() {
  return (
    <AppShell>
      <Panel title="Risk Priority Center">
        <p className="mb-5 max-w-3xl text-sm leading-6 text-slate-400">
          Assets are ranked by AI risk score, operational criticality, sensor trend, maintenance exposure, and open inspection issues.
        </p>
        <AssetPriorityTable />
      </Panel>
    </AppShell>
  );
}
