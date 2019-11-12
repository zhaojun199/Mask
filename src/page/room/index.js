import Launcher from '@home/core/launcher';

import roomApp from './app/index';

// 直接实例化组件，不可以$cloneApp
// const app = new roomApp()
// const module = Launcher.getMountableComponent(app);

// 不直接实例化组件，可以$cloneApp
const module = Launcher.getMountableComponent(roomApp, {});

// module.$mount({testStr: 123123}, { id, className, style })

export default module;
