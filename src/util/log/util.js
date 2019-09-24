import { colorDic } from './color'

/**
 * string 新增repeat方法
 * @param {number} count 次数
 */
String.prototype._u_repeat = function(count) {
	return new Array(count + 1).join(this)
}

/**
 * 数字前面添0补齐
 * @param {number} num 			数字
 * @param {number} maxLength 	补齐后长度
 */
export const prefixZero = (num, maxLength) => '0'.repeat(maxLength - num.toString().length) + num

// 格式化时间 HH:mm:ss:msmsms
export const formatTime = time => `${prefixZero(time.getHours(), 2)}:${prefixZero(time.getMinutes(), 2)}:${prefixZero(time.getSeconds(), 2)}.${prefixZero(time.getMilliseconds(), 3)}`

// 时间对象
export const timer =
(typeof performance !== 'undefined' && performance !== null) && typeof performance.now === 'function' ?
  performance :
  Date

/**
 * 工具类
 */
export class LoggerUtil {
	/**
	 * 设置样式
	 * @param {colorEnum} type 颜色枚举
	 */
    static style(type) {
        return `color: ${colorDic[type].color}; font-weight: ${colorDic[type].weight}`
    }

	/**
	 * 在字符串尾部补齐
	 * @param {string} str 			要补齐的字符串
	 * @param {number} targetLength 补齐后字符串长度
	 * @param {string} padString	用于补齐的字符串
	 * ex: padEnd('a', 5, 'cb') -> 'acbcb'
	 */
    static padEnd(str, targetLength, padString) {
    	// 字符串转数字，非数字转0
        targetLength >>= 0
        padString = String(typeof padString !== 'undefined' ? padString : ' ')
        if (str.length > targetLength) {
            return String(str)
        }
        targetLength -= str.length
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length)
        }
        return String(str) + padString.slice(0, targetLength)
    }
}
