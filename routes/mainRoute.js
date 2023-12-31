const express = require("express");
const router = express.Router();
const {
    addObservation,
    updateObservation,
    getObservation,
    deleteObservationFromReport,
    createReport,
    getReport,
    getReportsByUser,
    deleteReport,
    getAllReports,
    createVulnerability,
    getVulnerability,
    getAllVulnerabilities,
    updateVulnerability,
    deleteVulnerability
} = require("../controllers/mainController");

router.patch("/addObservation", addObservation);
router.put("/updateObservation", updateObservation);
router.post("/getObservation", getObservation);
router.patch("/deleteObservationFromReport", deleteObservationFromReport);
router.post("/createReport", createReport);
router.post("/getReport", getReport);
router.post("/getReportsByUser", getReportsByUser);
router.patch("/deleteReport", deleteReport);
router.get("/getAllReports", getAllReports);
router.post("/createVulnerability", createVulnerability);
router.post("/getVulnerability", getVulnerability);
router.get("/getAllVulnerabilities", getAllVulnerabilities);
router.put("/updateVulnerability", updateVulnerability);
router.delete("/deleteVulnerability", deleteVulnerability);

module.exports = router;
