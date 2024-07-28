import i18n from "@/i18n";

export enum EHttpMethod {
  POST = "post",
  GET = "get",
  PUT = "put",
  DELETE = "delete",
}

export enum EResponseCode {
  SUCCESS = 0, //请求成功
  TOKEN_EXPIRED = 401, //token过期
}

export const EHttpTimeout = 30000; //axios请求超时时间

export const EContorted = "ECONNABORTED"; //axios请求超时时间

export const ERouteTitle = {
    LOGIN: i18n.global.t("routeInfo.login"),
    INDEX: i18n.global.t("routeInfo.index"),
    HOME: i18n.global.t("routeInfo.home"),
  };
  
  export enum ERoutePath {
    LOGIN = "/login",
    INDEX = "/index",
    HOME = "/home",
  }
  
  export enum ERouteName {
    LOGIN = "login",
    INDEX = "index",
    HOME = "home",
  }
  
  export interface IRouteParams {
    title: string;
    name: string;
    path: string;
    meta?: object
  }