"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, BrainCircuit } from "lucide-react";
import { analyzeRisk } from "@/lib/risk-engine";
import RiskBadge from "@/components/RiskBadge";
import WhyThisRisk from "@/components/WhyThisRisk";
import { ContributionChart } from "@/components/Charts";
import { Criticality } from "@/types";

export default function AnalyzerForm() {
  const [form, setForm] = useState({
    temperature: 91,
    pressure: 142,
    vibration: 7.4,
    rotationalSpeed: 3280,
    torque: 805,
    daysSinceMaintenance: 118,
    previousFailures: 3,
    inspectionIssues: 4,
    criticality: "Critical" as Criticality,
  });
  const result = useMemo(() => analyzeRisk({ ...form, mlFailureProbability: 86 }), [form]);
  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: key === "criticality" ? value : Number(value) }));
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <div className="mb-5 flex items-center gap-3">
          <BrainCircuit className="h-5 w-5 text-blue-300" />
          <h2 className="text-lg font-bold">AI Risk Analyzer</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Temperature", "temperature", 0, 130],
            ["Pressure", "pressure", 40, 180],
            ["Vibration", "vibration", 0, 12],
            ["Rotational speed", "rotationalSpeed", 500, 4200],
            ["Torque", "torque", 200, 1000],
            ["Days since maintenance", "daysSinceMaintenance", 0, 180],
            ["Previous failures", "previousFailures", 0, 6],
            ["Inspection issues", "inspectionIssues", 0, 8],
          ].map(([label, key, min, max]) => (
            <label className="space-y-2 text-sm" key={key as string}>
              <span className="text-slate-300">{label}</span>
              <input
                className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none focus:border-blue-300/50"
                max={max as number}
                min={min as number}
                type="number"
                value={form[key as keyof typeof form] as number}
                onChange={(event) => update(key as keyof typeof form, event.target.value)}
              />
            </label>
          ))}
          <label className="space-y-2 text-sm sm:col-span-2">
            <span className="text-slate-300">Asset criticality</span>
            <select
              className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none"
              value={form.criticality}
              onChange={(event) => update("criticality", event.target.value)}
            >
              {["Low", "Medium", "High", "Critical"].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      </section>
      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-400">Risk Score</p>
            <div className="mt-1 text-5xl font-black">{result.score}/100</div>
          </div>
          <div className="text-right">
            <RiskBadge level={result.level} />
            <p className="mt-3 text-sm text-slate-400">Confidence: <span className="font-bold text-slate-100">{result.confidence}%</span></p>
          </div>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <ContributionChart data={result.factors.map((factor) => ({ name: factor.label, value: factor.contribution }))} />
          <div className="space-y-3">
            <h3 className="font-bold">Recommended Action</h3>
            {result.recommendations.map((item) => (
              <div className="flex gap-3 rounded-lg border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-200" key={item}>
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <WhyThisRisk risk={result} />
        </div>
      </section>
    </div>
  );
}
