import { PureComponent } from 'react'
import { Route } from "react-router-dom"

export default class AuthRoute extends PureComponent {
	render() {
		// 这里做权限验证的逻辑
		console.log('router', this.props)
		return <Route {...this.props} />
	}
}