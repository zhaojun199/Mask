import { Component } from 'react'
import connect from '@home/core/connect'
import factory from '@home/core/factory'
import { log } from '@home/util/log'
import ctrl from './index.ctrl'
import epic from './index.epic'

factory({ ctrl, epic, namespace: 'list' })

const mapStateToProps = (state, ownProps) => {
	return ({
		list: state.list,
		http: state.http,
		Http: state.Http,
	})
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	dispatch
})

@log
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
		console.log('List props', this.props)
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