const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/", adminController.dashboard);
router.get("/users", adminController.viewUsers);
router.get("/view-application", adminController.viewApplication);
router.get(
  "/application/approve/:applicantId",
  adminController.approveApplication,
);
router.get(
  "/application/reject/:applicantId",
  adminController.rejectApplication,
);
router.get("/application/view/:applicantId", adminController.applicationSingle);
router.post("/application/update", adminController.updateApplication);

module.exports = router;
