const production = require('./production');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');

const config = merge(production, {
	plugins: [
		// 分析包插件
        new BundleAnalyzerPlugin({
            analyzerPort: 33333
        }),
    ],
});

module.exports = config;