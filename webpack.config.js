const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    articles: './src/pages/articles.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: { loader: 'babel-loader' },
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
    },
    {
      test: /\.(png|jpg|gif|ico|svg)$/,
      use: ['file-loader?name=images/[name].[ext]', {
        loader: 'image-webpack-loader',
        options: {
          publicPath: '../'
        },
      }]
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]'
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/articles.html',
      filename: 'articles.html',
    }),
    new WebpackMd5Hash(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
})
  ],
}