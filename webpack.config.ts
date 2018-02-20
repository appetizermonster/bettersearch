import HtmlWebpackPlugin = require('html-webpack-plugin');
import path = require('path');
import webpack from 'webpack';

const config: webpack.Configuration = {
  target: 'electron',
  devtool: 'inline-source-map',
  entry: {
    main: './src/main',
    renderer: './src/renderer',
    worker: './src/worker'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/template.html',
      chunks: ['renderer'],
      filename: 'renderer.html'
    })
  ]
};

export default config;
