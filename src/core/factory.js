// 工厂函数，用来包装动态路由的epic和reducer
import Store from './Store'
import hReducer from './hReducer'
import hEpic from './hEpic'

const store = new Store()

export default function factory({ namespace, ctrl, epic }) {
	if (ctrl) {
		hReducer.extraRecucer(ctrl)
		Store.injectReducer({ reducers: hReducer.getReducers() })
	}
	if (epic) {
		hEpic.extraEpic(epic)
		// Store.injectEpic({ epics: hEpic.getEpic(epic) })
		Store.epicMiddleware.run(hEpic.getEpics(namespace))
	}
}