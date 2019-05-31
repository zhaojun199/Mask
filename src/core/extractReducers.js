import { combineReducers } from 'redux'
import warning from 'warning'
import demo from '@home/controller/demo'
import demo2 from '@home/controller/demo2'
import { getClassName, getClassFunction } from './util'

const usedNamespace = []

// 从controller中提取出reducer
const reducers = {};

[demo, demo2].forEach((controller) => {
	const entry = new controller()
	const reducerName = entry.namespace
	warning(reducerName, `【${getClassName(entry)}】 - 未找到命名空间`)
	warning(!usedNamespace.includes(reducerName), `【${getClassName(entry)}】-【${reducerName}】- 命名空间重复`)
	usedNamespace.push(entry.namespace)
	const actionsName = getClassFunction(entry)
	reducers[reducerName] = (state = { '@@INIT': true }, action) => {
		const { type, ...otherAction } = action
		const actionType = type
		const extractActionType = actionType.split('/')
		if (reducerName === extractActionType[0]) {
			return {
				...state,
				...(entry[extractActionType[1]](otherAction))
			}
		}
		return state
		// return action[`${reducerName}_$NS$_${action.type}`] || state
	}
})

export default combineReducers(reducers)
