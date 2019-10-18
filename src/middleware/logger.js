// const logger = store => next => action => {
// 	console.group(action.type)
// 	console.info('dispatching', action)
// 	let result = next(action)
// 	console.log('next state', store.getState())
// 	console.groupEnd()
// 	return result
// }

import { middleware, Logger } from '@home/util/log'

const { createLogger } = middleware

const loggerMiddleware = createLogger({
	logger: new Logger(),
})

export default loggerMiddleware