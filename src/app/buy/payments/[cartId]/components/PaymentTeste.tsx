// import Card from "@stripe/stripe-js";
import { CardElement, CardNumberElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import StatusMessages, { useMessages } from "./StatusMessages";
import { useState } from "react";
import Button from "@/components/Button";
// import stripe from "stripe";


const PaymentTeste = () => {

  const elements = useElements();
  const stripe = useStripe();
  // const [messages, addMessages] = useMessages();
  // const [clientSecret, setClientSecret] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/minha-conta`
      }
    })

    if (error) {
      console.log('error')
      console.log(error.message);
    }

    // setIsProce

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

    // const elementsStripe = elements({clientSecret});
    // const paymentElement = elementsStripe.create('payment')
    // paymentElement.mount("")


    // console.log(clientSecret);

    // addMessages('Payment intent created');

    // console.log(clientSecret);
    // const { paymentIntent } = await stripe.confirmCardPayment(
    //   clientSecret, {
    //   payment_method: {
    //     card: elements?.getElement(CardElement)!,
    //   }
    // });

    // console.log(clientSecret);

    // addMessages(`PaymentIntent (${paymentIntent!.id}): ${paymentIntent?.status}`);

  }

  return (
    <div className="">
      <form id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement />

        <div className="flex justify-center mt-6">
          <Button className="text-lg px-10">Pay</Button>
        </div>
      </form>
    </div>
  );
}

export default PaymentTeste;
