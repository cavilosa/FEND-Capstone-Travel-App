const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'Client',
    clean: true 
  },
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: ['src/client/*'],
    port: 8080,
    open: true,
    hot: true,
    liveReload: true,
    client: {
      logging: 'info',         // Show messages in browser console (e.g. [HMR] updates)
      overlay: true,           // Show build errors as overlay in browser
      progress: true,          // Show build progress in terminal
    },
  },
  // ✅ ADD HERE: Logging config for terminal
  infrastructureLogging: {
    level: 'info', // Logs when modules are rebuilt
  },
  stats: {
    all: false,
    modules: true,
    builtAt: true,
    assets: true,
    errors: true,
    warnings: true,
    timings: true,
    moduleAssets: true,
    moduleTrace: true,
  },
  // stats: 'minimal',            // Controls terminal output verbosity

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html"
    }),
    new CleanWebpackPlugin({
      verbose: true
    }),
    new Dotenv()
    // new BundleAnalyzerPlugin()
  ]
};
