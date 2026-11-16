const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");
const applicants = [];
router.get("/", mainController.homePage);

router.get("/about", mainController.aboutPage);
router.get("/contact", mainController.contactPage);

router.get("/application", mainController.getApplicationPage);

router.get("/check-application", mainController.checkApplicationPage);
router.post("/check-application", mainController.postCheckApplicationPage);
router.get("/application_notification/:appNo", mainController.appNotification);
router.get("/verify/:appNo", mainController.verifyAccount);
router.post("/application", mainController.postApplicationPage);

module.exports = router;
