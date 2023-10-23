import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16'
});

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature")!;

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(text, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY!)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;

    console.log({session})

    const data = {
      delivery_type: "Expresso",
      delivery_price: 30,
      payment_type: "MasterCard",
      payment_discount: 1,
      installment_payment: 2,
      obs: "Frágil"
    }


    const response = await fetch(`https://129.148.27.50/api/carrinho/tosale/19`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })

    if (response.ok) {
      console.log("item removdio")
      console.log(response)
      // const updatedCartItems = cartItems.filter(item => item.productId !== productId);
      // setCartItems(updatedCartItems);
      // localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    } else {
      console.error('Erro ao excluir o item');
    }





  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
