import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16'
});

export async function POST() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
    });
    return new NextResponse(JSON.stringify({clientSecret: paymentIntent.client_secret}), { status: 200 });
    // res.json({clientSecret: paymentIntent.client_secret})
    // publishableKey: 'pk_test_51NXaMiKZZkxd9m1G2rMHg2w4TDF1ZCp9kMcZB6iopf2Ss2Al4iWvxNCco5KRmzPhFUehlLsdCfl1XVgetfDMZdG700OgjjYpSE'
  } catch {
    console.log('teste')
  }
};
