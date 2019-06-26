#### 目录结构
```
│  .babelrc
│  .gitignore
│  .remark.babelrc
│  index.html
│  package-lock.json
│  package.json
│  package.json.remark.js
│  postcss.config.js
│  README.md
│  
├─.cache
├─dist   
├─dll      
├─src
│  │  index.js			- 入口文件
│  │  index.less
│  │  
│  ├─controller
│  │      demo.ctrl.js
│  │      demo2.ctrl.js
│  │      控制器.md
│  │      
│  ├─core
│  │  │  connect.js
│  │  │  Dispatch.js
│  │  │  extractEpic.js
│  │  │  hReducer.js
│  │  │  hEpic.js
│  │  │  factory.js
│  │  │  Store.js
│  │  │  util.js
│  │  │  
│  │  └─error
│  ├─enhancers
│  │      monitorReducer.js
│  │      
│  ├─epics
│  │      demo.epic.js
│  │      
│  ├─middleware
│  │      logger.js
│  │      
│  ├─page
│  │  │  App.js
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
│  ├─router
│  │      AuthRoute.jsx
│  │      ErrorBoundary.jsx
│  │      GenRouter.jsx
│  │      RouterConfig.js
│  │      
│  ├─service
│  ├─static
│  │  └─image
│  └─util
│          crypt.js
│          http.js
│          log.js
│          websocket.js
│          
└─webpack
        analyze.js
        common.js
        develop.js
        dll.js
        production.js
        theme.js
```