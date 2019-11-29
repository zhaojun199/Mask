import warning from 'warning';
// 容器。
// 单例，用于存储所有的app
const containers = {

};

class Container {
    registry(app) {
        const { name, storeFactory = () => null, component } = app;
        warning(!containers[name], `${name} app 已经存在，app name 必须唯一`);
        containers[name] = {
            name,
            component,
            store: storeFactory()(name),
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
}

export default new Container();
