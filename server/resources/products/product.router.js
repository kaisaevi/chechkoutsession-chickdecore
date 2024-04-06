const express = require("express");
const { fetchProducts } = require("./product.controllers");
const router = express.Router();

router.get("/fetchproducts", fetchProducts);

module.exports = router;
