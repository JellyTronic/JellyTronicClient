'use client'

// import PaymentForm from "./[cartId]/components/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentTeste from "./components/PaymentTeste";
import { useEffect, useState } from "react";
import { formatPrice } from "@/providers/formatCurrency";
import Button from "@/components/Button";
import Link from "next/link";
import ResumoPayment from "./components/ResumoPayment";
import CartItem from "@/types/Cart";

export default function App({ params }: { params: { cartId: string } }) {
  const [cartId, setCartId] = useState(params.cartId);
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  const [clientSecret, setClientSecret] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const idUser = sessionStorage.getItem('id');
    const cartItemsLocal2 = localStorage.getItem('cart');
    // console.log(JSON.parse(cartItemsLocal2!));
    setCartItems(JSON.parse(cartItemsLocal2!));
    // fetch(process.env.NEXT_PUBLIC_STRIPE_CLIENTID!, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({}),
    // }).then(async (r) => {
    //   const { clientSecret } = await r.json();
    //   console.log(clientSecret);
    //   setClientSecret(clientSecret);
    // });

    handleBuyClick(idUser!);
  }, []);

  const handleBuyClick = async (idUserClient: string) => {
    const response = await fetch(`https://129.148.27.50/api/carrinho/${idUserClient}`);
    const cartUserLogin = await response.json();
    console.log(cartUserLogin.cart_items);

    // console.log(cartItems);
    const productPromises = cartUserLogin.cart_items.map(async (cartItem:any) => {
      console.log(cartItem);
      const response = await fetch(`https://api-fatec.onrender.com/api/v1/product/${cartItem.product_id}`);

      const data = await response.json();
      console.log('aqui é o 51');
      console.log(data);
      const itemValue = data.price * cartItem.amount;
      return ({
        idUserClient: idUserClient,
        name: data.name,
        totalPrice: itemValue,
        quantity: cartItem.amount,
        price: data.price,
        images: data.images[0].image_path
      })
    });

    // Aguarde todas as Promises serem resolvidas
    const products = await Promise.all(productPromises);
    console.log(products);

    const data = {
      products
    };

    console.log(data);

    const res = await fetch(process.env.NEXT_PUBLIC_STRIPE_CLIENTID!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (r) => {
      const clientSecret = await r.json();
      console.log(clientSecret.clientSecret);
      // console.log(await r.json());
      setClientSecret(clientSecret.clientSecret);
    });

    // if (!res.ok) {
    //   return console.log("Ocorreu um erro ao realizar a compra");
    // }
  }


  return (
    <div className="mx-auto p-2 lg:flex">
      <div className="bg-gray-300 rounded-lg lg:h-full mb-6 lg:mb-0 lg:mx-4 lg:w-[70%] p-4">
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }} >
            <h1 className="font-semibold text-2xl mt-2 mb-10">formas de pagamento</h1>
            <div className="mx-auto px-2">
              <PaymentTeste cartId={cartId}/>
            </div>
          </Elements >
        )}
      </div>

      <ResumoPayment cartId={cartId} />
    </div>
  );
};
