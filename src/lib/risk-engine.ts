import { Criticality, RiskFactor, RiskInput, RiskResult, SensorReading, Trend } from "@/types";
import { clamp, riskLevel } from "@/lib/utils";

const criticalityMap: Record<Criticality, number> = {
  Low: 25,
  Medium: 50,
  High: 76,
  Critical: 94,
};

function recentAverage(values: Array<number | undefined>) {
  const clean = values.filter((value): value is number => typeof value === "number");
  if (!clean.length) return undefined;
  return clean.reduce((total, value) => total + value, 0) / clean.length;
}

function detectTrend(history: SensorReading[] = []): Trend {
  if (history.length < 6) return "stable";
  const first = history.slice(0, 5);
  const last = history.slice(-5);
  const firstVibration = recentAverage(first.map((reading) => reading.vibration)) ?? 0;
  const lastVibration = recentAverage(last.map((reading) => reading.vibration)) ?? 0;
  const firstTemp = recentAverage(first.map((reading) => reading.temperature)) ?? 0;
  const lastTemp = recentAverage(last.map((reading) => reading.temperature)) ?? 0;
  const latest = history.at(-1);
  const previous = history.at(-2);

  if (
    latest &&
    previous &&
    ((latest.vibration ?? 0) > (previous.vibration ?? 0) * 1.25 ||
      (latest.temperature ?? 0) > (previous.temperature ?? 0) * 1.12)
  ) {
    return "spike";
  }

  if (lastVibration > firstVibration * 1.16 || lastTemp > firstTemp * 1.12) return "increasing";
  if (lastVibration < firstVibration * 0.9 && lastTemp < firstTemp * 0.94) return "decreasing";
  return "stable";
}

function sensorRisk(input: RiskInput) {
  const temperature = input.temperature ?? recentAverage(input.sensorHistory?.slice(-3).map((r) => r.temperature) ?? []);
  const pressure = input.pressure ?? recentAverage(input.sensorHistory?.slice(-3).map((r) => r.pressure) ?? []);
  const vibration = input.vibration ?? recentAverage(input.sensorHistory?.slice(-3).map((r) => r.vibration) ?? []);
  const rotationalSpeed =
    input.rotationalSpeed ?? recentAverage(input.sensorHistory?.slice(-3).map((r) => r.rotationalSpeed) ?? []);
  const torque = input.torque ?? recentAverage(input.sensorHistory?.slice(-3).map((r) => r.torque) ?? []);
  const trend = detectTrend(input.sensorHistory);

  const scores = [
    temperature === undefined ? 55 : temperature > 96 ? 100 : temperature > 88 ? 82 : temperature > 78 ? 55 : 22,
    pressure === undefined ? 50 : pressure < 65 || pressure > 150 ? 88 : pressure < 78 || pressure > 132 ? 58 : 20,
    vibration === undefined ? 60 : vibration > 8.2 ? 100 : vibration > 6.1 ? 78 : vibration > 4.2 ? 48 : 18,
    rotationalSpeed === undefined ? 35 : rotationalSpeed > 3650 || rotationalSpeed < 980 ? 74 : 25,
    torque === undefined ? 35 : torque > 870 ? 74 : torque > 760 ? 50 : 22,
    trend === "spike" ? 90 : trend === "increasing" ? 72 : trend === "decreasing" ? 18 : 30,
  ];

  return { score: clamp(scores.reduce((total, value) => total + value, 0) / scores.length), trend };
}

export function analyzeRisk(input: RiskInput): RiskResult {
  const sensor = sensorRisk(input);
  const failureHistoryRisk = clamp((input.previousFailures ?? 0) * 25);
  const maintenanceRisk = clamp(((input.daysSinceMaintenance ?? 0) / 120) * 100);
  const inspectionRisk = clamp((input.inspectionIssues ?? 0) * 22);
  const criticalityRisk = criticalityMap[input.criticality];
  const mlFailureProbability = clamp(input.mlFailureProbability ?? 42);

  const score = clamp(
    0.25 * sensor.score +
      0.2 * failureHistoryRisk +
      0.2 * maintenanceRisk +
      0.15 * inspectionRisk +
      0.1 * criticalityRisk +
      0.1 * mlFailureProbability,
  );
  const level = riskLevel(score);
  const factors: RiskFactor[] = [
    {
      label: "Sensor behavior",
      contribution: Math.round(0.25 * sensor.score),
      detail:
        sensor.trend === "increasing"
          ? "Recent readings show gradual deterioration before a hard threshold breach."
          : sensor.trend === "spike"
            ? "A sudden sensor spike was detected in the latest readings."
            : "Sensor readings are within expected operating behavior.",
      severity: riskLevel(sensor.score),
    },
    {
      label: "Maintenance exposure",
      contribution: Math.round(0.2 * maintenanceRisk),
      detail:
        (input.daysSinceMaintenance ?? 0) > 90
          ? `Maintenance is overdue by ${Math.max(1, (input.daysSinceMaintenance ?? 90) - 90)} days.`
          : "Preventive maintenance is still within the expected window.",
      severity: riskLevel(maintenanceRisk),
    },
    {
      label: "Failure history",
      contribution: Math.round(0.2 * failureHistoryRisk),
      detail:
        (input.previousFailures ?? 0) > 1
          ? `${input.previousFailures} failures were logged in recent operating history.`
          : "Failure history is limited.",
      severity: riskLevel(failureHistoryRisk),
    },
    {
      label: "Inspection findings",
      contribution: Math.round(0.15 * inspectionRisk),
      detail:
        (input.inspectionIssues ?? 0) > 0
          ? `${input.inspectionIssues} unresolved inspection issues remain open.`
          : "No unresolved inspection findings are currently open.",
      severity: riskLevel(inspectionRisk),
    },
    {
      label: "Asset criticality",
      contribution: Math.round(0.1 * criticalityRisk),
      detail: `${input.criticality} operational criticality increases inspection priority.`,
      severity: riskLevel(criticalityRisk),
    },
  ].sort((a, b) => b.contribution - a.contribution);

  const missing = [
    ["temperature", input.temperature],
    ["pressure", input.pressure],
    ["vibration", input.vibration],
    ["rotational speed", input.rotationalSpeed],
    ["torque", input.torque],
  ].filter(([, value]) => value === undefined);
  const confidence = clamp(96 - missing.length * 9 - ((input.inspectionIssues ?? 0) > 4 ? 6 : 0));
  const confidenceReasons = [
    missing.length ? `Missing ${missing.map(([label]) => label).join(", ")} readings` : "Core sensor data available",
    input.daysSinceMaintenance !== undefined ? "Maintenance history available" : "Maintenance history incomplete",
    input.inspectionIssues !== undefined ? "Inspection report available" : "Inspection report incomplete",
    confidence < 60 ? "AI recommendation should be manually verified due to incomplete data." : "Data confidence is suitable for prioritization.",
  ];

  const recommendations = buildRecommendations(input, sensor.score);
  const why = `This asset is classified as ${level} risk primarily because ${factors
    .slice(0, 3)
    .map((factor) => factor.detail.toLowerCase())
    .join(", ")} The model confidence is ${confidence}%.`;

  return {
    score,
    level,
    confidence,
    confidenceReasons,
    trend: sensor.trend,
    factors,
    recommendations,
    componentScores: {
      sensorRisk: sensor.score,
      failureHistoryRisk,
      maintenanceRisk,
      inspectionRisk,
      criticalityRisk,
      mlFailureProbability,
    },
    why,
  };
}

export function buildRecommendations(input: RiskInput, sensorScore = 0) {
  const recs: string[] = [];
  if ((input.temperature ?? 0) > 86) recs.push("Inspect the cooling system and heat dissipation components.");
  if ((input.vibration ?? 0) > 5.7) recs.push("Inspect bearings, rotating components, and shaft alignment.");
  if ((input.pressure ?? 100) < 75 || (input.pressure ?? 100) > 132) {
    recs.push("Inspect pressure relief valves and pressure regulation systems.");
  }
  if ((input.daysSinceMaintenance ?? 0) > 90) recs.push("Schedule preventive maintenance immediately.");
  if ((input.previousFailures ?? 0) >= 2) recs.push("Perform a root cause analysis before returning to full duty.");
  if ((input.inspectionIssues ?? 0) > 0) recs.push("Close unresolved inspection findings and verify corrective actions.");
  if (sensorScore > 70) recs.push("Increase monitoring frequency until a safety engineer reviews the asset.");
  if (!input.vibration || !input.temperature) recs.push("Calibrate or inspect missing sensors and collect additional readings.");
  return recs.length ? recs.slice(0, 5) : ["Continue normal monitoring and preserve the preventive maintenance schedule."];
}
