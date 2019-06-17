import { Component } from 'react'
import connect from '@home/core/connect'
import hReducer from '@home/core/hReducer'
import Store from '@home/core/Store'
import ctrl from './index.ctrl'
import epic from './index.epic'

const mapStateToProps = (state, ownProps) => {
	return ({
		...state
	})
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	dispatch
})

const store = new Store()
hReducer.extraRecucer(ctrl)
Store.injectReducer({ reducers: hReducer.getReducers(ctrl) })
log(Store.epicMiddleware === Store.epicMiddleware)
Store.epicMiddleware.run(epic)

class List extends Component {
	componentDidMount() {
		console.log('Listdidmount')
		this.showList();
		this.fetchList();
	}

	showList = () => {
		this.props.dispatch({
			type: 'list/showList',
			id: (this.props.demo?.id || 0) + 1,
		})
	}

	fetchList = () => {
		this.props.dispatch({
			type: 'FETCH_LIST',
			id: (this.props.demo?.id || 0) + 1,
		})
	}

	render() {
		console.log('List', this.props)
		return (
			<div>
				<h2 onClick={this.fetchUser}>List</h2>
			</div>
		);
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
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