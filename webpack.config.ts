import HtmlWebpackPlugin = require('html-webpack-plugin');
import path = require('path');
import webpack from 'webpack';

const config: webpack.Configuration = {
  devtool: 'inline-source-map',
  entry: {
    main: './src/main',
    renderer: './src/renderer'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['renderer']
    })
  ]
};

export default config;
