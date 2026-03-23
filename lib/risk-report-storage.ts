export type RiskLevel = "Low" | "Moderate" | "Elevated" | "High" | "Critical";
export type ActionPriority = "Immediate" | "High" | "Medium" | "Low";

export type RiskFactor = {
  id: string;
  category: string;
  title: string;
  score: number;
  impact: string;
  likelihood: string;
  evidence: string;
  recommendation: string;
};

export type ActionItem = {
  id: string;
  title: string;
  owner: string;
  priority: ActionPriority;
  timeline: string;
  description: string;
};

export type ReportData = {
  report_id: string;
  company_name: string;
  route_name: string;
  product_name: string;
  generated_at: string;
  overall_score: number;
  grade: string;
  risk_level: RiskLevel;
  executive_summary: string;
  decision_note: string;
  score_definition: string;
  confidence_note: string;
  factors: RiskFactor[];
  actions: ActionItem[];
  premium_preview: {
    loading_plan_summary: string;
    scenario_outlook: string;
    supplier_port_exposure: string;
    commercial_note: string;
  };
};

const STORAGE_KEY = "riskatlas_report_data";

export function saveRiskReportToStorage(report: ReportData) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(report));
}

export function loadRiskReportFromStorage(): ReportData | null {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ReportData;
  } catch {
    return null;
  }
}

export function clearRiskReportFromStorage() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}

export function getGrade(score: number) {
  if (score <= 20) {
    return {
      grade: "A",
      level: "Low" as RiskLevel,
      description:
        "Exposure is currently controlled. Normal monitoring and periodic review are sufficient.",
    };
  }

  if (score <= 40) {
    return {
      grade: "B",
      level: "Moderate" as RiskLevel,
      description:
        "Some vulnerabilities exist, but they are manageable with targeted controls and route discipline.",
    };
  }

  if (score <= 60) {
    return {
      grade: "C",
      level: "Elevated" as RiskLevel,
      description:
        "Material vulnerabilities are present. Management action is recommended before scaling execution.",
    };
  }

  if (score <= 80) {
    return {
      grade: "D",
      level: "High" as RiskLevel,
      description:
        "The supply chain is exposed to serious disruption or execution failure. Immediate mitigation is advised.",
    };
  }

  return {
    grade: "E",
    level: "Critical" as RiskLevel,
    description:
      "Risk concentration is too high. Execute only with redesign, contingency planning, or management override.",
  };
}

export function buildDemoReport(): ReportData {
  const overall_score = 37;
  const mapped = getGrade(overall_score);

  return {
    report_id: "RA-DEMO-20260319-001",
    company_name: "Eastrion Demo Client",
    route_name: "Shanghai → Chennai",
    product_name: "Battery Materials / Mixed Industrial Cargo",
    generated_at: new Date().toISOString(),
    overall_score,
    grade: mapped.grade,
    risk_level: mapped.level,
    executive_summary:
      "This route is commercially viable, but execution quality depends on supplier discipline, inland handling, and documentation control. The current exposure is not in a red-zone, yet it is high enough to justify a managed operating plan rather than a basic shipping arrangement.",
    decision_note:
      "Proceed with controlled execution. Do not rely on default freight booking alone. Align supplier readiness, packaging limits, trucking eligibility, and container loading constraints before confirmation.",
    score_definition:
      "RiskAtlas score ranges from 0 to 100. Lower is better. 0–20 = A (Low Risk), 21–40 = B (Moderate Risk), 41–60 = C (Elevated Risk), 61–80 = D (High Risk), 81–100 = E (Critical Risk).",
    confidence_note:
      "Confidence: Medium. Current output is based on structured assumptions and available operating inputs. Accuracy increases when supplier, cargo, route, and loading-plan data are fully connected.",
    factors: [
      {
        id: "f1",
        category: "Supplier Readiness",
        title: "Supplier packaging discipline is not yet standardized",
        score: 42,
        impact:
          "Packaging inconsistency may reduce container utilization and increase breakage or rework risk.",
        likelihood: "Medium",
        evidence:
          "Layer limit, pallet pattern, and carton compression rules are not yet fixed in the job setup.",
        recommendation:
          "Lock carton dimensions, stacking limit, pallet rules, and handling marks before booking.",
      },
      {
        id: "f2",
        category: "Inland Transport",
        title: "Truck access and local compliance may affect dispatch",
        score: 39,
        impact:
          "If factory pickup relies on non-compliant truck types, loading windows may slip and cost may rise.",
        likelihood: "Medium",
        evidence:
          "Some industrial parks and city zones restrict vehicle type, emission class, axle load, or unloading hours.",
        recommendation:
          "Bind dispatch planning to truck class, route restriction, and loading-yard constraints.",
      },
      {
        id: "f3",
        category: "Container Loading",
        title: "Current loading plan is not fully integrated with product constraints",
        score: 48,
        impact:
          "Ignoring stack limits, void ratio, and cargo mix may create hidden cost and delivery risk.",
        likelihood: "High",
        evidence:
          "Commercial carton count does not yet reflect real stacking and handling restrictions.",
        recommendation:
          "Move from simple CBM planning to rule-based loading logic with stacking and fragility controls.",
      },
      {
        id: "f4",
        category: "Documentation",
        title: "Document control risk remains manageable but not automated",
        score: 24,
        impact: "Missed document alignment can still delay customs or handover.",
        likelihood: "Low",
        evidence:
          "No high-risk exception detected, but manual control is still required.",
        recommendation:
          "Add shipment checklist and document gate before release.",
      },
    ],
    actions: [
      {
        id: "a1",
        title: "Lock cargo loading rules before quotation confirmation",
        owner: "Operations",
        priority: "Immediate",
        timeline: "Within 24 hours",
        description:
          "Confirm stack limit, pallet policy, carton strength, orientation, and whether mixed loading is allowed.",
      },
      {
        id: "a2",
        title: "Bind inland trucking to city/factory access rules",
        owner: "Logistics",
        priority: "High",
        timeline: "Before dispatch booking",
        description:
          "Verify truck size, emission standard, loading yard access, road restriction, and appointment time window.",
      },
      {
        id: "a3",
        title: "Create a route-specific shipment control checklist",
        owner: "Supply Chain",
        priority: "Medium",
        timeline: "This week",
        description:
          "Use a standardized pre-shipment gate for supplier readiness, transport compliance, loading feasibility, and document release.",
      },
      {
        id: "a4",
        title: "Upgrade to integrated Risk + Loading Plan workflow",
        owner: "Management",
        priority: "Medium",
        timeline: "Phase 2",
        description:
          "Link operational risk, loading design, and commercial quoting into one payable workflow.",
      },
    ],
    premium_preview: {
      loading_plan_summary:
        "Premium report includes actual loading-plan logic: stacking constraints, void ratio, truck/container fit, split-shipment recommendations, and cost-risk tradeoff.",
      scenario_outlook:
        "Premium report includes scenario-based execution options such as conservative dispatch, cost-optimized dispatch, and resilience-first dispatch.",
      supplier_port_exposure:
        "Premium report includes supplier × origin × port × product exposure mapping, with operational bottleneck highlights.",
      commercial_note:
        "This preview shows the diagnosis. The paid version unlocks the executable operating plan.",
    },
  };
}