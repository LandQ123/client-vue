import { Home, Login } from '../importViews'
export default {
    path: '/home',
    meta: {
        name: 'home'
    },
    component: Home,
    children: [{
        path: '/login',
        meta: {
            name: 'login'
        },
        component: Login,
    }]
}