import { combineReducers } from 'redux'
import warning from 'warning'
import controllerToReducer from './mapFunction/controllerToReducer'

// 组合controllers
export default function combineControllers(...controllers) {

	let reducers = {}

	controllers.forEach(controller => {
		reducers = Object.assign(reducers, controllerToReducer(controller));
	})

	warning(
		Object.keys(reducers).length === controllers.length,
		`同一应用命名空间必须唯一`
		)
	
	return combineReducers(reducers)
}