import container from './container'

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

		    // errors
	        if (!this.options.name) {
	            throw new Error('Must provide `name` in options');
	        }

	        container.registry(options);

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

	return App
}