export default {
    level: 'log',
  //   logger: console,
    logErrors: true,    // 打印错误
    // collapsed: undefined,  //  日志分组且收缩
    collapsed: true,
  //   predicate: undefined,
    // duration: false,
    duration: true,
  //   timestamp: true,
    stateTransformer: state => state,
    actionTransformer: action => action,
  //   errorTransformer: error => error,
    colors: {
        title: () => 'inherit',
        prevState: () => '#9E9E9E',
        action: () => '#03A9F4',
        nextState: () => '#4CAF50',
        error: () => '#F20404'
    },
    // diff: false,
    diff: true,  //  diff数据
    diffCollapsed: false, //  diff数据是否收缩
    diffPredicate: undefined, //  动态配置是否diff

  // // Deprecated options
  //   transformer: undefined
};
