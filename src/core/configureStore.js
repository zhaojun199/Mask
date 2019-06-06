import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import monitorReducersEnhancer from '@home/enhancers/monitorReducer'
import loggerMiddleware from '@home/middleware/logger'

import rootReducer from './extractReducers'
import rootEpic from './extractEpic';
import demoEpic from '../epics/demo.epic.js';

export default function configureStore(preloadedState) {
	const epicMiddleware = createEpicMiddleware()
	const middlewares = [loggerMiddleware, epicMiddleware]
	const middlewareEnhancer = applyMiddleware(...middlewares)

	const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
	const composedEnhancers = compose(...enhancers)

	const store = createStore(rootReducer, preloadedState, composedEnhancers)

	epicMiddleware.run(rootEpic)
	// window.store = store
	return store
}