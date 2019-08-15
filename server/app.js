const express = require("express");
const app = express();
const morgan = require("morgan");
const env = app.get("env");
const path = require("path");
const port = process.env.PORT || 3000;
const reload = require("reload");
const DIST_DIR = path.join(__dirname, "../dist");
const HTML_FILE = path.join(DIST_DIR, "indexs.html");

if (env === "development") {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");

  const config = require("../webpack.dev");
  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
  app.use(morgan("dev"));

  app.get("/", (req, res) => {
    res.sendFile(HTML_FILE);
  });
}

app.use(express.static(DIST_DIR));

reload(app).catch(function(err) {
  console.error(
    "Reload could not start, could not start server/sample app",
    err
  );
});
app.server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
