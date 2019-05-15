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
    ROOT_PATH,
    MODULE_PATH,
    theme,
    dllJS,
} = custom;

const config = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(ROOT_PATH, 'dist'),
        filename: 'js/[name]-[hash:8].js'
    },
    devtool: 'cheap-module-eval-source-map',
    // webpack-dev-server
    devServer: {
        contentBase: path.resolve(ROOT_PATH, 'dist'),
        open: true,
        port: 33330,
        hot: true,
        // hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
        hotOnly:true,
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
            exclude: [MODULE_PATH]
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
            exclude: [MODULE_PATH]
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
                        context: path.resolve(ROOT_PATH, 'src'),  //  配置了localIdentName必须配置context，hash名根路径
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
            path: path.resolve(ROOT_PATH),
            template: path.resolve(ROOT_PATH, 'index.html'),
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