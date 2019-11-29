import { parse } from 'qs';
import report from '../report/report';

if (!window.$$XMLHttpRequest) {
    window.$$XMLHttpRequest = window.XMLHttpRequest;
}

function XhrProxy() {
    const xhr = new window.$$XMLHttpRequest();
    const logObj = {};
    const _open = xhr.open;
    xhr.open = ((...args) => {
        // 初始时间和信息
        logObj.startTime = new Date().valueOf();
        logObj.method = args[0];
        logObj.fullUrl = args[1];
        const { href } = window.location;
        if (logObj.fullUrl.includes(window.location.href)) {
            logObj.url = args[1]
                .replace(new RegExp(`^.*${href}`), '')
                .replace(/\?.*/, '');
        } else {
            logObj.url = args[1].replace(/\?.*/, '');
        }
        logObj.query = parse(logObj.fullUrl.replace(/.*\?/, ''));
        _open.apply(xhr, args);
    });

    xhr.addEventListener('readystatechange', () => {
        // 请求结束
        if (xhr.readyState === 4) {
            logObj.endTime = new Date().valueOf();
            logObj.time = logObj.endTime - logObj.startTime;
            report.xhr(logObj);
        }
    });

    return xhr;
}

if (process.env.NODE_ENV !== 'production') {
    window.XMLHttpRequest = XhrProxy;
}
