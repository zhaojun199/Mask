const logger = store => next => action => {
	console.group(action.type)
	console.info('dispatching', action)
	let result = next(action)
	console.log('next state', store.getState())
	console.groupEnd()
	return result
}

// function logger(store) {
// 	console.log(store)
// 	return function(next) {
// 		console.log(next)
// 		return function(action) {
// 			console.log(action)
// 			next(action)
// 		}
// 	}
// }

export default logger