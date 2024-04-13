const express = require("express");
const { createCheckoutSession, verifySession } = require("./stripe.controller");
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/checkout-success", verifySession);

module.exports = router;
