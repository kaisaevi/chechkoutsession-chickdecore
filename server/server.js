const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./resources/users/users.router");
const authRouter = require("./resources/auth/auth.router");
const stripeRouter = require("./resources/stripe/stripe.router");

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    secret: "hwpohjwpohw",
    maxAge: 1000 * 60 * 60, //Cookiesession lasts 1 hour
  })
);
app.use(cors());

//Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/payments", stripeRouter);

app.listen(3000, () => console.log("Server is up and running...🚀"));
