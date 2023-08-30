const express = require("express");
const router = express.Router();
const {
    createObservation,
    addObservation,
    updateObservation,
    getObservation,
    deleteObservationFromReport,
    createReport,
    getReport,
    deleteReport,
    getAllReports,
    createVulnerability,
    getAllVulnerabilities,
} = require("../controllers/mainController");

router.post("/createObservation", createObservation);
router.patch("/addObservation", addObservation);
router.put("/updateObservation", updateObservation);
router.post("/getObservation", getObservation);
router.patch("/deleteObservationFromReport", deleteObservationFromReport);
router.post("/createReport", createReport);
router.post("/getReport", getReport);
router.patch("/deleteReport", deleteReport);
router.get("/getAllReports", getAllReports);
router.post("/createVulnerability", createVulnerability);
router.get("/getAllVulnerabilities", getAllVulnerabilities);


module.exports = router;
