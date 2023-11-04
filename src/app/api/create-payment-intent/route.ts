// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(res: any) {
  // const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: 1999,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });


    res.send({
      clientSecret: paymentIntent.client_secret
    });
    
  } catch (e: any) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    })
  }

};
