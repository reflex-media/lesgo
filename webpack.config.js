// eslint-disable-next-line import/no-unresolved
const path = require('path');
const slsw = require('serverless-webpack');
const AliasPlugin = require('enhanced-resolve/lib/AliasPlugin');

module.exports = {
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.join(__dirname, '.webpack'),
  },
  devtool: 'cheap-module-source-map',
  mode:
    ['local', 'dev'].indexOf(process.env.APP_ENV) !== -1
      ? 'development'
      : 'production',
  optimization: {
    usedExports: true,
    sideEffects: true,
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/, // include .ts files
        enforce: 'pre', // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        include: __dirname,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  externals: ['aws-sdk', 'cardinal', /^@aws-sdk\/.*/],
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.tsx', '.ts', '.js'],
  },
};
