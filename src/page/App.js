import { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
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

class App extends Component {
	render() {
		return (<div>
			<Router>
				<div>
					<Route exact path="/" component={Home} />
					<Route path="/about" component={About} />
				</div>
			</Router>
		</div>);
	}
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
// (props) => {
	// console.log('app', props)
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
	// setTimeout(() => {
	// 	const m = props.dispatch({
	// 		type: 'FETCH_USER',
	// 		id: (props.demo.id || 0) + 1,
	// 	})
	// 	console.log(40, m)
	// }, 5000)
	// return props.demo.id || 0
// })