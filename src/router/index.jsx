import { lazy } from 'react'
const routes = [
    {
        path: '/',
        name: '首页',
        isActive: true,
        isAuth: false,
        element: lazy(() => import('../views/HomeView'))
    },
    {
        path: '/playlist',
        name: '歌单',
        isActive: true,
        isAuth: false,
        element: lazy(() => import('../views/PlaylistView'))
    },
    {
        path: '/playlist/:id',
        name: '歌单详情',
        isActive: false,
        isAuth: false,
        element: lazy(() => import('../views/PlayDetailView'))
    },
    {
        path: '/singerlist/:id',
        name: '歌手详情',
        isActive: false,
        isAuth: false,
        element: lazy(() => import('../views/SingerlistView'))
    },
    {
        path: '/singerlist',
        name: '歌手',
        isActive: true,
        isAuth: false,
        element: lazy(() => import('../views/SingerView'))
    },
    {
        path: '/mv/:id',
        name: 'mv详情',
        isActive: false,
        isAuth: false,
        element: lazy(() => import('../views/MvView'))
    },
    {
        path: '/about',
        name: '关于我们',
        isActive: true,
        isAuth: false,
        element: lazy(() => import('../views/AboutUsView'))
    },
    {
        path: '/user',
        name: '个人中心',
        isActive: false,
        isAuth: true,
        element: lazy(() => import('../views/UserView'))
    },
];

export default routes;
