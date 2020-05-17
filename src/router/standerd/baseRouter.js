import { Home, Login } from '../importViews'
export default [{
        path: '/login',
        meta: {
            name: 'login'
        },
        component: Login,
    },
    {
        path: '/home',
        meta: {
            name: 'home'
        },
        component: Home,
    }
]