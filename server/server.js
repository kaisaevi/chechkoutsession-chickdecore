const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./resources/users/users.router");
const authRouter = require("./resources/auth/auth.router");
const stripeRouter = require("./resources/stripe/stripe.router");
const productRouter = require("./resources/products/product.router");
const orderRouter = require("./resources/orders/order.router");

const app = express();

// Middleware för att logga förfrågningar
const logRequests = (req, res, next) => {
  console.log(`Received ${req.method} request for ${req.path}`);
  next(); // Fortsätt till nästa middleware eller route-handler
};

// Använd logRequests-middleware för att logga förfrågningar
app.use(logRequests);

app.use(express.json());
app.use(
  cookieSession({
    secret: "hwpohjwpohw",
    maxAge: 1000 * 60 * 60, //Cookiesession lasts 1 hour
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/payments", stripeRouter);
app.use("/api/products", productRouter);
// app.use("/api/orders", orderRouter);

app.listen(3000, () => console.log("Server is up and running...🚀"));
