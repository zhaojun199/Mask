const idCounter = {};
const defaultPrefix = 'Mask##';

/**
 * 生成一个全局唯一的id。
 * 如果`prefix`参数存在，`prefix`为`true`时生成`Globally Unique Identifier`；`prefix`为`string`时则将`id`附加给它。
 *
 * @param {String|Boolean} [prefix=''] id的前缀值。
 * @returns {String} 返回生成的唯一id。
 * @example
 *
 * guid('contact_')
 * // => 'contact_1'
 *
 * guid()
 * // => '1'
 *
 * guid(true)
 * // => '90dde1b4-bfeb-46bc-8de0-ec70ec085637
 */
function guid(prefix = defaultPrefix) {
    if (prefix === true) {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            /* eslint-disable no-mixed-operators */
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            /* eslint-enable no-mixed-operators */
            return v.toString(16);
        });
    }

    if (!idCounter[prefix]) {
        idCounter[prefix] = 0;
    }

    idCounter[prefix] += 1;

    return `${prefix === defaultPrefix ? '' : prefix}${idCounter[prefix]}`;
}

export default guid;
