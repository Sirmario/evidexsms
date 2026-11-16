require("dotenv").config();
const express = require("express");

const mainRouter = require("./routes/main");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); //Telling Express to use the public folder for static files like CSS, JS, and images
app.use(express.json());
app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

const PORT = 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
