// 简单配置可以参考此网站 https://createapp.dev/webpack
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack'); //  接入happypack进行多线程编译
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const ROOT_PATH = process.cwd();
const DLL_PATH = path.resolve(ROOT_PATH, 'dll');
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules');

const theme = require('./theme');   //  less变量名配置

const dllFiles = fs
    .readdirSync(DLL_PATH);
// 引入dll链接库打包的文件
const dllMainfests = dllFiles
    .filter(it => {
        return /.json$/.test(it);
    })
    .map(it => {
        return new webpack.DllReferencePlugin({
            context: DLL_PATH,
            manifest: require(path.resolve(DLL_PATH, it)),
        });
    });
const dllJS = dllFiles
    .filter(it => {
        return /.js$/.test(it);
    });

const config = {
    entry: [path.resolve(ROOT_PATH, 'src/index.js')],
    resolve: {
        alias: {
            '@home': path.resolve(ROOT_PATH, 'src'),
        },
        extensions: ['.jsx', '.js', '.json']   // require时省略的扩展名
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
            loader: 'happypack/loader?id=happyBabel',
            //排除node_modules 目录下的文件
            exclude: /node_modules/
        }, {
            // 处理依赖包中的less样式文件，不开启css module功能
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'happypack/loader?id=lessLoader'
            ],
            include: [MODULE_PATH]
        }, {
            // 图片转化，小于8k自动转化成base64编码
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 11920
                }
            }],
        }, {
            // 字体
            test: /\.(woff|svg|eot|ttf|otf)\??.*$/,
            use: [{
                loader: 'file-loader'
            }],
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
        // 将dll文件拷贝到dist目录
        new CopyWebpackPlugin([{
            from: DLL_PATH,
            to: path.resolve(ROOT_PATH, 'dist', 'dll'),
            ignore: ['html/*', '.DS_Store']
        }]),
        // 引入dll链接库打包的文件
        ...dllMainfests,
        // 将CSS提取为独立的文件
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash:8].css',
            chunkFilename: '[id]-[contenthash:8].css',
        }),
        //在开发时不需要每个页面都引用React
        new webpack.ProvidePlugin({
            'React': 'react',
        }),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'happyBabel',
            //如何处理  用法和loader 的配置一样
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true', //  启用缓存后，第一次不会输出babel debug
            }],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        new HappyPack({
            id: 'lessLoader',
            threadPool: happyThreadPool,
            loaders: [
                'css-loader',
                'postcss-loader',
                {
                    loader: 'less-loader',
                    options: {
                        modifyVars: theme,  //  重定义less变量
                        javascriptEnabled: true
                    }
                }
            ]
        }),
        // 只打包moment的中文语言包，达到减少打包体积的效果
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /zh-cn/,
        ),
    ],
    // 不进行打包的库
    // externals: {
    //     'mobx': 'mobx',
    // },
};

const custom =  {
    dllJS: dllJS,
    theme,
    happyThreadPool,
    ROOT_PATH,
    DLL_PATH,
    MODULE_PATH,
};

module.exports = { config, custom };
