/**
 * 全局执行JS。
 * `window.eval(content)`也可达到同样效果（`window.eval`和直接`eval`是不一样的，
 * 详见https://www.cnblogs.com/index-html/archive/2011/11/08/ecma262_eval.html）
 * 但是`window.eval`可能无法得到很好的浏览器优化。
 *
 * @param {String} content 需要执行的js字符串。
 * @returns {Promise} 返回动态执行代码的`Promise`。
 * @example
 *
 * executeJS('const variable = '1; console.log(variable);')
 * // => '1'
 */
function executeJS(content) {
    return new Promise((resolve, reject) => {
        const contentText = content.toString().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

        if (contentText) {
            const container = document.body;
            const script = document.createElement('script');

            script.text = contentText;
            container.appendChild(script);
            container.removeChild(script);

            resolve();
        } else {
            reject(new Error('The `content` is incorrect.'));
        }
    });
}

export default executeJS;
