import { ERouteName, ERoutePath, ERouteTitle, IRouteParams } from "@/types";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AllRoutes } from "@/router/modules";
import useSystemStore from "@/store/system";
import { storeToRefs } from "pinia";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: ERoutePath.LOGIN,
  },
  {
    path: ERoutePath.LOGIN,
    name: ERouteName.LOGIN,
    component: () => import("@/views/login"),
    meta: {
      title: ERouteTitle.LOGIN,
    },
  },
  {
    path: ERoutePath.INDEX,
    name: ERouteName.INDEX,
    component: () => import("@/views/index"),
    meta: {
      title: ERouteTitle.INDEX,
    },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name === ERouteName.LOGIN) {
    next();
  } else {
    const routes = router.getRoutes();
    if (routes?.length === 3) {
      const path = await AllRoutes();
      if (path) {
        next({
          path: to.fullPath,
          query: {
            ...to.query,
          },
        });
      }
    } else {
      handleTabs(to);
      next();
    }
  }
});

// 路由拦截添加tabs页面导航
function handleTabs(val: any) {
  if (val.meta.hide) return;
  const systemStore = useSystemStore();
  const { routeList } = storeToRefs(systemStore);
  let alreadyRoute: IRouteParams = {
    name: "",
    path: "",
    title: "",
  }; // tabsList中已存在的路由信息
  let alreadyIndex: number = -1; // tabsList中已存在的路由下标
  let routes: Array<IRouteParams> = routeList.value; // 获取tabs标签栏数据
  let isInclude: boolean = routes.some((item: IRouteParams, index: number) => {
    // 判断跳转页面是否在tabs标签栏中
    if (item.path.includes(val.path)) {
      alreadyIndex = index;
      alreadyRoute = item;
      return true;
    }
  });
  if (!isInclude) {
    // tabs标签栏添加当前激活页
    routes.push({
      name: val.name,
      path: val.path,
      title: val.meta.title,
    });
    systemStore.setRouteList(routes);
  } else {
    if (alreadyIndex !== -1 && alreadyRoute.path !== val.fullPath) {
      // 用来处理path相同fullPath不同的标签页替换情况
      routes.splice(alreadyIndex, 1, {
        title: val.meta.title,
        path: val.fullPath,
        name: val.name,
      });
    }
  }
}

export default router;
