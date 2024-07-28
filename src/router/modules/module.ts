import {RouteRecordRaw} from 'vue-router'
import {ERouteName, ERoutePath, ERouteTitle} from "@/types"
import util from "@/utils/util";

//  懒加载
// const _import = (path:any) => defineAsyncComponent(() => import(`../views/${ERoutePath.PRODUCT_MANAGE_LIST_DETAIL}.tsx`));

const routes: Array<RouteRecordRaw> = [
  {
    //首页
    path: ERoutePath.HOME,
    name: ERouteName.HOME,
    meta: {
      title: ERouteTitle.HOME,
    },
    component: util.handleComponentPath(ERoutePath.HOME),
  },

  // 动态获取
  {
    // /商品管理/商品列表
    path: '/product/list',
    name: 'productList',
    meta: {
      title: '商品列表',
    },
    component: util.handleComponentPath('/product/list'),
  },
  {
    // /商品管理/新增商品
    path: '/product/add',
    name: 'productAdd',
    meta: {
      title: '新增商品',
      hide: true,
    },
    component: util.handleComponentPath('/product/add'),
  },
  {
    // /商品管理/编辑商品
    path: '/product/edit/:id',
    name: 'productEdit',
    meta: {
      title: '编辑商品',
      hide: true,
    },
    component: util.handleComponentPath('/product/edit'),
  },
  {
    // /商品管理/商品分类
    path: '/product/classify',
    name: 'productClassify',
    meta: {
      title: '商品分类',
    },
    component: util.handleComponentPath('/product/classify'),
  },
  {
    // /商品管理/商品分组
    path: '/product/group',
    name: 'productGroup',
    meta: {
      title: '商品分组',
    },
    component: util.handleComponentPath('/product/group'),
  },
  {
    // /商品管理/商品规格
    path: '/product/sku',
    name: 'productSku',
    meta: {
      title: '商品规格',
    },
    component: util.handleComponentPath('/product/sku'),
  },
  {
    // /商品管理/商品详情
    path: '/product/detail/:id',
    name: 'productDetail',
    meta: {
      title: '商品详情',
      hide: true,
    },
    component: util.handleComponentPath('/product/detail'),
  },
]

export default routes