import report from '../report/report'

if (!window.$$XMLHttpRequest) {
    window.$$XMLHttpRequest = window.XMLHttpRequest;
}

function XhrProxy() {
    const xhr = new window.$$XMLHttpRequest();
    const xhrInfo = {};
    const _open = xhr.open
    xhr.open = ((...args) => {
        // 初始时间和信息
        xhrInfo.startTime = new Date().valueOf();
        xhrInfo.method = args[0];
        xhrInfo.url = args[1];
        _open.apply(xhr, args)
    });

    xhr.addEventListener('readystatechange', () => {
        // 请求结束
        if (xhr.readyState === 4) {
            xhrInfo.endTime = new Date().valueOf();
            xhrInfo.time = xhrInfo.endTime - xhrInfo.startTime;
            report.xhr(xhrInfo);
        }
    });

    return xhr;
}

window.XMLHttpRequest = XhrProxy;