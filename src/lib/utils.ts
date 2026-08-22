import { RiskLevel } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function riskLevel(score: number): RiskLevel {
  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}

export function riskColor(level: RiskLevel) {
  if (level === "HIGH") return "text-red-300 bg-red-500/15 border-red-400/30";
  if (level === "MEDIUM") return "text-amber-200 bg-amber-500/15 border-amber-400/30";
  return "text-emerald-200 bg-emerald-500/15 border-emerald-400/30";
}

export function formatPct(value: number) {
  return `${Math.round(value)}%`;
}
