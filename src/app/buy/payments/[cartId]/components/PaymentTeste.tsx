// import Card from "@stripe/stripe-js";
import { CardElement, CardNumberElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import StatusMessages, { useMessages } from "./StatusMessages";
import { useState } from "react";
import Button from "@/components/Button";
// import stripe from "stripe";

interface PaymentTesteProps {
  cartId: string;
}


const PaymentTeste = ({cartId}:PaymentTesteProps) => {

  const elements = useElements();
  const stripe = useStripe();
  const [messages, addMessages] = useMessages();
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_STRIPE_CONFIRMATION!
      },
      redirect: 'if_required',
    });
    console.log('pagamento confirmado')

    localStorage.setItem('cart', '');

    const data = {
      status: 2
    }

    if (error) {
      setMessage(error.message!)
    } else if (paymentIntent && paymentIntent.status === 'succeeded'){
      console.log(paymentIntent);
      setMessage('Payment status: ' + paymentIntent.status + "🎉");
      localStorage.setItem('cart', '');
      const res = await fetch(`https://129.148.27.50/api/pedido/update/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      window.location.href = process.env.NEXT_PUBLIC_STRIPE_CONFIRMATION!
    } else {
      setMessage('Unexpected state');
    }

    setIsProcessing(false)

  }

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement />

        <div className="mt-6 mb-2 lg:flex justify-center">
          <Button disabled={isProcessing} className="w-[100%] lg:w-[50%] py-2 font-semibold text-xl">
            {isProcessing ? "Processing..." : "Pay now"}
          </Button>
        </div>

        {message && (
          <div>
            <p>{message}</p>
          </div>
        )}

      </form>
    </div>
  );
}

export default PaymentTeste;
