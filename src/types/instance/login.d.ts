import { IUserItems } from "./user"

export type ILoginParams = {  // 登陆请求参数
    login: string
    password: string
  }
  
  export type ILoginItems = { // 登录返回项
    userInfo: IUserItems,
    token: string,
  }