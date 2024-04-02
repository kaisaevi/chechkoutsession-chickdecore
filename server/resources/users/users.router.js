const express = require("express");
const { getUsers } = require("./users.controllers");
const { loggedIn } = require("../../middlewares/loggedin");
const router = express.Router();

router.get("/", loggedIn, getUsers);

module.exports = router;
