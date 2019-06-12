import { lazy } from 'react'

const RouterConfig = [{
	path: '/home',
	exact: true,
	component: lazy(() => import('@home/page/home')),
}, {
	path: '/404',
	exact: true,
	component: lazy(() => import('@home/page/404')),
}, {
	path: '/list',
	exact: true,
	component: lazy(() => import('@home/page/list')),
}]

export default RouterConfig