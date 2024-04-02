const express = require("express");
const { register, logIn, logOut, authorize } = require("./auth.controllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);
router.post("/logout", logOut);
router.get("authorize", authorize);

module.exports = router;
