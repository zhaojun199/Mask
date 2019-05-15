const { config: common, custom } = require('./common');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');

const {
    happyThreadPool,
    rootPath,
    dllPath,
    modulePath,
    theme,
    dllJS,
} = custom;

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
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true
                    },
                },
                'happypack/loader?id=cssLoader'
            ],
            exclude: [modulePath]
        }, {
            // 处理本地less样式文件，开启css module功能
            test: /\.less$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true
                    },
                },
                'happypack/loader?id=lessWithCssModuleLoader'
            ],
            exclude: [modulePath]
        }],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),   //  热替换
        new HappyPack({
            id: 'lessWithCssModuleLoader',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        modules: true,
                        context: path.resolve(rootPath, 'src'),  //  配置了localIdentName必须配置context，hash名根路径
                        localIdentName: '[path][name]-[local]-[hash:base64:2]', //  自定义hash名
                    }
                },
                'postcss-loader',
                {
                    loader: 'less-loader',
                    options: {
                        modifyVars: theme,
                        javascriptEnabled: true
                    }
                }
            ]
        }),
        new HappyPack({
            id: 'cssLoader',
            threadPool: happyThreadPool,
            loaders: [
                'css-loader',
                'postcss-loader',
            ]
        }),
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
            dll: dllJS, // 自定义属性
        }),
    ],
});

module.exports = config;