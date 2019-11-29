import report from '../report/report';

// 在浏览器中这些代码入口抛出的错误并不是完整的Error对象，(在最新版Chrome中可以捕获到完整的Error对象)
// 重写setTimeout等方法，收集完整的error错误
function protectEntryPoint(fn) {
    return function protectedFn() {
        try {
            return fn();
        } catch (e) {
            report.protected(e);
        }
    };
}
const _oldSetTimeout = window.setTimeout;
window.setTimeout = function protectedSetTimeout(fn, time) {
    return _oldSetTimeout.call(window, protectEntryPoint(fn), time);
};
