export type RiskBreakdown = {
  country_risk: number;
  industry_risk: number;
  logistics_risk: number;
  event_risk: number;
};

export type RiskScanResult = {
  country: string;
  industry: string;
  risk_score: number;
  grade: string;
  level: string;
  summary: string;
  risk_factors: string[];
  suggested_risk_awareness: string[];
  breakdown: RiskBreakdown;
  disclaimer: string;
};
