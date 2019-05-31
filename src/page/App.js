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
	// 	props.dispatch({
	// 		type: 'demo/showText',
	// 		id: 999,
	// 	})
	// }, 1000)
	return 123
})