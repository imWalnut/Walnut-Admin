import instance, { ApiResponse } from "./instance";
import { InternalAxiosRequestConfig } from 'axios';

function get<T>(url: string, params?: {}): Promise<ApiResponse<T>> {
  return instance.get(url, {params})
}

function del<T>(url: string, params?: {}): Promise<ApiResponse<T>> {
  return instance.delete(url, {params})
}

const post = <T>(
  url: string,
  data?: {},
  config?: InternalAxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return instance.post(url, data, {...config})
}

const put = <T>(
  url: string,
  data?: {},
  config?: InternalAxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return instance.put(url, data, {...config})
}

export {get, post, del, put}