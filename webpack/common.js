const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootPath = process.cwd();
const dllPath = path.resolve(rootPath, 'dll');

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
    entry: [path.resolve(rootPath, 'src/index.js')],
    resolve: {
        alias: {
            '@home': path.resolve(rootPath, 'src'),
        },
        extensions: ['.jsx', '.js', '.json']   // require时省略的扩展名
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
                    // hmr: process.env.NODE_ENV === 'development',
                },
            },
            'css-loader',
            ],
        }, {
            test: /\.less$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // hmr: process.env.NODE_ENV === 'development',
                },
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[path][name]-[local]-[hash:base64:2]',
                }
            },
            'postcss-loader',
            'less-loader',
            ],
        }]
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
        new CleanWebpackPlugin(),    //  每次编译清空文件夹
        // 将dll文件拷贝到dist目录
        new CopyWebpackPlugin([{
            from: dllPath,
            to: path.resolve(rootPath, 'dist', 'dll'),
            ignore: ['html/*', '.DS_Store']
        }]),
        // 引入dll链接库打包的文件
        ...dllMainfests,
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

const custom =  {
    dllJS: dllJS,
};

module.exports = { config, custom };
