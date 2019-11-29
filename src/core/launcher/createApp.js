import warning from 'warning';
import guid from '@home/util/guid';
import container from './container';

// { name, store, component }
export default function createApp(options = {}) {
    class App {
        constructor(opts = {}) {
            this.options = {
                name: null,
                parentApp: null,
                providers: [],

                providerNames: {
                    component: 'component',
                    container: 'container',
                    store: 'store',
                    app: 'app',
                    parentApp: 'parentApp',
                    rootApp: 'rootApp',
                },

                // 生命周期回调
                initialize: () => { },
                beforeDestroy: () => { },

                // 条件
                ...options,
                ...opts,
            };

            if (!this.options.name) {
                // throw new Error('Must provide `name` in options');
                warning(false, 'Must provide `name` in options');
                // eslint-disable-next-line no-param-reassign
                this.options.name = options.name = guid('$store_');
            }

            container.registry(this.options);

            this.container = container.getApp(this.options.name);
        }

        get(providerName) {
            const value = this.container[providerName];


            if (typeof value !== 'undefined') {
                return value;
            }

            return null;
        }
    }

    return App;
}
