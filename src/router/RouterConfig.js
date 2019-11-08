import { lazy } from 'react'

const RouterConfig = [{
// 	path: '/home',
// 	component: lazy(() => import('@home/page/home')),
// 	children: [{
// 		path: '/home/list',
// 		exact: true,
// 		component: lazy(() => import('@home/page/list')),
// 	}]
// }, {
// 	path: '/404',
// 	exact: true,
// 	component: lazy(() => import('@home/page/404')),
// }, {
// 	path: '/list',
// 	exact: true,
// 	component: lazy(() => import('@home/page/list')),
// }, {
	path: '/room',
	exact: true,
	component: lazy(() => import('@home/page/room')),
}]

export default RouterConfig