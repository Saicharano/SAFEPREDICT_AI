"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDownUp, Search } from "lucide-react";
import { assets } from "@/data/mock-data";
import RiskBadge from "@/components/RiskBadge";

export default function AssetPriorityTable() {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("All");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [ascending, setAscending] = useState(false);
  const locations = Array.from(new Set(assets.map((asset) => asset.location)));
  const types = Array.from(new Set(assets.map((asset) => asset.type)));
  const filtered = assets
    .filter((asset) => `${asset.name} ${asset.type} ${asset.location}`.toLowerCase().includes(query.toLowerCase()))
    .filter((asset) => risk === "All" || asset.risk.level === risk)
    .filter((asset) => location === "All" || asset.location === location)
    .filter((asset) => type === "All" || asset.type === type)
    .sort((a, b) => (ascending ? a.risk.score - b.risk.score : b.risk.score - a.risk.score));

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-400">
          <Search className="h-4 w-4" />
          <input className="w-full bg-transparent text-slate-100 outline-none" placeholder="Search assets" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        {[["Risk", risk, setRisk, ["All", "HIGH", "MEDIUM", "LOW"]], ["Location", location, setLocation, ["All", ...locations]], ["Type", type, setType, ["All", ...types]]].map(
          ([label, value, setter, options]) => (
            <select
              className="rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none"
              key={label as string}
              value={value as string}
              onChange={(event) => (setter as (value: string) => void)(event.target.value)}
            >
              {(options as string[]).map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          ),
        )}
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.14em] text-slate-400">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Asset</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">
                <button className="flex items-center gap-2" onClick={() => setAscending(!ascending)}>
                  Risk Score <ArrowDownUp className="h-3 w-3" />
                </button>
              </th>
              <th className="px-4 py-3">Risk Level</th>
              <th className="px-4 py-3">Criticality</th>
              <th className="px-4 py-3">Trend</th>
              <th className="px-4 py-3">Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.map((asset, index) => (
              <tr className={asset.risk.level === "HIGH" ? "bg-red-500/[0.06]" : "bg-transparent"} key={asset.id}>
                <td className="px-4 py-3 font-bold text-slate-300">#{index + 1}</td>
                <td className="px-4 py-3">
                  <Link className="font-bold text-blue-200 hover:text-blue-100" href={`/assets/${asset.id}`}>
                    {asset.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-300">{asset.type}</td>
                <td className="px-4 py-3 text-slate-300">{asset.location}</td>
                <td className="px-4 py-3 text-lg font-black">{asset.risk.score}</td>
                <td className="px-4 py-3"><RiskBadge level={asset.risk.level} /></td>
                <td className="px-4 py-3">{asset.criticality}</td>
                <td className="px-4 py-3 capitalize text-slate-300">{asset.risk.trend}</td>
                <td className="px-4 py-3 text-slate-300">{asset.recommendedAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
