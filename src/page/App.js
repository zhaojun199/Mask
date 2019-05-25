import { connect } from 'react-redux'
import { setVisibilityFilter } from '@home/controller'

const mapStateToProps = (state, ownProps) => ({
  // active: ownProps.filter === state.visibilityFilter
  active: 122
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  // onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
  onClick: () => {}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
	console.log(props)
	return 123
})