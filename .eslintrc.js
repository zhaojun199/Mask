module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',  // 启用react默认规则
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: 'false',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    // 'jsx-a11y',
  ],
  rules: {
    "linebreak-style": ['off', 'windows'],  //  换行风格
    "indent": ['error', 4], //  4个空格缩进
    "no-tabs": ['off'], //  启用tab
    "no-restricted-syntax": ['off'], //  禁用特殊语法
    "array-callback-return": ['off'], //  箭头函数可以无返回值
    "class-methods-use-this": ['off'], //  不强制类方法使用 this
    "consistent-return": ['off'], //  不要求使用一致的 return 语句
    "no-bitwise": ['off'], //  启用按位运算符
    "func-names": ['off'],  //  允许匿名函数
    "import/prefer-default-export": ['off'],
    "no-underscore-dangle": ['off'],  //  允许标识符中有悬空下划线
    "max-len": ["error", {
      "code": 120,
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true,
      "ignoreUrls": true,
    }],  //  强制代码行的最大长度
    "no-unused-expressions": ['off'],  //  允许未使用过的表达式 
    "no-multi-assign": ['off'],  //  允许连续赋值
    "prefer-destructuring": ['off'],  //  数组和对象解构
    "no-plusplus": ['off'],  //  允许用一元操作符 ++ 和 --
    "semi": ['off'],  //  分号结尾
    "padded-blocks": ['off'],  //  块内填充
    "no-useless-constructor": ['off'],  //  允许不必要的构造函数
    "arrow-body-style": ['off'],  //  不要求箭头函数体使用大括号
    "eol-last": ['off'],  //  不要求件末尾保留一行空行
    "prefer-template": ['off'],  //  不要求使用模板字面量而非字符串连接
    "no-cond-assign": ['error'],  //  条件判断不允许赋值语句
    "object-shorthand": ['off'],  //  不强制对象字面量简写语法
    "object-curly-newline": ['off'],  //  不强制花括号内换行符的一致性
    "comma-dangle": ['off'],  //  不要求或禁止使用拖尾逗号
    "global-require": ['off'],  //  不要求 require() 出现在顶层模块作用域中
    "arrow-parens": ['off'],  //  不要要求箭头函数的参数使用圆括号
    "jsx-quotes": ['error', "prefer-double"], //强制在JSX属性（jsx-quotes）中一致使用双引号

    "react/destructuring-assignment": ['off'],  //  关闭使用解构赋值的检测
    "react/prop-types": ['off'],  //  关闭react默认的props-type验证
    "react/jsx-wrap-multilines": ['off'],  //  不必将多行 JSX 标签写在 ()里
    "react/react-in-jsx-scope": ['off'],  //  不强制jsx文件引入React
    "react/jsx-closing-tag-location": ['off'],  //   React标签对齐
    "react/jsx-one-expression-per-line": ['off'],  //   允许jsx多个表达式写在一行
    "react/jsx-indent": ["error", 4],  //   jsx缩进4个空格
    "react/jsx-indent-props": ["error", 4],  //   jsx props缩进4个空格
    "react/button-has-type": ['off'],
    "react/jsx-filename-extension": ['warn', { "extensions": [".js", ".jsx"] }],  //   jsx文件后缀名
    "react/jsx-fragments": ['off'],
    "react/jsx-props-no-spreading": ['off'],  //  不禁止jsx props展开传递
    "react/no-this-in-sfc": ['off'],  //  Stateless functional components can use this

    "jsx-a11y/no-static-element-interactions": ['off'],  //  Enforce that non-interactive, visible elements (such as <div>) that have click handlers use the role attribute
    "jsx-a11y/no-noninteractive-element-interactions": ['off'],  //  Non-interactive elements should not be assigned mouse or keyboard event listeners
    "jsx-a11y/anchor-is-valid": ["warn", {
      "components": ["Link"],
      "specialLink": ["to"],
    }],  //  Enforce all anchors are valid, navigable elements
    "jsx-a11y/click-events-have-key-events": ['off'],  //  Enforce a clickable non-interactive element has at least one keyboard event listener
  },
  parser: 'babel-eslint', //  增加babel编译环境
  settings: {
    "import/resolver": {
      "babel-module": {
        "alias": {
          "@home": "./src",
        }
      }
    }
  },
};
