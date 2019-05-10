const { config: common, custom } = require('./common');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const rootPath = process.cwd();
const dllPath = path.resolve(rootPath, 'dll');

const config = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(rootPath, 'dist'),
        filename: 'js/[name]-[chunkhash:8].js'
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new CleanWebpackPlugin(),   //  每次编译清空文件夹
        new HtmlWebpackPlugin({
            path: path.resolve(rootPath),
            template: path.resolve(rootPath, 'index.html'),
            title: 'mobx和webpack',
            filename: 'index.html',
            inject: true,
            // 允许插入到模板中的一些chunk
            chunks: ['main', 'vendors'],
            // hash: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            dll: custom.dllJS, // 自定义属性
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            cacheGroups: {
                // 单独打包react相关包
                // react: {
                //     priority: 199,
                //     name: 'vendor-react',
                //     filename: '[name].[hash:8].min.js?',
                //     chunks: 'initial', // initial只对入口文件处理
                //     minSize: 30000,
                //     test: /(react|react-dom|react-router-dom)/,
                // },
                // 单独打包antd包
                // antd: {
                //     priority: 100,
                //     name: 'vendor-antd',
                //     filename: '[name].[hash:8]min.js?',
                //     chunks: 'initial',
                //     minSize: 30000,
                //     test: /(antd|@ant-design)/,
                // },
                // 单独打包@babel/polyfill
                // polyfill: {
                //     priority: 999,
                //     name: 'polyfill',
                //     filename: 'js/[name].[chunkhash:8].min.js?',
                //     chunks: 'all',
                //     test: /[\\/]node_modules[\\/]@babel[\\/]polyfill[\\/]/,
                //     enforce: true
                // },
                // 单独打包其它
                vendors: {
                    priority: -10,
                    name: 'vendors',
                    filename: 'js/[name].[chunkhash:8].min.js?',
                    chunks: 'initial',
                    // chunks: 'async',
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true
                },
                default: false,
            }
        },
        minimizer: [
            // 压缩输出的 JS 代码
            new UglifyJSPlugin({
                sourceMap: true,
                uglifyJS: {
                        compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        warnings: false,
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                    },
                    output: {
                        // 最紧凑的输出
                        beautify: false,
                        // 删除所有的注释
                        comments: false,
                    },
                },
            }),
            // 压缩css
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css\.*(?!.*map)/g, // 注意不要写成 /\.css$/g
                cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
                cssProcessorOptions: { 
                    discardComments: { removeAll: true },
                    // 避免 cssnano 重新计算 z-index
                    safe: true,
                    // cssnano 集成了autoprefixer的功能
                    // 会使用到autoprefixer进行无关前缀的清理
                    // 关闭autoprefixer功能
                    // 使用postcss的autoprefixer功能
                    autoprefixer: false,
                },
                canPrint: true //是否将插件信息打印到控制台
            }),
        ]
    },
    // 不进行打包的库
    // externals: {
    //     'mobx': 'mobx',
    // },
});

module.exports = config;