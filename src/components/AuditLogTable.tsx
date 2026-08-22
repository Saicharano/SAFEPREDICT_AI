"use client";

import { useState } from "react";
import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import { auditEntries } from "@/data/mock-data";
import RiskBadge from "@/components/RiskBadge";

export default function AuditLogTable() {
  const [open, setOpen] = useState<string | null>(auditEntries[0]?.id ?? null);
  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <table className="w-full min-w-[980px] border-collapse text-left text-sm">
        <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.14em] text-slate-400">
          <tr>
            <th className="px-4 py-3">Timestamp</th>
            <th className="px-4 py-3">Asset</th>
            <th className="px-4 py-3">Risk</th>
            <th className="px-4 py-3">Key Factors</th>
            <th className="px-4 py-3">Recommended Action</th>
            <th className="px-4 py-3">Confidence</th>
            <th className="px-4 py-3">Model</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {auditEntries.map((entry) => (
            <Fragment key={entry.id}>
              <tr className="bg-slate-950/25">
                <td className="px-4 py-3 text-slate-300">{entry.timestamp}</td>
                <td className="px-4 py-3 font-bold">{entry.asset}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-black">{entry.riskScore}</span>
                    <RiskBadge level={entry.riskLevel} />
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-300">{entry.keyFactors.join(", ")}</td>
                <td className="px-4 py-3 text-slate-300">{entry.recommendedAction}</td>
                <td className="px-4 py-3">{entry.confidence}%</td>
                <td className="px-4 py-3">
                  <button className="flex items-center gap-2 text-blue-200" onClick={() => setOpen(open === entry.id ? null : entry.id)}>
                    {entry.modelVersion}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </td>
              </tr>
              {open === entry.id && (
                <tr key={`${entry.id}-reasoning`}>
                  <td className="px-4 py-4 text-slate-300" colSpan={7}>
                    <span className="font-bold text-slate-100">Complete reasoning trail: </span>
                    {entry.reasoningTrail}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
