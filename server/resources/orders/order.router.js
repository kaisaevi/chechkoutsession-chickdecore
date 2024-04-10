const express = require("express");
const { fetchOrders } = require("./order.controllers");
const router = express.Router();

router.get("/fetchorders", fetchOrders);

module.exports = router;
