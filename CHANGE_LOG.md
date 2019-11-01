

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

- 2019-5-28
	- html-webpack-plugin增加chunksSortMode配置，强制依赖依次执行
	- devServer增加proxy代理api配置
	- html增加若干meta
	- 增加copy static目录到dist目录

- 2019-6-11
	- webpack devServer 增加historyApiFallback配置，用于BrowserRouter的前端路由的重新解析

- 2019-6-26
	- 优化title，增加favicon
	- 优化static路径配置

- 2019-6-29
	- 新增项目通用文件抽离配置config.optimization.splitChunks.cacheGroups.common

- 2019-7-15
	- 优化http方法，增加对拦截器的支持，增加重复点击取消功能

- 2019-9-24
	- index.html增加移动端识别，判断移动端自动跳转
	- 增加Logger方法，cout代理console方法
	- 增加log装饰器，审计组件内的方法

- 2019-10-28
	- 增加log中间件，打印reducer前后变化
	- 增加diff方法，比较reducer的preState和nextState

- TODO
	- [x] 异步更新store里的reducer，api: Store.replaceReducer
	- [x] 异步更新store里的epic，api: epicMiddleware.run
	- [x] 优化reducer异步注入方式
	- [x] 实现路由嵌套
	- [ ] redux-persist持久化store
	- [ ] 提取配置
	- [x] 支持apm
	- [ ] redux增加数据初始化功能
	- [ ] http.js中增加全局loading效果
	- [ ] http.js中增加缓存功能