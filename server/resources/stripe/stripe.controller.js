const initStripe = require("../../services/stripe.service");

const createCheckoutSession = async (req, res) => {
  try {
    const cart = req.body;
    const cartItems = JSON.parse(cart.body);
    const stripe = initStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: cartItems.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:5173/confirmation",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

module.exports = { createCheckoutSession };
