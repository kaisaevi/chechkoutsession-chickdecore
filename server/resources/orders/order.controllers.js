const { initStripe } = require("../../services/stripe.service");

const fetchOrders = async (req, res) => {
  try {
    const stripe = initStripe();
    const orders = await stripe.climate.orders.list({});
    console.log("orders:", orders.data);
    if (!orders || orders.length <= 0) {
      return res.status(400).json("Couldn't find orders");
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(400).json(error);
  }
};
module.exports = { fetchOrders };
