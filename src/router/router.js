/* 由build/buildViews.js自动生成 */

    import { Layout } from './importViews.js';
import BaseRouter from './standerd/baseRouter.js';

export default {
    path: '/',
    meta: {
        name: '首页'
    },
    redirect: '/home',
    component: Layout,
    children: [
          BaseRouter
    ]
}