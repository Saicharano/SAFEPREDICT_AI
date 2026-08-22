import AppShell from "@/components/AppShell";
import AuditLogTable from "@/components/AuditLogTable";
import Panel from "@/components/Panel";

export default function AuditLogPage() {
  return (
    <AppShell>
      <Panel title="Transparent AI Decision History">
        <p className="mb-5 max-w-3xl text-sm leading-6 text-slate-400">
          Every AI recommendation is captured with a timestamp, factor summary, confidence score, model version, and expandable reasoning trail.
        </p>
        <AuditLogTable />
      </Panel>
    </AppShell>
  );
}
