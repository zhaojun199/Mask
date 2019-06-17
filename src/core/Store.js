import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import monitorReducersEnhancer from '@home/enhancers/monitorReducer'
import loggerMiddleware from '@home/middleware/logger'
import returnPromiseMiddleware from '@home/middleware/returnPromise'

import hReducer from './hReducer'
import rootEpic from './extractEpic'
import demoEpic from '../epics/demo.epic.js'

const rootReducer = hReducer.getReducers()

// 数据池，单例
let instance

class Store {
	constructor(preloadedState) {
		if (instance) {
			return instance
		}
		instance = this.configureStore(preloadedState)
		return instance
	}

	asyncReducer = {}

	configureStore(preloadedState) {
		// const epicMiddleware = createEpicMiddleware()
		const middlewares = [loggerMiddleware, returnPromiseMiddleware, Store.epicMiddleware]
		const middlewareEnhancer = applyMiddleware(...middlewares)

		const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
		const composedEnhancers = compose(...enhancers)

		const store = createStore(rootReducer, preloadedState, composedEnhancers)

		Store.epicMiddleware.run(rootEpic)
		// window.store = store
		return store
	}

	static injectReducer({ key, reducers }) {
		// this.asyncReducer[key] = reducers
		new Store().replaceReducer(reducers)
	}

	static epicMiddleware = createEpicMiddleware()
}

export default Store;