## log

- logger - 日志对象
	- 给日志添加时间，颜色，分组等属性
- log - 装饰器
	- 代理react-componet内部方法，加上日志打印
- middleware - redux中间件
	- 增强dispatch，打印state和nextState并diff

### logger

``` 

class Logger {
	...
	info(...args) {
		if (window.log === false) {
			return
		}
		// 为打印上色
		if (this.prefix) {
			const argsTmp = args.splice(0, 1)

			args.unshift(
				this.getPrefix() + argsTmp,
				LoggerUtil.style(colorEnum.title),
				LoggerUtil.style(colorEnum.default)
			)
		}
		// 打印参数
		!this.isProd && this.proxy.log(...args)
	}
	...
}

export default Logger
``` 

### log

``` 
function logClass(target) {
    const opd = Object.getOwnPropertyDescriptors(target.prototype);

    Object.keys(opd).forEach((name) => {
        if (typeof opd[name].value === 'function') {
            proxyMethod(target, name);
        }
    });
}
...
 function proxyMethod(target, name) {
    const original = target.prototype[name];
    const wrapFunction = function (...args) {
    
        const beginTime = Date.now();

        let result = original.apply(this, args);
        
        const logObj = {};

        const timeCost = Date.now() - beginTime;

        logObj.time = timeCost;
        logObj.state = this.state;
        logObj.props = this.props;
        
        logger.groupObj('@log', name, logObj, clsName);

        return result;
    };

    target.prototype[name] = wrapFunction;
}
``` 

### middleware

``` 

/**
 * 创建日志中间件
 * @param {object} options - 配置参数
 * 
 * @return {function} logger middleware
 */
function createLogger(options = {}) {
	const loggerOptions = options
	const {
		logger,
		stateTransformer,
		errorTransformer,
		predicate,
		logErrors,
		diffPredicate
	} = loggerOptions
	
	const logBuffer = []

	return ({ getState }) => next => (action) => {

		const logEntry = {};

		logBuffer.push(logEntry);

		logEntry.started = Date.now();
        logEntry.startedTime = new Date();
        logEntry.prevState = stateTransformer(getState());
        logEntry.action = action;

        let returnedValue;

        logEntry.took = Date.now() - logEntry.started;
        logEntry.nextState = stateTransformer(getState());

        const diff = loggerOptions.diff && typeof diffPredicate === 'function'
        ? diffPredicate(getState, action)
        : loggerOptions.diff;
        
		// 合并配置
        const bufferOptions = Object.assign({}, loggerOptions, { diff })

        printBuffer(logBuffer, bufferOptions);
        logBuffer.length = 0;

        return returnedValue;
	}
}

export default { createLogger }

``` 

