const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";

const plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),

  new HtmlWebpackPlugin({
    chunks: ["app"], // 这个名字，就是入口定义的名字
    filename: "index.html",
    hash: true,
    template: "!!ejs-loader!example/index.html",
  }),

  new HtmlWebpackPlugin({
    chunks: ["camera"],
    filename: "camera.html",
    hash: true,
    template: "!!ejs-loader!example/camera.html",
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      tslint: {
        emitErrors: true,
        failOnHint: true,
      },
    },
  }),
];

var config = {
  devtool: isProd ? "hidden-source-map" : "source-map",
  context: path.resolve("./example"),
  entry: {
    app: "./index.ts",
    camera: "./camera.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        exclude: [/\/node_modules\//],
        use: ["awesome-typescript-loader", "source-map-loader"],
      },
      !isProd
        ? {
            test: /\.(js|ts)$/,
            loader: "istanbul-instrumenter-loader",
            exclude: [/\/node_modules\//],
            query: {
              esModules: true,
            },
          }
        : null,
      { test: /\.html$/, loader: "html-loader" },
      { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
    ].filter(Boolean),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: plugins,
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    // compress: true,
    port: 3000,
    hot: true,
  },
};

module.exports = config;
