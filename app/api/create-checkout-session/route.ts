import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteUrl = rawSiteUrl.replace(/\/+$/, "");

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables.");
}

const stripe = new Stripe(stripeSecretKey);

const planConfig = {
  pro: {
    name: "RiskAtlas Professional Report",
    description: "Commercial decision preview with full report unlock",
    amount: 4900,
  },
  execution: {
    name: "RiskAtlas Execution Upgrade",
    description: "Risk + loading-plan linkage and execution layer",
    amount: 14900,
  },
} as const;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const plan = body?.plan as keyof typeof planConfig;

    if (!plan || !planConfig[plan]) {
      return NextResponse.json(
        { error: "Invalid plan selected." },
        { status: 400 }
      );
    }

    const selected = planConfig[plan];

    const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: selected.name,
          description: selected.description,
        },
        unit_amount: selected.amount,
      },
      quantity: 1,
    },
  ],
  metadata: {
    plan,
  },
  success_url: `${siteUrl}/riskatlas/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${siteUrl}/riskatlas/cancel`,
  payment_method_types: ["card"],
});

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return NextResponse.json(
      { error: "Failed to create Stripe checkout session." },
      { status: 500 }
    );
  }
}