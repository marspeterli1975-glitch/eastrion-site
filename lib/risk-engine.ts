import type { RiskScanResult } from "./risk-types";

type ScoreMap = Record<string, number>;

const countryRiskMap: ScoreMap = {
  india: 18,
  china: 14,
  australia: 6,
  "united states": 12,
  usa: 12,
  germany: 7,
  "saudi arabia": 13,
  uae: 10,
  vietnam: 15,
  indonesia: 16,
  brazil: 17,
  "south africa": 18,
  mexico: 16,
  default: 12,
};

const industryRiskMap: ScoreMap = {
  battery: 22,
  batteries: 22,
  chemicals: 20,
  mining: 18,
  logistics: 14,
  manufacturing: 16,
  automotive: 15,
  electronics: 17,
  food: 10,
  textiles: 12,
  default: 14,
};

const logisticsRiskMap: ScoreMap = {
  battery: 18,
  batteries: 18,
  chemicals: 16,
  mining: 15,
  logistics: 12,
  manufacturing: 13,
  automotive: 12,
  electronics: 14,
  food: 10,
  textiles: 11,
  default: 12,
};

const eventRiskMap: ScoreMap = {
  india: 11,
  china: 10,
  australia: 5,
  "united states": 8,
  usa: 8,
  germany: 5,
  "saudi arabia": 9,
  uae: 7,
  vietnam: 9,
  indonesia: 10,
  brazil: 10,
  "south africa": 11,
  mexico: 10,
  default: 8,
};

function normalizeInput(value: string) {
  return value.trim().toLowerCase();
}

function getScore(map: ScoreMap, key: string) {
  return map[key] ?? map.default;
}

function getGrade(score: number) {
  if (score <= 20) return "A";
  if (score <= 40) return "B";
  if (score <= 60) return "C";
  if (score <= 80) return "D";
  return "E";
}

function getLevel(score: number) {
  if (score <= 20) return "Low";
  if (score <= 40) return "Guarded";
  if (score <= 60) return "Moderate";
  if (score <= 80) return "High";
  return "Critical";
}

function buildSummary(country: string, industry: string, level: string) {
  return `This scan indicates a ${level.toLowerCase()} supply chain exposure level for ${industry} activity in ${country}. The score reflects structural country conditions, sector sensitivity, logistics complexity, and current event-linked disruption potential.`;
}

function buildRiskFactors(country: string, industry: string, totalScore: number) {
  const factors: string[] = [];

  if (
    ["india", "vietnam", "indonesia", "mexico", "brazil", "south africa"].includes(
      normalizeInput(country)
    )
  ) {
    factors.push("Potential infrastructure and execution variability in cross-border operations");
  }

  if (
    ["battery", "batteries", "chemicals", "electronics", "mining"].includes(
      normalizeInput(industry)
    )
  ) {
    factors.push("Higher compliance, hazardous handling, or strategic material sensitivity");
  }

  if (totalScore > 40) {
    factors.push("Elevated likelihood of shipment delays, supplier instability, or operational friction");
  }

  if (totalScore > 60) {
    factors.push("Exposure to compounding disruption from geopolitical or regulatory shifts");
  }

  if (factors.length === 0) {
    factors.push("No immediate severe structural warning, but ongoing monitoring is still recommended");
  }

  return factors;
}

function buildSuggestedAwareness(score: number) {
  if (score <= 20) {
    return [
      "Maintain standard supplier qualification checks",
      "Track basic country and route developments quarterly",
      "Keep backup logistics options documented",
    ];
  }

  if (score <= 40) {
    return [
      "Review supplier concentration and shipment dependency",
      "Introduce periodic route and lead-time reviews",
      "Validate regulatory and customs assumptions before shipment",
    ];
  }

  if (score <= 60) {
    return [
      "Establish alternate supplier or routing options",
      "Increase monitoring frequency on disruption indicators",
      "Stress test lead time, inventory, and compliance exposure",
    ];
  }

  if (score <= 80) {
    return [
      "Implement contingency sourcing and logistics planning",
      "Escalate internal review before major commitments",
      "Add contractual and operational buffers for volatility",
    ];
  }

  return [
    "Treat this corridor or sourcing setup as highly sensitive",
    "Require executive review before scaling commitments",
    "Deploy active monitoring, fallback suppliers, and route redundancy",
  ];
}

export function runRiskScan(country: string, industry: string): RiskScanResult {
  const normalizedCountry = normalizeInput(country);
  const normalizedIndustry = normalizeInput(industry);

  const country_risk = getScore(countryRiskMap, normalizedCountry);
  const industry_risk = getScore(industryRiskMap, normalizedIndustry);
  const logistics_risk = getScore(logisticsRiskMap, normalizedIndustry);
  const event_risk = getScore(eventRiskMap, normalizedCountry);

  const rawTotal = country_risk + industry_risk + logistics_risk + event_risk;
  const risk_score = Math.max(0, Math.min(100, rawTotal));

  const grade = getGrade(risk_score);
  const level = getLevel(risk_score);

  return {
    country,
    industry,
    risk_score,
    grade,
    level,
    summary: buildSummary(country, industry, level),
    risk_factors: buildRiskFactors(country, industry, risk_score),
    suggested_risk_awareness: buildSuggestedAwareness(risk_score),
    breakdown: {
      country_risk,
      industry_risk,
      logistics_risk,
      event_risk,
    },
    disclaimer:
      "RiskAtlas is a supply chain exposure scanning tool for informational use only. It does not constitute legal, financial, insurance, customs, investment, or compliance advice.",
  };
}
