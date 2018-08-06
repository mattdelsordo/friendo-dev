import path from 'path'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

import { WDS_PORT, isProd } from './src/config'


export default {
  entry: [
    './src/js/game/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/docs',
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
    port: 8080,
    contentBase: path.join(__dirname, 'docs'),
    watchContentBase: true,
  },
  // plugins: [
  //   new BrowserSyncPlugin({
  //     host: 'localhost',
  //     port: 3000,
  //     proxy: 'http://localhost:8080',
  //   }),
  // ],
  mode: isProd ? 'production' : 'development',
}
