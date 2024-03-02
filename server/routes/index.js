import * as routerList from './api/index.js'

export default function installRouter(app) {
    for (const routerListKey in routerList) {
        app.use(routerList[routerListKey].routes()).use(routerList[routerListKey].allowedMethods())
    }
}
