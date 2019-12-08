import { ajax } from 'rxjs/ajax';

// 1.实现取消请求功能
// 2.多次发送同一个请求事件会取消之前的请求
import Axios from 'axios';
import qs from 'qs';
import { BehaviorSubject } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise'
import Config from '@home/config/config';

export default ajax;

export class Http {
    constructor(name) {
        this.name = name
        this.axios = Axios.create();
        this.initReqInterceptors();
        this.initResInterceptors();
        this.requests = []; //    正在发送的请求
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
        return this.axios
            .request(config)
            .then(({ data }) => Promise.resolve(data));
    }

    $send(...args) {
        return fromPromise(this.send(...args))
    }
}

const httpInstance = new Http();
export const http = httpInstance;


// const m = new Http()
// m.send({ url: '/404', method: 'post', data: {a: 123, b: '%? 333'} }, 'formData').then(cout)
// setTimeout(m.cancel);
