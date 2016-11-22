var webpackConfig = require('./webpack.js')

module.exports = function(config) {
  config.set({
    basePath: 'src',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      '**/*.spec.ts'
    ],

    reporters: ['progress', 'karma-typescript'],
    browsers: ['Chrome']
  });
};