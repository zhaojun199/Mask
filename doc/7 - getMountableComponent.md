## getMountableComponent

获取react组件

- react组件，能直接作为compont调用
- 添加了clone，mount，unmount方法
- 摈弃了父组件通过state更新来渲染组件的思想，能够在父组件不render的情况下直接渲染子组件以提升性能

### module 入口

```
import Launcher from '@home/core/launcher';

import roomApp from './app/index';

const module = Launcher.getMountableComponent(roomApp, {});

// 组件可直接挂载
// module.$mount({testProps: 123123})

export default module;
```

### getMountableComponent

``` 
 import { Provider } from 'react-redux'
import { stores } from './createStore';

// 从app获取数据，并把数据挂载到component上
export default function getMountableComponent(
	App,
	AppOptions,
) {
	let app = App
	...
	let Component = app.get('component')
	const store = app.get('store')

	const RootComponent = (compontProps) => {

		if (store) {
			return (
				<Provider store={store}>
				    <Component {...compontProps} />
				</Provider>
			)
		}
		return (
			<Component {...compontProps} />
		)
	}

	// 根组件
	function rootComponent(props) {
		if (Component.$$typeof.toString() === 'Symbol(react.lazy)') {
			return <React.Suspense fallback="">
				<RootComponent {...props} />
			</React.Suspense>;
		}
		return <RootComponent {...props} />
	}
	...
	return rootComponent;
}
``` 

### $mount

``` 
import render from './render'
...
 // 挂载组件
	rootComponent.$mount = (componentProps, { id, className, style } = {}) => {
		
		let div = id && document.getElementById(id);
		...
		render(app, document.getElementById(div.id), componentProps)
        
	}
``` 

### $unmount

```
import { unmountComponentAtNode } from 'react-dom'
...
$unmount: () => {
	if (div) {
		const unmountResult = unmountComponentAtNode(div)
		if (unmountResult && div.parentNode) {
			div.parentNode.removeChild(div);
			div = undefined;
		}
	}
}
...
``` 



