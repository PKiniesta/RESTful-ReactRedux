module.exports = {
  target: "web",
  entry: "./client/src/index.js",
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      }
    ]
  }
};
