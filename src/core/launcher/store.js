import { stores } from './createStore';

// store装饰器
// 传入store名则获取此store
// 不传入则获取所有store
const store = (appName) => function (target, key) {
    if (appName) {
        // target[key] = stores[appName];
        Object.defineProperties(target, {
            [key]: {
                get() {
                    return stores[appName];
                },
            },
        });
    } else {
        // eslint-disable-next-line no-param-reassign
        target[key] = stores;
    }

    return target;
};

export default store;
