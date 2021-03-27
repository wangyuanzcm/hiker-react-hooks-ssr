const { resolve } = require("path");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const baseConfig = require("./webpack.base");

const devConfig = {
  mode: "development",
  entry: resolve(__dirname, "../src/client/entry.server.jsx"),
  output: {
    filename: "server.bundle.js",
    libraryTarget:"commonjs2"
  },
  target:"node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: "ignore-loader",
      },
    ],
  }
};

module.exports = merge(baseConfig, devConfig);
