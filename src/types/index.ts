export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type Trend = "stable" | "increasing" | "decreasing" | "spike";
export type AssetType =
  | "Boiler"
  | "Pump"
  | "Compressor"
  | "Conveyor"
  | "Turbine"
  | "Motor"
  | "Heat Exchanger";

export type Criticality = "Low" | "Medium" | "High" | "Critical";

export type SensorReading = {
  day: string;
  temperature?: number;
  pressure?: number;
  vibration?: number;
  rotationalSpeed?: number;
  torque?: number;
};

export type RiskInput = {
  temperature?: number;
  pressure?: number;
  vibration?: number;
  rotationalSpeed?: number;
  torque?: number;
  daysSinceMaintenance?: number;
  previousFailures?: number;
  inspectionIssues?: number;
  criticality: Criticality;
  mlFailureProbability?: number;
  sensorHistory?: SensorReading[];
};

export type RiskFactor = {
  label: string;
  contribution: number;
  detail: string;
  severity: RiskLevel;
};

export type RiskResult = {
  score: number;
  level: RiskLevel;
  confidence: number;
  confidenceReasons: string[];
  trend: Trend;
  factors: RiskFactor[];
  recommendations: string[];
  componentScores: {
    sensorRisk: number;
    failureHistoryRisk: number;
    maintenanceRisk: number;
    inspectionRisk: number;
    criticalityRisk: number;
    mlFailureProbability: number;
  };
  why: string;
};

export type Asset = {
  id: string;
  name: string;
  type: AssetType;
  location: string;
  installationYear: number;
  criticality: Criticality;
  status: "Running" | "Limited" | "Standby" | "Offline";
  lastMaintenanceDays: number;
  previousFailures: number;
  inspectionIssues: number;
  mlFailureProbability: number;
  sensorHistory: SensorReading[];
  risk: RiskResult;
  recommendedAction: string;
};

export type AuditEntry = {
  id: string;
  timestamp: string;
  assetId: string;
  asset: string;
  riskScore: number;
  riskLevel: RiskLevel;
  keyFactors: string[];
  recommendedAction: string;
  confidence: number;
  modelVersion: string;
  reasoningTrail: string;
};
