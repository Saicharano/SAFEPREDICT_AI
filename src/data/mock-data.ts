import { analyzeRisk } from "@/lib/risk-engine";
import { Asset, AssetType, AuditEntry, Criticality, SensorReading } from "@/types";

const types: AssetType[] = ["Boiler", "Pump", "Compressor", "Conveyor", "Turbine", "Motor", "Heat Exchanger"];
const locations = ["North Refinery", "West Utilities", "Line 3", "Cooling Yard", "Turbine Hall", "Packaging Bay", "South Process"];
const criticalities: Criticality[] = ["Low", "Medium", "High", "Critical"];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function makeHistory(index: number, mode: "normal" | "deteriorating" | "spike" | "missing"): SensorReading[] {
  return Array.from({ length: 28 }, (_, day) => {
    const drift = mode === "deteriorating" ? day * 0.55 : 0;
    const spike = mode === "spike" && day > 24 ? (day - 23) * 6 : 0;
    const missing = mode === "missing" && day % 7 === 0;
    return {
      day: `D-${27 - day}`,
      temperature: missing ? undefined : Math.round(62 + (index % 9) * 2.2 + drift + spike),
      pressure: Math.round(92 + (index % 5) * 7 + (mode === "spike" && day > 24 ? 18 : 0)),
      vibration: missing ? undefined : Number((2.1 + (index % 6) * 0.55 + drift / 9 + spike / 14).toFixed(1)),
      rotationalSpeed: Math.round(1420 + (index % 8) * 180 + (mode === "deteriorating" ? day * 8 : 0)),
      torque: Math.round(430 + (index % 10) * 28 + (mode === "spike" && day > 24 ? 90 : 0)),
    };
  });
}

function assetName(type: AssetType, number: number) {
  return `${type.replace("Heat Exchanger", "HX")}-${pad(number)}`;
}

const seededProfiles = [
  { type: "Boiler" as AssetType, number: 7, location: "North Refinery", mode: "deteriorating" as const, criticality: "Critical" as const, days: 122, failures: 3, issues: 4, ml: 91 },
  { type: "Compressor" as AssetType, number: 12, location: "West Utilities", mode: "spike" as const, criticality: "Critical" as const, days: 104, failures: 2, issues: 3, ml: 88 },
  { type: "Pump" as AssetType, number: 4, location: "Line 3", mode: "deteriorating" as const, criticality: "High" as const, days: 97, failures: 2, issues: 2, ml: 80 },
  { type: "Conveyor" as AssetType, number: 9, location: "Packaging Bay", mode: "deteriorating" as const, criticality: "High" as const, days: 83, failures: 1, issues: 3, ml: 74 },
];

export const assets: Asset[] = Array.from({ length: 54 }, (_, index) => {
  const seeded = seededProfiles[index];
  const type = seeded?.type ?? types[index % types.length];
  const number = seeded?.number ?? index + 11;
  const location = seeded?.location ?? locations[index % locations.length];
  const mode =
    seeded?.mode ?? (index % 13 === 0 ? "missing" : index % 9 === 0 ? "spike" : index % 4 === 0 ? "deteriorating" : "normal");
  const criticality = seeded?.criticality ?? criticalities[(index + 1) % criticalities.length];
  const sensorHistory = makeHistory(index + 3, mode);
  const latest = sensorHistory.at(-1) ?? {};
  const input = {
    ...latest,
    criticality,
    daysSinceMaintenance: seeded?.days ?? 28 + ((index * 11) % 126),
    previousFailures: seeded?.failures ?? (index % 10 === 0 ? 3 : index % 5 === 0 ? 2 : index % 3 === 0 ? 1 : 0),
    inspectionIssues: seeded?.issues ?? (index % 11 === 0 ? 4 : index % 6 === 0 ? 2 : index % 4 === 0 ? 1 : 0),
    mlFailureProbability: seeded?.ml ?? 18 + ((index * 7) % 74),
    sensorHistory,
  };
  const risk = analyzeRisk(input);
  const status: Asset["status"] = risk.level === "HIGH" ? "Limited" : index % 8 === 0 ? "Standby" : "Running";
  return {
    id: `asset-${pad(index + 1)}`,
    name: assetName(type, number),
    type,
    location,
    installationYear: 1998 + ((index * 3) % 24),
    criticality,
    status,
    lastMaintenanceDays: input.daysSinceMaintenance,
    previousFailures: input.previousFailures,
    inspectionIssues: input.inspectionIssues,
    mlFailureProbability: input.mlFailureProbability,
    sensorHistory,
    risk,
    recommendedAction: risk.recommendations[0],
  };
}).sort((a, b) => b.risk.score - a.risk.score);

export const dashboardStats = {
  totalAssets: 124,
  highRiskAssets: 12,
  mediumRiskAssets: 31,
  lowRiskAssets: 81,
  activeAlerts: 5,
  averageSafetyScore: 74,
};

export const riskTrend = [
  { month: "Mar", high: 7, medium: 25, safety: 81 },
  { month: "Apr", high: 9, medium: 27, safety: 78 },
  { month: "May", high: 8, medium: 29, safety: 79 },
  { month: "Jun", high: 11, medium: 32, safety: 75 },
  { month: "Jul", high: 13, medium: 31, safety: 73 },
  { month: "Aug", high: 12, medium: 31, safety: 74 },
];

export const failureTrends = [
  { name: "Overheat", count: 14 },
  { name: "Vibration", count: 11 },
  { name: "Pressure", count: 8 },
  { name: "Bearing", count: 7 },
  { name: "Control", count: 5 },
];

export const maintenanceBottlenecks = [
  { team: "Mechanical", overdue: 18, upcoming: 24 },
  { team: "Electrical", overdue: 9, upcoming: 19 },
  { team: "Instrumentation", overdue: 13, upcoming: 16 },
  { team: "Process", overdue: 7, upcoming: 11 },
];

export const maintenanceTimeline = [
  { date: "Aug 23", title: "Boiler-07 emergency cooling inspection", status: "Critical" },
  { date: "Aug 24", title: "Compressor-12 vibration analysis", status: "High" },
  { date: "Aug 26", title: "Pump-04 bearing replacement window", status: "High" },
  { date: "Aug 29", title: "Line 3 preventive maintenance batch", status: "Medium" },
  { date: "Sep 02", title: "Turbine Hall thermal audit", status: "Medium" },
];

export const auditEntries: AuditEntry[] = assets.slice(0, 12).map((asset, index) => ({
  id: `audit-${index + 1}`,
  timestamp: `2026-08-${pad(22 - Math.floor(index / 2))} ${pad(14 - index)}:${pad((index * 7) % 60)} IST`,
  assetId: asset.id,
  asset: asset.name,
  riskScore: asset.risk.score,
  riskLevel: asset.risk.level,
  keyFactors: asset.risk.factors.slice(0, 3).map((factor) => factor.label),
  recommendedAction: asset.recommendedAction,
  confidence: asset.risk.confidence,
  modelVersion: "SPX-RiskEngine-0.9.4",
  reasoningTrail: `${asset.risk.why} Component scores: sensor ${asset.risk.componentScores.sensorRisk}, maintenance ${asset.risk.componentScores.maintenanceRisk}, failures ${asset.risk.componentScores.failureHistoryRisk}, inspection ${asset.risk.componentScores.inspectionRisk}.`,
}));

export function getAsset(id: string) {
  return assets.find((asset) => asset.id === id) ?? assets[0];
}
