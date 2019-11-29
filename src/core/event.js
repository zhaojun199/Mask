import warning from 'warning';

const events = {};

class Event {
    // 添加监听事件
    addEventListener(id, cb) {
        warning(typeof cb === 'function', `回调事件${cb}不是一个function`);
        if (events[id]) {
            events[id].push(cb);
        } else {
            events[id] = [cb];
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
        events[id].forEach((event) => {
            event.apply(this, params);
        });
        return this;
    }

    // 获取事件
    getEvent(id) {
        warning(events[id], `${id}事件未注册`);
        return this.isRegister(id) ? events[id].map((e) => e) : [];
    }

    // 判断是否注册
    isRegister(id) {
        return !!events[id];
    }
}

export default Event;
