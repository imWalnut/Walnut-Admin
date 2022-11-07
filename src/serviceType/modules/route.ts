import i18n from "@/i18n";
const _t = i18n.global.t

export const ERouteName:any = {
  LOGIN: _t('routeInfo.login'),
  INDEX: _t('routeInfo.index'),
  HOME: _t('routeInfo.home'),
  ELEMENTPLUS: _t('routeInfo.elementPlus'),
  ALIICON: _t('routeInfo.aliIcon'),
  COMPONENTS: _t('routeInfo.components'),
  FUNCTIONS: _t('routeInfo.functions'),
}

export enum ERoutePath {
  LOGIN = '/login',
  INDEX = '/index',
  HOME = '/home',
  ELEMENTPLUS = '/component/icon/element',
  ALIICON = '/component/icon/aliIcon',
  COMPONENTS = '/document/components',
  FUNCTIONS = '/document/functions',
}

export enum ERouteTitle {
  LOGIN = '登陆',
  INDEX = '主页',
  HOME = '首页',
  ELEMENTPLUS = '组件/图标/饿了么矢量图',
  ALIICON = '组件/图标/阿里矢量图',
  COMPONENTS = '文档/组件',
  FUNCTIONS = '文档/方法',
}


export interface IRouteParams {
  name: string
  path: string
}
