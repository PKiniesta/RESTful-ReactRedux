const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 5000;
const appReactPort = 3000;

const Course = require("./models/courseModel");
const coursesRouter = require("./routes/coursesRouter")(Course);
const User = require("./models/userModel");
const usersRouter = require("./routes/usersRouter")(User);
const Author = require("./models/authorModel");
const authorsRouter = require("./routes/authorsRouter")(Author);

const DATABASE_NAME = "RestfulPK2019";
const CONNECTION_URL = `mongodb+srv://admin123:admin123@cluster0-lskuo.gcp.mongodb.net/${DATABASE_NAME}`;
const DIST_DIR = path.join(__dirname, "../client/dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

const app = express();
const reactApp = express();

reactApp.use(express.static(DIST_DIR));

reactApp.get("*", (req, res) => {
  res.sendFile(HTML_FILE);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/", coursesRouter);
app.use("/", authorsRouter);
app.use("/", usersRouter);

app.server = app.listen(port, () => {
  const db = mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true })
    .then(() => console.log(`Connected to db ${DATABASE_NAME}`))
    .catch(err => console.log(err));
  console.log(`App listening on port ${port}`);
});

reactApp.server = reactApp.listen(appReactPort, () => {
  console.log(`React listening on port ${appReactPort} `);
});

module.exports = app;
