import { ajax } from 'rxjs/ajax';

// 1.实现取消请求功能
// 2.多次发送同一个请求事件会取消之前的请求
import Axios from 'axios';
import qs from 'qs';
import { BehaviorSubject } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise'
import Config from '@home/config/config';

export default ajax;

// 校验缓存时间
function checkCacheTimeout(cache) {
    if (!cache) {
        return false;
    }
    const now = new Date();
    return now - cache.cacheTime < cache.cacheTimeout;
}

export class Http {
    constructor(name) {
        this.name = name
        this.axios = Axios.create();
        this.initReqInterceptors();
        this.initResInterceptors();
        this.requests = []; //    正在发送的请求
        this.cache = {}; //  缓存的请求
    }

    observable = new BehaviorSubject({
        loading: false,
    })

    // 添加请求拦截器
    initReqInterceptors() {
        const self = this;
        this.reqInterceptors = this.axios.interceptors.request.use((config) => {
            self.observable.next({
                loading: true,
            });
            return config;
        }, (error) => {
            // 对请求错误做些什么
            self.observable.next({
                loading: false,
            });
            return Promise.reject(error);
        });
    }

    // 添加响应拦截器
    initResInterceptors() {
        const self = this;
        this.resInterceptors = this.axios.interceptors.response.use((response) => {
            // 删除请求
            self.removeRequest(response.config);
            self.observable.next({
                loading: false,
            });
            // 定义返回结口数据格式等
            // ...
            const respData = response.data || {};
            switch (respData.code) {
            case 200:
            case 0:
                break;
            case -1:
            case 1:
                break;
            case 302:
                window.location.href = respData.redirectUrl;
                return;
            default:
            }
            return response;
        }, (error) => {
            // 对响应错误做点什么
            self.observable.next({
                loading: false,
            });
            if (error instanceof Error) {
                // 删除请求
                self.removeRequest(error.config);
                return Promise.reject(error);
            }
            // cancel的请求
            // donothing
        });
    }

    // 根据请求数据类型设置请求头
    genHeadersConfig(_config, dataType = 'json') {
        const config = { ..._config };
        if (config.headers) {
            return config;
        }
        if (!dataType) {
            return config;
        }
        config.headers = {};
        switch (dataType) {
        case 'json':
            config.headers['Content-Type'] = 'application/json';
            break;
        case 'formData':
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            config.data = qs.stringify(config.data);
            break;
        default:
        }
        return config;
    }

    // 生成请求唯一标识
    genKey(config) {
        return `${config.url}$$${qs.stringify(config.data)}$$${qs.stringify(config.params)}`;
    }

    // 取消重复请求
    removeRequest(config, withCancel) {
        this.requests.some((request, i) => {
            if (request.key === this.genKey(config)) {
                if (withCancel) {
                    request.cancel();
                }
                this.requests.splice(i, 1);
            }
        });
    }

    // 发送请求
    // config axios配置的超集
    // cache: 是否缓存
    // cacheTimeout： 缓存ms数
    send(_config, dataType) {
        let config = { ..._config };
        const self = this;
        self.removeRequest(config, true);
        config.cancelToken = new Axios.CancelToken(((c) => {
            self.requests.push({
                key: self.genKey(config),
                cancel: c,
            });
            self.cancel = c;
        }));
        config.timeout = config.timeout === undefined ? Config.http.timeout : config.timeout;
        config = this.genHeadersConfig(config, dataType);
        return this.cachedRequest(config);
    }

    $send(...args) {
        return fromPromise(this.send(...args))
    }


    /* 处理缓存 - begin */
    cachingGet(get) {
        const self = this;
        return function cachedGet(config) {
            const key = config.url;
            if (checkCacheTimeout(self.cache[key])) {
                return self.cache[key].value;
            }
            // eslint-disable-next-line prefer-rest-params
            const request = get(...arguments);
            self.cache[key] = {
                value: request,
                cacheTime: new Date(),
                cacheTimeout: config.cacheTimeout || Infinity
            };
            return request;
        };
    }

    // 判断是缓存请求还是实时请求
    cachedRequest(config) {
        let send;
        if (config.cache === true) {
            send = this.cachingGet(this.axios.request);
        } else {
            send = this.axios.request;
        }
        return send(config)
            .then(({ data }) => Promise.resolve(data));
    }
    /* 处理缓存 - end */

}

const httpInstance = new Http();
export const http = httpInstance;


// const m = new Http()
// m.send({ url: '/404', method: 'post', data: {a: 123, b: '%? 333'} }, 'formData').then(cout)
// setTimeout(m.cancel);
