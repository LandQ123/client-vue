/* 由build/buildViews.js自动生成 */

    import { Layout } from './importViews.js';
import BaseRouter from './standerd/baseRouter.js';
import CustomerList from './client/landq/customerList.js';

export default {
    path: '/',
    meta: {
        name: '首页'
    },
    redirect: '/login',
    component: Layout,
    children: [
        ...BaseRouter,
...CustomerList
    ]
}