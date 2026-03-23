import { NextRequest, NextResponse } from "next/server";
import { runRiskScan } from "@/lib/risk-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const country = body?.country?.trim();
    const industry = body?.industry?.trim();

    if (!country || !industry) {
      return NextResponse.json(
        { error: "Country and industry are required." },
        { status: 400 }
      );
    }

    const result = runRiskScan(country, industry);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("risk-scan error:", error);

    return NextResponse.json(
      { error: "Failed to process risk scan." },
      { status: 500 }
    );
  }
}
