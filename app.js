const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //Telling Express to use the public folder for static files like CSS, JS, and images
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/auth/login", (req, res) => {
  res.send("<h1>Login Here</h1>");
});
app.get("/auth/register", (req, res) => {
  res.send("<h1>Register Here</h1>");
});

const PORT = 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
