import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables.");
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing stripe-signature header.", {
      status: 400,
    });
  }

  try {
    const body = await req.text();

    // 开发 / MVP 阶段：如果还没配置 webhook secret，先跳过验签，避免阻塞部署
    if (!webhookSecret) {
      console.warn(
        "⚠️ STRIPE_WEBHOOK_SECRET is missing. Webhook signature verification is being skipped."
      );

      return NextResponse.json({
        received: true,
        skipped: true,
        reason: "Missing STRIPE_WEBHOOK_SECRET",
      });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log("✅ checkout.session.completed", {
          id: session.id,
          plan: session.metadata?.plan,
          payment_status: session.payment_status,
          customer_email: session.customer_details?.email,
          amount_total: session.amount_total,
          currency: session.currency,
        });
        break;
      }

      default:
        console.log(`ℹ️ Unhandled Stripe event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed:", error);
    return new NextResponse("Webhook Error", { status: 400 });
  }
}