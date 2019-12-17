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
    entry: [
        '@babel/polyfill',
        'react-hot-loader/patch',
        path.resolve(ROOT_PATH, 'src/index.js')
    ],
    resolve: {
        alias: {
            '@home': path.resolve(ROOT_PATH, 'src'),
        },
        extensions: ['.jsx', '.js', '.json']   // require时省略的扩展名
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [{
                loader: 'happypack/loader?id=antd'
            }],
            // loader: "awesome-typescript-loader"
        }, {
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
            minSize: 30000, //  模块大于30k会被抽离到公共模块
            minChunks: 1, //    模块出现1次就会被抽离到公共模块
            maxAsyncRequests: 5, // 按需加载并发最大请求数，一次最多只能被加载5个
            maxInitialRequests: 3,  //  最大的初始请求数
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
                // 打包项目公共文件
                common: {
                    priority: 5,
                    chunks: 'all', //   这里最好配all, 配置全部文件抽离
                    name: 'common',
                    // filename: 'js/[name]-[chunkhash:8].min.js?',
                    minSize: 0, //大于0个字节
                    minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
                },
                // 单独打包node_modules
                vendors: {
                    priority: 1,
                    chunks: 'initial',
                    name: 'vendors',
                    filename: 'js/[name]-[chunkhash:8].min.js?',
                    // chunks: 'async',
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true
                },
                // default: false,
            }
        },
    },
    plugins: [
        new HappyPack({
            id: 'antd',
            threadPool: happyThreadPool,
            loaders: [{
            //     path: 'ts-loader',
            //     query: { happyPackMode: true }
            // }, {
                path: path.resolve(__dirname, 'antBuildLoader.js'),
            }]
        }),
        // 将dll文件拷贝到dist目录
        new CopyWebpackPlugin([{
            from: DLL_PATH,
            to: path.resolve(ROOT_PATH, 'dist', 'dll'),
            ignore: ['html/*', '.DS_Store']
        }, {
            from: path.resolve(ROOT_PATH, 'src', 'static'),
            to: path.resolve(ROOT_PATH, 'dist', 'static')
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
        // sourcemap插件，可配置内网souercemap地址
        new webpack.SourceMapDevToolPlugin({
            test: /\.jsx?$/,
            filename: 'sourcemaps/[name]-[chunkhash:8].js.map',
            // publicPath: 'http://hostname/sourcemaps/',   //  内外网分离时启用此配置
            publicPath: '',
        })

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
    title: 'aurora',
    favicon: path.resolve(ROOT_PATH, 'src', 'static/image/favicon.jpg'),
};

module.exports = { config, custom };
