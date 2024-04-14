const express = require("express");
const {
  createCheckoutSession,
  verifySession,
  getActiveCouponCodes,
} = require("./stripe.controller");
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/checkout-success", verifySession);
router.get("/get-active-coupons", getActiveCouponCodes);

module.exports = router;
