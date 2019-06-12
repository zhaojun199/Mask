import { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import AuthRoute from '@home/router/AuthRoute'
import notFound from '@home/page/404'
import RouterConfig from '@home/router/RouterConfig'

class GenRouter extends Component {
	state = {
		
	};

	componentDidMount() {
		
	}

	get genRouter() {
		return RouterConfig
			.map(router => {
				return (
					<AuthRoute
						key={router.path}
						path={router.path}
						exact={router.exact}
						component={router.component}
					/>
				)
			})
	}

	render() {
		return (
			<Router
				basename="/"
				forceRefresh={false}
				keyLength={6}
			>
			{/*
				Switch 仅渲染第一次匹配的路由
			*/}
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						{this.genRouter}
						<Route
							key="default"
							exact
							path="/"
							render={() => {
								return (
									<Redirect to="home" />
								);
							}}
						/>
						{/* 兜底路由 */}
						<Route
							key="notFound"
							exact
							component={notFound}
						/>
					</Switch>
				</Suspense>
			</Router>
		);
	}
}

export default GenRouter