const API_HOST = import.meta.env.VITE_APP_API_SITE

export enum EHttpMethod {
    POST = 'post',
    GET = 'get',
}

export enum EResponseCode {
  SUCCESS = 0, //请求成功
  TOKEN_EXPIRED = 401, //token过期
}

export const EHttpTimeout = 30000 //axios请求超时时间

export const EContorted = 'ECONNABORTED' //axios请求超时时间

export const EApiSite = {
  BASE: `${API_HOST}`,
}

export const ERequestContentType = {
  JSON: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  FORMDATA: {
    'Content-Type': 'multipart/form-data',
  },
  URLENCODED: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}
