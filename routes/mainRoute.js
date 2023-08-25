const express = require("express");
const router = express.Router();
const {
    createObservation,
    createReport,
    getAllReports,
    updateReport,
    getReport,
    createVulnerability,
    getAllVulnerabilities
} = require("../controllers/mainController");

router.post("/createObservation", createObservation);
router.post("/createReport", createReport);
router.get("/getAllReports", getAllReports);
router.post("/getReport", getReport);
router.patch("/updateReport", updateReport);
router.post("/createVulnerability", createVulnerability);
router.get("/getAllVulnerabilities", getAllVulnerabilities);

module.exports = router;
