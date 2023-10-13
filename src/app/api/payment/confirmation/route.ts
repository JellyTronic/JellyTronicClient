import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16'
});

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature")!;

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(text, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY!)
}
