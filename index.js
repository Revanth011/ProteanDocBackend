const express = require("express");
const app = express(exports);
const multer = require("multer");
const mongoose = require("mongoose");
const docx = require("docx");
const cors = require("cors");
const { Packer } = docx;
const fs = require("fs");

app.use(express.json());
app.use(cors());
const { generateDocument } = require("./Doc");

const observation = require("./routes/mainRoute");
app.use("/", observation);

//mongodb connection
mongoose
  .connect(
    "mongodb+srv://protean:protean0909@cluster0.qs6otio.mongodb.net/protean-test?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded successfully.",
    filename: req.file.filename,
  });
});

app.post("/download", async (req, res) => {
  const docMap = {
    "Critical": [],
    "High": [],
    "Medium": [],
    "Low": [],
    "Informational": []
  }

  let finalDoc = [];
  req.body.document.forEach(obser => {
    docMap[obser.Severity].push(obser)
  })
  finalDoc = [...docMap["Critical"], ...docMap["High"], ...docMap["Medium"], ...docMap["Low"], ...docMap["Informational"]]
  Packer.toBuffer(generateDocument(finalDoc)).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
    fs.copyFile("./My Document.docx", `./backup/${req.body.id}_backup.docx`, (error) => {
      if (error) {
        console.log(error)
      }
    })
    res.download("My Document.docx");
  });
});

app.get("/", (req, res) => {
  res.send(new Date());
});

app.listen(8000, () => {
  console.log(`Server is running`);
});
