const { config: common, custom } = require('./common');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const UglifyJSPlugin = require('webpack-parallel-uglify-plugin');   //  迁移成TerserPlugin
const TerserPlugin = require('terser-webpack-plugin');

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
        minimizer: [
            // 压缩输出的 JS 代码
            // new UglifyJSPlugin({
            //     sourceMap: true,
            //     uglifyJS: {
            //             compress: {
            //             // 在UglifyJs删除没有用到的代码时不输出警告
            //             warnings: false,
            //             // 删除所有的 `console` 语句，可以兼容ie浏览器
            //             drop_console: true,
            //             // 内嵌定义了但是只用到一次的变量
            //             collapse_vars: true,
            //             // 提取出出现多次但是没有定义成变量去引用的静态值
            //             reduce_vars: true,
            //         },
            //         output: {
            //             // 最紧凑的输出
            //             beautify: false,
            //             // 删除所有的注释
            //             comments: false,
            //         },
            //     },
            // }),
            new TerserPlugin({
                cache: '.cache', //  缓存路径
                parallel: true, //  多线程压缩
                sourceMap: true,    //开启sourceMap
                extractComments: true,  //  提取出注释
                // 过滤命令行控制台警告输出
                // warningsFilter: (warning, source) => {
                //     // console.log('warning ==== >', warning, source)
                //     return false;
                // },
                terserOptions: {
                    // https://github.com/terser-js/terser#output-options
                    output: {
                        comments: false,    //  去除代码和webpack中的注释
                    },
                    // warnings: true,  //  命令行控制台输出警告
                    // https://github.com/terser-js/terser#compress-options
                    compress: {
                        drop_console: true, //  删除所有的 `console` 语句，不会删除window.console
                        drop_debugger: true,    //  remove debugger
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