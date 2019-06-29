import { Component } from 'react'
import connect from '@home/core/connect'
import GenRouter from '@home/router/GenRouter'
// import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
	return ({
		...state.demo2,
	})
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	dispatch
})

class App extends Component {
	componentDidMount() {
		console.log('app componentDidMount')
	}

	render() {
		console.log('app render')
		return (
			<div>
				{new GenRouter().render()}
			</div>
		);
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
