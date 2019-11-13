import { Provider, createProvider } from 'react-redux'
import render from './render'
import guid from '@home/util/guid'
import { stores } from './createStore';

// 从app获取数据，并把数据挂载到component上
export default function getMountableComponent(
	App,
	AppOptions,
) {
	let app

	if (typeof App === 'function') {
		app = new App(AppOptions)
	} else {
		app = App
	}
	
	const Component = app.get('component')
	const store = app.get('store')

	const RootComponent = (compontProps) => {

		if (store) {
			return (
				<Provider store={store}>
				    <Component {...compontProps} />
				</Provider>
			)
		}
		return (
			<Component {...compontProps} />
		)
	}

	function rootComponent(props) {
		return <RootComponent {...props} />;
	}

	// 挂载组件
	rootComponent.$mount = (componentProps, { id, className, style } = {}) => {

		let div = id && document.getElementById(id);

		if (!div) {
		    div = document.createElement('div');

		    if (id) {
		    	div.id = id;
		    } else {
				div.id = guid('$mount_');
		    }
		    
		    className && (div.className = className);
		    style && (div.style = style);

		    document.body.appendChild(div);
		}
		render(app, document.getElementById(div.id), componentProps)
	}

	// 克隆一个组件
	rootComponent.$cloneApp = (alternateName) => {
		let app

		if (typeof App === 'function') {
			app = new App({ ...AppOptions, name: alternateName });
		} else {
			throw new Error('$cloneApp 不能克隆已实例化的app');
		}

		return getMountableComponent(app)
	}

	return rootComponent;
}