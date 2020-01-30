import path from 'path'
import webpack from 'webpack'

import { isProd } from './src/config'
import { buildCacheList } from './build-cache-list'

const buildConfig = (inName, outName) => ({
  entry: [
    `./src/${inName}.js`,
  ],
  output: {
    filename: `${outName}.js`,
    path: path.resolve(__dirname, 'docs'),
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
    host: '0.0.0.0',
    port: 3001,
    contentBase: path.join(__dirname, './docs'),
    watchContentBase: true,
  },
  mode: isProd ? 'production' : 'development',
  plugins: [
    new webpack.DefinePlugin({
      BUNDLE_BUILD_DATE: JSON.stringify(new Date()),
      BUNDLE_VERSION: JSON.stringify(require("./package.json").version),
      URLS_TO_CACHE: JSON.stringify(buildCacheList()),
    })
  ]
})

export default [buildConfig('game/index', 'bundle'), buildConfig('service-worker', 'sw'), buildConfig('game/debug', 'debug')]
