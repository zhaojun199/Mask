import { connect } from 'react-redux'

// mapStateToProps包装器
function wrapMapStateToProps(mapStateToProps) {
	return function(state, ownProps) {
		// console.log('wrapMapStateToProps', state, ownProps)
		return mapStateToProps(state, ownProps)
	}
}

// dispatch包装器
function wrapDispatch(dispatch) {
	// console.log('wrapDispatch', dispatch)
	const handlerDispatch = {
		apply (target, ctx, args) {
			// console.log('handlerDispatch', target, ctx, args)
			const action = args[0]
			// const actionType = action.type
			// const extractActionType = actionType.split('/')[1]
			args[0] = {
				...action,
				// type: extractActionType,
			}
	    	return Reflect.apply(target, ctx, args)
	  	}
	}
	const proxyDispatch = new Proxy(dispatch, handlerDispatch)
	return proxyDispatch;
}

// mapDispatchToProps包装器
function wrapMapDispatchToProps(mapDispatchToProps) {
	return function(dispatch, ownProps) {
		// console.log('wrapMapDispatchToProps', dispatch, ownProps)
		return mapDispatchToProps(wrapDispatch(dispatch), ownProps)
	}
}

export default function(mapStateToProps, mapDispatchToProps) {
	return connect(
		wrapMapStateToProps(mapStateToProps),
		wrapMapDispatchToProps(mapDispatchToProps)
	)
}