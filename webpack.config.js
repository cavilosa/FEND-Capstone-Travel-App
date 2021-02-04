const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

function prodPlugin(plugin, mode) {
  return mode ? plugin : () => {};
}

module.exports = (env, {
  mode
}) => {
  const inDev = mode === 'development';
  return {
    mode: inDev ? 'development' : 'production',
    devtool: inDev ? 'source-map' : 'none',
    entry: "./src/client/index.js",
    output: {
      libraryTarget: 'var',
      library: 'Client'
    },
    optimization: inDev ? {} : {
      minimizer: [
        new TerserPlugin({}),
        new OptimizeCssAssetsPlugin({})
      ]
    },
    module: {
      rules: [{
          test: '/.js$/',
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            inDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/client/views/index.html",
      }),
      prodPlugin(
        new CleanWebpackPlugin({
          // Simulate the removal of files
          dry: true,
          // Write Logs to Console
          verbose: true,
          // Automatically remove all unused webpack assets on rebuild
          cleanStaleWebpackAssets: true,
          protectWebpackAssets: false
        }),
        mode
      ),
      new MiniCssExtractPlugin({
        filename: "[name].css"
      }),
      prodPlugin(
        new WorkboxPlugin.GenerateSW(),
        mode
      )
    ]
  }
}
