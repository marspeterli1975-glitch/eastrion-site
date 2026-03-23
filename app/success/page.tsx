"use client";

import { useEffect, useMemo, useState } from "react";

type PaymentStatusResponse = {
  session_id: string;
  paid: boolean;
  download_token?: string;
};

export default function SuccessPage() {
  const [status, setStatus] = useState<"loading" | "paid" | "pending" | "error">("loading");
  const [message, setMessage] = useState("Checking payment status...");
  const [downloadToken, setDownloadToken] = useState("");
  const [sessionId, setSessionId] = useState("");

  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://global-risk-api.onrender.com";

  const downloadUrl = useMemo(() => {
    if (!downloadToken) return "";
    return `${apiBase}/report/download?token=${encodeURIComponent(downloadToken)}`;
  }, [apiBase, downloadToken]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const sid = url.searchParams.get("session_id") || "";
    setSessionId(sid);

    if (!sid) {
      setStatus("error");
      setMessage("Missing session ID. Please return to RiskAtlas and try again.");
      return;
    }

    let cancelled = false;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`${apiBase}/payment-status/${sid}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: PaymentStatusResponse = await res.json();

        if (cancelled) return;

        if (data.paid && data.download_token) {
          setDownloadToken(data.download_token);
          setStatus("paid");
          setMessage("Payment received. Your RiskAtlas report is ready.");
        } else if (data.paid && !data.download_token) {
          setStatus("pending");
          setMessage("Payment confirmed. Your report is being prepared. Please refresh in a moment.");
        } else {
          setStatus("pending");
          setMessage("Payment is still being confirmed. Please wait a few seconds and refresh.");
        }
      } catch {
        if (cancelled) return;
        setStatus("error");
        setMessage("Unable to verify payment status right now. Please try again shortly.");
      }
    };

    fetchStatus();

    return () => {
      cancelled = true;
    };
  }, [apiBase]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="bg-[#eef2f1]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-4xl">
            <div className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              RiskAtlas Payment
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 md:text-7xl">
              Payment confirmed.
              <br />
              Structured report
              <br />
              ready for delivery.
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-600">
              Your RiskAtlas purchase has been verified through the backend payment workflow.
              The report is now available for secure download.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {status === "paid" && downloadUrl ? (
                <a
                  href={downloadUrl}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-[#183a72] to-[#4db7b2] px-7 py-4 text-base font-semibold text-white shadow-sm transition hover:opacity-95"
                >
                  Download Risk Report
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center rounded-full bg-slate-300 px-7 py-4 text-base font-semibold text-white"
                >
                  Download Pending
                </button>
              )}

              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center rounded-full bg-white px-7 py-4 text-base font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
              >
                Refresh Status
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Status Cards */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Current Status
            </div>
            <div className="text-3xl font-semibold tracking-tight text-slate-950">
              {status === "paid"
                ? "Paid"
                : status === "pending"
                ? "Pending"
                : status === "error"
                ? "Error"
                : "Checking"}
            </div>
            <p className="mt-4 text-base leading-7 text-slate-600">{message}</p>
          </div>

          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Session ID
            </div>
            <div className="break-all text-sm leading-7 text-slate-800">
              {sessionId || "Not available"}
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Delivery Method
            </div>
            <div className="text-3xl font-semibold tracking-tight text-slate-950">
              PDF Report
            </div>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Delivered through a signed download link generated after Stripe webhook confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Verification
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Stripe webhook confirmed
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Payment status is validated on the backend rather than relying on a front-end redirect alone.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Report Generation
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              PDF prepared automatically
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The RiskAtlas engine generates a structured consulting-style PDF after payment confirmation.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Access Control
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Signed download token
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Delivery is protected by a signed token rather than an exposed public file link.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <a
            href="/"
            className="inline-flex items-center text-base font-medium text-slate-500 transition hover:text-slate-900"
          >
            ← Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}
