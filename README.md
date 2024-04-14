# Checkout Session - ChickDecor Furniture Store

In this project, we've developed an e-commerce platform enabling user registration and login, along with payment processing using Stripe. Users can add products to a shopping cart and complete a purchase when logged in. Each completed payment generates an order, which is then saved in a JSON file on the server.

## Requirements

Requirements for pass:

1.  Products should be listed on a page.
2.  Products displayed and purchased should be fetched from Stripe.
3.  It should be possible to add products to a shopping cart.
4.  Based on the shopping cart, it should be possible to place an order through Stripe.
5.  Users should be able to register as a user in the webshop. This should result in a "Customer" being created in Stripe and the user being saved in a JSON file. (all passwords should be saved encrypted).
6.  Users should be able to log in as a customer. The logged-in customer (also saved in Stripe) should be used when placing an order.
7.  It should not be possible to place an order if not logged in.
8.  All placed orders should be saved to a list in a JSON file.
9.  Orders must not be saved under any circumstances without completed payment! (i.e., Never save an order object unless confirmation is received from Stripe that the payment has been completed). The order must contain at least information about the order number, date, customer, products, total price, and pickup location.

Fulfilled requirements for pass: 1-9

Requirements for pass with distinction:

1.  All requirements for pass are fulfilled.
2.  It should be possible to enter a discount code to receive a discount on the purchase (This is done through Stripe).
3.  As a logged-in user, one should be able to see their placed orders.
4.  Before payment, the user needs to fill in their address and based on the address choose a pickup location where the package will be collected (PostNord API).

## Getting started

To get started, follow these steps:

1. Clone the repository:

   ```bash
   https://github.com/kaisaevi/chechkoutsession-chickdecore.git
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

4. Create a .env file in the server root and add the following:

   ```bash
   STRIPE_KEY = XXXXXXXXXXXX
   ```

   ## Usage

# Checkout Session - ChickDecor Furniture Store
