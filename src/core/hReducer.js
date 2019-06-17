import { combineReducers } from 'redux'
import warning from 'warning'

import demo from '@home/controller/demo.ctrl'
import { getClassName, getClassFunction, assertIsPromise } from './util'

// 单例模式
let instance
class Hreducer {
	constructor(preloadedState) {
		if (instance) {
			return instance
		}
		instance = this
		return instance
	}

	reducers = {
		init: () => ({}),
	}

	usedNamespace = []

	extraRecucer(controller) {
		const entry = new controller()
		const reducerName = entry.namespace
		warning(reducerName, `【${getClassName(entry)}】 - 未找到命名空间`)
		warning(!this.usedNamespace.includes(reducerName), `【${getClassName(entry)}】-【${reducerName}】- 命名空间重复`)
		this.usedNamespace.push(entry.namespace)
		const actionsName = getClassFunction(entry)
		this.reducers[reducerName] = (state = { '@@INIT': true }, action) => {
			const { type, ...otherAction } = action
			const actionType = type
			const extractActionType = actionType.split('/')
			if (reducerName === extractActionType[0]) {
				warning(
						typeof entry[extractActionType[1]] === 'function',
						`【${getClassName(entry)}】【${extractActionType[1]}】 - 未找到action`
					)
				let newState = entry[extractActionType[1]](otherAction);
				return {
					...state,
					...(entry[extractActionType[1]](otherAction))
				}
			}
			return state
			// return action[`${reducerName}_$NS$_${action.type}`] || state
		}
	}

	getReducers() {
		return combineReducers(this.reducers)
	}
}

export default new Hreducer()
