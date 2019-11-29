import { validateClass } from './validators';
import Logger from './logger';
import { LoggerUtil } from './util';

const logger = new Logger();
// 只显示错误
let onlyError = false;

// **如果只希望输出错误日志，使用@log(true)**
/**
 * 代理方法
 * @param {*} target
 * @param {*} name
 */
function proxyMethod(target, name) {
    const original = target.prototype[name];
    const wrapFunction = function (...args) {
        const beginTime = Date.now();

        let result;

        try {
            result = original.apply(this, args);
        } catch (e) {
            logger.error(e);
        }
        const logObj = {};

        if (args.length !== 0) {
            logObj.args = args;
        }

        const timeCost = Date.now() - beginTime;

        logObj.time = timeCost;
        if (this && this.state !== undefined) {
            logObj.state = this.state;
        }
        if (this && this.props !== undefined) {
            logObj.props = this.props;
        }
        const clsName = LoggerUtil.padEnd(target.name, 12);

        !onlyError && logger.groupObj('@log', name, logObj, clsName);

        return result;
    };

    // eslint-disable-next-line no-param-reassign
    target.prototype[name] = wrapFunction;
}

/**
 *  log class 装饰器
 * @param {*} target
 */
function logClass(target) {
    const opd = Object.getOwnPropertyDescriptors(target.prototype);

    Object.keys(opd).forEach((name) => {
        if (typeof opd[name].value === 'function') {
            proxyMethod(target, name);
        }
    });
}

/**
 * log EntityDto
 * @param {*} target
 */
// function logDto(target) {
//     target.prototype.log = true;
// }

function decorateHandler(args, param = false) {
    const target = args[0];

    onlyError = param;
    // 只能应用在class
    validateClass(target, 'log');

    // // 判断基类
    // const baseTypeName = Object.getPrototypeOf(target).name;

    // if (baseTypeName === 'ReactComponent' || baseTypeName === 'Service') {
    //     return logClass(...args);
    // } else if (baseTypeName === 'EntityDto') {
    //     return logDto(...args);
    // }

    return logClass(...args);
}

/**
 * 导出装饰器
 * @param {*} args
 */
export default function log(...args) {
    if (args.length === 3) {
        validateClass(args[0], 'log');
    }
    // 兼容@log()和@log 2种写法
    if (typeof args[0] !== 'function') {
        return function (...argsClass) {
            return decorateHandler(argsClass, args[0]);
        };
    }

    return decorateHandler(args);
}
