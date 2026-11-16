const users = require("../model/users");
const bcrypt = require("bcryptjs");
exports.getRegisteration = (req, res) => {
  res.render("register", { pageTitle: "User Registration", applicant: null });
};

exports.getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
exports.postRegisteration = (req, res) => {
  const { firstname, lastname, email, role, password, appNo } = req.body;
  if (
    firstname == "" ||
    lastname == "" ||
    email == "" ||
    role == "" ||
    password == ""
  ) {
    console.log("Please fill all neccessary fields!");
    return res.redirect(`/verify/${appNo}`);
  }
  if (password.length < 6) {
    console.log("Password too weak");
    return res.redirect(`/verify/${appNo}`);
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return console.log("Error trying to hash password");
    users.push({
      _id: Date.now(),
      firstname,
      lastname,
      email,
      password: hash,
      role,
      timestamp: Date.now(),
    });
  });
  res.redirect("/auth/login");
};
