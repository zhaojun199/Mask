// DllPlugin 提取第三方模块不够完整，我一般用于开发环境加速构建，生产环境可以考虑使用 CommonsChunkPlugin 来划分第三方库
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const DLL_PATH = path.join(process.cwd(), 'dll');

const config = {
    mode: 'development',
    // mode: 'production',
	entry: {
		react: ['react'],
		propTypes: ['prop-types'],
		// 这里如果用中划线命名，则压缩会报错
		reactDom: ['react-dom'],
		// reactRouterDom: ['react-router-dom'],	//	react-router-dom打dll报错，原因不明
		// mobx: ['mobx'],
		// mobxReact: ['mobx-react'],
	},
	output: {
		path: DLL_PATH,
		// filename: 'dll.[name].[chunkhash:4].js',	//	编译生成的文件名
		filename: '[name].js',
		// library: '_dll_[name]_[chunkhash:4]',	//	存放相关的dll文件的全局变量名称
		library: '[name]',
	},
	plugins: [
		new CleanWebpackPlugin(),	//	每次编译清空文件夹
		new webpack.DllPlugin({
			name: '[name]',	//	和output.library保持一致
			path: path.join(DLL_PATH, '[name].manifest.json'),
			context: DLL_PATH, // (绝对路径) manifest (或者是内容属性)中请求的上下文
		}),
	],
}

module.exports = config;