import { combineReducers } from 'redux'
import warning from 'warning'
import demo from '@home/controller/demo'
import { getClassName, getClassFunction } from './util'

const usedNamespace = []

// 从controller中提取出reducer
const reducers = {};

[demo].forEach((controller) => {
	const entry = new controller()
	const reducerName = entry.namespace
	warning(reducerName, `【${getClassName(entry)}】 - 未找到命名空间`)
	warning(!usedNamespace.includes(reducerName), `【${getClassName(entry)}】-【${reducerName}】- 命名空间重复`)
	usedNamespace.push(entry.namespace)
	const actionsName = getClassFunction(entry)
	reducers[reducerName] = (state = 'INIT', action) => {
		return state
		// return action[`${reducerName}_$NS$_${action.type}`] || state
	}
})

export default combineReducers(reducers)
