module.exports = {
	loader: 'postcss-loader',
    plugins: [
    	// 第二个参数一定要写，不然不会自动配前缀
        require('autoprefixer')({
            "browsers": [
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions"
            ]
        })
    ],
    // browser: ["> 1%", "last 2 versions", "not ie <= 8"],
}