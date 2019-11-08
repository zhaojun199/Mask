import { Component, Fragment } from 'react'
// import connect from '@home/core/connect'
import GenRouter from '@home/router/GenRouter'
import { log } from '@home/core/log'
// import { connect } from 'react-redux'

// const mapStateToProps = (state, ownProps) => {
// 	return ({
// 		...state.demo2,
// 	})
// }

// const mapDispatchToProps = (dispatch, ownProps) => ({
// 	dispatch
// })

export default
@log
class App extends Component {
	componentDidMount() {
	}

	render() {
		return (
			<Fragment>
				{new GenRouter().render()}
			</Fragment>
		);
	}
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)
