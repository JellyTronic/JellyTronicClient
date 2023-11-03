import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16'
});

export async function POST() {
  try {
    // const req = await request.json();


    // const { products } = req;

    // Array para armazenar as sessões de pagamento
    // const sessions = [];
    // const lineItems: { price_data: { currency: string; unit_amount: number; product_data: { name: string; }; }; quantity: number; }[] = [];

    //   console.log(products)
    // // Iterar pelos produtos e criar itens de linha para cada um
    // products.forEach((product: { name: string; totalPrice: number; price:number; images:string; quantity: number }) => {
    //   const { name: productName, images, totalPrice, price, quantity } = product;

    //   console.log(productName)

      // Criar um item de linha para o produto atual
      const lineItem = {
        price_data: {
          currency: 'brl',
          unit_amount: 2 * 100,
          product_data: {
            name: 'productName',
            description: "tetstetetetetee",
            // images:[images]
            // price: totalPrice
          },
        },
        quantity: 3,
      };

      console.log(lineItem.price_data.product_data)

      // lineItems.push(lineItem); // Adicionar o item de linha ao array de itens de linha
    // });

    // console.log(lineItems)


    // Resto do código para criar a sessão de pagamento com o Stripe
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/minha-conta',
      metadata: {
        name: "teste"
      },
      line_items: [lineItem],
      mode: 'payment'
    });

    return new NextResponse(JSON.stringify(session), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Erro ao processar a solicitação', { status: 500 });
  }
}
