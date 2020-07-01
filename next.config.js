/* eslint-disable */
//next.config.js
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
// const withPlugins = require('next-compose-plugins');
const withTM = require('next-plugin-transpile-modules');
const cssLoaderGetLocalIdent = require('css-loader/lib/getLocalIdent.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const withTypescript = require('@zeit/next-typescript');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/styles/antd.less'), 'utf8')
);

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
}
module.exports = withTypescript(
  withTM({
    transpileModules: ['the-package-that-imports-css'],
    ...withLess({
      onDemandEntries: {
        // 内容在内存中缓存的时长(ms)
        maxInactiveAge: 20 * 60 * 1000,
        // 同时缓存的页面数
        pagesBufferLength: 10
      },
      webpack(config, options) {
        // const { isServer } = options;
        // if (!isServer) {
        //   config.node = {
        //     fs: 'empty'
        //   };
        // }
        console.log(config.resolve.extensions);
        config.module.rules.push({
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader'
          ]
        });
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        });
        config.module.rules.push({
          test: /\.tsx?$/,
          loader: 'ts-loader'
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
    })
  })
);
