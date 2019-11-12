import { Provider } from 'react-redux'
import render from './render'
import guid from '@home/util/guid'

// 从app获取数据，并把数据挂载到component上
export default function getMountableComponent(App, AppOptions) {

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
			<Provider store={store}>
			    <Component {...compontProps} />
			</Provider>
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
	rootComponent.$cloneApp = (name) => {
		let app

		if (typeof App === 'function') {
			app = new App({ ...AppOptions, name });
		} else {
			throw new Error('$cloneApp 不能克隆已实例化的app');
		}

		return getMountableComponent(app)
	}

	return rootComponent;
}