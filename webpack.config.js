const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function prodPlugin(plugin, mode) {
  return mode === "production" ? plugin : () => {};
}

module.exports = (env, { mode }) => {
  const inDev = mode === "development";

  return {
    mode,
    devtool: inDev ? "source-map" : false,
    entry: "./src/client/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      libraryTarget: "var",
      library: "Client",
      clean: true // ✅ Native in Webpack 5, replaces CleanWebpackPlugin if preferred
    },
    optimization: inDev
      ? {}
      : {
          minimize: true,
          minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin() // ✅ Replaces optimize-css-assets-webpack-plugin
          ]
        },
    module: {
      rules: [
        {
          test: /\.js$/, // ✅ fixed RegExp
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            inDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.html$/,
          use: "html-loader"
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/client/views/index.html"
      }),
      prodPlugin(
        new CleanWebpackPlugin({
          verbose: true
        }),
        mode
      ),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css"
      }),
      prodPlugin(new WorkboxPlugin.GenerateSW(), mode)
    ],
    devServer: inDev
      ? {
          static: {
            directory: path.join(__dirname, "dist")
          },
          compress: true,
          port: 8080,
          open: true,
          hot: true
        }
      : undefined
  };
};
