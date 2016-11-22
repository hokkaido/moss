const webpack = require('webpack');

const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const METADATA = {
  title: 'MOSS'
};

module.exports = function (options) {

  return {

    entry: {
      'main': './src/main.ts'
    },

    resolve: {
      extensions: ['.ts', '.js', '.json']
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
      ],
    },

    plugins: [
      new ForkCheckerPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        inject: 'head'
      }),
    ],

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
}