const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js',
    './src/style.scss'
  ],
  output: {
    filename: './bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(?:woff|woff2|ttf)$/,
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./index.bundle.css",
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assest/images', to: './assest/images' },
      ],
    }),
  ]
};