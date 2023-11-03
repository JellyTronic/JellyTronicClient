import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16'
});

export async function POST() {

  try {

    const session = await stripe.checkout.sessions.create({
      success_url: process.env.STRIPE_CONFIRMATION!,
      metadata: {
        name: "teste"
      },
      line_items: [
        {
          price_data: {
            currency: 'brl',
            unit_amount: 10 * 100,
            product_data: {
              name: 'productName',
              description: "tetstetetetetee",
            },
          },
          quantity: 1, // Adicione a quantidade desejada
        },
      ],
      mode: 'payment'
    });


    return new NextResponse(JSON.stringify({ sessionId: session.id }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Erro ao processar a solicitação', { status: 500 });
  }
}
