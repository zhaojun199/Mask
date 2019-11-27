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
    title,
    favicon,
} = custom;

const config = merge(common, {
    mode: 'development',
    output: {
        publicPath: '/',
        path: path.resolve(ROOT_PATH, 'dist'),
        filename: 'js/[name]-[hash:8].js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
    },
    devtool: 'cheap-module-eval-source-map',
    // webpack-dev-server
    devServer: {
        contentBase: path.resolve(ROOT_PATH, 'dist'),
        open: true,
        port: 33330,
        hot: true,
        // host: '0.0.0.0',
        // hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
        hotOnly:true,
        proxy: {
            '/api': {
                target: 'http://domain.hostname.com',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
        // 使用HTML5 History API时，index.html提供该页面来代替任何404响应
        historyApiFallback: {
            rewrites: [{
                from: /.*/g,
                to: '/index.html'
            }]
        },
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
                    loader: 'style-loader',
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
            title,
            favicon,
            filename: 'index.html',
            inject: true,
            // 允许插入到模板中的一些chunk
            chunks: ['main', 'vendors'],
            // 对chunks强制排序，防止其不按预期顺序加载
            chunksSortMode(chunk1, chunk2) {
                const order = ['vendors', 'main'];
                const order1 = order.indexOf(chunk1.names[0]);
                const order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;  
            },
            dll: dllJS, // 自定义属性
        }),
    ],
});

module.exports = config;