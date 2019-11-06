/**
 *  启动器创建模块 app 的入口文件。传入的组件必须是模块的根组件。
 */

// import Launcher from '@home/core/launcher';
import StoreFactory from '@home/core/store';

// import epics from '../epics';
import controllers from '../controllers';

import PageEntry from '../modules';

export default Launcher.createApp({
    name: 'roomApp',    //  应用名称，每个应用唯一
    store() {
        const store = StoreFactory.getInstance( window.__INITIAL_STATE__, controllers, epics);
        return store;
    },
    component: PageEntry,
});
