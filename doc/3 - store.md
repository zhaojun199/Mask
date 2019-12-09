## store

核心还是redux的store

每一个模块使用独立的store，通过name属性作为唯一标识，存储到stores池里

跨模块通信通过stores池完成

### createStore

用闭包函数传入name标识，调用redux `createStore`方法创建store，并更新stores池

```
import { createStore } from 'redux'

const stores = {}

function configureStore({
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