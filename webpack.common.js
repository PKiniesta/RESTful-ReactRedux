module.exports = {
  target: "web",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      }
    ]
  }
};
// entry: './src/index.js',
//   output: {
//     path: __dirname + '/dist',
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [
//       { test: /\.html$/i, loader: 'html-loader' },
//     ]
//   },

//   plugins: [new HtmlWebpackPlugin()]
// };
