export default class AAA extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return <div>
			<span>room</span>
			{this.props.testStr}
		</div>
	}
}