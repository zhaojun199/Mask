// const logger = store => next => action => {
// 	console.group(action.type)
// 	console.info('dispatching', action)
// 	console.log('pre state', store.getState())
// 	let result = next(action)
// 	console.log('next state', store.getState())
// 	console.groupEnd()
// 	return result
// }

// export default logger

import { middleware, Logger } from '@home/util/log'

const { createLogger } = middleware

const loggerMiddleware = createLogger({
	logger: new Logger(),
})

export default loggerMiddleware