// function returnPromise(extraArgument) {
	function returnPromise(store) {
		return function(next) {
			return function(action) {
				// console.log(action, next(action))
				return next(action)
				// return action(dispatch, getState, extraArgument)
			}
		}
	}
// }

export default returnPromise