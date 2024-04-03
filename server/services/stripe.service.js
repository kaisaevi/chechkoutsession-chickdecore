const Stripe = require("stripe");

const initStripe = () => {
  const apiKey = process.env.STRIPE_KEY;
  if (!apiKey) return;
  return new Stripe(apiKey, {
    apiVersion: "2023-10-16",
  });
};

const createCustomer = async (customer) => {
  try {
    const response = await Stripe.customers.create(customer);
  } catch (error) {}
};

module.exports = { initStripe };
