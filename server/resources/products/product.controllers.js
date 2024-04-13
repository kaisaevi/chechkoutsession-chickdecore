const { initStripe } = require("../../services/stripe.service");

const fetchProducts = async (req, res) => {
  try {
    const stripe = initStripe();
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(400).json(error);
  }
};

module.exports = { fetchProducts };
