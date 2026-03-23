import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables.");
}

const stripe = new Stripe(stripeSecretKey);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid =
      session.payment_status === "paid" || session.status === "complete";

    const plan =
      typeof session.metadata?.plan === "string"
        ? session.metadata.plan
        : "pro";

    return NextResponse.json({
      ok: true,
      sessionId: session.id,
      paid,
      status: session.status,
      payment_status: session.payment_status,
      plan,
      customer_email: session.customer_details?.email || null,
      amount_total: session.amount_total || null,
      currency: session.currency || null,
    });
  } catch (error) {
    console.error("Verify checkout session error:", error);
    return NextResponse.json(
      { error: "Failed to verify checkout session." },
      { status: 500 }
    );
  }
}