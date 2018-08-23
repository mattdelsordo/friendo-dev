import path from 'path'

import { isProd } from './src/config'


export default {
  entry: [
    'webpack/hot/dev-server',
    './src/game/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/docs'),
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, '/docs'),
    watchContentBase: true,
  },
  mode: isProd ? 'production' : 'development',
}
