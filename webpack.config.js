const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
// const EslintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: [path.resolve(__dirname, 'src/frontend/index.jsx'), 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'assets/app.js',
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
  ],
};
