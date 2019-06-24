import { Component } from 'react'
import connect from '@home/core/connect'
import factory from '@home/core/factory'
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

factory({ ctrl, epic, namespace: 'list' })

class List extends Component {
	componentDidMount() {
		console.log('Listdidmount')
		// this.showList();
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
			type: 'list/get',
			id: (this.props.demo?.id || 0) + 1,
		})
	}

	render() {
		console.log('List', this.props)
		return (
			<div>
				<h2 onClick={this.fetchUser}>List</h2>
				<div>{this.props.list?.id}</div>
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