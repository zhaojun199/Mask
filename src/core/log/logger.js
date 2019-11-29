import { formatTime, LoggerUtil } from './util';
import addPx from './addPx';
import { colorEnum } from './color';
import genColorByMD5 from './genColorByMD5';

/**
 * 代理方法列表
 */
const proxyList = [
    'log',
    'warn',
    'error',
    'time',
    'timeEnd',
    'debug',
    'table',
    'trace',
    'group',
    'groupCollapsed',
    'groupEnd',
];

const uppercasePattern = /[A-Z]/g;
const msPattern = /^ms-/;
const cache = {}; //    缓存样式属性

class Logger {
    constructor(prefix = true) {
        this.isProd = process.env.NODE_ENV === 'production';
        this.proxy = {};
        this.prefix = prefix;
        // 代理原生console
        proxyList.forEach((value) => {
            if (window.console && window.console[value]) {
                this.proxy[value] = (...args) => window.console[value](...args);
            } else if (window.console && window.console.log) {
                this.proxy[value] = (...args) => window.console.log(...args);
            } else {
                this.proxy[value] = () => {};
            }
        });
    }

    static now() {
        return formatTime(new Date());
    }

    getPrefix(type) {
        if (type) {
            return `%c[Logger @ ${this.constructor.now()}] %c${type}%c `;
        }
        return `%c[Logger @ ${this.constructor.now()}] %c`;
    }

    log(...args) {
        // 配置log为false 不打印
        if (window.log === false) {
            return;
        }
        // 应该是配置日志等级用
        if (window.log && window.log !== '') {
            const pattern = new RegExp(window.log);

            if (!pattern.test(args[0])) {
                return;
            }
        }
        // 非生产环境才打印信息
        !this.isProd && this.info(...args);
    }

    info(...args) {
        if (window.log === false) {
            return;
        }
        if (window.log && window.log !== '') {
            const pattern = new RegExp(window.log);

            if (!pattern.test(args[0])) {
                return;
            }
        }
        // 为打印上色
        if (this.prefix) {
            const argsTmp = args.splice(0, 1);

            args.unshift(
                this.getPrefix() + argsTmp,
                LoggerUtil.style(colorEnum.title),
                LoggerUtil.style(colorEnum.default),
            );
        }
        // 打印参数
        !this.isProd && this.proxy.log(...args);
    }

    // 用连字符连接样式名
    static hyphenateStyleName(string) {
        /* eslint-disable no-return-assign */
        return string in cache
            ? cache[string]
            : (
                cache[string] = string
                    .replace(uppercasePattern, '-$&') // 驼峰命名转化成中划线命名
                    .toLowerCase()
                    .replace(msPattern, '-ms-')
            );
        /* eslint-enable no-return-assign */
    }

    // 创建标记
    createMarkup(obj) {
        const keys = Object.keys(obj);
        if (!keys.length) {
            return '';
        }

        let i;
        const len = keys.length;
        let result = '';
        for (i = 0; i < len; i += 1) {
            const key = keys[i];
            const val = obj[key];
            result += `${this.constructor.hyphenateStyleName(key)}:${addPx(key, val)};`;
        }

        return result;
    }

    /**
     * 自定义彩色消息
     */
    color(msg, color = 'black', fontWeight = 'normal') {
        const args = [];

        args.push(msg);
        if (this.prefix) {
            const argsTmp = args.splice(0, 1);

            args.unshift(
                this.getPrefix() + argsTmp,
                LoggerUtil.style(colorEnum.title),
                `color:${color};font-weight:${fontWeight}`,
            );
        }
        !this.isProd && this.proxy.log(...args);
    }

    /**
     * 自定义样式log
     * @param {*} msg
     * @param {*} styleObj
     */
    style(msg, styleObj = {}) {
        const cssStr = this.createMarkup(styleObj);
        const args = [];

        args.push(msg);
        if (this.prefix) {
            const argsTmp = args.splice(0, 1);
            const style = LoggerUtil.style(colorEnum.title);

            args.unshift(this.getPrefix() + argsTmp, style, cssStr);
        }
        !this.isProd && this.proxy.log(...args);
    }

    // 无前缀
    field(...args) {
        !this.isProd && this.proxy.log(...args);
    }

    // 无前缀
    warnField(...args) {
        !this.isProd && this.proxy.warn(...args);
    }

    warn(...args) {
        if (this.prefix) {
            const argsTmp = args.splice(0, 1);

            args.unshift(
                this.getPrefix() + argsTmp,
                LoggerUtil.style(colorEnum.warn),
                LoggerUtil.style(colorEnum.warn),
            );
        }
        !this.isProd && this.proxy.warn(...args);
    }

    error(...args) {
        if (args[0] instanceof Error) {
            // 上传日志
            // if (Logger.snapshot) {
            //     Logger.snapshot.uploadSnapshot(...args);
            // }
            // 捕获的异常
            const { message, stack } = args[0];

            this.proxy.group(
                `${this.getPrefix('error')}${message}`,
                LoggerUtil.style(colorEnum.error),
                LoggerUtil.style(colorEnum.title),
                LoggerUtil.style(colorEnum.error),
            );
            this.proxy.error(stack);
            const otherArgs = args.slice(0);

            otherArgs.shift();
            if (otherArgs.length) {
                this.proxy.error(...otherArgs);
            }
            this.proxy.groupEnd();
        } else {
            // 显式error
            if (this.prefix) {
                const argsTmp = args.splice(0, 1);

                args.unshift(
                    this.getPrefix() + argsTmp,
                    LoggerUtil.style(colorEnum.error),
                    LoggerUtil.style(colorEnum.default),
                );
            }
            !this.isProd && this.proxy.error(...args);
        }
    }

    trace(...args) {
        if (this.prefix) {
            const argsTmp = args.splice(0, 1);

            args.unshift(
                this.getPrefix('trace') + argsTmp,
                LoggerUtil.style(colorEnum.title),
                LoggerUtil.style(colorEnum.title),
                LoggerUtil.style(colorEnum.default),
            );
        }
        !this.isProd && this.proxy.trace(...args);
    }

    group(...args) {
        if (window.log === false) {
            return;
        }
        if (window.log && window.log !== '') {
            const pattern = new RegExp(window.log);

            if (!pattern.test(args[0])) {
                return;
            }
        }
        if (this.prefix) {
            const argsTmp = args.splice(0, 1);

            args.unshift(
                this.getPrefix() + argsTmp,
                LoggerUtil.style(colorEnum.title),
                LoggerUtil.style(colorEnum.default),
            );
        }
        !this.isProd && this.proxy.group(...args);
    }


    groupCollapsed(...args) {
        if (window.log === false) {
            return;
        }
        if (window.log && window.log !== '') {
            const pattern = new RegExp(window.log);

            if (!pattern.test(args[0])) {
                return;
            }
        }
        if (this.prefix) {
            const argsTmp = args.splice(0, 1);

            args.unshift(
                this.getPrefix() + argsTmp,
                LoggerUtil.style(colorEnum.title),
                LoggerUtil.style(colorEnum.default),
            );
        }
        !this.isProd && this.proxy.groupCollapsed(...args);
    }

    groupEnd(...args) {
        !this.isProd && this.proxy.groupEnd(...args);
    }

    // 分组打印，输出耗时
    groupObj(type, groupLog, Obj, componentName = '') {
        if (window.log === false) {
            return;
        }
        if (window.log && window.log !== '') {
            const pattern = new RegExp(window.log);

            if (!pattern.test(groupLog)) {
                return;
            }
        }
        if (this.isProd) {
            return;
        }

        const padding = 12;
        const warnDuration = 17;
        const errorDuration = 100;

        if (Obj.time) {
            const duration = Obj.time.toFixed(2);

            let colorStyle;

            if (duration < warnDuration) {
                colorStyle = LoggerUtil.style(colorEnum.gray);
            } else if (duration >= warnDuration && duration < errorDuration) {
                colorStyle = LoggerUtil.style(colorEnum.warn);
            } else {
                colorStyle = LoggerUtil.style(colorEnum.error);
            }
            this.groupCollapsed(
                `%c${type} %c${componentName} %c${groupLog} %c(in ${duration} ms)`,
                LoggerUtil.style(colorEnum.gray),
                genColorByMD5(componentName),
                LoggerUtil.style(colorEnum.normal),
                colorStyle,
            );
        } else {
            this.groupCollapsed(
                `%c${type} %c${componentName} %c${groupLog}`,
                LoggerUtil.style(colorEnum.gray),
                genColorByMD5(componentName),
                LoggerUtil.style(colorEnum.normal),
            );
        }
        for (const key in Obj) {
            if (key !== 'time') {
                const value = Obj[key];
                const ftype = typeof value === 'object' ? '%o' : '%s';

                this.field(
                    `%c${LoggerUtil.padEnd(` ${key}`, padding)}%c${ftype}`,
                    LoggerUtil.style(colorEnum.field),
                    LoggerUtil.style(colorEnum.default),
                    value,
                );
            }
        }
        this.groupEnd();
    }

    time(...args) {
        !this.isProd && this.proxy.time(...args);
    }

    table(...args) {
        !this.isProd && this.proxy.table(...args);
    }

    timeEnd(...args) {
        if (this.prefix) {
            const timeArgs = [];

            timeArgs.unshift(
                this.getPrefix('time'),
                LoggerUtil.style(colorEnum.title),
                LoggerUtil.style(colorEnum.gray),
                LoggerUtil.style(colorEnum.default),
            );
            !this.isProd && this.proxy.groupCollapsed(...timeArgs);
        }
        !this.isProd && this.proxy.timeEnd(...args);
        !this.isProd && this.proxy.groupEnd();
    }

    debug(...args) {
        if (this.prefix) {
            const argsTmp = args.splice(0, 1);

            args.unshift(
                this.getPrefix() + argsTmp,
                LoggerUtil.style(colorEnum.debug),
                LoggerUtil.style(colorEnum.default),
            );
        }
        !this.isProd && this.proxy.debug(...args);
    }
}

export default Logger;

// window.cout = new Logger().log

/* // ex
const log = new Logger()
log.log('xxxcxcxcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
log.info('info')
log.color('color', 'pink')
log.style('style', { color: 'green'})
log.field('field')
log.warnField('warnField')
log.warn('warn')
log.error(Error('123123'))
log.trace('trace') */
