const { initStripe } = require("../../services/stripe.service");

const createCheckoutSession = async (req, res) => {
  try {
    const cartItems = req.body.cart;
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

const verifySession = async (req, res) => {
  const stripe = initStripe();
  //session.user.id??
  const sessionId = req.body.sessionId;

  const session = await stripe.session.retrieve(sessionId);

  if (session.payment_status === "paid") {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    console.log(lineItems);

    const order = {
      orderNumber: Math.floor(Math.random() * 10000000),
      customerName: session.customer_details.name,
      products: "",
      total: session.amount_total,
      date: new Date(),
    };
    const orders = JSON.parse(await fs.readFile("../../data/orders.json"));
    orders.push(order);
    await fs.writeFile(
      "../../data/orders.json",
      JSOn.stringify(orders, null, 4)
    );
  }
  console.log(session);
  res.status(200).json({ verified: true });
};

module.exports = { createCheckoutSession, verifySession };
