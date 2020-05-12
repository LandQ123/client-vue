/**
 * 针对引入组件页面的配置（router/importViews.js）
 * update:需要更新的页面地址
 * delete：需要删除的引用地址
 */
const CLIENT_IMPORT = {
        update: {
            CustomerList: '@/views/landq/customerList', // 在标准版本的基础上替换或者新增Home文件
        },
        delete: [
            'PageList' // 需要删除标准版本的组件名,没有则为空
        ]
    }
    /**
     * 针对引入组件页面的配置（router/router.js）
     */
const CLIENT_ROUTERS = {
    update: {
        CustomerList: './client/landq/customerList.js' // 替换标准版本的system模块路由文件
    },
    delete: [
        'Customer' // 需要删除标准版本的路由模块名称，没有则为空
    ]
}
module.exports = {
    CLIENT_IMPORT,
    CLIENT_ROUTERS
}