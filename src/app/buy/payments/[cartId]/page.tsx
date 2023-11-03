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

export default function App({ params }: { params: { cartId: string } }) {
  const [cartId, setCartId] = useState(params.cartId);
  const stripePromise = loadStripe('pk_test_51NXaMiKZZkxd9m1G2rMHg2w4TDF1ZCp9kMcZB6iopf2Ss2Al4iWvxNCco5KRmzPhFUehlLsdCfl1XVgetfDMZdG700OgjjYpSE')
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/clientID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      console.log(clientSecret);
      setClientSecret(clientSecret);
    });
  })


  return (
    <div className="mx-auto p-2 h-full flex">
      <div className="bg-gray-300 rounded-lg lg:mx-4 lg:w-[70%] p-4">
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }} >
            <h1 className="font-semibold text-2xl mt-2 mb-10">formas de pagamento</h1>
            <div className="mx-auto px-2">
              <PaymentTeste />
            </div>
          </Elements >
        )}
      </div>

      <ResumoPayment cartId={cartId} />
    </div>
  );
};
