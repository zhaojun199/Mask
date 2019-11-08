import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

export default function configureStore({
	preloadedState, middlewares, epics, enhancers = [], reducers
}) {
	
	let epicMiddleware
	let mergedMiddlewares

	if (epics) {
		epicMiddleware = createEpicMiddleware()
		mergedMiddlewares = [...middlewares, epicMiddleware]
	} else {
		mergedMiddlewares = [...middlewares]
	}

	const middlewareEnhancer = applyMiddleware(...mergedMiddlewares)

	const mergedEnhancers = [middlewareEnhancer, ...enhancers]
	const composedEnhancers = compose(...mergedEnhancers)

	const store = createStore(reducers, preloadedState, composedEnhancers)

	if (epics) {
		epicMiddleware.run(epics)
	}

	return store
}
