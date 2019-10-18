export default {
  //   level: 'log',
  //   logger: console,
    logErrors: true,    // 打印错误
  //   collapsed: undefined,
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
    diff: false,
    diffPredicate: undefined,

  // // Deprecated options
  //   transformer: undefined
};
