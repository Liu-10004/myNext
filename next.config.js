/* eslint-disable */
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/styles/antd.less'), 'utf8')
);

module.exports = withLess({
  webpack(config, options) {
    const { isServer } = options;
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    });
    return config;
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    importLoaders: 1,
    modifyVars: themeVariables,
    localIdentName: '[local]___[hash:base64:5]'
  },
  distDir: 'build'
});
