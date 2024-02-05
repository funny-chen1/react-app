import { lazy } from 'react'
const routes = [
    {
        path: '/',
        name: '首页',
        isActive: true,
        element: lazy(() => import('../views/HomeView'))
    },
    {
        path: '/playlist',
        name: '歌单',
        isActive: true,
        element: lazy(() => import('../views/PlaylistView'))
    },
    {
        path: '/playlist/:id',
        name: '歌单详情',
        isActive: false,
        element: lazy(() => import('../views/PlayDetailView'))
    },
    {
        path: '/singerlist/:id',
        name: '歌手详情',
        isActive: false,
        element: lazy(() => import('../views/SingerlistView'))
    },
    {
        path: '/singerlist',
        name: '歌手',
        isActive: true,
        element: lazy(() => import('../views/SingerView'))
    },
    {
        path: '/about',
        name: '关于我们',
        isActive: true,
        element: lazy(() => import('../views/AboutUsView'))
    },
];

export default routes;
