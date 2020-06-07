const fs = require('fs');
const path = require('path');
const endOfLine = require('os').EOL;
const render = require('json-templater/string'); // 模板渲染
const chalk = require('chalk'); // 控制台打印带颜色信息

// 获取标准版配置
const { STANDERD_IMPORT, STANDERD_ROUTERS } = require('./standerd')

// 获取客制化配置
const CLIENT = process.env.CLIENT || ''
console.log(CLIENT)
if (CLIENT) {
    var { CLIENT_IMPORT, CLIENT_ROUTERS } = require(`./client/${CLIENT}`)
} else {
    var { CLIENT_IMPORT, CLIENT_ROUTERS } = {
        CLIENT_IMPORT: {},
        CLIENT_ROUTERS: {}
    }
}

// 获取版本信息
let versionConfig
if (CLIENT) {
    versionConfig = require(`./client/${CLIENT}/info`)
} else {
    versionConfig = require(`./standerd/info`)
}
console.log(chalk.yellow(`当前执行版本信息：${versionConfig.clientFullName}-${versionConfig.version}`))
console.log(chalk.yellow(`编译时间：${versionConfig.packageTime}`))

// 生成router/importViews.js
const IMPORT_VIEWS_PATH = path.join(__dirname, '../src/router/importViews.js')
const IMPORT_VIEWS_IMPORT_TEMPLATE = 'const {{name}} = resolve => require([\'{{path}}\'], resolve)'
const IMPORT_VIEWS_MAIN_TEMPLATE =
    `/* 由build/buildViews.js自动生成 */

// 引入所有页面组件
{{include}}

// 导出所有页面
export {
    {{list}}
}`

// 以客制化为标准，更新标准文件,替换或新增
let useViews = {}
if (CLIENT) {
    // 新增客制化组件,组合为新的文件信息
    useViews = Object.assign(STANDERD_IMPORT, CLIENT_IMPORT.update)
        // 删除不需要的标准组件
    CLIENT_IMPORT.delete.forEach(name => {
        if (useViews[name]) delete useViews[name]
    })
} else {
    useViews = STANDERD_IMPORT
}

let importAllViewsArr = []
let importAllViewsNameArr = []
    // 生成const [Login = resolve => require(['./src/login'], resolve),Home = resolve => require(['./src/home'], resolve)]
Object.keys(useViews).forEach(name => {
        importAllViewsArr.push(render(IMPORT_VIEWS_IMPORT_TEMPLATE, {
            name: name,
            path: useViews[name]
        }))
        importAllViewsNameArr.push(`${name}`)
    })
    // 生成主模板
console.log(useViews)
let importMainTemplate = render(IMPORT_VIEWS_MAIN_TEMPLATE, {
    include: importAllViewsArr.join(endOfLine),
    list: importAllViewsNameArr.join(`,${endOfLine}`)

})
fs.writeFileSync(IMPORT_VIEWS_PATH, importMainTemplate)

// 生成router/router.js
const CLIENT_ROUTER_PATH = path.join(__dirname, '../src/router/router.js')
const CLIENT_ROUTER_IMPORT_TEMPLATE = 'import {{name}} from \'{{path}}\';'
    // 默认路由模板
const CLIENT_ROUTER_MAIN_TEMPLATE =
    `/* 由build/buildViews.js自动生成 */

    import { Layout } from './importViews.js';
{{include}}

export default {
    path: '/',
    meta: {
        name: '首页'
    },
    redirect: '/login',
    component: Layout,
    children: [
        {{list}}
    ]
}`

// 以客制化为标准，更新标准文件
let useRouters = {}
if (CLIENT) {
    // 新增客制化组件,组合为新的文件信息
    useRouters = Object.assign(STANDERD_ROUTERS, CLIENT_ROUTERS.update)
        // 删除不需要的标准组件
    CLIENT_ROUTERS.delete.forEach(name => {
        if (useRouters[name]) delete useRouters[name]
    })
} else {
    useRouters = STANDERD_ROUTERS
}

let importAllRoutersArr = []
let importAllRoutersNameArr = []
    // 生成const [import System from './standerd/system';]
Object.keys(useRouters).forEach(name => {
        importAllRoutersArr.push(render(CLIENT_ROUTER_IMPORT_TEMPLATE, {
            name: name,
            path: useRouters[name]
        }))
        importAllRoutersNameArr.push(`...${name}`)
    })
    // 生成主模板
let importMainRouterTemplate = render(CLIENT_ROUTER_MAIN_TEMPLATE, {
    include: importAllRoutersArr.join(endOfLine),
    list: importAllRoutersNameArr.join(`,${endOfLine}`)

})
fs.writeFileSync(CLIENT_ROUTER_PATH, importMainRouterTemplate)

// 生成模板信息
const VERSION_CONFIG_OUTPUT_PATH = path.join(__dirname, '../static/version.js')
fs.writeFileSync(VERSION_CONFIG_OUTPUT_PATH, JSON.stringify(versionConfig))