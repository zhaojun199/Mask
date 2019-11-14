import { Provider } from 'react-redux'
import { unmountComponentAtNode } from 'react-dom'
import guid from '@home/util/guid'
import render from './render'
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
	
	let Component = app.get('component')
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

	// 根组件
	function rootComponent(props) {
		if (Component.$$typeof.toString() === 'Symbol(react.lazy)') {
			return <React.Suspense fallback="">
				<RootComponent {...props} />
			</React.Suspense>;
		}
		return <RootComponent {...props} />
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

		rootComponent.mountId = div.id;

		render(app, document.getElementById(div.id), componentProps)

		return {
			// 卸载组件
			$unmount: () => {
				if (div) {
					const unmountResult = unmountComponentAtNode(div)
					if (unmountResult && div.parentNode) {
						div.parentNode.removeChild(div);
						div = undefined;
					}
				}
			},
		}
	}

	// 克隆一个组件
	rootComponent.$cloneApp = (alternateName) => {
		let _app

		if (typeof App === 'function') {
			_app = new App({ ...AppOptions, name: alternateName });
		} else {
			throw new Error('$cloneApp 不能克隆已实例化的app');
		}

		return getMountableComponent(_app)
	}

	return rootComponent;
}