import connect from '@home/core/connect'
// import { connect } from 'react-redux'
import { setVisibilityFilter } from '@home/controller/action'

const mapStateToProps = (state, ownProps) => {
	console.log(state, ownProps)
	return ({
	  	// active: ownProps.filter === state.visibilityFilter
	  	...state
	})
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
	console.log('app', props)
	// setTimeout(() => {
	// 	const a = props.dispatch({
	// 		type: 'demo/showText',
	// 		id: (props.demo.id || 0) + 1,
	// 	})
	// 	console.log(a)
	// }, 10000)
	// setTimeout(() => {
	// 	props.dispatch({
	// 		type: 'demo/asyncText',
	// 		id: (props.demo.id || 0) + 1,
	// 	})
	// }, 10000)
	setTimeout(() => {
		const m = props.dispatch({
			type: 'FETCH_USER',
			id: (props.demo.id || 0) + 1,
		})
		console.log(m)
	}, 10000)
	return props.demo.id || 0
})