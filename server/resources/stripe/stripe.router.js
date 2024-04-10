const express = require("express");
const { createCheckoutSession, verifySession } = require("./stripe.controller");
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/checkout-success", async (req, res) => {
  try {
    await verifySession(req, res);
    res.status(200).send("Order succesfully placed");
  } catch (error) {
    res.status(500).send("Error placing order");
  }
});

module.exports = router;
