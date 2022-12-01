import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {AllRoutes} from "@/router/modules"
import {ERouteName, ERoutePath, IRouteParams} from "@/serviceType"
import util from "@/utils/util";
import usePiniaStore from "@/store";
import {storeToRefs} from "pinia";

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: ERoutePath.LOGIN
  },
  {
    path: ERoutePath.LOGIN,
    name: ERouteName.LOGIN,
    component: util.handleComponentPath(ERoutePath.LOGIN)
  },
  {
    path: ERoutePath.INDEX,
    name: ERouteName.INDEX,
    component: util.handleComponentPath(ERoutePath.INDEX)
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.name === ERouteName.LOGIN) {
    next()
  } else {
    const routes = router.getRoutes()
    if (routes?.length===3) {
      const path = await AllRoutes()
      if (path) {
        next({
          path: to.fullPath,
          query: {
            ...to.query,
          }
        })
      }
    } else {
      handleTabs(to)
      next()
    }
  }
})

// 路由拦截添加tabs页面导航
function handleTabs(val:any) {
  const piniaStore = usePiniaStore()
  const {routeList} = storeToRefs(piniaStore)
  let alreadyRoute:IRouteParams = {
    name: '',
    path: ''
  } // tabsList中已存在的路由信息
  let alreadyIndex:number = -1 // tabsList中已存在的路由下标
  let routes:Array<IRouteParams> = routeList.value  // 获取tabs标签栏数据
  let isInclude:boolean = routes.some((item: IRouteParams, index:number) => {  // 判断跳转页面是否在tabs标签栏中
    if (item.path.includes(val.path)) {
      alreadyIndex = index
      alreadyRoute = item
      return true
    }
  })
  if (!isInclude) {  // tabs标签栏添加当前激活页
    routes.push({
      name: val.name,
      path: val.path
    })
    piniaStore.handleRouteList(routes)
  } else {
    if (alreadyIndex !== -1 && alreadyRoute.path !== val.fullPath) { // 用来处理path相同fullPath不同的标签页替换情况
      routes.splice(alreadyIndex, 1, {
        name: val.meta.title,
        path: val.fullPath
      })
    }
  }
}

export default router
