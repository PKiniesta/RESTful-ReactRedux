const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3005;
const CONNECTION_URL = `mongodb+srv://admin123:admin123@cluster0-lskuo.gcp.mongodb.net/test?retryWrites=true&w=majority`;
const DATABASE_NAME = "RestfulPK2019";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.server = app.listen(port, () => {
  const db = mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true })
    .then(() => console.log(`Connected to db`))
    .catch(err => console.log(err));
  console.log(`App listening on port ${port}`);
});

module.exports = app;
