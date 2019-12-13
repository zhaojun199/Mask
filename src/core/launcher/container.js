import warning from 'warning'
import { http as defaultHttp } from '@home/util/http'
// 容器。
// 单例，用于存储所有的app
const containers = {

};

class Container {
    registry(app) {
        const { name, storeFactory = () => null, component, Http, persist } = app;
        warning(!containers[name], `${name} app 已经存在，app name 必须唯一`);
        const http = Http ? new Http(name) : defaultHttp
        containers[name] = {
            name,
            component,
            store: storeFactory()({ name, http, persist }),
            http,
            persist,
        };
    }

    // 获取app
    getApp(name) {
        return containers[name] || {};
    }

    //    获取store
    getStore(name) {
        return containers[name].store;
    }

    // 获取http实例
    getHttp(name) {
        return containers[name].http;
    }
}

export default new Container();
