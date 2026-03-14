import { NextResponse } from "next/server";

function calculateRisk(country: string, industry: string) {
  let score = 50;

  const highRiskCountries = ["russia", "iran", "ukraine"];
  const mediumRiskCountries = ["china", "india", "brazil"];

  const sensitiveIndustries = [
    "lithium battery",
    "semiconductor",
    "rare earth"
  ];

  if (highRiskCountries.includes(country.toLowerCase())) {
    score += 25;
  }

  if (mediumRiskCountries.includes(country.toLowerCase())) {
    score += 10;
  }

  if (sensitiveIndustries.includes(industry.toLowerCase())) {
    score += 15;
  }

  if (score > 100) score = 100;

  let level = "Low";
  let grade = "A";

  if (score > 20) {
    level = "Moderate";
    grade = "B";
  }

  if (score > 40) {
    level = "Elevated";
    grade = "C";
  }

  if (score > 60) {
    level = "High";
    grade = "D";
  }

  if (score > 80) {
    level = "Critical";
    grade = "E";
  }

  return {
    risk_score: score,
    grade,
    level,
    summary:
      "Risk evaluation based on supplier geography, industry sensitivity and geopolitical exposure."
  };
}

export async function POST(req: Request) {
  const body = await req.json();

  const country = body.country || "";
  const industry = body.industry || "";

  const result = calculateRisk(country, industry);

  return NextResponse.json(result);
}
