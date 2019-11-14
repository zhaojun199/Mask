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
class BBB extends Component {

	@Launcher.Service(demoService)
	demoService

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		
	}

	onClick = () => {
		this.props.dispatch({
			type: 'list/getList',
			payload: {
				id: (this.props.list?.id) + 1
			}
		})
		this.onClickAfter();
	}

	onClickAfter() {
		this.props.dispatch({
			type: 'list/getList2',
			payload: {
				uid: (this.props.list?.uid) - 1
			}
		})
	}

	render() {
		return <div>
			<p>-----------</p>
			<span>multipleDispatch</span>
			<div>testStr: {this.props.testStr}</div>
			<button onClick={this.onClick}>click</button>
			<div>id: {this.props.list?.id}</div>
			<div>uid: {this.props.list?.uid}</div>
		</div>
	}
}