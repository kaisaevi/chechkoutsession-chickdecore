const fetchUsers = require("../../utils/fetchUsers");
const { getUsers } = require("../users/users.controllers");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

const register = async (req, res) => {
  const { email, password } = req.body;

  // kolla så att användaren redan inte finns
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
  res.status(201).json(newUser);
};

module.exports = { register };
