import { NextRequest } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { RiskScanResult } from "@/lib/risk-types";

function wrapText(text: string, maxChars = 88) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }

  if (current) lines.push(current);
  return lines;
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as RiskScanResult;

    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let y = height - 50;
    const left = 50;
    const lineHeight = 16;

    const drawLine = (
      text: string,
      options?: { bold?: boolean; size?: number; color?: [number, number, number] }
    ) => {
      const size = options?.size ?? 11;
      const selectedFont = options?.bold ? boldFont : font;
      const color = options?.color ?? [0, 0, 0];

      if (y < 60) {
        page = pdfDoc.addPage([595, 842]);
        y = height - 50;
      }

      page.drawText(text, {
        x: left,
        y,
        size,
        font: selectedFont,
        color: rgb(color[0], color[1], color[2]),
      });

      y -= lineHeight + (size > 13 ? 4 : 0);
    };

    drawLine("Eastrion RiskAtlas Report", {
      bold: true,
      size: 18,
      color: [0.1, 0.2, 0.55],
    });

    drawLine(`Country: ${data.country}`, { bold: true });
    drawLine(`Industry: ${data.industry}`, { bold: true });
    drawLine(`Risk Score: ${data.risk_score}/100`, { bold: true });
    drawLine(`Grade: ${data.grade}`);
    drawLine(`Exposure Level: ${data.level}`);
    y -= 8;

    drawLine("Assessment Summary", { bold: true, size: 14 });
    wrapText(data.summary).forEach((line) => drawLine(line));

    y -= 8;
    drawLine("Risk Breakdown", { bold: true, size: 14 });
    drawLine(`Country Risk: ${data.breakdown.country_risk}`);
    drawLine(`Industry Risk: ${data.breakdown.industry_risk}`);
    drawLine(`Logistics Risk: ${data.breakdown.logistics_risk}`);
    drawLine(`Event Risk: ${data.breakdown.event_risk}`);

    y -= 8;
    drawLine("Key Risk Factors", { bold: true, size: 14 });
    data.risk_factors.forEach((item, index) => {
      wrapText(`${index + 1}. ${item}`).forEach((line) => drawLine(line));
    });

    y -= 8;
    drawLine("Suggested Risk Awareness", { bold: true, size: 14 });
    data.suggested_risk_awareness.forEach((item, index) => {
      wrapText(`${index + 1}. ${item}`).forEach((line) => drawLine(line));
    });

    y -= 8;
    drawLine("Disclaimer", { bold: true, size: 14 });
    wrapText(data.disclaimer).forEach((line) => drawLine(line));

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
