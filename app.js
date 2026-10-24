const express = require("express");
const app = express();
const applicants = [];
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); //Telling Express to use the public folder for static files like CSS, JS, and images
app.get("/", (req, res) => {
  res.render("index", { pageTitle: "Home" });
});
app.get("/about", (req, res) => {
  res.render("about", { pageTitle: "About Us" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { pageTitle: "Contact Us" });
});
app.get("/auth/login", (req, res) => {
  res.send("<h1>Login Here</h1>");
});
app.get("/application", (req, res) => {
  res.render("application", { pageTitle: "Application" });
});

app.get("/view-application", (req, res) => {
  res.render("view_applications", {
    pageTitle: "View Application",
    applicants,
  });
});
app.get("/application/approve/:applicantId", (req, res) => {
  let appId = req.params.applicantId;
  applicants.forEach((app) => {
    if (app.app_no == appId) app.status = "approved";
  });
  res.redirect("/view-application");
});
app.get("/application/reject/:applicantId", (req, res) => {
  let appId = req.params.applicantId;
  applicants.forEach((app) => {
    if (app.app_no == appId) app.status = "rejected";
  });
  res.redirect("/view-application");
});
app.get("/application/view/:applicantId", (req, res) => {
  let appId = req.params.applicantId;
  let applicant = applicants.find((app) => {
    return app.app_no == appId;
  });
  if (!applicant) {
    res.redirect("/view-application");
    // res.status(404).render("view_applicant", { pageTitle: "Application", applicant: null });
  } else {
    res.render("view_applicant", { pageTitle: "Application", applicant });
  }
});
app.post("/application", (req, res) => {
  applicants.push({
    app_no: genAppNo(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    status: "pending",
    timestamp: Date.now(),
  });
  res.redirect("/application");
});

function genAppNo() {
  let rand = Math.trunc(Math.random() * 1000000);
  return "EV-" + `${new Date().getYear()}`.slice(1) + `-${rand}`;
}
const PORT = 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
