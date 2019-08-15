module.exports = {
  target: "web",
  entry: ["webpack-hot-middleware/client", "./src/index.js"],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      }
    ]
  }
};
