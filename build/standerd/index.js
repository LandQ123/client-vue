/**
 * 针对引入组件页面的配置（router/importViews.js）
 */
const STANDERD_IMPORT = {
        Layout: '@/layout/index',
        Home: '@/views/home',
        Login: '@/views/login'
    }
    /**
     * 针对引入组件页面的配置（router/router.js）
     */
const STANDERD_ROUTERS = {
    BaseRouter: './standerd/baseRouter.js',
}
module.exports = {
    STANDERD_IMPORT,
    STANDERD_ROUTERS
}