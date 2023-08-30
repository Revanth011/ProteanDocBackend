const Observation = require("../models/Observation");
const Report = require("../models/Report");
const Vulnerability = require("../models/Vulnerability");

const createObservation = async (req, res) => {
  try {
    const observation = await Observation.create(req.body);
    res.json({ observation: observation, message: "Successful" });
  } catch (error) {
    res.json(error);
  }
};

const addObservation = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate({ _id: req.body._id },
      { $push: { Observations: req.body.Observations } },
      { new: true });
    res.json({ report: report, message: "Successful" });

  } catch (error) {
    res.json(error);
  }
}

const updateObservation = async (req, res) => {
  try {
    const report = await Report.findOneAndUpdate({
      _id: req.body.reportId,
      "Observations.ObservationId": req.body.observationId,
    },
      { $set: { "Observations.$": req.body.observation } },
      { new: true }
    );

    res.json({ report: report, message: "Successful" });

  } catch (error) {
    res.json(error);
  }
}

const createReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.json({ report: report, message: "Successful" });
  } catch (error) {
    res.json(error);
  }
};

const getReport = async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.body.id });
    res.json({ report: report, message: "Successful" });
  } catch (error) {
    res.json(error);
  }
};

const deleteReport = async (req, res) => {
  try {
    const report = await Report.findOneAndDelete({ _id: req.body.id });
    res.json({ report: report, message: "Successful" });
  } catch (error) {
    res.json(error);
  }
};

const getObservation = async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.body.reportId, 'Observations.ObservationId': req.body.ObservationId }, { 'Observations.$': 1 })
    if (report) {
      return res.json({ observation: report.Observations[0], message: "Successful" });
    }
    res.json({ observation: report.Observations[0], message: "failed!" });
  } catch (error) {
    res.json(error);
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({}).sort({ createdAt: -1 });
    res.json({ reports: reports, message: "Successful" });
  } catch (error) {
    res.json(error);
  }
};

const deleteObservationFromReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.body.id, { $pull: { Observations: req.body.observation } }, { new: true });
    res.json({ report: report, message: "Successful" });
  } catch (error) {
    res.json(error);
  }
};

const createVulnerability = async (req, res) => {
  try {
    const vulnerability = await Vulnerability.create(req.body);
    res.json({ vulnerability: vulnerability, message: "Successful" });
  } catch (error) {
    res.json(error)
  }
}

const getAllVulnerabilities = async (req, res) => {
  try {
    const vulnerabilities = await Vulnerability.find({}).sort({ Vulnerability: -1 });
    res.json({ vulnerabilities: vulnerabilities, message: "Successful" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createObservation,
  getObservation,
  createReport,
  getAllReports,
  addObservation,
  updateObservation,
  getReport,
  createVulnerability,
  getAllVulnerabilities,
  deleteObservationFromReport,
  deleteReport
};
