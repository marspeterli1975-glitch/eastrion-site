"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type VerifyState = "loading" | "success" | "failed";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [verifyState, setVerifyState] = useState<VerifyState>("loading");

  const title = useMemo(() => {
    if (verifyState === "loading") return "Verifying your payment";
    if (verifyState === "success") return "Your Professional Report is unlocked";
    return "We could not verify this payment";
  }, [verifyState]);

  const description = useMemo(() => {
    if (verifyState === "loading") {
      return "Please wait while we verify your Stripe payment and unlock your report.";
    }
    if (verifyState === "success") {
      return "Stripe confirmed the payment. This browser has now been unlocked for the Professional Report experience.";
    }
    return "The payment session could not be verified. Please return to pricing and try again, or contact Eastrion if the payment has already been completed.";
  }, [verifyState]);

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId) {
        console.log("❌ Missing session_id in URL");
        setVerifyState("failed");
        return;
      }

      try {
        console.log("🔍 Verifying session:", sessionId);

        const response = await fetch(
          `/api/verify-checkout-session?session_id=${encodeURIComponent(sessionId)}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        console.log("🔍 Verify response status:", response.status);

        if (!response.ok) {
          console.log("❌ Verify API returned non-OK response");
          setVerifyState("failed");
          return;
        }

        const data = await response.json();
        console.log("🔍 Verify API data:", data);

        if (data?.paid === true) {
          const unlockPayload = {
            pro: true,
            unlockedAt: new Date().toISOString(),
            sessionId,
          };

          console.log("🟡 About to write localStorage:", unlockPayload);

          localStorage.setItem(
            "riskatlas_unlock_state",
            JSON.stringify(unlockPayload)
          );

          const storedValue = localStorage.getItem("riskatlas_unlock_state");
          console.log("✅ localStorage after write:", storedValue);

          if (!storedValue) {
            console.log("❌ localStorage write failed unexpectedly");
            setVerifyState("failed");
            return;
          }

          setVerifyState("success");
          return;
        }

        console.log("❌ Payment not verified as paid");
        setVerifyState("failed");
      } catch (error) {
        console.log("❌ verifyPayment exception:", error);
        setVerifyState("failed");
      }
    }

    verifyPayment();
  }, [sessionId]);

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
          padding: "88px 24px 96px",
          minHeight: "calc(100vh - 96px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "860px",
            textAlign: "center",
            padding: "56px 40px",
            borderRadius: "28px",
            background: "rgba(15, 23, 42, 0.58)",
            border: "1px solid rgba(148, 163, 184, 0.18)",
            boxShadow: "0 24px 80px rgba(2, 6, 23, 0.45)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 18px",
              borderRadius: "999px",
              background:
                verifyState === "success"
                  ? "rgba(34, 197, 94, 0.14)"
                  : verifyState === "failed"
                  ? "rgba(239, 68, 68, 0.14)"
                  : "rgba(56, 189, 248, 0.14)",
              color:
                verifyState === "success"
                  ? "#86efac"
                  : verifyState === "failed"
                  ? "#fca5a5"
                  : "#7dd3fc",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              fontWeight: 700,
              fontSize: "15px",
              marginBottom: "22px",
            }}
          >
            {verifyState === "success"
              ? "Payment Successful"
              : verifyState === "failed"
              ? "Verification Failed"
              : "Verifying Payment"}
          </div>

          <h1
            style={{
              fontSize: "64px",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              fontWeight: 800,
              color: "#f8fafc",
              margin: "0 0 22px",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "28px",
              lineHeight: 1.65,
              color: "#cbd5e1",
              maxWidth: "760px",
              margin: "0 auto 34px",
            }}
          >
            {description}
          </p>

          {sessionId && (
            <div
              style={{
                marginBottom: "34px",
                color: "#94a3b8",
                fontSize: "14px",
                wordBreak: "break-all",
              }}
            >
              Session ID: {sessionId}
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/riskatlas/report"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "190px",
                padding: "16px 28px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #5fd4f5 0%, #8be0b5 100%)",
                color: "#0f172a",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: "18px",
              }}
            >
              Return to Report
            </Link>

            <Link
              href="/riskatlas/pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "190px",
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
              Back to Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}