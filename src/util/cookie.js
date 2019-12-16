const Vars = {
    keyPre: '', // cookie 前缀
    domain: '' // cookie 域
};

function config(key, value) {
    if (key === 'keyPre') {
        Vars.keyPre = value;
    }

    if (key === 'domain') {
        Vars.domain = value;
    }
}

function hasKey(name) {
    const cookieName = Vars.keyPre ? Vars.keyPre + name : name;
    const result = document.cookie.match(new RegExp(`(^| )${cookieName}=`));

    if (result !== null) {
        return true;
    }

    return false;
}

function get(name) {
    const cookieName = Vars.keyPre ? Vars.keyPre + name : name;
    const result = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]*)(;|$)`));

    if (result !== null) {
        return decodeURIComponent(result[2]);
    }

    return null;
}

/**
 * name: cookie 名称
 * value: cookie 值
 * seconds: cookie 有效期（秒）
 */
function set(name, value, sec) {
    const COOKIE = {};
    const seconds = sec || 0;
    const date = new Date();

    if (typeof seconds === 'number') {
        date.setTime(date.getTime() + (seconds * 1000));
        COOKIE.expires = `; expires=${date.toUTCString()}`;
    }

    if (Vars.domain) {
        COOKIE.domain = `; domain=${Vars.domain}`;
    }

    COOKIE.path = '; path=/';

    COOKIE.name = Vars.keyPre ? Vars.keyPre + name : name;
    COOKIE.value = escape(value);

    document.cookie = `${COOKIE.name}=${COOKIE.value}${COOKIE.expires}${COOKIE.domain}${COOKIE.path}`;
}

function remove(name) {
    if (hasKey(name)) {
        set(name, '', -10);
    }
}

export default {
    hasKey,
    get,
    set,
    config,
    remove(name) {
        if (typeof name === 'string') {
            remove(name);
        } else {
            for (let i = 0, len = name.length; i < len; i++) {
                remove(name[i]);
            }
        }
    }
};
