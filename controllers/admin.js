const users = require("../model/users");
const applicants = require("../model/applicants");
const viewURL = "dashboard/admin/";
exports.dashboard = (req, res) =>
  res.render(viewURL + "index", { pageTitle: "Dashboard" });
exports.viewUsers = (req, res) => {
  res.render(viewURL + "view_users", {
    pageTitle: "Users",
    users,
  });
};
exports.viewApplication = (req, res) => {
  res.render(viewURL + "view_applications", {
    pageTitle: "View Application",
    applicants,
  });
};
exports.approveApplication = (req, res) => {
  let appId = req.params.applicantId;
  applicants.forEach((app) => {
    if (app.app_no == appId) app.status = "approved";
  });
  res.redirect("/admin/view-application");
};
exports.rejectApplication = (req, res) => {
  applicants.find((app) => app.app_no == req.params.applicantId).status =
    "rejected";
  res.redirect("/admin/view-application");
};
exports.applicationSingle = (req, res) => {
  let appId = req.params.applicantId;
  let applicant = applicants.find((app) => {
    return app.app_no == appId;
  });
  if (!applicant) {
    res.redirect("/admin/view-application");
    // res.status(404).render("view_applicant", { pageTitle: "Application", applicant: null });
  } else {
    res.render(viewURL + "view_applicant", {
      pageTitle: "Application",
      applicant,
    });
  }
};
exports.updateApplication = (req, res) => {
  let applicant = applicants.find(
    (app) => app.app_no == req.body.applicationNo,
  );
  applicant.firstname = req.body.firstname;
  applicant.lastname = req.body.lastname;
  applicant.address = req.body.address;
  res.redirect("/admin/view-application");
};
