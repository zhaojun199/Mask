import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'
import Launcher from '@home/core/launcher'
import demoService from '../services/demo'
import multipleDispatch from '@home/page/multipleDispatch'

export default
@connect()
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

	mount = () => {
		this.multipleDispatch = multipleDispatch.$mount();
	}

	unmount = () => {
		this.multipleDispatch.$unmount();
	}

	render() {
		return <div>
			<span>room</span>
			<div>testStr: {this.props.testStr}</div>
			<button onClick={this.pingEpic}>click</button>
			<span> </span>
			<button onClick={this.mount}>mount</button>
			<span> </span>
			<button onClick={this.unmount}>unmount</button>
			<div>id: {this.props.list?.login}</div>
		</div>
	}
}