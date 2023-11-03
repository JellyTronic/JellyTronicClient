// import Card from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import StatusMessages, { useMessages } from "./StatusMessages";
import { useState } from "react";


const PaymentForm = () => {

  const elements = useElements();
  const stripe = useStripe();
  const [messages, addMessages] = useMessages();
  // const [clientSecret, setClientSecret] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    addMessages('Creating Payment intent...');

    const { clientSecret } =  await fetch(process.env.STRIPE_CLIENTID!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodType: 'card',
        currency: 'brl',
      }),
    }).then(r => r.json())


    // console.log(clientSecret);

    addMessages('Payment intent created');

    console.log(clientSecret);
    const { paymentIntent } = await stripe.confirmCardPayment(
      clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement)!,
      }
    });

    console.log(clientSecret);

    addMessages(`PaymentIntent (${paymentIntent!.id}): ${paymentIntent?.status}`);

  }

  return (
    <div className="w-96 bg-slate-400">
      {/* <h1>Card</h1> */}

      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card-element">Card</label>
        <CardElement id="card-element" />
        {/* <label htmlFor="card-element">Card</label> */}
        <button>Pay</button>
      </form>
      {/* <Card /> */}
      <StatusMessages messages={messages} />
    </div>
  );
}

export default PaymentForm;
