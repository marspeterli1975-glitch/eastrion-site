import type { RiskScanResult } from "./risk-types";

export type RiskDimension = keyof RiskScanResult["breakdown"];

const levelPosture: Record<string, string> = {
  low: "The exposure is suitable for routine execution under standard controls.",
  guarded:
    "The exposure remains workable, but watch-list indicators should be reviewed before firm commitments.",
  moderate:
    "The exposure remains workable, but commitments should be supported by targeted controls and closer monitoring.",
  high:
    "The exposure should be treated as a controlled channel, with alternatives and escalation thresholds agreed before execution.",
  critical:
    "The exposure should not be scaled without material risk reduction, fallback capacity, and management approval.",
};

const advisoryPosture: Record<string, string> = {
  low: "Maintain the current control baseline and verify that routine monitoring remains current.",
  guarded:
    "Preserve commercial flexibility and review watch-list signals before confirming timing or cost assumptions.",
  moderate:
    "Validate alternatives and operating buffers before converting the opportunity into a firm commitment.",
  high:
    "Limit exposure until contingency routes, supplier alternatives, and escalation ownership are confirmed.",
  critical:
    "Pause expansion and redesign the operating approach around risk reduction and fallback execution.",
};

const industryContexts: Array<{
  match: string[];
  focus: string;
  action: string;
}> = [
  {
    match: ["electronics", "semiconductor"],
    focus: "component availability, supplier traceability, and compliance-sensitive sourcing",
    action:
      "Validate component availability, supplier traceability, and compliance documentation before the next commitment.",
  },
  {
    match: ["oil", "energy", "petroleum"],
    focus: "price exposure, supply continuity, and transport-handling assumptions",
    action:
      "Validate supply continuity, transport-handling assumptions, and price exposure before the next commitment.",
  },
  {
    match: ["battery"],
    focus: "strategic-material availability, hazardous handling, and compliance traceability",
    action:
      "Validate strategic-material availability, hazardous-handling controls, and compliance evidence before commitment.",
  },
  {
    match: ["chemical"],
    focus: "hazardous handling, regulatory documentation, and route suitability",
    action:
      "Validate hazardous-handling controls, regulatory documentation, and route suitability before shipment planning.",
  },
  {
    match: ["automotive"],
    focus: "component continuity, sequencing reliability, and supplier concentration",
    action:
      "Validate component continuity, delivery sequencing, and supplier concentration before confirming production commitments.",
  },
  {
    match: ["logistics"],
    focus: "capacity availability, schedule reliability, and exception handling",
    action:
      "Validate capacity availability, schedule reliability, and exception-handling ownership before execution.",
  },
];

function getIndustryContext(industry: string) {
  const normalized = industry.trim().toLowerCase();
  return (
    industryContexts.find((item) =>
      item.match.some((keyword) => normalized.includes(keyword))
    ) || {
      focus: "supplier readiness, logistics continuity, and market-access requirements",
      action: `Validate supplier readiness, logistics continuity, and market-access requirements for ${industry} before commitment.`,
    }
  );
}

function lowerFirst(value: string) {
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : value;
}

export function getRiskBandLabel(score: number) {
  if (score <= 20) return "Low";
  if (score <= 40) return "Guarded";
  if (score <= 60) return "Moderate";
  if (score <= 80) return "High";
  return "Critical";
}

export function getPreferredRiskFactors(data: RiskScanResult) {
  if (data.risk_factors.length > 0) return data.risk_factors;
  return [
    `${data.industry} exposure in ${data.country} requires ongoing supplier, logistics, and event monitoring.`,
  ];
}

export function getPreferredRecommendations(data: RiskScanResult) {
  if (data.suggested_risk_awareness.length > 0) {
    return data.suggested_risk_awareness;
  }

  return [
    getIndustryContext(data.industry).action,
    advisoryPosture[data.level.toLowerCase()] || advisoryPosture.moderate,
  ];
}

export function getOverallInterpretation(data: RiskScanResult) {
  const level = data.level.toLowerCase();
  const context = getIndustryContext(data.industry);
  const topFactor = getPreferredRiskFactors(data)[0];

  return `${data.industry} activity in ${data.country} is assessed as ${data.level} at ${data.risk_score} (grade ${data.grade}). ${
    levelPosture[level] || levelPosture.moderate
  } For this industry, priority attention should stay on ${context.focus}. The leading scan signal is ${lowerFirst(
    topFactor
  )}.`;
}

export function getStructuredAdvisory(data: RiskScanResult) {
  const level = data.level.toLowerCase();
  const firstRecommendation = getPreferredRecommendations(data)[0];

  return `${advisoryPosture[level] || advisoryPosture.moderate} For ${
    data.industry
  } activity in ${data.country}, the first scan-driven action is to ${lowerFirst(
    firstRecommendation
  )}`;
}

export function getExecutionActions(data: RiskScanResult) {
  const context = getIndustryContext(data.industry);
  const recommendations = getPreferredRecommendations(data);
  return [context.action, ...recommendations.filter((item) => item !== context.action)];
}

export function getDimensionInterpretation(
  data: RiskScanResult,
  dimension: RiskDimension,
  compact = false
) {
  const score = data.breakdown[dimension];
  const band = getRiskBandLabel(score);
  const intensity =
    band === "Low"
      ? "limited"
      : band === "Guarded"
      ? "watch-list"
      : band === "Moderate"
      ? "meaningful"
      : band === "High"
      ? "elevated"
      : "severe";
  const context = getIndustryContext(data.industry);

  if (compact) {
    if (dimension === "country_risk") {
      return `${band} (${score}): ${intensity} country pressure for ${data.country}.`;
    }
    if (dimension === "industry_risk") {
      return `${band} (${score}): ${intensity} ${data.industry} sector sensitivity.`;
    }
    if (dimension === "logistics_risk") {
      return `${band} (${score}): ${intensity} logistics pressure.`;
    }
    return `${band} (${score}): ${intensity} event-linked pressure.`;
  }

  if (dimension === "country_risk") {
    return `${band} (${score}). ${data.country} contributes ${intensity} structural country-risk pressure within this scan.`;
  }
  if (dimension === "industry_risk") {
    return `${band} (${score}). ${data.industry} contributes ${intensity} sector-sensitivity pressure, with attention centered on ${context.focus}.`;
  }
  if (dimension === "logistics_risk") {
    return `${band} (${score}). Logistics contributes ${intensity} pressure through capacity, routing, timing, and handling exposure.`;
  }
  return `${band} (${score}). Current event-linked conditions contribute ${intensity} short-term disruption pressure.`;
}
