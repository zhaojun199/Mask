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
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');

const {
    happyThreadPool,
    ROOT_PATH,
    MODULE_PATH,
    theme,
    dllJS,
} = custom;

// debugger;
const config = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(ROOT_PATH, 'dist'),
        filename: 'js/[name]-[chunkhash:8].js',
        publicPath: './',   //  插入到html模板的路径前缀
    },
    // devtool: 'cheap-module-source-map',
    bail: true, //  在遇到错误的时候，打包过程将会退出，且把错误信息打印到 stderr
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'happypack/loader?id=cssLoader'
            ],
            exclude: [MODULE_PATH]
        }, {
            // 处理本地less样式文件，开启css module功能
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'happypack/loader?id=lessWithCssModuleLoader'
            ],
            exclude: [MODULE_PATH]
        }],
    },
    plugins: [
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
        new CleanWebpackPlugin(),   //  每次编译清空文件夹
        new HtmlWebpackPlugin({
            path: path.resolve(ROOT_PATH),
            template: path.resolve(ROOT_PATH, 'index.html'),
            title: 'mobx和webpack',
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
            // hash: false,
            minify: {
                removeComments: true,   //  删除注释，但是会保留script和style中的注释
                collapseWhitespace: true,   //  删除空格，但是不会删除SCRIPT、style和textarea中的空格
                removeAttributeQuotes: true,    //  删除不需要引号的值
            },
            dll: dllJS, // 自定义属性
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
                // TODO：缓存路径配置导致build文件不更新
                // cache: '.cache', //  缓存路径
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
