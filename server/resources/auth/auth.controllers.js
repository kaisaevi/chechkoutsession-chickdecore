const fetchUsers = require("../../utils/fetchUsers");
const { getUsers } = require("../users/users.controllers");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const { initStripe } = require("../../services/stripe.service");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const users = await fetchUsers();
  const userAlreadyExists = users.find((user) => user.email === email);

  if (userAlreadyExists) {
    return res.status(400).json("User already exists");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const stripe = initStripe();
    const stripeCustomer = await stripe.customers.create({
      name: name,
      email: email,
    });

    const newUser = {
      name,
      email,
      password: hashedPassword,
      stripeCustomerId: stripeCustomer.id,
    };

    users.push(newUser);
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

    console.log("name is: ", name, email);
    console.log("Stripe customer created:", stripeCustomer);

    res.status(201).json(newUser.email);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json("Error registering user");
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const users = await fetchUsers();
  const userExists = users.find((user) => user.email === email);

  if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
    return res.status(400).json("User doesn't exists or wrong password");
  }

  req.session.user = userExists;

  res.status(200).json(userExists.email);
};

const logOut = (req, res) => {
  req.session = null;
  res.status(200).json("Successfully logged out");
};

const authorize = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json("You are not logged in");
  }
  res.status(200).json(req.session.user.email);
};

module.exports = { register, logIn, logOut, authorize };
