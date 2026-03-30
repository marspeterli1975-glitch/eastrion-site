import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables.");
}

const stripe = new Stripe(stripeSecretKey);

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: "Missing session_id." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid =
      session.payment_status === "paid" || session.status === "complete";

    const customerEmail =
      session.customer_details?.email ||
      session.customer_email ||
      null;

    return NextResponse.json({
      ok: true,
      paid,
      sessionId: session.id,
      paymentStatus: session.payment_status,
      status: session.status,
      customerEmail,
      metadata: session.metadata || {},
    });
  } catch (error) {
    console.error("Verify checkout session error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to verify checkout session.",
      },
      { status: 500 }
    );
  }
}