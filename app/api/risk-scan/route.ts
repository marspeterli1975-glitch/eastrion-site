import { NextResponse } from "next/server";

type RiskResult = {
  risk_score: number;
  grade: string;
  level: string;
  summary: string;
  risk_factors: string[];
  breakdown: {
    country_risk: number;
    industry_risk: number;
    logistics_risk: number;
    event_risk: number;
  };
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function getCountryRisk(country: string) {
  const c = normalize(country);

  const highRiskCountries = ["russia", "iran", "ukraine", "syria"];
  const mediumRiskCountries = ["china", "india", "brazil", "turkey", "mexico"];
  const lowRiskCountries = ["germany", "japan", "singapore", "australia", "canada"];

  if (highRiskCountries.includes(c)) {
    return { score: 35, factor: "Elevated geopolitical exposure in supplier country" };
  }

  if (mediumRiskCountries.includes(c)) {
    return { score: 22, factor: "Moderate geopolitical and policy exposure in supplier country" };
  }

  if (lowRiskCountries.includes(c)) {
    return { score: 8, factor: "Relatively stable supplier-country environment" };
  }

  return { score: 15, factor: "Limited country-specific data; moderate baseline country exposure applied" };
}

function getIndustryRisk(industry: string) {
  const i = normalize(industry);

  const highRiskIndustries = [
    "lithium battery",
    "semiconductor",
    "rare earth",
    "defense",
    "critical minerals",
  ];

  const mediumRiskIndustries = [
    "electronics",
    "automotive",
    "chemical",
    "machinery",
    "energy",
  ];

  const lowRiskIndustries = [
    "textile",
    "furniture",
    "packaging",
    "consumer goods",
  ];

  if (highRiskIndustries.includes(i)) {
    return { score: 18, factor: "Industry subject to regulatory sensitivity and strategic supply constraints" };
  }

  if (mediumRiskIndustries.includes(i)) {
    return { score: 11, factor: "Industry exposed to moderate operational and regulatory sensitivity" };
  }

  if (lowRiskIndustries.includes(i)) {
    return { score: 5, factor: "Industry shows lower strategic and regulatory sensitivity" };
  }

  return { score: 8, factor: "Industry not specifically classified; moderate baseline industry exposure applied" };
}

function getLogisticsRisk(country: string, industry: string) {
  const c = normalize(country);
  const i = normalize(industry);

  let score = 10;
  let factor = "Baseline logistics corridor exposure applied";

  if (["china", "india", "brazil", "mexico"].includes(c)) {
    score += 4;
    factor = "Longer or more complex logistics corridor may increase execution pressure";
  }

  if (["lithium battery", "chemical", "critical minerals", "rare earth"].includes(i)) {
    score += 3;
    factor = "Transport and handling requirements may increase logistics complexity";
  }

  if (score > 20) score = 20;

  return { score, factor };
}

function getEventRisk(country: string, industry: string) {
  const c = normalize(country);
  const i = normalize(industry);

  let score = 6;
  let factor = "Baseline event-risk buffer applied";

  if (["russia", "iran", "ukraine"].includes(c)) {
    score += 8;
    factor = "Country subject to higher disruption probability from geopolitical events";
  }

  if (["semiconductor", "lithium battery", "rare earth"].includes(i)) {
    score += 4;
    factor = "Industry sensitive to sudden regulatory, supply, or market disruption";
  }

  if (score > 20) score = 20;

  return { score, factor };
}

function getGradeAndLevel(score: number) {
  if (score <= 20) {
    return { grade: "A", level: "Low" };
  }
  if (score <= 40) {
    return { grade: "B", level: "Guarded" };
  }
  if (score <= 60) {
    return { grade: "C", level: "Moderate" };
  }
  if (score <= 80) {
    return { grade: "D", level: "High" };
  }
  return { grade: "E", level: "Critical" };
}

function buildSummary(
  level: string,
  country: string,
  industry: string,
  score: number
): string {
  return `This assessment indicates ${level.toLowerCase()} supply chain exposure for ${industry || "the selected industry"} linked to ${country || "the selected supplier country"}. The current score (${score}/100) reflects combined country, industry, logistics, and disruption-risk assumptions under the RiskAtlas v2 baseline model.`;
}

function calculateRisk(country: string, industry: string): RiskResult {
  const countryRisk = getCountryRisk(country);
  const industryRisk = getIndustryRisk(industry);
  const logisticsRisk = getLogisticsRisk(country, industry);
  const eventRisk = getEventRisk(country, industry);

  let total =
    countryRisk.score +
    industryRisk.score +
    logisticsRisk.score +
    eventRisk.score;

  if (total > 100) total = 100;
  if (total < 0) total = 0;

  const { grade, level } = getGradeAndLevel(total);

  const factors = [
    countryRisk.factor,
    industryRisk.factor,
    logisticsRisk.factor,
    eventRisk.factor,
  ];

  const uniqueFactors = Array.from(new Set(factors));

  return {
    risk_score: total,
    grade,
    level,
    summary: buildSummary(level, country, industry, total),
    risk_factors: uniqueFactors,
    breakdown: {
      country_risk: countryRisk.score,
      industry_risk: industryRisk.score,
      logistics_risk: logisticsRisk.score,
      event_risk: eventRisk.score,
    },
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const country = body.country || "";
    const industry = body.industry || "";

    const result = calculateRisk(country, industry);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid request payload",
      },
      { status: 400 }
    );
  }
}
