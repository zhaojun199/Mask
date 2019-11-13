import { stores } from './createStore';

// store装饰器
// 传入store名则获取此store
// 不传入则获取所有store
const store = (appName) =>
    function (target, key) {
		if (appName) {
			Object.defineProperties(target, {
				[key]: {
					get: function () {
						return stores[appName];
					},
				},
			});
		} else {
			target[key] = stores;
		}

        return target;
    };

export default store;