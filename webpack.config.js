// eslint-disable-next-line import/no-unresolved
const path = require('path');
const slsw = require('serverless-webpack');
const webpack = require('webpack');
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
    ['local', 'development'].indexOf(process.env.APP_ENV) !== -1
      ? 'development'
      : 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
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
  externals: [
    { 'aws-sdk': 'commonjs aws-sdk' },
    'tedious',
    'sqlite3',
    'mariasql',
    'mysql2',
    'mssql',
    'oracle',
    'strong-oracle',
    'oracledb',
    'pg',
    'pg-query-stream',
    'pg-hstore',
    'mssql/lib/base',
    'mssql/package.json',
  ],
  resolve: {
    plugins: [
      new AliasPlugin(
        'described-resolve',
        [
          // This will be removed in future versions
          {
            name: 'Config',
            alias: [path.resolve(__dirname, 'src/config/')],
          },
          // This will be removed in future versions
          {
            name: 'Constants',
            alias: [path.resolve(__dirname, 'src/constants/')],
          },
          // This will be removed in future versions
          {
            name: 'Core',
            alias: [path.resolve(__dirname, 'src/core/')],
          },
          // This will be removed in future versions
          {
            name: 'Exceptions',
            alias: [
              path.resolve(__dirname, 'src/exceptions/'),
              path.resolve(__dirname, '../lesgo-framework/src/exceptions/'),
              path.resolve(__dirname, 'node_modules/lesgo/src/exceptions/'),
            ],
          },
          // This will be removed in future versions
          {
            name: 'Handlers',
            alias: [path.resolve(__dirname, 'src/handlers/')],
          },
          // This will be removed in future versions
          {
            name: 'Middlewares',
            alias: [
              path.resolve(__dirname, 'src/middlewares/'),
              // This will be removed in future versions
              path.resolve(__dirname, '../lesgo-framework/src/middlewares/'),
              path.resolve(__dirname, 'node_modules/lesgo/src/middlewares/'),
            ],
          },
          // This will be removed in future versions
          {
            name: 'Models',
            alias: [path.resolve(__dirname, 'src/models/')],
          },
          // This will be removed in future versions
          {
            name: 'Services',
            alias: [
              path.resolve(__dirname, 'src/services/'),
              // This will be removed in future versions
              path.resolve(__dirname, '../lesgo-framework/src/services/'),
              path.resolve(__dirname, 'node_modules/lesgo/src/services/'),
            ],
          },
          // This will be removed in future versions
          {
            name: 'Utils',
            alias: [
              path.resolve(__dirname, 'src/utils/'),
              path.resolve(__dirname, '../lesgo-framework/src/utils/'),
              path.resolve(__dirname, 'node_modules/lesgo/src/utils/'),
            ],
          },
          {
            name: 'config',
            alias: [path.resolve(__dirname, 'src/config/')],
          },
          {
            name: 'constants',
            alias: [path.resolve(__dirname, 'src/constants/')],
          },
          {
            name: 'core',
            alias: [path.resolve(__dirname, 'src/core/')],
          },
          {
            name: 'exceptions',
            alias: [path.resolve(__dirname, 'src/exceptions/')],
          },
          {
            name: 'handlers',
            alias: [path.resolve(__dirname, 'src/handlers/')],
          },
          {
            name: 'middlewares',
            alias: [path.resolve(__dirname, 'src/middlewares/')],
          },
          {
            name: 'models',
            alias: [path.resolve(__dirname, 'src/models/')],
          },
          {
            name: 'services',
            alias: [path.resolve(__dirname, 'src/services/')],
          },
          {
            name: 'utils',
            alias: [path.resolve(__dirname, 'src/utils/')],
          },
          {
            name: 'lesgo/exceptions',
            alias: [
              path.resolve(__dirname, '../lesgo-framework/src/exceptions/'),
              path.resolve(__dirname, 'node_modules/lesgo/src/exceptions/'),
            ],
          },
          {
            name: 'lesgo/middlewares',
            alias: [
              path.resolve(__dirname, '../lesgo-framework/src/middlewares/'),
              path.resolve(__dirname, 'node_modules/lesgo/src/middlewares/'),
            ],
          },
          {
            name: 'lesgo/services',
            alias: [
              path.resolve(__dirname, '../lesgo-framework/src/services/'),
              path.resolve(__dirname, 'node_modules/lesgo/src/services/'),
            ],
          },
          {
            name: 'lesgo/utils',
            alias: [
              path.resolve(__dirname, '../lesgo-framework/src/utils/'),
              path.resolve(__dirname, 'node_modules/lesgo/src/utils/'),
            ],
          },
        ],
        'resolve'
      ),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SENTRY_BUNDLED': process.env.SENTRY_ENABLED,
    }),
  ],
};
