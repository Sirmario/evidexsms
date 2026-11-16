const nodemailer = require("nodemailer");
const users = require("../model/users");
const applicants = require("../model/applicants");
exports.homePage = (req, res) => {
  res.render("index", {
    pageTitle: "Home",
    applicants,
  });
};
exports.aboutPage = (req, res) => {
  res.render("about", { pageTitle: "About Us" });
};
exports.contactPage = (req, res) => {
  res.render("contact", { pageTitle: "Contact Us" });
};
exports.getApplicationPage = (req, res) => {
  res.render("application", {
    pageTitle: "Application",
    isApplicationActive: true,
  });
};
exports.postApplicationPage = (req, res) => {
  let appNo = genAppNo();
  applicants.push({
    app_no: appNo,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    status: "approved",
    timestamp: Date.now(),
  });
  sendMail();
  res.json({ status: "submitted", applicationNo: appNo });
};
exports.checkApplicationPage = (req, res) => {
  res.render("check_application", { pageTitle: "Check Admission" });
};
exports.postCheckApplicationPage = (req, res) => {
  let applicationNum = req.body.applicationNo;
  let applicant = applicants.find((app) => app.app_no == applicationNum);
  if (applicant) {
    res.status(200).json({
      status: applicant.status,
      appNo: applicationNum,
      message:
        applicant.status == "approved"
          ? `Congratulation ${applicant.lastname} ${applicant.firstname}, you have been offered Admission`
          : applicant.status == "rejected"
            ? "Your admission was denied, please try again next time."
            : "No Admission Yet!",
    });
  } else {
    res
      .status(404)
      .json({ status: "invalid", message: "Invalid Application Number!" });
  }
};
exports.appNotification = (req, res) => {
  let applicant = applicants.find((app) => app.app_no == req.params.appNo);
  res.render("admission_notification", {
    pageTitle: "Admission Notification",
    applicant,
  });
};
exports.verifyAccount = (req, res) => {
  let applicant = applicants.find((app) => app.app_no == req.params.appNo);
  res.render("register", { pageTitle: "Complete Registeration", applicant });
};

function genAppNo() {
  let rand = Math.trunc(Math.random() * 1000000);
  return "EV-" + `${new Date().getYear()}`.slice(1) + `-${rand}`;
}
async function sendMail() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"Example Team" <mina.marks@ethereal.email>', // sender address
      to: "alice@example.com", // list of recipients
      subject: "Hello", // subject line
      text: "Hello world?", // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}
