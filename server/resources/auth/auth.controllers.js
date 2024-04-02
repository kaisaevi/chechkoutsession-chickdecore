const fetchUsers = require("../../utils/fetchUsers");
const { getUsers } = require("../users/users.controllers");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

const register = async (req, res) => {
  const { email, password } = req.body;

  // kolla så att användaren inte redan finns
  const users = await fetchUsers();
  const userAlreadyExists = users.find((user) => user.email === email);

  if (userAlreadyExists) {
    return res.status(400).json("User already exists");
  }
  // kryptera lösenordet
  const hashedPassword = await bcrypt.hash(password, 10);

  //spara till databasen
  const newUser = {
    email,
    password: hashedPassword,
  };
  users.push(newUser);

  await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

  //skicka tillbaka ett svar
  res.status(201).json(newUser.email);
};

const logIn = async (req, res) => {
  //kontrollera att användaren finns
  const { email, password } = req.body;

  const users = await fetchUsers();
  const userExists = users.find((user) => user.email === email);

  //kontrollera att lösenordet stämmer och att användaren finns

  if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
    return res.status(400).json("User doesn't exists or wrong password");
  }

  //skapa en session
  req.session.user = userExists;

  //skicka tillbaka ett svar
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
