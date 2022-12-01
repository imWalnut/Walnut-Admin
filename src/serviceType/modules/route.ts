import i18n from "@/i18n";
const _t = i18n.global.t

export const ERouteName:any = {
  LOGIN: _t('routeInfo.login'),
  INDEX: _t('routeInfo.index'),
  HOME: _t('routeInfo.home'),
  TABLE: _t('routeInfo.table'),
  ICON: _t('routeInfo.icon'),
  COMPONENTS: _t('routeInfo.components'),
  FUNCTIONS: _t('routeInfo.functions'),
}

export enum ERoutePath {
  LOGIN = '/login',
  INDEX = '/index',
  HOME = '/home',
  TABLE = '/module/show/table',
  ICON = '/module/base/icon',
  COMPONENTS = '/document/components',
  FUNCTIONS = '/document/functions',
}

export enum ERouteTitle {
  LOGIN = '登陆',
  INDEX = '主页',
  HOME = '首页',
  TABLE = '组件/数据展示/表格',
  ICON = '组件/基础组件/图标',
  COMPONENTS = '文档/组件',
  FUNCTIONS = '文档/方法',
}


export interface IRouteParams {
  name: string
  path: string
}
