import warning from 'warning'
import { getClassName, getClassFunction, assertIsPromise } from '../util'

// controller转换成reducer
export default function controllerToReducer(Controller) {
	const entry = new Controller()
	const ns = entry.namespace
	const initialValue = { '@@INIT': true, ...entry.initial }

	warning(ns, `【${getClassName(entry)}】 - 未找到命名空间`)
	
	const reducer = {}

	reducer[ns] = (state = initialValue, action) => {

		const { type, ...otherAction } = action
		const actionType = type
		const extractActionType = actionType.split('/')

		if (ns === extractActionType[0]) {

			const isFunc = typeof entry[extractActionType[1]] === 'function'
			
			if (isFunc) {
				let newState = entry[extractActionType[1]](otherAction);
				return {
					...state,
					...(entry[extractActionType[1]](otherAction))
				}
			}
		}
		return state
	}

	return reducer
}
