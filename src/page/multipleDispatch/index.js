import Launcher from '@home/core/launcher';

import MultipleDispatch from './app/index';

// 直接实例化组件，不可以$cloneApp
// const app = new MultipleDispatch()
// const module = Launcher.getMountableComponent(app);

// 不直接实例化组件，可以$cloneApp
const module = Launcher.getMountableComponent(MultipleDispatch, {});

// module.$mount({testStr: 123123})

export default module;
