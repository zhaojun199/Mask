const path = require('path');
const fs = require('fs');
const UglifyJSPlugin = require('webpack-parallel-uglify-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const rootPath = process.cwd();
const dllPath = path.resolve(rootPath, 'dll');

// 判断dll文件是否生成
const manifestExists = fs.existsSync(path.resolve(dllPath, 'mobx.manifest.json'));
if (!manifestExists) {
    console.error('请先执行`npm run dll`指令！');
    return;
}

const dllFiles = fs
    .readdirSync(dllPath);
// 引入dll链接库打包的文件
const dllMainfests = dllFiles
    .filter(it => {
        return /.json$/.test(it);
    })
    .map(it => {
        return new webpack.DllReferencePlugin({
            context: dllPath,
            manifest: require(path.resolve(dllPath, it)),
        });
    });
const dllJS = dllFiles
    .filter(it => {
        return /.js$/.test(it);
    });

const config = {
    mode: 'development',
    entry: [path.resolve(rootPath, 'src/index.js')],
    output: {
        path: path.resolve(rootPath, 'dist'),
        filename: 'js/[name]-[chunkhash:8].js'
    },
    resolve: {
        alias: {
            '@home': path.resolve(rootPath, 'src'),
        },
        extensions: ['.jsx', '.js', '.json']
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
                    hmr: true,
                },
            },
            'css-loader',
            ],
        }, {
            test: /\.less$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: true,
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
    // webpack-dev-server
    devServer: {
        contentBase: path.resolve(rootPath, 'dist'),
        open: true,
        port: 33330,
        hot: true,
    },
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
    },
    plugins: [
        // 将dll文件拷贝到dist目录
        new CopyWebpackPlugin([{
            from: path.resolve(dllPath),
            to: path.resolve(rootPath, 'dist', 'dll'),
            ignore: ['html/*', '.DS_Store']
        }]),
        // 引入dll链接库打包的文件
        ...dllMainfests,
        new HtmlWebpackPlugin({
            path: path.resolve(dllPath),
            template: path.resolve(dllPath, 'index.html'),
            title: 'mobx和webpack',
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
        new BundleAnalyzerPlugin({
            analyzerPort: 33333
        }),
        // 将CSS提取为独立的文件
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash:8].css',
            chunkFilename: '[id]-[contenthash:8].css',
        }),
    ],
};

module.exports = config;