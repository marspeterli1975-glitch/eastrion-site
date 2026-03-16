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
  const [downloadToken, setDownloadToken] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");

  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://global-risk-api.onrender.com";

  const paymentStatusUrl = useMemo(() => {
    if (!sessionId) return "";
    return `${apiBase}/payment-status/${sessionId}`;
  }, [apiBase, sessionId]);

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
      } catch (error) {
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
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <a
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            ← Back to Home
          </a>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white text-2xl">
            ✓
          </div>

          <h1 className="mb-3 text-3xl font-semibold tracking-tight">
            RiskAtlas Payment Status
          </h1>

          <p className="mb-6 text-base text-slate-600">{message}</p>

          <div className="mb-8 rounded-2xl bg-slate-50 p-5">
            <div className="mb-2 text-sm font-medium text-slate-500">Session ID</div>
            <div className="break-all font-mono text-sm text-slate-900">
              {sessionId || "Not available"}
            </div>
          </div>

          {status === "loading" && (
            <div className="rounded-2xl border border-slate-200 p-5 text-slate-600">
              Verifying your payment with the server...
            </div>
          )}

          {status === "pending" && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
              Payment is in progress or the report is still being generated.
            </div>
          )}

          {status === "error" && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
              We could not confirm the order automatically.
            </div>
          )}

          {status === "paid" && downloadUrl && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
                Your payment has been confirmed. Your report is ready for download.
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={downloadUrl}
                  className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Download Risk Report
                </a>

                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Refresh Status
                </button>
              </div>
            </div>
          )}

          <div className="mt-10 border-t border-slate-200 pt-6">
            <h2 className="mb-3 text-lg font-semibold">What happens next</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Your payment is verified through Stripe webhook confirmation.</li>
              <li>• Your RiskAtlas PDF report is generated on the backend.</li>
              <li>• The download link is protected by a signed token.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
