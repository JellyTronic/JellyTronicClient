// import Card from "@stripe/stripe-js";
import { CardElement, CardNumberElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import StatusMessages, { useMessages } from "./StatusMessages";
import { useState } from "react";
import Button from "@/components/Button";
// import stripe from "stripe";


const PaymentTeste = () => {

  const elements = useElements();
  const stripe = useStripe();
  const [messages, addMessages] = useMessages();
  const [clientSecret, setClientSecret] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_STRIPE_CONFIRMATION!
      }
    })

    localStorage.setItem('cart', '');

    if (error) {
      console.log('error')
      console.log(error.message);
    }


    // addMessages('Creating Payment intent...');

    // const { clientSecret } =  await fetch('http://localhost:3000/api/clientID', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     paymentMethodType: 'card',
    //     currency: 'brl',
    //   }),
    // }).then(r => r.json())

    // // const elementsStripe = elements({clientSecret});
    // // const paymentElement = elementsStripe.create('payment')
    // // paymentElement.mount("")


    // console.log(clientSecret);

    // addMessages('Payment intent created');
    // console.log('Payment intent created');
    // console.log(elements)

    // console.log(clientSecret);
    // const { paymentIntent } = await stripe.confirmCardPayment(
    //   clientSecret, {
    //   payment_method: {
    //     card: elements?.getElement(CardElement)!,
    //   }
    // });

    // console.log(clientSecret);

    // addMessages(`PaymentIntent (${paymentIntent!.id}): ${paymentIntent?.status}`);
    // console.log(`PaymentIntent (${paymentIntent!.id}): ${paymentIntent?.status}`);

  }

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement />

        <div className="mt-6 mb-2 lg:flex justify-center">
          <Button className="w-[100%] lg:w-[50%] py-2 font-semibold text-xl">
            confirmar pagamento
          </Button>
        </div>

      </form>
    </div>
  );
}

export default PaymentTeste;
