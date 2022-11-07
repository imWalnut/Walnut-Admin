import axios from 'axios'
import i18n from '@/i18n'
import router from "@/router";
import {EResponseCode, EHttpTimeout, EContorted, ERoutePath} from '@/serviceType/index'

const instance = axios.create({
  timeout: EHttpTimeout, // request timeout
})

// axios request拦截
instance.interceptors.request.use(
  (config: any) => {
    const userInfoHeader = ''
    const Authorization = ''

    if (userInfoHeader) {
      config.headers.UserInfo = encodeURIComponent(userInfoHeader)
    }

    if (!config.headers.Authorization && Authorization) {
      config.headers.Authorization = Authorization
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// axios response拦截
instance.interceptors.response.use(
  (response) => {
    const {code, data, msg} = response.data
    // axios response 错误拦截
    if (code === !EResponseCode.SUCCESS) {
    }
    return response.data
  },
  (error) => {
    const data = {
      msg: '',
    }
    if (error?.response?.status === EResponseCode.TOKEN_EXPIRED) {  // token过期
      data.msg = i18n.global.t('http.tokenExpired')
      sessionStorage.clear()
      router.push(ERoutePath.LOGIN)
      return
    } else if (error.code === EContorted) {  // 请求超时
      //超时,config中添加isTimeout 再次请求
      data.msg = i18n.global.t('http.timeoutTips')
    } else {
      data.msg = i18n.global.t('http.errorTips')  // 请求异常
    }
    return Promise.resolve(data)
  },
)

export default instance
