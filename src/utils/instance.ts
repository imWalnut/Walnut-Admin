import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import i18n from "@/i18n";
import router from "@/router";
import { EResponseCode, EHttpTimeout, EContorted, ERoutePath } from "../types";
import { ElMessage } from "element-plus";

export interface ApiResponse<T> {
  status: boolean,
  message: string,
  data: T
}

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VUE_APP_SERVER,
  timeout: EHttpTimeout, // request timeout
});

// axios request拦截
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const Authorization = "";

    if (Authorization) {
      config!.headers!.Authorization = Authorization;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// axios response拦截
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data, message } = response.data;
    // axios response 错误拦截
    if (!status) {
      ElMessage.error(message)
      return
    }
    return response.data;
  },
  (error: AxiosError) => {
    const data = {
      msg: "",
    };
    if (error?.response?.status === EResponseCode.TOKEN_EXPIRED) {
      // token过期
      data.msg = i18n.global.t("http.tokenExpired");
      sessionStorage.clear();
      router.push(ERoutePath.LOGIN);
      return;
    } else if (error.code === EContorted) {
      // 请求超时
      //超时,config中添加isTimeout 再次请求
      data.msg = i18n.global.t("http.timeoutTips");
    } else {
      data.msg = i18n.global.t("http.errorTips"); // 请求异常
    }
    
    return Promise.resolve(data);
  }
);

export default instance;
