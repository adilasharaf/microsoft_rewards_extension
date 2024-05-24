const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    content: "./src/content/content.ts",
    index: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunksSortMode: "auto",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("manifest.json"),
          to: path.resolve("dist"),
        },
        {
          from: path.resolve("./src/style.css"),
          to: path.resolve("dist"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /.(ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
};
