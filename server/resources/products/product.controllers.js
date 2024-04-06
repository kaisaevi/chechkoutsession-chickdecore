const { initStripe } = require("../../services/stripe.service");

const fetchProducts = async () => {
  try {
    const stripe = initStripe();
    const products = await stripe.products.list();
    return products.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

module.exports = { fetchProducts };
