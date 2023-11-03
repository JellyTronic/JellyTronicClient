import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51NXaMiKZZkxd9m1GABnRxxVVr6egfCPZ85McbrEEf23ihapudcN3O0vFH1SnTkKOQ45hUZIK1JbV5hyklxnx1cU900FjA0onK0', {
  apiVersion: '2023-08-16'
});

export async function POST() {

  try {

    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/minha-conta',
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
