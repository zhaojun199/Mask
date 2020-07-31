import { lazy } from 'react';

const RouterConfig = [{
    path: '/home',
    component: lazy(() => import('@home/page/home')),
//     children: [{
//         path: '/home/list',
//         exact: true,
//         component: lazy(() => import('@home/page/list')),
//     }]
}, {
    path: '/404',
    exact: true,
    component: lazy(() => import('@home/page/404')),
}, {
    path: '/room',
    exact: true,
    component: lazy(() => import('@home/page/room')),
}, {
    path: '/virtualList',
    exact: true,
    component: lazy(() => import('@home/page/listDemo')),
}, {
    path: '/contextDemo',
    exact: true,
    component: lazy(() => import('@home/page/contextDemo')),
}, {
    path: '/hookDemo',
    exact: true,
    component: lazy(() => import('@home/page/hookDemo')),
}, {
    path: '/debounceFormDemo',
    exact: true,
    component: lazy(() => import('@home/page/debounceFormDemo')),
}];

export default RouterConfig;
