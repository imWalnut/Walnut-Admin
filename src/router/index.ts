import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {AllRoutes} from "@/router/modules"
import {ERouteName, ERoutePath} from "@/serviceType"
import util from "@/utils/util";

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
      next()
    }
  }
})

export default router
