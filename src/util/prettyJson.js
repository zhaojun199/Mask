/**
 * `JSON`字符串美化函数。
 *
 * @param {String} [string=''] 需要美化的`JSON`字符串。
 * @returns {String} 返回美化后的字符串。
 * @example
 * 
 * const jsonString = JSON.stringify({
 *      a: 1,
 *      b: 2
 * });
 * 
 * prettyJson(jsonString)
 * // => '
 * {
 *      a: 1,
 *      b: 2
 * }
 */
function prettyJson(string) {
    const stack = [];
    const push = element => `\\${stack.push(element)}\\`;
    const pop = index => stack[index - 1];
    const tabs = count => Array(count + 1).join('\t');
    const subString = string.toString().replace(/\\./g, match => push(match))
        .replace(/(".*?"|'.*?')/g, match => push(match))
        .replace(/\s+/, '');
    const length = subString.length;
    let index = 0;
    let indent = 0;
    let result = '';
    let char;

    while (index < length) {
        char = subString.charAt(index);
        index += 1;

        switch (char) {
        case '{':
        case '[':
            indent += 1;
            result += `${char}\n${tabs(indent)}`;
            break;
        case '}':
        case ']':
            indent -= 1;
            result += `\n${tabs(indent)}${char}`;
            break;
        case ',':
            result += `,\n${tabs(indent)}`;
            break;
        case ':':
            result += ': ';
            break;
        default:
            result += char;
            break;
        }
    }

    return result.replace(/\[[\d,\s]+?\]/g, match => match.replace(/\s/g, ''))
        .replace(/\\(\d+)\\/g, (...args) => pop(args[1]))
        .replace(/\\(\d+)\\/g, (...args) => pop(args[1]));
}

export default prettyJson;
