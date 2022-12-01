import {RouteRecordRaw} from 'vue-router'
import {ERouteName, ERoutePath, ERouteTitle} from "@/serviceType"
import util from "@/utils/util";

const routes:Array<RouteRecordRaw> = [
    {
        //首页
        path: ERoutePath.HOME,
        name: ERouteName.HOME,
        meta: {
            title: ERouteTitle.HOME,
        },
        component: util.handleComponentPath(ERoutePath.HOME),
    },
    {
        // /组件/数据展示/表格
        path: ERoutePath.TABLE,
        name: ERouteName.TABLE,
        meta: {
            title: ERouteTitle.TABLE,
        },
        component: util.handleComponentPath(ERoutePath.TABLE),
    },
    {
        // /组件/基础组件/图标
        path: ERoutePath.ICON,
        name: ERouteName.ICON,
        meta: {
            title: ERouteTitle.ICON,
        },
        component: util.handleComponentPath(ERoutePath.ICON),
    },
    {
        // /文档/组件
        path: ERoutePath.COMPONENTS,
        name: ERouteName.COMPONENTS,
        meta: {
            title: ERouteTitle.COMPONENTS,
        },
        component: util.handleComponentPath(ERoutePath.HOME),
    },
    {
        // /文档/方法
        path: ERoutePath.FUNCTIONS,
        name: ERouteName.FUNCTIONS,
        meta: {
            title: ERouteTitle.FUNCTIONS,
        },
        component: util.handleComponentPath(ERoutePath.HOME),
    },

]

export default routes
