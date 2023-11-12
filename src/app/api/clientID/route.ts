import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16'
});

export async function POST(request: Request) {
  try {
    const req = await request.json();

    const { products } = req;

    console.log('products')
    console.log(products[0].idUserClient);

    const line_items: { price_data: { currency: string; unit_amount: number; product_data: { name: string; }; }; quantity: number; }[] = [];
    console.log('line_items');
    console.log(line_items);

    products.forEach((product: { name: string; totalPrice: number; price: number; images: string; quantity: number }) => {
      const { name: productName, images, totalPrice, price, quantity } = product;

      console.log(productName)


      // Criar um item de linha para o produto atual
      const metadate = {
        price_data: {
          currency: 'brl',
          unit_amount: price * 100,
          product_data: {
            name: productName,
            description: "tetstetetetetee",
            images: [images]
            // price: totalPrice
          },
        },
        quantity: quantity,
      };

      console.log(metadate.price_data.product_data)

      line_items.push(metadate); // Adicionar o item de linha ao array de itens de linha
    });

    console.log(line_items)
    console.log('payment')

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
    });

    console.log('depois do payment')
    console.log(products[0].idAddress);
    console.log(products[0].coupon_id);

    const data = {
      delivery_type: Number(products[0].delivery_type),
      payment_type: "Card",
      installment_payment: 2,
      delivery_address: products[0].idAddress,
      coupon_id: Number(products[0].coupon_id),
      obs: "Frágil"
    }

    console.log('antes do response')
    console.log(products[0].idUserClient);


    const response = await fetch(`https://129.148.27.50/api/carrinho/tosale/${products[0].idUserClient}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(async (r) => {
      // console.log(await r.json());
      const clientSecret = await r.json();
      console.log(clientSecret)
      // console.log(clientSecret.clientSecret);
      // console.log(await r.json());
      // setClientSecret(clientSecret.clientSecret);
    });

    console.log('aqui ta o response')
    console.log(response);
    // const teste = await response.json();
    // console.log(teste)

    // if (response.ok) {
    //   console.log("item removdio")
    //   console.log(response)
    //   // const updatedCartItems = cartItems.filter(item => item.productId !== productId);
    //   // setCartItems(updatedCartItems);
    //   // localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    // } else {
    //   console.error('Erro ao excluir o item');
    // }

    // if (response) {
    //   if (response.ok) {
    //     console.log("item removido");
    //     console.log(response);
    //   } else {
    //     console.error('Erro ao excluir o item');
    //   }
    // } else {
    //   console.error('Resposta não definida ou indefinida');
    // }


    return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 });
    // res.json({clientSecret: paymentIntent.client_secret})
    // publishableKey: 'pk_test_51NXaMiKZZkxd9m1G2rMHg2w4TDF1ZCp9kMcZB6iopf2Ss2Al4iWvxNCco5KRmzPhFUehlLsdCfl1XVgetfDMZdG700OgjjYpSE'
  } catch {
    console.log('deu erro ao enviar')
  }
};
