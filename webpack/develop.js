const { config: common, custom } = require('./common');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = process.cwd();
const dllPath = path.resolve(rootPath, 'dll');

const config = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(rootPath, 'dist'),
        filename: 'js/[name]-[hash:8].js'
    },
    devtool: 'cheap-module-eval-source-map',
    // webpack-dev-server
    devServer: {
        contentBase: path.resolve(rootPath, 'dist'),
        open: true,
        port: 33330,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            path: path.resolve(rootPath),
            template: path.resolve(rootPath, 'index.html'),
            title: 'mobx和webpack',
            filename: 'index.html',
            inject: true,
            // 允许插入到模板中的一些chunk
            chunks: ['main', 'vendors'],
            // hash: false,
            // minify: {
            //     removeComments: false,
            //     collapseWhitespace: false
            // }
            dll: custom.dllJS, // 自定义属性
        }),
    ],
});

module.exports = config;