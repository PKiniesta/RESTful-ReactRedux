const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

const DIST_DIR = path.join(__dirname, "../dist");
const HTML_FILE = path.join(DIST_DIR, "indexs.html");

app.use(express.static(DIST_DIR));

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE);
});

app.server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
