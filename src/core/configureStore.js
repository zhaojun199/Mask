import { applyMiddleware, compose, createStore } from 'redux'

import monitorReducersEnhancer from '@home/enhancers/monitorReducer'
import loggerMiddleware from '@home/middleware/logger'

import rootReducer from './extractReducers'
// const rootReducer = () => {}

export default function configureStore(preloadedState) {
	const middlewares = [loggerMiddleware]
	const middlewareEnhancer = applyMiddleware(...middlewares)

	const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
	const composedEnhancers = compose(...enhancers)

	const store = createStore(rootReducer, preloadedState, composedEnhancers)

	// window.store = store
	return store
}