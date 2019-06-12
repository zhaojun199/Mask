{
  "name": "mobx-test",
  "version": "1.0.0",
  "description": "description",
  "private": true,
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack -w",
    "dll": "webpack --config webpack.dll.config.js",
    "dev": "webpack-dev-server --config webpack.config.js",
    "stat": "webpack --config webpack.config.js --json > stats.json"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.2.2",
    "@babel/plugin-proposal-class-properties": "^7.3.0",
    "@babel/plugin-proposal-decorators": "^7.3.0",
    "@babel/plugin-proposal-optional-chaining": "^7.2.0", //  可选链式调用
    "@babel/plugin-transform-runtime": "^7.4.4",
    "@babel/plugin-syntax-dynamic-import": "^7.2.0",  //  异步加载组件
    "@babel/preset-env": "^7.3.1",
    "@babel/preset-react": "^7.0.0",
    "autoprefixer": "^9.5.1",
    "babel-loader": "^8.0.5",
    "clean-webpack-plugin": "^2.0.1",
    "copy-webpack-plugin": "^5.0.1",
    "cross-env": "^5.2.0",
    "css-loader": "^2.1.1",
    "cssnano": "^4.1.10",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.9.0",
    "less-loader": "^4.1.0",
    "mini-css-extract-plugin": "^0.6.0",
    "optimize-css-assets-webpack-plugin": "^5.0.1",
    "postcss": "^7.0.14",
    "postcss-loader": "^3.0.0",
    "terser-webpack-plugin": "^1.2.3",  //  webpack4.0以上版本的压缩js插件
    "webpack": "^4.29.0",
    "webpack-bundle-analyzer": "^3.3.2",
    "webpack-cli": "^3.2.1",
    "webpack-dev-server": "^3.2.1",
    "webpack-parallel-uglify-plugin": "^1.1.0"  //  webpack4.0迁移成terser-webpack-plugin
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.3",  //  全局的es6语法库,会污染全局变量
    //  polyfill局部使用，制造一个沙盒环境，不造成全局污染,但无法处理原型上的api
    "@babel/runtime-corejs2": "^7.4.4",
    "core-js": "^2.6.5",  //  @babel/polyfil和@babel/runtime-corejs2都依赖core-js(v2)
    "mobx": "^5.9.0",
    "mobx-react": "^5.4.3",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "warning": "^4.0.3"
  }
}
