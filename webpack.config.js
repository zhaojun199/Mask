const path = require('path');
const fs = require('fs');
const UglifyJSPlugin = require('webpack-parallel-uglify-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 判断dll文件是否生成
const manifestExists = fs.existsSync(path.resolve(__dirname, 'dll', 'mobx.manifest.json'));
if (!manifestExists) {
    console.error('请先执行`npm run dll`指令！');
    return;
}

const dllFiles = fs
    .readdirSync(path.resolve(__dirname, 'dll'));
// 引入dll链接库打包的文件
const dllMainfests = dllFiles
    .filter(it => {
        return /.json$/.test(it);
    })
    .map(it => {
        return new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.resolve(__dirname, 'dll', it)),
        });
    });
const dllJS = dllFiles
    .filter(it => {
        return /.js$/.test(it);
    });

const config = {
    mode: 'production',
    // mode: 'development',
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[chunkhash:8].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                // 个人测试：如果配置了options，会和.babelrc的配置取并集
                options: {
                    presets: [],
                    plugins: []
                }
            }
        }, {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: process.env.NODE_ENV === 'development',
                },
            },
            'css-loader',
            ],
        }, {
            test: /\.less$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: process.env.NODE_ENV === 'development',
                },
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                }
            },
            'postcss-loader',
            'less-loader',
            ],
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    // devtool: 'cheap-module-source-map',  生产环境
    // webpack-dev-server
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        port: 8088,
        hot: true,
    },
    // 未验证 - splitChunksPlugins
    // optimization: {
    //     splitChunks: {
    //         cacheGroups:{
    //             // 比如你要单独把jq之类的官方库文件打包到一起，就可以使用这个缓存组，如想具体到库文件（jq）为例，就可把test写到具体目录下
    //             vendor: {
    //                 test: /node_modules/,
    //                 name: 'vendor',
    //                 priority: 10,
    //                 enforce: true
    //             },
    //             // 这里定义的是在分离前被引用过两次的文件，将其一同打包到common.js中，最小为30K
    //             common: {
    //                 name: 'common',
    //                 minChunks: 2,
    //                 minSize: 30000
    //             }
                
    //         },
    //         chunks: 'all',
    //         minSize: 40000
    //     }
    // },
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
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true
                },
                default: false,
            }
        },
        minimizer: [
            // 压缩输出的 JS 代码
            new UglifyJSPlugin({
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
                }
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
    plugins: [
        // 将dll文件拷贝到dist目录
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'dll'),
            to: path.resolve(__dirname, 'dist', 'dll'),
            ignore: ['html/*', '.DS_Store']
        }]),
        // 引入dll链接库打包的文件
        ...dllMainfests,
        new HtmlWebpackPlugin({
            path: path.resolve(__dirname, 'dist'),
            template: path.resolve(__dirname, 'index.html'),
            title: 'mobx和webpack',
            // version: '?v' + pkg.version,
            filename: 'index.html',
            inject: true,
            // 允许插入到模板中的一些chunk
            chunks: ['main'],
            // hash: false,
            // minify: {
            //     removeComments: false,
            //     collapseWhitespace: false
            // }
            dll: dllJS, // 自定义属性
        }),
        // 分析包插件
        new BundleAnalyzerPlugin(),
        // 将CSS提取为独立的文件
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash:8].css',
            chunkFilename: '[id]-[contenthash:8].css',
        }),
    ],
    // 不进行打包的库
    // externals: {
    //     'mobx': 'mobx',
    // },
};

module.exports = config;