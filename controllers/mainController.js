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

const createReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.json({ report: report, message: "Successful" });
  } catch (error) {
    res.json(error);
  }
};

const updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate({ _id: req.body._id },
      { $push: { Observations: req.body.Observations } },
      { new: true });
    res.json({ report: report, message: "Successful" });

  } catch (error) {
    res.json(error);
  }
}

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({}).sort({ createdAt: -1 });
    res.json({ reports: reports, message: "Successful" });
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
  createReport,
  getAllReports,
  updateReport,
  getReport,
  createVulnerability,
  getAllVulnerabilities
};
