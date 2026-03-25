"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type UnlockState = {
  pro?: boolean;
  execution?: boolean;
  lastSessionId?: string;
  lastPaidAt?: string;
  unlockedAt?: string;
  sessionId?: string;
};

export default function RiskAtlasReportPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockState, setUnlockState] = useState<UnlockState | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("riskatlas_unlock_state");
      if (!raw) {
        setIsHydrated(true);
        return;
      }

      const parsed = JSON.parse(raw) as UnlockState;
      setUnlockState(parsed);

      if (parsed?.pro === true) {
        setIsUnlocked(true);
      }
    } catch (error) {
      console.error("Failed to read riskatlas unlock state:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const grade = "B";

  const headline = isUnlocked
    ? "Your current structure shows moderate exposure with identifiable execution risks, concentrated dependency pressure and visible improvement priorities."
    : "Your current structure shows moderate exposure with hidden execution risks. Most issues are not yet visible, but they are forming.";

  const executiveSummary = isUnlocked
    ? "The route remains commercially usable, but resilience is weakened by supplier concentration, corridor friction and limited execution buffer. The current configuration does not indicate critical breakdown, but it does indicate a higher probability of avoidable cost, delay and coordination stress if disruption intensifies."
    : "This preview confirms that risk is present, but not yet fully diagnosed. The free version is designed to show signal, not complete explanation.";

  const freeInsights = [
    "Country-level risk exposure detected",
    "Supplier dependency risk identified",
    "Logistics corridor volatility present",
  ];

  const lockedFeatures = [
    "Why this score is B rather than A",
    "Risk factor weight breakdown",
    "Supplier-specific vulnerability analysis",
    "Route-level disruption scenarios",
    "Priority action plan",
  ];

  const proInsights = [
    {
      title: "Score explanation",
      body: "The current grade reflects moderate structural exposure. The route remains operable, but supplier concentration and execution dependency reduce resilience.",
    },
    {
      title: "Primary risk drivers",
      body: "The largest pressure points come from concentrated supplier reliance, unstable logistics sequencing and insufficient execution buffer across the delivery chain.",
    },
    {
      title: "Supplier vulnerability",
      body: "The supplier layer appears functional, but dependency concentration suggests limited fallback capacity if lead time, compliance or production continuity weakens.",
    },
    {
      title: "Route scenario outlook",
      body: "The route is not critically exposed, but corridor volatility can amplify cost, delay and coordination friction if external disruption intensifies.",
    },
    {
      title: "Priority action plan",
      body: "Reduce single-point dependency, define an alternate supplier path, strengthen shipment sequencing control and pre-define response logic for corridor disruption.",
    },
    {
      title: "Commercial implication",
      body: "This is not yet a failure scenario, but it is a margin erosion scenario. The structure is workable today, but vulnerable under pressure.",
    },
  ];

  const statusBadge = useMemo(() => {
    if (!isHydrated) return "Loading Report State";
    if (isUnlocked) return "Professional Report Unlocked";
    return "Free Preview";
  }, [isHydrated, isUnlocked]);

  return (
    <main
      style={{
        minHeight: "calc(100vh - 96px)",
        background:
          "linear-gradient(135deg, #020617 0%, #08112f 55%, #10265c 100%)",
        color: "#f8fafc",
      }}
    >
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "56px 24px 96px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 18px",
            borderRadius: "999px",
            background: isUnlocked
              ? "rgba(34, 197, 94, 0.14)"
              : "rgba(56, 189, 248, 0.14)",
            color: isUnlocked ? "#86efac" : "#7dd3fc",
            border: "1px solid rgba(148, 163, 184, 0.18)",
            fontWeight: 700,
            fontSize: "15px",
            marginBottom: "28px",
          }}
        >
          {statusBadge}
        </div>

        <div
          style={{
            marginBottom: "18px",
            fontSize: "56px",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            fontWeight: 800,
            color: "#f8fafc",
          }}
        >
          Your Supply Chain Risk Score
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr",
            gap: "24px",
            alignItems: "start",
            marginBottom: "26px",
          }}
        >
          <div
            style={{
              fontSize: "94px",
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: "-0.06em",
              color: "#f6c445",
            }}
          >
            {grade}
          </div>

          <div>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: "24px",
                lineHeight: 1.55,
                color: "#e2e8f0",
                maxWidth: "980px",
              }}
            >
              {headline}
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: "980px",
            marginBottom: "42px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "19px",
              lineHeight: 1.9,
              color: "#cbd5e1",
            }}
          >
            {executiveSummary}
          </p>

          {isUnlocked && unlockState?.lastPaidAt && (
            <div
              style={{
                marginTop: "18px",
                color: "#94a3b8",
                fontSize: "15px",
              }}
            >
              Unlock recorded: {unlockState.lastPaidAt}
            </div>
          )}
        </div>

        <div
          style={{
            marginBottom: "38px",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              margin: "0 0 18px",
              color: "#f8fafc",
            }}
          >
            Free Insight
          </h2>

          <ul
            style={{
              margin: 0,
              paddingLeft: "24px",
              color: "#cbd5e1",
              fontSize: "18px",
              lineHeight: 1.9,
            }}
          >
            {freeInsights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {!isUnlocked && (
          <div style={{ marginBottom: "44px" }}>
            <h2
              style={{
                fontSize: "42px",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                fontWeight: 800,
                margin: "0 0 18px",
                color: "#f8fafc",
              }}
            >
              🔒 Full Risk Breakdown (Locked)
            </h2>

            <div
              style={{
                borderRadius: "22px",
                background: "rgba(15, 23, 42, 0.52)",
                border: "1px solid rgba(148, 163, 184, 0.14)",
                padding: "28px 28px 30px",
                color: "#cbd5e1",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  marginBottom: "14px",
                  color: "#94a3b8",
                }}
              >
                Upgrade to unlock:
              </div>

              <ul
                style={{
                  margin: 0,
                  paddingLeft: "22px",
                  fontSize: "18px",
                  lineHeight: 1.9,
                }}
              >
                {lockedFeatures.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {isUnlocked && (
          <div style={{ marginBottom: "44px" }}>
            <h2
              style={{
                fontSize: "42px",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                fontWeight: 800,
                margin: "0 0 18px",
                color: "#86efac",
              }}
            >
              Professional Report
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "18px",
              }}
            >
              {proInsights.map((item) => (
                <div
                  key={item.title}
                  style={{
                    borderRadius: "22px",
                    background: "rgba(15, 23, 42, 0.52)",
                    border: "1px solid rgba(148, 163, 184, 0.14)",
                    padding: "24px",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 12px",
                      fontSize: "24px",
                      lineHeight: 1.2,
                      color: "#f8fafc",
                      fontWeight: 800,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      lineHeight: 1.8,
                      color: "#cbd5e1",
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: "42px" }}>
          <h2
            style={{
              fontSize: "42px",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              margin: "0 0 18px",
              color: "#f8fafc",
            }}
          >
            Free vs Professional Report
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div
              style={{
                borderRadius: "22px",
                background: "rgba(15, 23, 42, 0.52)",
                border: "1px solid rgba(148, 163, 184, 0.14)",
                padding: "28px",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  lineHeight: 1.1,
                  fontWeight: 800,
                  color: "#f8fafc",
                  marginBottom: "16px",
                }}
              >
                Free
              </div>
              <div
                style={{
                  color: "#cbd5e1",
                  fontSize: "17px",
                  lineHeight: 1.9,
                }}
              >
                ✓ Basic risk signal
                <br />
                ✓ Early-stage visibility
                <br />
                ✓ Grade and summary view
                <br />
                ✕ Full explanation
                <br />
                ✕ Supplier breakdown
                <br />
                ✕ Route scenario logic
                <br />
                ✕ Priority action plan
              </div>
            </div>

            <div
              style={{
                borderRadius: "22px",
                background: "rgba(8, 47, 73, 0.46)",
                border: "1px solid rgba(34, 197, 94, 0.18)",
                padding: "28px",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  lineHeight: 1.1,
                  fontWeight: 800,
                  color: "#67e8f9",
                  marginBottom: "16px",
                }}
              >
                Professional ($49)
              </div>
              <div
                style={{
                  color: "#d1fae5",
                  fontSize: "17px",
                  lineHeight: 1.9,
                }}
              >
                ✓ Full explanation
                <br />
                ✓ Score logic visibility
                <br />
                ✓ Supplier vulnerability insight
                <br />
                ✓ Route-level disruption framing
                <br />
                ✓ Priority action plan
                <br />
                ✓ Stronger decision support
                <br />
                {isUnlocked ? "✓ Unlocked on this browser" : "→ Unlock after payment"}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {!isUnlocked && (
            <Link
              href="/riskatlas/pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 28px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #5fd4f5 0%, #8be0b5 100%)",
                color: "#0f172a",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: "18px",
              }}
            >
              Unlock Full Report
            </Link>
          )}

          {isUnlocked && (
            <Link
              href="/riskatlas/success"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 28px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #5fd4f5 0%, #8be0b5 100%)",
                color: "#0f172a",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: "18px",
              }}
            >
              View Unlock Status
            </Link>
          )}

          <Link
            href="/riskatlas"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 28px",
              borderRadius: "16px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              background: "rgba(15, 23, 42, 0.52)",
              color: "#f8fafc",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            Back to RiskAtlas
          </Link>
        </div>
      </section>
    </main>
  );
}