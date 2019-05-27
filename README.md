#### webpack配置
- 2019-5-15
	- 优化develop配置
	- 增加HotModuleReplacementPlugin用于热替换
	- 增加analyze配置，生成矩形树图用于分析模块
	- TODO 用热替换代替热更新

- 2019-5-17
	- 生产环境增加bail配置，用于输出错误日志
	- 增加sourcemap插件，用于后期内外网分离访问sourcemap配置

- 2019-5-27
	- 新增@babel/plugin-proposal-optional-chaining插件，支持a?.b?.c语法