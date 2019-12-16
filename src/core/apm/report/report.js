import { Logger } from '@home/core/log';

const log = new Logger();

class Report {
    static protected(e) {
        log.log('protected:', e);
        // throw e;
    }

    static jsError(e) {
        log.log('jsError:', e);
    }

    static promiseError(e) {
        log.log('promiseError:', e);
    }

    // 页面加载时间
    static speed(s) {
        log.log('%c speed time: ', 'color:#ec6e49;', s.time);
    }

    // dom数量
    static domCount(d) {
        log.log('%c dom count: ', 'color:#ec6e49;', d);
    }

    // xhr时间
    static xhr(x) {
        log.groupObj(' xhr', x.url, x, x.method);
    }

    // first Paint Time
    static fpt(f) {
        log.log('%c first paint time: ', 'color:#ec6e49;', f);
    }

    // first Paint Time
    static fmp(f) {
        log.log('%c first meaningful paint: ', 'color:#ec6e49;', f);
    }
}
window.$$report = Report;

export default Report;
