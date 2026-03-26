import { NextRequest } from "next/server";
import { PDFDocument, PDFPage, StandardFonts, rgb } from "pdf-lib";
import type { RiskScanResult } from "@/lib/risk-types";

type RGB = [number, number, number];

const COLORS = {
  navy: [0.06, 0.14, 0.34] as RGB,
  teal: [0.31, 0.64, 0.63] as RGB,
  text: [0.06, 0.09, 0.16] as RGB,
  muted: [0.39, 0.45, 0.54] as RGB,
  line: [0.86, 0.89, 0.91] as RGB,
  card: [0.97, 0.98, 0.99] as RGB,
  white: [1, 1, 1] as RGB,
  low: [0.09, 0.5, 0.24] as RGB,
  guarded: [0.11, 0.3, 0.85] as RGB,
  moderate: [0.71, 0.33, 0.04] as RGB,
  high: [0.76, 0.25, 0.05] as RGB,
  critical: [0.73, 0.11, 0.11] as RGB,
};

function wrapText(text: string, maxChars = 88) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function getLevelColor(level: string): RGB {
  const normalized = level.toLowerCase();
  if (normalized === "low") return COLORS.low;
  if (normalized === "guarded") return COLORS.guarded;
  if (normalized === "moderate") return COLORS.moderate;
  if (normalized === "high") return COLORS.high;
  return COLORS.critical;
}

function getExecutiveSummary(data: RiskScanResult) {
  return `RiskAtlas evaluates structural exposure across supply chain environments based on country conditions, industry sensitivity, logistics complexity, and event-driven disruption factors. For the selected parameters, the overall exposure score is ${data.risk_score}, indicating a ${data.level.toLowerCase()} level of supply chain exposure. The current profile reflects a combination of structural dependencies and operating conditions that may affect continuity, predictability, and resilience.`;
}

function getStrategicInterpretation() {
  return `The current exposure profile suggests that companies operating within the selected market environment should consider reinforcing supply chain resilience in a targeted manner. Priority attention should be given to supplier diversification, logistics route redundancy, and active monitoring of policy or operational developments. While the overall profile does not necessarily imply immediate disruption, structural dependencies may amplify exposure under adverse scenarios.`;
}

function getDetailedActions(data: RiskScanResult) {
  const base = [
    "Evaluate alternative supplier options to reduce dependency on concentrated upstream sources.",
    "Assess alternate transportation corridors to mitigate logistics concentration and chokepoint exposure.",
    "Establish a more active monitoring rhythm for regulatory and operating environment changes.",
    "Review inventory buffering assumptions for critical inputs, lead times, and continuity planning.",
  ];

  if (data.level.toLowerCase() === "high" || data.level.toLowerCase() === "critical") {
    base.push("Escalate exposure review to leadership level before scaling commercial commitments.");
  }

  return base;
}

function getStrategicView(data: RiskScanResult) {
  const lvl = data.level.toLowerCase();

  if (lvl === "high" || lvl === "critical") {
    return "The route should be treated as a controlled execution channel rather than a default expansion corridor. Management priority should be placed on exposure containment, execution resilience, and protection of commercial downside before scaling commitments.";
  }

  if (lvl === "moderate") {
    return "The route should be treated as a managed operating channel. Priority should be placed on maintaining execution reliability, protecting margin assumptions, and reinforcing resilience before wider commercial expansion.";
  }

  return "The route remains commercially usable, but it should not be treated as frictionless. Priority should be placed on disciplined execution, monitoring continuity signals, and preserving reliability as transaction volume grows.";
}

function getTacticalFocus(data: RiskScanResult) {
  const base = [
    "Strengthen supplier readiness validation before commitment.",
    "Protect margin assumptions under cost and timing variability.",
    "Introduce delivery buffers for operational uncertainty.",
    "Monitor execution volatility instead of relying on baseline assumptions.",
  ];

  if (data.level.toLowerCase() === "high" || data.level.toLowerCase() === "critical") {
    base.push("Escalate exception handling and leadership review before scaling exposure.");
  }

  return base;
}

function getExecutionActions(data: RiskScanResult) {
  const base = [
    "Conduct secondary validation of supplier production stability.",
    "Adjust customer-facing lead-time expectations where required.",
    "Prepare alternative routing scenarios for sensitive shipments.",
    "Avoid single-point dependency in execution planning.",
  ];

  if (data.level.toLowerCase() === "high" || data.level.toLowerCase() === "critical") {
    base.push("Trigger pre-shipment escalation review for material exposure changes.");
  }

  return base;
}

function getRiskConsiderations() {
  return [
    "This assessment reflects a relative positioning, not a deterministic outcome.",
    "External volatility in policy, logistics, pricing, or operating conditions may alter execution performance.",
    "Results should be integrated with contractual, commercial, and operational context.",
    "This report is designed as a decision-support layer, not a substitute for professional judgment.",
  ];
}

function getUseBoundaryText() {
  return "This report is provided for analytical and informational purposes only. It does not constitute legal, financial, or investment advice. Users remain responsible for integrating this analysis with their own contractual frameworks, operating controls, and commercial judgment.";
}

function getMethodologyText() {
  return [
    "Country Risk × 30%",
    "Industry Sensitivity × 25%",
    "Logistics Complexity × 25%",
    "Event Disruption Risk × 20%",
  ];
}

function getExposureDefinitions(): [string, string, string][] {
  return [
    ["0–20", "Low", "Stable supply environment with limited structural exposure."],
    ["21–40", "Guarded", "Limited but manageable exposure requiring routine monitoring."],
    ["41–60", "Moderate", "Visible structural vulnerability across selected dimensions."],
    ["61–80", "High", "Significant disruption probability and concentrated risk signals."],
    ["81–100", "Critical", "Structural instability across key supply chain conditions."],
  ];
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as RiskScanResult;

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pageWidth = 595;
    const pageHeight = 842;
    const marginX = 48;

    const addPage = () => pdfDoc.addPage([pageWidth, pageHeight]);

    const drawHeaderBand = (page: PDFPage) => {
      page.drawRectangle({
        x: 0,
        y: pageHeight - 120,
        width: pageWidth,
        height: 120,
        color: rgb(...COLORS.navy),
      });

      page.drawRectangle({
        x: 0,
        y: pageHeight - 126,
        width: pageWidth,
        height: 6,
        color: rgb(...COLORS.teal),
      });
    };

    const drawFooter = (page: PDFPage, pageNumber: number) => {
      page.drawLine({
        start: { x: marginX, y: 34 },
        end: { x: pageWidth - marginX, y: 34 },
        thickness: 1,
        color: rgb(...COLORS.line),
      });

      page.drawText("Generated by Eastrion RiskAtlas", {
        x: marginX,
        y: 18,
        size: 9,
        font,
        color: rgb(...COLORS.muted),
      });

      page.drawText(`Page ${pageNumber}`, {
        x: pageWidth - marginX - 34,
        y: 18,
        size: 9,
        font,
        color: rgb(...COLORS.muted),
      });
    };

    const drawSectionTitle = (page: PDFPage, title: string, y: number) => {
      page.drawText(title, {
        x: marginX,
        y,
        size: 20,
        font: bold,
        color: rgb(...COLORS.text),
      });

      page.drawLine({
        start: { x: marginX, y: y - 8 },
        end: { x: pageWidth - marginX, y: y - 8 },
        thickness: 1,
        color: rgb(...COLORS.line),
      });
    };

    const drawParagraph = (
      page: PDFPage,
      text: string,
      x: number,
      startY: number,
      maxChars = 88,
      size = 11,
      color: RGB = COLORS.text,
      lineGap = 6
    ) => {
      const lines = wrapText(text, maxChars);
      let y = startY;

      for (const line of lines) {
        page.drawText(line, {
          x,
          y,
          size,
          font,
          color: rgb(...color),
        });
        y -= size + lineGap;
      }

      return y;
    };

    const drawBulletList = (
      page: PDFPage,
      items: string[],
      x: number,
      startY: number,
      maxChars = 72
    ) => {
      let y = startY;

      for (const item of items) {
        const lines = wrapText(item, maxChars);

        page.drawCircle({
          x: x + 3,
          y: y + 4,
          size: 2.2,
          color: rgb(...COLORS.navy),
        });

        for (const line of lines) {
          page.drawText(line, {
            x: x + 12,
            y,
            size: 11,
            font,
            color: rgb(...COLORS.text),
          });
          y -= 17;
        }

        y -= 4;
      }

      return y;
    };

    const drawMetricCard = (
      page: PDFPage,
      x: number,
      y: number,
      w: number,
      h: number,
      label: string,
      value: string,
      valueColor: RGB = COLORS.text
    ) => {
      page.drawRectangle({
        x,
        y,
        width: w,
        height: h,
        borderWidth: 1,
        borderColor: rgb(...COLORS.line),
        color: rgb(...COLORS.card),
      });

      page.drawText(label, {
        x: x + 14,
        y: y + h - 22,
        size: 10,
        font,
        color: rgb(...COLORS.muted),
      });

      page.drawText(value, {
        x: x + 14,
        y: y + 18,
        size: 24,
        font: bold,
        color: rgb(...valueColor),
      });
    };

    const drawGauge = (page: PDFPage, x: number, y: number, width: number, score: number) => {
      const labels = [
        { name: "Low", color: COLORS.low },
        { name: "Guarded", color: COLORS.guarded },
        { name: "Moderate", color: COLORS.moderate },
        { name: "High", color: COLORS.high },
        { name: "Critical", color: COLORS.critical },
      ];

      const segmentWidth = width / labels.length;

      labels.forEach((item, index) => {
        page.drawRectangle({
          x: x + index * segmentWidth,
          y,
          width: segmentWidth - 2,
          height: 12,
          color: rgb(...item.color),
        });

        page.drawText(item.name, {
          x: x + index * segmentWidth,
          y: y - 14,
          size: 8,
          font,
          color: rgb(...COLORS.muted),
        });
      });

      const markerX = x + (Math.max(0, Math.min(100, score)) / 100) * width;

      page.drawLine({
        start: { x: markerX, y: y + 18 },
        end: { x: markerX, y: y - 4 },
        thickness: 2,
        color: rgb(...COLORS.text),
      });

      page.drawText(`Score ${score}`, {
        x: markerX - 16,
        y: y + 24,
        size: 9,
        font: bold,
        color: rgb(...COLORS.text),
      });
    };

    const drawTable = (
      page: PDFPage,
      headers: string[],
      rows: string[][],
      x: number,
      yTop: number,
      colWidths: number[]
    ) => {
      const rowHeight = 28;
      const tableWidth = colWidths.reduce((a, b) => a + b, 0);

      page.drawRectangle({
        x,
        y: yTop - rowHeight,
        width: tableWidth,
        height: rowHeight,
        color: rgb(...COLORS.navy),
      });

      let cursorX = x;
      headers.forEach((header, index) => {
        page.drawText(header, {
          x: cursorX + 8,
          y: yTop - 18,
          size: 10,
          font: bold,
          color: rgb(...COLORS.white),
        });
        cursorX += colWidths[index];
      });

      let currentY = yTop - rowHeight;

      rows.forEach((row, rowIndex) => {
        currentY -= rowHeight;

        const rowColor: RGB = rowIndex % 2 === 0 ? COLORS.card : COLORS.white;

        page.drawRectangle({
          x,
          y: currentY,
          width: tableWidth,
          height: rowHeight,
          color: rgb(...rowColor),
          borderWidth: 0.5,
          borderColor: rgb(...COLORS.line),
        });

        let rowX = x;
        row.forEach((cell, cellIndex) => {
          page.drawText(cell, {
            x: rowX + 8,
            y: currentY + 9,
            size: 9,
            font,
            color: rgb(...COLORS.text),
          });
          rowX += colWidths[cellIndex];
        });
      });

      return currentY;
    };

    /* ---------- PAGE 1: COVER ---------- */
    {
      const page = addPage();
      drawHeaderBand(page);

      page.drawText("Eastrion RiskAtlas", {
        x: marginX,
        y: pageHeight - 66,
        size: 28,
        font: bold,
        color: rgb(...COLORS.white),
      });

      page.drawText("Supply Chain Exposure Assessment", {
        x: marginX,
        y: pageHeight - 96,
        size: 14,
        font,
        color: rgb(0.9, 0.94, 0.99),
      });

      page.drawText("Country", {
        x: marginX,
        y: 620,
        size: 12,
        font,
        color: rgb(...COLORS.muted),
      });
      page.drawText(data.country, {
        x: marginX,
        y: 596,
        size: 24,
        font: bold,
        color: rgb(...COLORS.text),
      });

      page.drawText("Industry", {
        x: 300,
        y: 620,
        size: 12,
        font,
        color: rgb(...COLORS.muted),
      });
      page.drawText(data.industry, {
        x: 300,
        y: 596,
        size: 24,
        font: bold,
        color: rgb(...COLORS.text),
      });

      const levelColor = getLevelColor(data.level);

      drawMetricCard(page, marginX, 470, 150, 92, "Exposure Score", String(data.risk_score), COLORS.text);
      drawMetricCard(page, 220, 470, 110, 92, "Grade", data.grade, COLORS.text);
      drawMetricCard(page, 350, 470, 197, 92, "Exposure Level", data.level, levelColor);

      page.drawText("Generated by RiskAtlas", {
        x: marginX,
        y: 388,
        size: 14,
        font: bold,
        color: rgb(...COLORS.text),
      });

      page.drawText("Eastrion – Global Supply Chain Infrastructure", {
        x: marginX,
        y: 366,
        size: 11,
        font,
        color: rgb(...COLORS.muted),
      });

      page.drawText("Confidential – Strategic Assessment Document", {
        x: marginX,
        y: 92,
        size: 10,
        font,
        color: rgb(...COLORS.muted),
      });

      drawFooter(page, 1);
    }

    /* ---------- PAGE 2: EXECUTIVE SUMMARY ---------- */
    {
      const page = addPage();
      drawSectionTitle(page, "Executive Summary", 770);

      let y = 724;
      y = drawParagraph(page, getExecutiveSummary(data), marginX, y, 92, 11, COLORS.text, 7);
      y -= 14;

      drawMetricCard(page, marginX, y - 86, 150, 86, "Exposure Score", String(data.risk_score), COLORS.text);
      drawMetricCard(page, 220, y - 86, 110, 86, "Grade", data.grade, COLORS.text);
      drawMetricCard(page, 350, y - 86, 197, 86, "Exposure Level", data.level, getLevelColor(data.level));

      drawGauge(page, marginX, y - 140, 500, data.risk_score);

      y -= 200;

      page.drawText("Overall Interpretation", {
        x: marginX,
        y,
        size: 14,
        font: bold,
        color: rgb(...COLORS.text),
      });

      y -= 22;
      drawParagraph(page, getStrategicInterpretation(), marginX, y, 92, 11, COLORS.text, 7);

      drawFooter(page, 2);
    }

    /* ---------- PAGE 3: BREAKDOWN ---------- */
    {
      const page = addPage();
      drawSectionTitle(page, "Exposure Score Breakdown", 770);

      page.drawText(
        "RiskAtlas evaluates exposure across four structural dimensions that influence supply chain resilience.",
        {
          x: marginX,
          y: 736,
          size: 11,
          font,
          color: rgb(...COLORS.muted),
        }
      );

      const rows = [
        ["Country Risk", String(data.breakdown.country_risk), "Moderate macro and operating exposure"],
        ["Industry Sensitivity", String(data.breakdown.industry_risk), "Sector-specific material and compliance sensitivity"],
        ["Logistics Complexity", String(data.breakdown.logistics_risk), "Transport and corridor concentration exposure"],
        ["Event Disruption", String(data.breakdown.event_risk), "Policy and short-term disruption vulnerability"],
      ];

      drawTable(
        page,
        ["Risk Dimension", "Score", "Interpretation"],
        rows,
        marginX,
        690,
        [160, 70, 270]
      );

      page.drawText("Exposure Level Definition", {
        x: marginX,
        y: 444,
        size: 14,
        font: bold,
        color: rgb(...COLORS.text),
      });

      const defs = getExposureDefinitions();
      drawTable(
        page,
        ["Score", "Level", "Definition"],
        defs,
        marginX,
        420,
        [90, 110, 300]
      );

      drawFooter(page, 3);
    }

    /* ---------- PAGE 4: RISK SIGNALS ---------- */
    {
      const page = addPage();
      drawSectionTitle(page, "Key Structural Risk Signals", 770);

      let y = 724;

      const signalBlocks = [
        {
          title: "Supplier Concentration",
          text:
            "Supply chains within the selected industry may remain dependent on a limited number of upstream suppliers, which can increase vulnerability to disruptions in availability, lead times, or pricing dynamics.",
        },
        {
          title: "Logistics Corridor Exposure",
          text:
            "Transportation flows may rely on a relatively concentrated set of corridors, ports, or maritime routes, introducing exposure to congestion, chokepoints, and continuity pressures.",
        },
        {
          title: "Regulatory and Operating Variability",
          text:
            "The operating environment may be influenced by evolving policy direction, compliance requirements, or intervention risk, which can affect planning assumptions and execution predictability.",
        },
      ];

      signalBlocks.forEach((block) => {
        page.drawRectangle({
          x: marginX,
          y: y - 84,
          width: pageWidth - marginX * 2,
          height: 72,
          color: rgb(...COLORS.card),
          borderWidth: 1,
          borderColor: rgb(...COLORS.line),
        });

        page.drawText(block.title, {
          x: marginX + 14,
          y: y - 26,
          size: 13,
          font: bold,
          color: rgb(...COLORS.text),
        });

        drawParagraph(page, block.text, marginX + 14, y - 46, 86, 10, COLORS.muted, 5);

        y -= 98;
      });

      page.drawText("Key Risk Factors Identified", {
        x: marginX,
        y: 390,
        size: 14,
        font: bold,
        color: rgb(...COLORS.text),
      });

      drawBulletList(page, data.risk_factors, marginX, 362, 80);

      drawFooter(page, 4);
    }

    /* ---------- PAGE 5: STRUCTURED ADVISORY LAYER ---------- */
{
  const page = addPage();
  drawSectionTitle(page, "Structured Advisory Layer", 770);

  let y = 724;

  y = drawParagraph(
    page,
    "This section translates the current exposure profile into a structured recommendation layer designed to support practical commercial and operating decisions.",
    marginX,
    y,
    92,
    11,
    COLORS.text,
    7
  );

  y -= 18;

  page.drawText("Strategic View", {
    x: marginX,
    y,
    size: 14,
    font: bold,
    color: rgb(...COLORS.text),
  });

  y -= 22;
  y = drawParagraph(
    page,
    getStrategicView(data),
    marginX,
    y,
    92,
    11,
    COLORS.text,
    7
  );

  y -= 18;

  page.drawText("Tactical Focus", {
    x: marginX,
    y,
    size: 14,
    font: bold,
    color: rgb(...COLORS.text),
  });

  y -= 22;
  y = drawBulletList(page, getTacticalFocus(data), marginX, y, 82);

  y -= 10;

  page.drawText("Execution Actions", {
    x: marginX,
    y,
    size: 14,
    font: bold,
    color: rgb(...COLORS.text),
  });

  y -= 22;
  y = drawBulletList(page, getExecutionActions(data), marginX, y, 82);

  y -= 10;

  page.drawText("Risk Considerations", {
    x: marginX,
    y,
    size: 14,
    font: bold,
    color: rgb(...COLORS.text),
  });

  y -= 22;
  y = drawBulletList(page, getRiskConsiderations(), marginX, y, 82);

  y -= 10;

  page.drawText("Use Boundary", {
    x: marginX,
    y,
    size: 14,
    font: bold,
    color: rgb(...COLORS.text),
  });

  y -= 22;
  y = drawParagraph(
    page,
    getUseBoundaryText(),
    marginX,
    y,
    92,
    10,
    COLORS.muted,
    6
  );

  drawFooter(page, 5);
}

const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="riskatlas-report-${data.country}-${data.industry}.pdf"`,
      },
    });
  } catch (error) {
    console.error("risk-report error:", error);

    return new Response("Failed to generate PDF report.", {
      status: 500,
    });
  }
}
