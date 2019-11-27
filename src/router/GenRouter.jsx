import { Component, Suspense } from 'react'
// TO CONFIG
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom"
// import { HashRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom"
import AuthRoute from '@home/router/AuthRoute'
import RouterConfig from '@home/router/RouterConfig'
import ErrorBoundary from '@home/router/ErrorBoundary'
import notFound from '@home/page/404'
import { log } from '@home/core/log'
import Loading from '@home/components/Loading'

@log
class GenRouter {
	loopRouter(routerList = []) {
		return routerList
			.map(router => {
				const component = (routeProps) => {
					const Component = router.component;
					return (
						<Suspense
							fallback={<Loading><br /><br /><br /></Loading>}
							// TO CONFIG
							maxDuration={500}
						>
							<Component {...routeProps} />
							{this.loopRouter(router.children)}
						</Suspense>
					)
				}
				return (
					<AuthRoute
						key={router.path}
						path={router.path}
						exact={router.exact}
						component={component}
					/>
				)
			})
	}
	get genRouter() {
		return this.loopRouter(RouterConfig)
	}

	render() {
		return (
			<Router
				basename="/"
				forceRefresh={false}
				keyLength={6}
			>
			<ErrorBoundary>
				{/*<Link to="/list">list</Link>
				<hr />
				<Link to="/home">home</Link>
				<hr />
				<Link to="/home/list">homelist</Link>*/}
				{/*
					Switch 仅渲染第一次匹配的路由
				*/}
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
				</ErrorBoundary>
			</Router>
		);
	}
}

export default GenRouter