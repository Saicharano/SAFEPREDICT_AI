"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { assets, dashboardStats, failureTrends, maintenanceBottlenecks, riskTrend } from "@/data/mock-data";

const riskDistribution = [
  { name: "High", value: dashboardStats.highRiskAssets, color: "#ef4444" },
  { name: "Medium", value: dashboardStats.mediumRiskAssets, color: "#f59e0b" },
  { name: "Low", value: dashboardStats.lowRiskAssets, color: "#10b981" },
];

const tooltipStyle = {
  background: "#0f172a",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  color: "#e2e8f0",
};

export function RiskDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={riskDistribution} dataKey="value" innerRadius={70} outerRadius={98} paddingAngle={4}>
          {riskDistribution.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RiskTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={riskTrend}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="month" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="safety" stroke="#38bdf8" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function FailureTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={failureTrends}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#60a5fa" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MaintenanceBottleneckChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={maintenanceBottlenecks}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="team" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="overdue" stackId="a" fill="#ef4444" />
        <Bar dataKey="upcoming" stackId="a" fill="#22c55e" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SensorMultiChart({ assetId }: { assetId?: string }) {
  const asset = assets.find((item) => item.id === assetId) ?? assets[0];
  return (
    <ResponsiveContainer width="100%" height={360}>
      <AreaChart data={asset.sensorHistory}>
        <defs>
          <linearGradient id="temp" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="vibration" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="day" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="temperature" stroke="#f87171" fill="url(#temp)" strokeWidth={2} />
        <Area type="monotone" dataKey="vibration" stroke="#a78bfa" fill="url(#vibration)" strokeWidth={2} />
        <Line type="monotone" dataKey="pressure" stroke="#38bdf8" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ContributionChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
        <XAxis type="number" stroke="#94a3b8" />
        <YAxis dataKey="name" type="category" width={120} stroke="#94a3b8" />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="value" fill="#818cf8" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
