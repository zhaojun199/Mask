

#### 目录结构
```
│  .babelrc                         - babel配置
│  .gitignore                       - git配置
│  index.html                       - html入口
│  package.json
│  postcss.config.js                - postcss配置
│  README.md
│  CHANGE_LOG.md                    - 更新日志
│  
├─dist                              - 编译文件夹
├─dll                               - dll文件夹
├─src                               - src目录
│  │  index.js                      - 入口文件
│  │  index.less                    - 全局样式
│  │  
│  ├─controllers                    - 控制器 - 类似reducer
│  │      demo.ctrl.js
│  │      demo2.ctrl.js
│  │      控制器.md
│  │      
│  ├─core                           - 核心库
│  │  │  connect.js                 - redux-connect的封装
│  │  │  factory.js                 - 初始化epic和controller方法
│  │  │  hReducer.js                - reducer解析器
│  │  │  hEpic.js                   - epic解析器
│  │  │  event.js                   - 事件订阅发布器
│  │  │  Store.js                   - redux-store的封装
│  │  │  util.js                    - core的工具函数
│  │  │  
│  │  └─error                       - error收集器
│  ├─enhancers
│  │      monitorReducer.js
│  │      
│  ├─epics                          - epics（异步请求等副作用函数）
│  │      demo.epic.js
│  │      
│  ├─middleware                     - 中间件
│  │      logger.js
│  │      
│  ├─page
│  │  │  App.js                     - 项目根入口
│  │  │  
│  │  ├─404
│  │  │      index.jsx
│  │  │      
│  │  ├─home
│  │  │      index.jsx
│  │  │      
│  │  └─list
│  │          index.ctrl.js
│  │          index.epic.js
│  │          index.jsx
│  │          
│  ├─router                         - 路由文件夹
│  │      AuthRoute.jsx             - router封装，类似vue before钩子
│  │      ErrorBoundary.jsx         - react全局错误边界
│  │      GenRouter.jsx             - 路由生成器
│  │      RouterConfig.js           - 路由配置
│  │      
│  ├─service
│  ├─static                         - 静态文件
│  │  └─image
│  └─util
│          crypt.js                 - 加密解密方法
│          http.js                  - 网络请求
│          log.js                   - 日志打印
│          websocket.js             - websocket封装
│          
└─webpack
        analyze.js                  - 分析配置
        common.js                   - 通用配置
        develop.js                  - 开发配置
        dll.js                      - dll配置
        production.js               - 生产配置
        theme.js                    - 样式重定义
```