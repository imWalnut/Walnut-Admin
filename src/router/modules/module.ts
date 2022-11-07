import {RouteRecordRaw} from 'vue-router'
import {ERouteName, ERoutePath, ERouteTitle} from "@/serviceType"
import util from "@/utils/util";

const routes: RouteRecordRaw[] = [
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
        // /组件/图标/Element Plus
        path: ERoutePath.ELEMENTPLUS,
        name: ERouteName.ELEMENTPLUS,
        meta: {
            title: ERouteTitle.ELEMENTPLUS,
        },
        component: util.handleComponentPath(ERoutePath.HOME),
    },
    {
        // /组件/图标/阿里矢量图
        path: ERoutePath.ALIICON,
        name: ERouteName.ALIICON,
        meta: {
            title: ERouteTitle.ALIICON,
        },
        component: util.handleComponentPath(ERoutePath.HOME),
    },
    {
        // /文档/组件
        path: ERoutePath.COMPONENTS,
        name: ERouteName.COMPONENTS,
        meta: {
            title: ERouteTitle.COMPONENTS,
        },
        component: util.handleComponentPath(ERoutePath.COMPONENTS),
    },
    {
        // /文档/方法
        path: ERoutePath.FUNCTIONS,
        name: ERouteName.FUNCTIONS,
        meta: {
            title: ERouteTitle.FUNCTIONS,
        },
        component: util.handleComponentPath(ERoutePath.FUNCTIONS),
    },

]

export default routes
