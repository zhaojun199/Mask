## app

- 一个包含了一个模块的几乎全部信息对象
- 内部实现了
  	- 创建store
  	- 创建redux - component
  	- 提供组件挂载卸载功能
  	- 将模块信息存入container容器池

app -> createApp -> container -> createStore

### app


``` 
import { lazy } from 'react'
import Launcher from '@home/core/launcher';
import loggerMiddleware from '@home/middlewares/logger';

import epics from '../epics';
import reducers from '../controllers';

const PageEntry = lazy(() => import('../modules'))

export default Launcher.createApp({
    name: 'roomApp',    //  模块名称，每个模块唯一
    storeFactory() {
        const storeProps = {
            preloadedState: window.__INITIAL_STATE__,
            middlewares: [loggerMiddleware],
            epics,
            reducers,
        }
        const store = Launcher.createStore(storeProps);
        return store;
    },
    component: PageEntry,
}); 
``` 

### createApp
``` 
import warning from 'warning'
import container from './container'

// { name, store, component }
export default function createApp(options = {}) {
	class App {
		constructor(opts = {}) {
	        this.options = {
	            name: null,
                
	            // 条件
	            ...options,
	            ...opts,
	        };
            ...
			//	注册到容器池
	        container.registry(this.options);

	        this.container = container.getApp(this.options.name);
            ...
		}

		get(providerName) {
	        const value = this.container[providerName];

	        if (typeof value !== 'undefined') {
	            return value;
	        }

	        return null;
	    }
	}

	return App
} 
``` 

### Container

``` 
import createStore from './createStore'
// 容器。
const containers = {};

class Container {
	registry(app) {
		const { name, storeFactory = () => null, component } = app
		containers[name] = {
			name,
			component,
			store: storeFactory()(name),
		}
	}

	// 获取app
	getApp(name) {
		return containers[name] || {}
	}

	//	获取store
	getStore(name) {
		return containers[name].store
	}
}

export default new Container() 
``` 

### createStore
``` 
import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

export const stores = {}

export default function configureStore({
	preloadedState,
	middlewares,
	epics,
	enhancers = [],
	reducers,
}) {
	return function(name) {
		...
		const store = createStore(reducers, preloadedState, composedEnhancers)
        ...
        
		stores[name] = store

		return store
	}
} 
 
``` 



