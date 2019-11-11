import { Component } from 'react'
import connect from '@home/core/connect'
import { log } from '@home/core/log'

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
  mapStateToProps,
  mapDispatchToProps
)
@log
class AAA extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		
	}

	pingEpic = () => {
		this.props.dispatch({
			type: 'list/fetchList',
			payload: {
				id: (this.props.demo?.login || 0) + 1,
			},
		});
	}

	render() {
		return <div>
			<span>room</span>
			<div>{this.props.testStr}</div>
			<button onClick={this.pingEpic}>click</button>
			<div>{this.props.demo?.login}</div>
		</div>
	}
}