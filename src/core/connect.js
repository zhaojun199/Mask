import { connect } from 'react-redux'
import { http, Http } from '@home/util/http'

// mapStateToProps包装器
function wrapMapStateToProps(mapStateToProps = (state) => ({ ...state })) {
	return function(state, ownProps) {
		// console.log('wrapMapStateToProps', state, ownProps)
		// 注入请求器
		const newState = {
			...state,
			http,
			Http,
		}
		return mapStateToProps(newState, ownProps)
	}
}

// dispatch包装器
function wrapDispatch(dispatch) {
	// ie不兼容Proxy
	return dispatch
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
function wrapMapDispatchToProps(mapDispatchToProps = (dispatch) => ({ dispatch })) {
	return function(dispatch, ownProps) {
		// console.log('wrapMapDispatchToProps', dispatch, ownProps)
		return mapDispatchToProps(wrapDispatch(dispatch), ownProps)
	}
}

export default function(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
	return connect(
		wrapMapStateToProps(mapStateToProps),
		wrapMapDispatchToProps(mapDispatchToProps),
		mergeProps,
		options,
	)
}