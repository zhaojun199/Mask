import defaultOptions from './defaultOptions';
import printBuffer from './core';

/**
 * 创建日志中间件
 * @param {object} options - 配置参数
 * 
 * @return {function} logger middleware
 */
function createLogger(options = {}) {
	const loggerOptions = Object.assign({}, defaultOptions, options)
	const {
		logger,
		stateTransformer,
		errorTransformer,
		predicate,
		logErrors,
		diffPredicate
	} = loggerOptions
	if (typeof logger === 'undefined') {
		return () => next => action => next(action)
	}
	// if (options.getState && options.dispatch) {
	// 	console.error('please config middleware');
	// 	return () => next => action => next(action);
	// }
	
	const logBuffer = []

	return ({ getState }) => next => (action) => {
		// if (typeof predicate === 'function' && !predicate(getState, action)) {
		// 	return next(action);
		// }
		const logEntry = {};

		logBuffer.push(logEntry);

		logEntry.started = Date.now();
        logEntry.startedTime = new Date();
        logEntry.prevState = stateTransformer(getState());
        logEntry.action = action;

        let returnedValue;

        if (logErrors) {
            try {
                returnedValue = next(action);
            } catch (e) {
                logEntry.error = errorTransformer(e);
            }
        } else {
            returnedValue = next(action);
        }

        logEntry.took = Date.now() - logEntry.started;
        logEntry.nextState = stateTransformer(getState());

        const diff = loggerOptions.diff && typeof diffPredicate === 'function'
        ? diffPredicate(getState, action)
        : loggerOptions.diff;
		// 合并配置
        const bufferOptions = Object.assign({}, loggerOptions, { diff })

        printBuffer(logBuffer, bufferOptions);
        logBuffer.length = 0;

        if (logEntry.error) { throw logEntry.error; }

        return returnedValue;
	}
}

export { defaultOptions, createLogger }

export default { defaultOptions, createLogger }

const a = {a : 1}
const m = m => m;
const b = m(a)
console.log(1111,b)
a.c = 2;