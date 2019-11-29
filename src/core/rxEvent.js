import warning from 'warning';
import { Subject } from 'rxjs';
// import { delay } from 'rxjs/operators';

const events = {};

class Event {
    // 添加监听事件
    addEventListener(id, cb) {
        warning(typeof cb === 'function', `回调事件${cb}不是一个function`);
        if (events[id]) {
            events[id].subscribe({
                next: cb,
            });
        } else {
            events[id] = new Subject();
            events[id].subscribe({
                next: cb,
            });
        }
        return this;
    }

    // 移除监听事件
    removeEventListener(id, cb) {
        warning(events[id], `${id}事件未注册`);
        events[id].some((event, i) => {
            if (event === cb) {
                events[id].splice(i, 1);
                return true;
            }
            return false;
        });
        return this;
    }

    // 发射监听事件，已注册的事件会依次执行
    emitEvent(id, ...params) {
        warning(events[id], `${id}事件未注册`);
        events[id].next(...params);
        return this;
    }

    // 获取事件
    getEvent(id) {
        warning(events[id], `${id}事件未注册`);
        return this.isRegister(id) && events[id];
    }

    // 判断是否注册
    isRegister(id) {
        return !!events[id];
    }
}

export default Event;

// // 普通订阅
// const ee = new Event()
// ee.addEventListener('xxx', (m) => console.log(m+1))
// // rx订阅，延迟5s订阅
// ee.getEvent('xxx').pipe(delay(5000)).subscribe({
//     next: (m) => console.log(m+2),
// })
// // rx发布
// ee.getEvent('xxx').next(88)
