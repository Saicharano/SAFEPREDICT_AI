import { riskColor } from "@/lib/utils";
import { RiskLevel } from "@/types";

export default function RiskBadge({ level }: { level: RiskLevel }) {
  return <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${riskColor(level)}`}>{level}</span>;
}
