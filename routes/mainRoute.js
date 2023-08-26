const express = require("express");
const router = express.Router();
const {
    createObservation,
    createReport,
    getAllReports,
    updateReport,
    getReport,
    deleteReport,
    createVulnerability,
    getAllVulnerabilities,
    deleteObservationFromReport
} = require("../controllers/mainController");

router.post("/createObservation", createObservation);
router.post("/createReport", createReport);
router.get("/getAllReports", getAllReports);
router.patch("/updateReport", updateReport);
router.post("/getReport", getReport);
router.patch("/deleteReport", deleteReport);
router.post("/createVulnerability", createVulnerability);
router.get("/getAllVulnerabilities", getAllVulnerabilities);
router.patch("/deleteObservationFromReport", deleteObservationFromReport);

module.exports = router;
