var path = require('path');
var webpackConfig = require('../node_modules/@ionic/app-scripts/config/webpack.config');

webpackConfig.resolve = {
  extensions: ['.ts', '.js', '.json', '.css'],
  modules: [path.resolve('node_modules')]
};

webpackConfig.module = {
  loaders: [
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.ts$/,
      loader: process.env.IONIC_WEBPACK_LOADER
    },
    {
      test: /\.js$/,
      loader: process.env.IONIC_WEBPACK_TRANSPILE_LOADER
    },
    {
      test: /\.css$/,
      loader: 'css-loader'
    }
  ]
};