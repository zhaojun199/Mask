import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'
import Launcher from '@home/core/launcher'
import demoService from '../services/demo'

const mapStateToProps = (state, ownProps) => {
	return ({
		demo: state.demo,
		http: state.http,
		Http: state.Http,
	})
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	dispatch
})

export default
@connect(
  // mapStateToProps,
  // mapDispatchToProps
)
@log
class AAA extends Component {

	@Launcher.Service(demoService)
	demoService

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// service用于处理异步事件完成后的动作
		this.demoService
			.getInfo()
			.subscribe((res) => {
				console.log('service finished', res)
			})
	}

	pingEpic = () => {
		this.props.dispatch({
			type: 'list/fetchList',
			payload: {
				id: (this.props.list?.login || 0) + 1,
			},
		});
	}

	render() {
		return <div>
			<span>room</span>
			<div>testStr: {this.props.testStr}</div>
			<button onClick={this.pingEpic}>click</button>
			<div>id: {this.props.list?.login}</div>
		</div>
	}
}