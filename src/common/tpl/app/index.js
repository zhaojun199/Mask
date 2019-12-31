/**
 *  启动器创建模块 app 的入口文件。传入的组件必须是模块的根组件。
 */

import { lazy } from 'react';
import Launcher from '@home/core/launcher';
import loggerMiddleware from '@home/middlewares/logger';
import { Http } from '@home/util/http';

import epics from '../epics';
import reducers from '../controllers';

const PageEntry = lazy(() => import('../modules'));

export default Launcher.createApp({
    name: 'header', //  应用名称，每个应用唯一
    storeFactory() {
        const storeProps = {
            preloadedState: window.__INITIAL_STATE__,
            middlewares: [loggerMiddleware],
            epics,
            reducers,
        };
        const store = Launcher.createStore(storeProps);
        return store;
    },
    component: PageEntry,
    Http: Http,
    persist: true,
});
